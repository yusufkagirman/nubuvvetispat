// harita.js — ihtimaller ağacı (SVG). Zemin → Haber → Doğru(Mucize→Rum) / Yanlış → Bilerek(Samimiyet) / Bilmeyerek(Fetanet)
const NS = 'http://www.w3.org/2000/svg';
export const DALLAR = {
  Z: { ad: 'Zemin', alt: 'Güvenilir kaynak', x: 180, y: 34, isaret: '✓' },
  H: { ad: 'Haber', alt: 'Peygamberin haberi', x: 180, y: 112, isaret: '✓' },
  M: { ad: 'Doğru söylüyor', alt: 'Mucizeler', x: 60, y: 216, isaret: '✓' },
  S: { ad: 'Bilerek yanlış', alt: 'Samimiyet', x: 180, y: 216, isaret: '✗' },
  F: { ad: 'Bilmeyerek yanlış', alt: 'Fetanet', x: 300, y: 216, isaret: '✗' },
  R: { ad: 'Rum', alt: 'Son delil', x: 60, y: 316, isaret: '✓' },
};
const KENAR = [['Z', 'H'], ['H', 'M'], ['H', 'F'], ['H', 'S'], ['M', 'R']];
// "Yanlış söylüyor" ara düğümü yalnızca görsel; S ve F ona bağlıdır.
const dal = (id) => (id || '')[0];

const e = (ad, a = {}, ...cocuk) => {
  const n = document.createElementNS(NS, ad);
  for (const [k, v] of Object.entries(a)) n.setAttribute(k, v);
  cocuk.forEach((c) => n.append(c));
  return n;
};

/** ozet: {dalId: {toplam, kapali, tamam}}, mevcutDal, git(dalId) */
export function haritaCiz(kap, ozet, mevcutDal, git) {
  kap.replaceChildren();
  const svg = e('svg', { viewBox: '0 0 360 360', role: 'group', 'aria-label': 'İhtimaller ağacı' });
  // kenarlar
  const merkez = (k) => [DALLAR[k].x, DALLAR[k].y];
  svg.append(e('path', { class: 'kenar', d: 'M180 56 V90' }));
  svg.append(e('path', { class: 'kenar', d: 'M180 134 C180 170 60 160 60 194' }));
  svg.append(e('path', { class: 'kenar', d: 'M180 134 V194' }));
  svg.append(e('path', { class: 'kenar', d: 'M180 134 C180 170 300 160 300 194' }));
  svg.append(e('path', { class: 'kenar', d: 'M60 238 V294' }));
  // "Yanlış" etiketi
  svg.append(e('text', { class: 'etiket', x: 262, y: 150, 'text-anchor': 'middle' }, 'Yanlış söylüyor'));
  for (const [k, d] of Object.entries(DALLAR)) {
    const o = ozet[k] || { toplam: 0, kapali: 0, tamam: 0 };
    const bitti = o.toplam > 0 && o.kapali >= o.toplam;
    const sinif = ['dugum', k === mevcutDal ? 'mevcut' : '', bitti ? 'kapali' : '', o.toplam === 0 ? 'bos' : '', bitti && d.isaret === '✗' ? 'carpi' : ''].join(' ');
    const g = e('g', { class: sinif, tabindex: 0, role: 'button', 'aria-label': `${d.ad}: ${d.alt}, ${o.kapali}/${o.toplam}` });
    g.append(e('rect', { x: d.x - 55, y: d.y - 22, width: 110, height: 44, rx: 12 }));
    g.append(e('text', { x: d.x, y: d.y - 3, 'text-anchor': 'middle', class: 'ad' }, d.ad));
    g.append(e('text', { x: d.x, y: d.y + 13, 'text-anchor': 'middle', class: 'alt' }, o.toplam ? `${d.alt} · ${o.kapali}/${o.toplam}` : d.alt));
    if (bitti) g.append(e('text', { x: d.x + 46, y: d.y - 14, class: 'isaret', 'text-anchor': 'middle' }, d.isaret));
    if (k === mevcutDal) g.append(e('circle', { cx: d.x - 46, cy: d.y - 14, r: 5, class: 'nokta' }));
    g.addEventListener('click', () => git(k));
    g.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); git(k); } });
    svg.append(g);
  }
  kap.append(svg);
}
export { dal };
