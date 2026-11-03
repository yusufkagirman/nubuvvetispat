// durum.js — kullanıcı durumu (ilerleme, cevaplar, konu dışı notlar).
// Saklama: localStorage (try/catch; erişilemezse bellekte).
// HESAP YOK (v1). Sonraki aşamada: giriş yapan kullanıcı için aynı nesne sunucuya
// eşitlenebilir -> aşağıdaki `depola` adaptörünü uzak bir uygulamayla değiştirmek yeterli.
const ANAHTAR = 'nubuvvet.durum.v1';

const bos = () => ({
  surum: 1,
  profil: {},          // anket cevapları {soruId: {secim:[], serbest:''}}
  anketBitti: false,
  mevcut: null,        // şu anki düğüm id
  kapali: {},          // {id: zaman}  -> ikna olundu (✗/✓)
  tamam: {},           // {id: 'kompozisyon'|'ilzam'} ikna olmadan tamamlanan
  ziyaret: {},         // {id: true}
  cevaplar: {},        // {id: [{tip, metin, niyet, t}]}
  konuDisi: [],        // [{id, metin, t}]
  kompozisyon: {},     // {id: metin}
  baslangic: Date.now(),
});

let bellek = null;
const depola = {
  oku() { try { return localStorage.getItem(ANAHTAR); } catch { return bellek; } },
  yaz(s) { try { localStorage.setItem(ANAHTAR, s); } catch { bellek = s; } },
  sil() { try { localStorage.removeItem(ANAHTAR); } catch { /* */ } bellek = null; },
};

export let durum = (() => {
  try { const s = depola.oku(); if (s) return { ...bos(), ...JSON.parse(s) }; } catch { /* bozuk kayıt */ }
  return bos();
})();

export function kaydet() { depola.yaz(JSON.stringify(durum)); }
export function sifirla() { depola.sil(); durum = bos(); return durum; }
export function cevapEkle(id, o) {
  (durum.cevaplar[id] ||= []).push({ ...o, t: Date.now() });
  kaydet();
}
export function konuDisiEkle(id, metin) { durum.konuDisi.push({ id, metin, t: Date.now() }); kaydet(); }
export function disaAktar() {
  const blob = new Blob([JSON.stringify(durum, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'nubuvvet-ilerleme.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
