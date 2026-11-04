// diyagram.js — diyagram kataloğu (icerik/AKIS-SEMA.md). Her çizici {kok, sure, basla(), bitir(), iptal()} döndürür.
// sure: animasyonun tamamlanma süresi (ms). CSS animasyonları `.goster` sınıfıyla başlar; `.hizli` her şeyi son hâline atlatır.
import { durum } from './durum.js';
import { tm, tmIptal } from './zaman.js';
const NS = 'http://www.w3.org/2000/svg';
const h = (tag, cls, metin, ata) => { const e = document.createElement(tag); if (cls) e.className = cls; if (metin != null) e.textContent = metin; if (ata) ata.appendChild(e); return e; };
const s = (tag, a = {}, ata) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (ata) ata.appendChild(e); return e; };
const d = (el, ms) => { el.style.setProperty('--d', `${ms}ms`); return el; };

function temel(kok, sure, ekstra = {}) {
  const zamanlar = [];
  return {
    kok, sure,
    t(fn, ms) { zamanlar.push(tm(fn, ms)); },
    basla() { kok.classList.add('goster'); ekstra.basla?.(this); },
    bitir() { kok.classList.add('goster', 'hizli'); ekstra.bitir?.(this); },
    iptal() { zamanlar.forEach(tmIptal); ekstra.iptal?.(); },
  };
}

// ---- ihtimaller: takımyıldız. Haber en parlak yıldız; kapanan dal söner, çizgisi kopar, bakır halka kalır ----
const YEREL = { kaynakAc: null };
export const diyagramKanca = YEREL;

