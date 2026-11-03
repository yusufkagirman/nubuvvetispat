// ui.js — arayüz: karşılama → anket → harita + düğüm görünümü. Tüm metinler textContent ile basılır.
import { Motor } from './motor.js';
import { durum, kaydet, sifirla, disaAktar } from './durum.js';
import { haritaCiz, DALLAR } from './harita.js';
import { anketBaslat } from './anket.js';

export function el(tag, attrs = {}, ...cocuk) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v === false || v == null) continue;
    else if (k === 'value') n.value = v;
    else n.setAttribute(k, v === true ? '' : v);
  }
  cocuk.flat().forEach((c) => n.append(c instanceof Node ? c : document.createTextNode(c ?? '')));
  return n;
}
const $ = (s) => document.querySelector(s);
const paragraflar = (m) => String(m || '').split(/\n{2,}/).map((p) => el('p', {}, p));
const kaynakMetni = (k) => k ? [k.yazar, k.eser, k.sayfa && `s. ${k.sayfa}`].filter(Boolean).join(' · ') : '';

function rozetler(...r) {
  const x = r.filter(Boolean);
  return x.length ? el('div', { class: 'rozetler' }, x.map((t) => el('span', { class: 'rozet' }, t))) : null;
}

let motor;
const akis = () => $('#akis');
function ekle(n) { akis().append(n); n.scrollIntoView?.({ block: 'end', behavior: 'smooth' }); return n; }

