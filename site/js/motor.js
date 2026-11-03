// motor.js — düğüm akışı (docs/etkilesim-modeli.md). DOM bilmez; arayüze `ui` nesnesi üzerinden konuşur.
import { siniflandir, dugumAnahtarlari, normalize } from './niyet.js';
import { durum, kaydet, cevapEkle, konuDisiEkle } from './durum.js';

const YOLLAR = ['icerik/', 'ornek/']; // önce yayın içeriği, yoksa örnekler
const dizi = (x) => (Array.isArray(x) ? x : x ? [x] : []);
const sec = (x, n) => { const a = dizi(x); return a.length ? a[n % a.length] : ''; };

async function getir(yol) {
  for (const k of YOLLAR) {
    try { const r = await fetch(k + yol, { cache: 'no-cache' }); if (r.ok) return await r.json(); } catch { /* sonraki */ }
  }
  return null;
}

export class Motor {
  constructor(ui) { this.ui = ui; this.sira = []; this.cache = {}; this.d = null; this.s = null; this.sayac = 0; }

  async baslat() {
    const j = await getir('_sira.json');
    const l = Array.isArray(j) ? j : j?.sira || j?.dugumler || (j && Object.values(j).find(Array.isArray)) || [];
    this.sira = l.map((x) => (typeof x === 'string' ? x : x.id)).filter(Boolean);
    return this.sira;
  }
  async yukle(id) {
    if (!(id in this.cache)) this.cache[id] = await getir(id + '.json');
    return this.cache[id];
  }
  sonrakiId(id) { const i = this.sira.indexOf(id); return i >= 0 ? this.sira[i + 1] : null; }

  /** Önkoşulların tamamı ikna ile kapanmış mı? (sırada olmayan önkoşul engel sayılmaz) */
  onkosulTamam(d) { return dizi(d.onkosul).every((o) => durum.kapali[o] || !this.sira.includes(o)); }

  async git(id) {
    this.ui.temizle();
    const d = await this.yukle(id);
    durum.mevcut = id; durum.ziyaret[id] = true; kaydet();
    if (!d) { this.d = null; this.ui.hazirlaniyor(id); this.ui.haritaGuncelle(); return; }
    this.d = d;
    this.s = { sahne: 0, faz: 'sahne', ek: 0, ilzam: d.ilzam?.soru || '', cipler: d.ilzam?.cipler || [] };
    this.ui.dugumBasladi(d, { onkosulEksik: !this.onkosulTamam(d) });
    // Daha önce kaydedilen konu dışı soruları hatırlat (düğüm anahtarlarıyla eşleşenleri).
    const an = dugumAnahtarlari(d);
    const hatirla = durum.konuDisi.filter((k) => k.id !== id && an.some((a) => normalize(k.metin).includes(a)));
    if (hatirla.length) this.ui.sistem(`Daha önce şunu sormuştunuz, sırası geldi: “${hatirla[hatirla.length - 1].metin}”`);
    this.ui.haritaGuncelle();
    this.ileri();
  }

  /** Sahneleri sırayla göster; bitince özet + ilzam. */
  ileri() {
    const { d, s } = this;
    if (!d || s.faz !== 'sahne') return;
    const sah = d.sahneler || [];
    if (s.sahne < sah.length) {
      this.ui.sahne(sah[s.sahne++]);
      this.ui.kontrol({ mod: 'ileri', etiket: s.sahne < sah.length ? 'Devam' : 'Özete geç' });
      return;
    }
    if (d.ozet) this.ui.ozet(d.ozet);
    s.faz = 'ilzam';
    this.ilzamSor();
  }

  ilzamSor() {
    const { s } = this;
    if (s.ilzam) this.ui.ilzam(s.ilzam);
    this.ui.kontrol({ mod: 'cevap', cipler: s.cipler });
  }