function ihtimaller(v = {}) {
  const dar = innerWidth < 600;
  const acik = Array.isArray(v.kapali) ? v.kapali : [];
  const kapali = new Set(acik), vurgu = v.vurgu || null;
  if (durum.kapali.includes('samimiyet')) kapali.add('bilerek');
  if (durum.kapali.includes('fetanet')) kapali.add('bilmeyerek');
  if (kapali.has('bilerek') && kapali.has('bilmeyerek')) kapali.add('yalan');
  // sönme anı yaşanacak düğümler: az önce kapanan dal ya da içerikte açıkça verilen kapalı liste
  const yeni = new Set(acik);
  if (durum.yeniKapanan === 'samimiyet') yeni.add('bilerek');
  if (durum.yeniKapanan === 'fetanet') yeni.add('bilmeyerek');
  // düğüm: [x, y, ad, yarıçap, etiket yönü]
  const N = dar
    ? { haber: [200, 46, 'Haber', 9, 'sag'], dogru: [78, 176, 'Doğru', 6.5, 'alt'], yalan: [292, 176, 'Yalan', 6.5, 'sag'], bilerek: [140, 332, 'Bilerek', 6.5, 'alt'], bilmeyerek: [300, 332, 'Bilmeyerek', 6.5, 'alt'] }
    : { haber: [380, 54, 'Haber', 10, 'sag'], dogru: [150, 206, 'Doğru', 7, 'alt'], yalan: [560, 206, 'Yalan', 7, 'sag'], bilerek: [430, 352, 'Bilerek', 7, 'alt'], bilmeyerek: [690, 352, 'Bilmeyerek', 7, 'alt'] };
  const VB = dar ? [400, 400] : [780, 420];
  const E = [['haber', 'dogru'], ['haber', 'yalan'], ['yalan', 'bilerek'], ['yalan', 'bilmeyerek']];
  const yol = { dogru: ['dogru'], yalan: ['yalan'], bilerek: ['yalan', 'bilerek'], bilmeyerek: ['yalan', 'bilmeyerek'] }[vurgu] || [];
  const parlak = new Set(yol);
  const kok = h('div', 'dg-kok dg-ihtimal');
  const svg = s('svg', { viewBox: `0 0 ${VB[0]} ${VB[1]}`, class: 'dg-svg', role: 'img', 'aria-hidden': 'true' }, kok);
  const defs = s('defs', {}, svg);
  const f = s('filter', { id: 'dg-parla', x: '-60%', y: '-60%', width: '220%', height: '220%' }, defs);
  s('feGaussianBlur', { stdDeviation: '4', result: 'b' }, f);
  const mg = s('feMerge', {}, f); s('feMergeNode', { in: 'b' }, mg); s('feMergeNode', { in: 'SourceGraphic' }, mg);
  const grad = (id, rgb) => {
    const g = s('radialGradient', { id }, defs);
    s('stop', { offset: '0', 'stop-color': `rgb(${rgb})`, 'stop-opacity': '.55' }, g); s('stop', { offset: '1', 'stop-color': `rgb(${rgb})`, 'stop-opacity': '0' }, g);
  };
  grad('dg-hale', '186,208,255'); grad('dg-hale-altin', '246,214,140');
  const gecis = { haber: 0, dogru: 1100, yalan: 1100, bilerek: 2300, bilmeyerek: 2300 };
  const OLUM = 2400; // sönme anı gecikmesi (ms)
  E.forEach(([a, b], i) => {
    const [ax, ay, , ar] = N[a], [bx, by, , br] = N[b];
    const dd = `M${ax} ${ay + ar + 4} C${ax} ${ay + 90},${bx} ${by - 90},${bx} ${by - br - 4}`;
    const sinif = ['dg-yol'];
    const olu = kapali.has(b);
    if (olu) sinif.push('kapali'); else if (parlak.has(b)) sinif.push('vurgu'); else if (yol.length) sinif.push('hafif');
    if (olu) {
      // kopan çizgi: üst parça yerinde, alt parça aşağı kayar
      const ust = s('path', { d: dd, class: sinif.join(' ') + ' kirik', pathLength: 1 }, svg);
      ust.style.setProperty('--da', '0.46 1'); d(ust, gecis[b] - 400);
      const alt = s('path', { d: dd, class: sinif.join(' ') + ' kirik alt' + (yeni.has(b) ? ' yeni' : ''), pathLength: 1 }, svg);
      alt.style.setProperty('--da', '0 0.56 0.44 1'); d(alt, gecis[b] - 400);
      if (yeni.has(b)) alt.style.setProperty('--olum', `${OLUM}ms`);
      return;
    }
    const p = s('path', { d: dd, class: sinif.join(' '), pathLength: 1 }, svg);
    d(p, gecis[b] - 600);
    if (sinif.includes('vurgu')) {
      p.setAttribute('filter', 'url(#dg-parla)');
      const c = s('circle', { r: 2.6, class: 'dg-isik' }, svg); d(c, gecis[b] + 400);
      s('animateMotion', { dur: '2.6s', repeatCount: 'indefinite', path: dd, begin: `${(gecis[b] + 400) / 1000}s` }, c);
    }
  });
  for (const id in N) {
    const [x, y, ad, r, yon] = N[id];
    const olu = kapali.has(id), par = parlak.has(id), haf = !olu && !par && (yol.length || vurgu === 'dogru');
    const g = s('g', { class: `dg-dugum dg ${olu ? 'kapali' : par ? 'vurgu' : haf ? 'hafif' : ''} ${olu && yeni.has(id) ? 'yeni' : ''} ${id === 'haber' ? 'ana' : ''}`.replace(/\s+/g, ' ').trim() }, svg);
    d(g, gecis[id]); if (olu && yeni.has(id)) g.style.setProperty('--olum', `${OLUM}ms`);
    const yd = s('g', { class: 'yd' }, g);
    s('circle', { cx: x, cy: y, r: r * 4.2, class: 'hale', fill: `url(#${par ? 'dg-hale-altin' : 'dg-hale'})` }, yd);
    const L = r * 3.4;
    s('line', { x1: x - L, y1: y, x2: x + L, y2: y, class: 'isin' }, yd); s('line', { x1: x, y1: y - L, x2: x, y2: y + L, class: 'isin' }, yd);
    if (par) s('circle', { cx: x, cy: y, r: r + 3, class: 'halka' }, yd);
    s('circle', { cx: x, cy: y, r, class: 'cekirdek' }, yd);
    if (olu) s('circle', { cx: x, cy: y, r: r + 6, class: 'bakir' }, yd);
    const tx = yon === 'sag' ? x + r + 14 : x, ty = yon === 'sag' ? y + 6 : y + r + 32;
    const t = s('text', { x: tx, y: ty, 'text-anchor': yon === 'sag' ? 'start' : 'middle' }, g); t.textContent = ad;
  }
  return temel(kok, 3600, { basla() { if (durum.yeniKapanan) setTimeout(() => { durum.yeniKapanan = null; }, 100); } });
}

