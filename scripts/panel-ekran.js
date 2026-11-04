#!/usr/bin/env node
// Her beat için ekran görüntüsü (site/panel/ekran/<id>.jpg) + docs/sunum-haritasi.md üretir.
// Kullanım: node scripts/panel-ekran.js <taban-url> [beat-id-regex]   (sunucu scripts/panel-ekran.sh ile başlatılır)
const fs = require('fs'), path = require('path'), vm = require('vm');
const { chromium } = require('playwright');
const K = path.resolve(__dirname, '..');
const BASE = process.argv[2] || 'http://localhost:8131';
const SUZ = process.argv[3] ? new RegExp(process.argv[3]) : null;
const OUT = path.join(K, 'site/panel/ekran');
fs.mkdirSync(OUT, { recursive: true });

const win = {}; vm.runInNewContext(fs.readFileSync(path.join(K, 'site/akis-veri.js'), 'utf8'), { window: win });
const bolgeler = win.AKIS_VERI.bolgeler;
const beats = bolgeler.flatMap((b) => b.beats);
const D = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);

function haritaYaz() {
  const L = ['# Sunum Haritası', '', '> Otomatik üretilir: `scripts/panel-ekran.sh` (içerik değişince yeniden çalıştır). Düzenleme: `icerik/akis/*.json`. Etkileşimli görünüm: `site/panel.html`.', '', `Toplam ${beats.length} kare.`, ''];
  const kunye = (k) => k ? [k.yazar, k.eser && `"${k.eser}"`, [k.yer, k.yil].filter(Boolean).join(' '), k.sayfa && `s. ${k.sayfa}`, k.not].filter(Boolean).join(', ') : '';
  for (const b of bolgeler) {
    L.push(`## Bölge: ${b.bolge}`, '');
    for (const x of b.beats) {
      L.push(`### ${x.id}${x.gizliDugum ? ` (düğüm ${x.gizliDugum})` : ''}`, '');
      if (x.ek) L.push('**Etiket: ek (kitap dışı)**', '');
      L.push(`![${x.id}](../site/panel/ekran/${x.id}.jpg)`, '');
      if (x.dallan?.length) { L.push('**Girişte dallan:**', ''); x.dallan.forEach((d) => L.push(`- \`${JSON.stringify(d.kosul)}\` → \`${d.git}\``)); L.push(''); }
      if (x.satirlar?.length) {
        L.push('**Satırlar:**', '');
        x.satirlar.forEach((s, i) => {
          const ek = [s.vurgu && 'vurgu', s.gorsel && `görsel: ${s.gorsel}`, s.diyagram && `diyagram: ${s.diyagram.tur}`, s.kaynak && `kaynak: ${kunye(s.kaynak)}${s.kaynak.dogrulanacak ? ' [doğrulanacak]' : ''}`].filter(Boolean).join('; ');
          L.push(`${i + 1}. ${s.metin || '(metinsiz)'}${ek ? ` _[${ek}]_` : ''}`);
        });
        L.push('');
      }
      if (x.soru) {
        const q = typeof x.soru === 'string' ? { metin: x.soru } : x.soru;
        L.push(`**Soru:** ${q.metin}${q.serbest ? ' _(serbest)_' : ''}`, '');
        if (q.cipler?.length) L.push(`Çipler: ${q.cipler.map((c) => `“${c}”`).join(' · ')}`, '');
      }
      const hedefler = [];
      (x.yollar || []).forEach((y) => hedefler.push([y.tur, D(y.anahtar).join(', '), y.git || (y.tur === 'itiraz' ? '(yanıt, aynı soru)' : y.tur === 'ret' ? '(ret → ek örnek)' : '(sonraki/varsayılan)')]));
      if (x.sonraki) hedefler.push(['sonraki', '—', x.sonraki]);
      if (x.varsayilan) hedefler.push(['varsayılan', '—', x.varsayilan]);
      if (hedefler.length) { L.push('| tür | anahtarlar | hedef |', '|---|---|---|'); hedefler.forEach(([a, b2, c]) => L.push(`| ${a} | ${b2.replace(/\|/g, '/')} | ${c} |`)); L.push(''); }
      if (x.ekOrnekler?.length) { L.push(`**Ek örnekler (${x.ekOrnekler.length}):**`, ''); x.ekOrnekler.forEach((e, i) => L.push(`${i + 1}. ${(e.satirlar || []).map((s) => s.metin).join(' ')} → _${typeof e.soru === 'string' ? e.soru : e.soru?.metin}_${e.ek ? ' [ek]' : ''}`)); L.push(''); }
      if (x.kompozisyon) L.push(`**Kompozisyon:** ${x.kompozisyon}`, '');
      if (x.kapat) L.push(`**Kapatır:** ${x.kapat} (kullanıcı ikna olursa)`, '');
    }
  }
  fs.writeFileSync(path.join(K, 'docs/sunum-haritasi.md'), L.join('\n'));
  console.log('docs/sunum-haritasi.md yazıldı');
}

(async () => {
  haritaYaz();
  const br = await chromium.launch();
  const ctx = await br.newContext({ viewport: { width: 1280, height: 760 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const hatalar = [];
  page.on('pageerror', (e) => hatalar.push(String(e)));
  await page.goto(BASE + '/index.html');
  await page.evaluate(() => window.__sunum.hiz(0.3));
  await page.waitForSelector('.ipucu.goster', { timeout: 20000 });
  await page.mouse.click(640, 380);
  await page.waitForFunction(() => window.__sunum.durum.beat === 'acilis.merhaba', null, { timeout: 20000 });
  let ok = 0; const atlanan = [];
  for (const b of beats) {
    if (SUZ && !SUZ.test(b.id)) continue;
    await page.evaluate((id) => { window.__sunum.git(id); }, b.id);
    await page.waitForTimeout(150);
    const n = (b.satirlar || []).length;
    const sonMetin = [...(b.satirlar || [])].reverse().find((s) => s.metin)?.metin || '';
    try {
      if (b.soru) {
        const q = typeof b.soru === 'string' ? b.soru : b.soru.metin;
        await page.waitForFunction((t) => { const y = document.querySelector('#yigin'); return y && y.textContent.replace(/\s+/g, '').includes(t.replace(/\s+/g, '')) && y.querySelector('form'); }, q, { timeout: 25000, polling: 40 });
      }
      else if (sonMetin) {
        await page.waitForFunction((t) => [...document.querySelectorAll('#yigin .satir')].some((e) => e.textContent.replace(/\s+/g, '') === t.replace(/\s+/g, '')), sonMetin, { timeout: 25000, polling: 40 });
      } else await page.waitForFunction((a) => window.__sunum.durum.beat === a[0] && window.__sunum.durum.satir >= a[1] - 1, [b.id, n], { timeout: 25000, polling: 40 });
      await page.waitForTimeout(b.soru ? 600 : 250);
      await page.screenshot({ path: path.join(OUT, b.id + '.jpg'), type: 'jpeg', quality: 70 });
      ok++; process.stdout.write('.');
    } catch (e) { atlanan.push(b.id); process.stdout.write('x'); }
  }
  console.log(`\n${ok} görüntü, atlanan: ${atlanan.join(', ') || '-'}; sayfa hatası: ${hatalar.length}`);
  hatalar.slice(0, 5).forEach((h) => console.log(' ', h));
  await br.close();
})();