  async cevapla(metin) {
    const { d, s } = this;
    if (!d || !metin.trim() || s.faz === 'sahne' || s.faz === 'bitti') return;
    this.ui.kullanici(metin);
    const id = d.id;
    const n = d.niyetler || {};

    if (s.faz === 'kompozisyon') {
      const r0 = await siniflandir(metin, d);
      if (r0.niyet === 'ara_ver') return this.araVer();
      durum.kompozisyon[id] = metin; durum.tamam[id] = 'kompozisyon';
      cevapEkle(id, { tip: 'kompozisyon', metin });
      s.faz = 'bitti';
      this.ui.sistem('Cevabınız için teşekkür ederiz; kaydettik. Konuyu zorlamayacağız; nasıl açıkladığınız sizin değerlendirmenizdir. İsterseniz yola devam edelim.');
      this.ui.haritaGuncelle();
      return this.sonrakiyeHazirla();
    }

    const r = await siniflandir(metin, d);
    cevapEkle(id, { tip: 'ilzam', metin, niyet: r.niyet, itirazId: r.itirazId });
    this.sayac++;
    switch (r.niyet) {
      case 'ara_ver': return this.araVer();
      case 'ikna': {
        const kapat = this.onkosulTamam(d);
        if (kapat) { durum.kapali[id] = Date.now(); delete durum.tamam[id]; kaydet(); }
        this.ui.sistem(sec(n.ikna?.yanit, this.sayac) || 'Teşekkür ederiz, bu noktayı böyle kapatıyoruz.');
        if (!kapat) this.ui.sistem('Not: Bu düğümün ön adımları henüz tamamlanmadığı için “kapandı” sayılmadı; sıralı ilerleyince kapanacak.');
        s.faz = 'bitti'; this.ui.haritaGuncelle();
        return this.sonrakiyeHazirla();
      }
      case 'itiraz': {
        this.ui.itiraz((d.itirazlar || []).find((x) => x.id === r.itirazId));
        this.ilzamSor();
        return;
      }
      case 'yonlendir': {
        if (this.onkosulTamam(d)) { durum.kapali[id] = Date.now(); kaydet(); }
        this.ui.sistem(sec(n.yonlendir?.[r.yon]?.yanit, 0) || 'Peki, o halde sizin düşündüğünüz ihtimali birlikte ele alalım.');
        this.ui.haritaGuncelle();
        return this.git(r.hedef);
      }
      case 'kacamak':
      case 'konu_disi': {
        if (r.niyet === 'konu_disi') konuDisiEkle(id, metin);
        this.ui.sistem(sec(n[r.niyet]?.yanit, this.sayac) ||
          (r.niyet === 'konu_disi' ? 'Güzel bir soru; not aldık, sırası gelince buna döneceğiz.' : 'Buna sırası gelince döneceğiz; şimdilik elimizdeki soruya bir bakalım.'));
        this.ilzamSor();
        return;
      }
      default: return this.iknaOlmadi();
    }
  }

  iknaOlmadi() {
    const { d, s } = this;
    const ek = dizi(d.ekOrnekler);
    if (s.ek < ek.length) {
      const o = ek[s.ek++];
      this.ui.sistem('Anlıyoruz; o halde konuya bir de şu açıdan bakalım.');
      this.ui.ekOrnek(o);
      if (d.ozet) this.ui.ozet(d.ozet, true);
      s.ilzam = o.ilzam || d.ilzam?.soru || '';
      this.ilzamSor();
      return;
    }
    s.faz = 'kompozisyon';
    this.ui.sistem('Örneklerin hepsini gösterdik. Sizi daha fazla zorlamadan tek bir şey soracağız.');
    this.ui.ilzam(d.kompozisyon || 'Bu verilerin tamamını birlikte, tutarlı biçimde nasıl açıklıyorsunuz?');
    this.ui.kontrol({ mod: 'cevap', cipler: [] });
  }

  sonrakiyeHazirla() {
    const sn = this.d.sonraki || this.sonrakiId(this.d.id);
    if (sn) this.ui.kontrol({ mod: 'devam', etiket: 'Devam et', hedef: sn });
    else this.ui.kontrol({ mod: 'harita', etiket: 'Haritaya dön' });
  }

  araVer() {
    kaydet();
    this.ui.sistem('Elbette, ilerlemeniz kaydedildi. Dilediğiniz zaman kaldığınız yerden devam edebilirsiniz.');
    this.ui.kontrol({ mod: 'harita', etiket: 'Haritaya dön' });
  }
}