// ---- demet: çubuklar tek tek kırılır, demet sağlam kalır ----
function demet(v = {}) {
  const cub = v.cubuklar || [];
  const kok = h('div', 'dg-kok dg-demet');
  const satirlar = h('div', 'cubuklar', null, kok);
  const AR = 1300;
  cub.forEach((m, i) => {
    const r = h('div', 'cb', null, satirlar); r.style.setProperty('--d', `${i * AR}ms`); r.style.setProperty('--k', `${i * AR + 800}ms`);
    h('div', 'et', m, r);
    const sv = s('svg', { viewBox: '0 0 300 24', class: 'cubuk', 'aria-hidden': 'true' }, r);
    s('rect', { x: 0, y: 8, width: 148, height: 8, rx: 3, class: 'yarim sol' }, sv);
    s('rect', { x: 152, y: 8, width: 148, height: 8, rx: 3, class: 'yarim sag' }, sv);
    s('path', { d: 'M150 2 L146 12 L152 12 L148 22', class: 'catlak' }, sv);
  });
  const T = cub.length * AR + 900;
  satirlar.style.setProperty('--T', `${T}ms`);
  const bag = h('div', 'bag', null, kok); bag.style.setProperty('--T', `${T + 500}ms`);
  const n = Math.max(cub.length, 3), sv = s('svg', { viewBox: '0 0 300 120', class: 'demet-svg', 'aria-hidden': 'true' }, bag);
  for (let i = 0; i < n; i++) s('rect', { x: 20, y: 32 + i * (56 / Math.max(1, n - 1)), width: 260, height: 8, rx: 4, class: 'dm-cubuk' }, sv).style.setProperty('--i', i);
  s('rect', { x: 140, y: 24, width: 16, height: 72, rx: 6, class: 'dm-bant' }, sv);
  return temel(kok, T + 500 + 1800);
}

// ---- zaman ----
function zaman(v = {}) {
  const nk = v.noktalar || [];
  const kok = h('div', 'dg-kok dg-zaman');
  h('div', 'hat', null, kok).style.setProperty('--n', nk.length);
  const ol = h('ol', null, null, kok);
  nk.forEach((n, i) => {
    const li = h('li', 'dg', null, ol); d(li, 500 + i * 950);
    h('span', 'nokta', null, li); h('b', null, n.yil, li); h('span', 'etk', n.etiket, li);
  });
  return temel(kok, 500 + nk.length * 950 + 700);
}