const ui = {
  temizle() { akis().replaceChildren(); $('#kontrol').replaceChildren(); },
  dugumBasladi(d, { onkosulEksik }) {
    const dalAd = DALLAR[(d.id || '')[0]]?.ad || d.dal || '';
    akis().append(el('header', { class: 'dugum-baslik' },
      el('div', { class: 'rozetler' }, el('span', { class: 'rozet kimlik' }, d.id), dalAd && el('span', { class: 'rozet' }, dalAd), d.sayfa && el('span', { class: 'rozet' }, `Kitap s. ${d.sayfa}`)),
      el('h2', {}, d.baslik)));
    if (onkosulEksik) akis().append(el('p', { class: 'not' }, 'Ön adımlar tamamlanmadı: bu düğümü okuyabilirsiniz ama “kapandı” sayılmaz.'));
  },
  hazirlaniyor(id) {
    akis().append(el('div', { class: 'kart hazirlaniyor' }, el('h2', {}, 'Bu bölüm hazırlanıyor'), el('p', {}, `“${id}” düğümünün içeriği henüz yayında değil. Biraz sonra tekrar bakabilir ya da haritadan başka bir yere geçebilirsiniz.`)));
    ui.kontrol({ mod: 'harita', etiket: 'Haritaya dön' });
  },
  sahne(s) {
    if (s.tip === 'alinti') ekle(el('blockquote', { class: 'alinti' }, paragraflar(s.metin), el('footer', {}, rozetler(kaynakMetni(s.kaynak), s.kitapSayfa && `Kitap s. ${s.kitapSayfa}`))));
    else if (s.tip === 'kart') ekle(el('div', { class: 'kart' }, s.baslik && el('h3', {}, s.baslik), paragraflar(s.metin), rozetler(s.kitapSayfa && `Kitap s. ${s.kitapSayfa}`, kaynakMetni(s.kaynak))));
    else if (s.tip === 'gorsel') {
      const img = el('img', { src: s.dosya, alt: s.altyazi || '', loading: 'lazy' });
      img.addEventListener('error', () => img.replaceWith(el('div', { class: 'yer-tutucu' }, 'Görsel yüklenemedi')));
      ekle(el('figure', { class: 'gorsel' }, img, el('figcaption', {}, s.altyazi || '', ' ', rozetler(s.kitapSayfa && `Kitap s. ${s.kitapSayfa}`))));
    } else ekle(el('div', { class: 'balon sistem' }, paragraflar(s.metin)));
  },
  ozet(m, tekrar) { ekle(el('div', { class: 'ozet' }, el('strong', {}, tekrar ? 'Kısaca tekrar: ' : 'Özet: '), m)); },
  ilzam(m) { ekle(el('div', { class: 'balon sistem ilzam' }, paragraflar(m))); },
  sistem(m) { ekle(el('div', { class: 'balon sistem' }, paragraflar(m))); },
  kullanici(m) { ekle(el('div', { class: 'balon kullanici' }, m)); },
  itiraz(i) {
    if (!i) return ui.sistem('Bu itirazı not aldık.');
    ekle(el('div', { class: 'balon sistem' }, paragraflar(i.yanit), rozetler(i.kaynak && i.kaynak.kitapSayfa && `Kitap s. ${i.kaynak.kitapSayfa}`)));
  },
  ekOrnek(o) {
    ekle(el('div', { class: 'kart ek' }, el('h3', {}, o.baslik || 'Ek örnek'), paragraflar(o.metin),
      rozetler(o.durum === 'ek' ? 'Kitap dışı ek' : 'Kitaptan', o.kitapSayfa && `Kitap s. ${o.kitapSayfa}`, kaynakMetni(o.kaynak), o.dogrulanacak && 'Doğrulanacak')));
  },
  kontrol(k) {
    const kap = $('#kontrol'); kap.replaceChildren();
    if (k.mod === 'ileri' || k.mod === 'devam' || k.mod === 'harita') {
      kap.append(el('button', { class: 'birincil buyuk', id: 'ileri-btn', onclick: () => {
        if (k.mod === 'ileri') motor.ileri();
        else if (k.mod === 'devam') motor.git(k.hedef);
        else { $('#harita-kap').scrollIntoView({ behavior: 'smooth' }); }
      } }, k.etiket));
      kap.append(el('button', { class: 'ikincil', onclick: () => ekleAra() }, 'Ara ver'));
    } else if (k.mod === 'cevap') {
      const girdi = el('input', { type: 'text', id: 'cevap', autocomplete: 'off', placeholder: 'Cevabınızı yazın…', 'aria-label': 'Cevabınız' });
      const gonder = () => { const v = girdi.value; girdi.value = ''; if (v.trim()) motor.cevapla(v); };
      girdi.addEventListener('keydown', (e) => { if (e.key === 'Enter') gonder(); });
      if (k.cipler?.length) kap.append(el('div', { class: 'cipler' }, k.cipler.map((c) => el('button', { class: 'cip', onclick: () => motor.cevapla(c) }, c))));
      kap.append(el('div', { class: 'satir' }, girdi, el('button', { class: 'birincil', id: 'gonder', onclick: gonder }, 'Gönder')));
      girdi.focus({ preventScroll: true });
    }
  },
  haritaGuncelle() {
    const ozet = {};
    for (const id of motor.sira) {
      const o = (ozet[id[0]] ||= { toplam: 0, kapali: 0, tamam: 0 });
      o.toplam++; if (durum.kapali[id]) o.kapali++; else if (durum.tamam[id]) o.tamam++;
    }
    haritaCiz($('#harita-kap'), ozet, (durum.mevcut || '')[0], (dal) => {
      const ids = motor.sira.filter((i) => i[0] === dal);
      motor.git(ids.find((i) => !durum.kapali[i]) || ids[0] || dal + '1');
    });
    $('#dugum-liste').replaceChildren(...motor.sira.map((id) => {
      const g = durum.kapali[id] ? (id[0] === 'S' || id[0] === 'F' ? '✗' : '✓') : durum.tamam[id] ? '◐' : durum.ziyaret[id] ? '○' : '·';
      return el('button', { class: 'dn' + (durum.mevcut === id ? ' mevcut' : ''), title: id, onclick: () => motor.git(id) }, el('span', { class: 'g' }, g), id);
    }));
  },
};
function ekleAra() { motor.araVer(); }

// ---- ekran yönetimi ----
function goster(ad) { for (const x of ['karsilama', 'anket', 'ana']) $('#' + x).hidden = x !== ad; }

function anketGoster() {
  goster('anket');
  anketBaslat($('#anket-kap'), durum, kaydet, () => ana());
}
async function ana() {
  goster('ana');
  motor ||= new Motor(ui);
  await motor.baslat();
  const ilk = motor.sira[0] || 'Z1';
  await motor.git(durum.mevcut || ilk);
}

export async function baslat() {
  $('#baslat').addEventListener('click', () => (durum.anketBitti ? ana() : anketGoster()));
  $('#anket-atla').addEventListener('click', () => { durum.anketBitti = true; kaydet(); ana(); });
  $('#m-cevaplar').addEventListener('click', anketGoster);
  $('#m-aktar').addEventListener('click', disaAktar);
  $('#m-sifirla').addEventListener('click', () => {
    if (!confirm('Tüm ilerleme ve cevaplar silinecek. Baştan başlansın mı?')) return;
    sifirla(); location.reload();
  });
  if (durum.anketBitti && durum.mevcut) { $('#baslat').textContent = 'Kaldığım yerden devam et'; }
  goster('karsilama');
}
