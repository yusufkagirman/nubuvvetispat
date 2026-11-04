// zaman.js — duraklatılabilir zamanlayıcılar. Kaynak kartı / kaynakça açıkken sahne durur, kapanınca kaldığı yerden sürer.
const aktif = new Set();
let durdu = false;

export function tm(fn, ms) {
  const h = { kalan: Math.max(0, ms), t0: 0, id: null };
  h.baslat = () => { h.t0 = performance.now(); h.id = setTimeout(() => { aktif.delete(h); fn(); }, h.kalan); };
  aktif.add(h);
  if (!durdu) h.baslat();
  return h;
}
export function tmIptal(h) { if (!h) return; clearTimeout(h.id); aktif.delete(h); }
export function duraklat() {
  if (durdu) return; durdu = true;
  const n = performance.now();
  for (const h of aktif) { clearTimeout(h.id); h.kalan = Math.max(0, h.kalan - (n - h.t0)); }
}
export function surdur() {
  if (!durdu) return; durdu = false;
  for (const h of aktif) h.baslat();
}
export const duraklatildi = () => durdu;