// ---- sayaç ----
function sayac(v = {}) {
  const kok = h('div', 'dg-kok dg-sayac');
  const sy = h('div', 'sayi', null, kok);
  if (v.onek) h('span', 'ek', v.onek, sy);
  const n = h('span', 'n', '0', sy);
  if (v.sonek) h('span', 'ek', v.sonek, sy);
  h('div', 'cizgi', null, kok); h('div', 'etiket', v.etiket || '', kok);
  const hedef = Number(v.sayi) || 0, ond = (String(v.sayi).split('.')[1] || '').length;
  const yaz = (x) => { n.textContent = x.toLocaleString('tr-TR', { minimumFractionDigits: ond, maximumFractionDigits: ond }); };
  yaz(0);
  let raf = 0;
  return temel(kok, 2600, {
    basla() {
      const t0 = performance.now(), S = 2300;
      const adim = (now) => { const p = Math.min(1, (now - t0) / S); yaz(hedef * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(adim); };
      raf = requestAnimationFrame(adim);
    },
    bitir() { cancelAnimationFrame(raf); yaz(hedef); },
    iptal() { cancelAnimationFrame(raf); },
  });
}

// ---- karşılaştırma ----
function karsilastirma(v = {}) {
  const kok = h('div', 'dg-kok dg-karsi');
  let t = 0;
  const sut = (veri, cls) => {
    const c = h('div', 'sut ' + cls, null, kok);
    const b = h('h3', 'dg', veri?.baslik || '', c); d(b, t); t += 700;
    const ul = h('ul', null, null, c);
    (veri?.maddeler || []).forEach((m) => { const li = h('li', 'dg', m, ul); d(li, t); t += 650; });
    return c;
  };
  sut(v.sol, 'sol'); h('div', 'ayrac', null, kok); sut(v.sag, 'sag');
  return temel(kok, t + 800);
}

// ---- denklem ----
function denklem(v = {}) {
  const kok = h('div', 'dg-kok dg-denklem');
  const p = v.parcalar || [];
  p.forEach((m, i) => {
    const op = /^[=+\-−–×÷*/≈≠<>]$/.test(String(m).trim());
    const e = h('span', 'parca dg' + (op ? ' op' : ''), m, kok); d(e, i * 900);
  });
  return temel(kok, p.length * 900 + 1200);
}

// ---- alıntı ----
function alinti(v = {}) {
  const kok = h('div', 'dg-kok dg-alinti');
  h('div', 'tirnak', '“', kok);
  const q = h('blockquote', null, null, kok);
  const kel = String(v.metin || '').split(/\s+/).filter(Boolean);
  const adim = Math.min(160, 3600 / Math.max(1, kel.length));
  kel.forEach((w, i) => { const sp = h('span', 'dg', w, q); d(sp, i * adim); q.appendChild(document.createTextNode(' ')); });
  const bitis = kel.length * adim + 600;
  const kay = v.kaynak && !Array.isArray(v.kaynak) ? v.kaynak : null;
  const kim = v.kim || kay?.yazar;
  if (kim) {
    const kap = h('div', 'kimlik-blok dg', null, kok); d(kap, bitis);
    const k = h(kay ? 'button' : 'div', 'kim', kim, kap);
    if (kay) { k.type = 'button'; k.setAttribute('aria-label', `${kim}: kaynak bilgisi`); k.addEventListener('click', () => YEREL.kaynakAc?.(kay, k)); }
    const kimlik = v.kimlik || kay?.kimlik || kay?.not;
    if (kimlik) h('div', 'kimlik', String(kimlik).replace(/^Kimlik:\s*/i, ''), kap);
  }
  return temel(kok, bitis + 1300);
}

// ---- galeri ----
function galeri(v = {}) {
  const g = v.gorseller || [], et = v.etiketler || [], A = 3600;
  const kok = h('div', 'dg-kok dg-galeri');
  const kutu = h('div', 'kutu', null, kok);
  const figs = g.map((src, i) => {
    const f = h('figure', null, null, kutu);
    const im = h('img', null, null, f); im.src = src; im.alt = et[i] || ''; im.decoding = 'async';
    h('figcaption', null, et[i] || '', f);
    return f;
  });
  let cur = -1;
  const goster = (i) => { figs.forEach((f, j) => f.classList.toggle('on', j === i)); cur = i; };
  return temel(kok, figs.length * A + 400, {
    basla(self) { figs.forEach((_, i) => self.t(() => goster(i), i * A)); },
    bitir() { goster(figs.length - 1); },
  });
}

const KATALOG = { ihtimaller, demet, zaman, sayac, karsilastirma, denklem, alinti, galeri };
export function diyagramCiz(dg) {
  const f = KATALOG[dg?.tur];
  if (!f) return null;
  return f(dg.veri || {});
}
export const diyagramGorselleri = (dg) => (dg?.tur === 'galeri' ? dg.veri?.gorseller || [] : []);
