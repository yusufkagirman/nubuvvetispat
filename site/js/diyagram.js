// diyagram.js — diyagram kataloğu (icerik/AKIS-SEMA.md). Her çizici {kok, sure, basla(), bitir(), iptal()} döndürür.
// sure: animasyonun tamamlanma süresi (ms). CSS animasyonları `.goster` sınıfıyla başlar; `.hizli` her şeyi son hâline atlatır.
import { durum } from './durum.js';
const NS = 'http://www.w3.org/2000/svg';
const h = (tag, cls, metin, ata) => { const e = document.createElement(tag); if (cls) e.className = cls; if (metin != null) e.textContent = metin; if (ata) ata.appendChild(e); return e; };
const s = (tag, a = {}, ata) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (ata) ata.appendChild(e); return e; };
const d = (el, ms) => { el.style.setProperty('--d', `${ms}ms`); return el; };

function temel(kok, sure, ekstra = {}) {
  const zamanlar = [];
  return {
    kok, sure,
    t(fn, ms) { zamanlar.push(setTimeout(fn, ms)); },
    basla() { kok.classList.add('goster'); ekstra.basla?.(this); },
    bitir() { kok.classList.add('goster', 'hizli'); ekstra.bitir?.(this); },
    iptal() { zamanlar.forEach(clearTimeout); ekstra.iptal?.(); },
  };
}

// ---- ihtimaller: Haber -> Doğru / Yalan -> Bilerek / Bilmeyerek ----
function ihtimaller(v = {}, ctx) {
  // kapali: verilmemiş/"auto" ise kullanıcının gerçek kapalı dalları; verilmişse onlarla birleşir (samimiyet->bilerek, fetanet->bilmeyerek)
  const kapali = new Set(Array.isArray(v.kapali) ? v.kapali : []), vurgu = v.vurgu || null;
  if (durum.kapali.includes('samimiyet')) kapali.add('bilerek');
  if (durum.kapali.includes('fetanet')) kapali.add('bilmeyerek');
  if (kapali.has('bilerek') && kapali.has('bilmeyerek')) kapali.add('yalan');
  const N = { haber: [345, 44, 'Haber'], dogru: [150, 190, 'Doğru'], yalan: [540, 190, 'Yalan'], bilerek: [410, 350, 'Bilerek'], bilmeyerek: [670, 350, 'Bilmeyerek'] };
  const E = [['haber', 'dogru'], ['haber', 'yalan'], ['yalan', 'bilerek'], ['yalan', 'bilmeyerek']];
  const yol = { dogru: ['dogru'], yalan: ['yalan'], bilerek: ['yalan', 'bilerek'], bilmeyerek: ['yalan', 'bilmeyerek'] }[vurgu] || [];
  const parlak = new Set(yol);
  const kok = h('div', 'dg-kok dg-ihtimal');
  const svg = s('svg', { viewBox: '0 0 760 410', class: 'dg-svg', role: 'img', 'aria-hidden': 'true' }, kok);
  const defs = s('defs', {}, svg);
  const f = s('filter', { id: 'dg-parla', x: '-40%', y: '-80%', width: '180%', height: '260%' }, defs);
  s('feGaussianBlur', { stdDeviation: '5', result: 'b' }, f);
  const mg = s('feMerge', {}, f); s('feMergeNode', { in: 'b' }, mg); s('feMergeNode', { in: 'SourceGraphic' }, mg);
  const gecis = { haber: 0, dogru: 1100, yalan: 1100, bilerek: 2300, bilmeyerek: 2300 };
  E.forEach(([a, b], i) => {
    const [ax, ay] = N[a], [bx, by] = N[b];
    const dd = `M${ax} ${ay + 22} C${ax} ${ay + 85},${bx} ${by - 85},${bx} ${by - 22}`;
    const sinif = ['dg-yol'];
    if (kapali.has(b)) sinif.push('kapali'); else if (parlak.has(b)) sinif.push('vurgu'); else if (yol.length) sinif.push('hafif');
    const p = s('path', { d: dd, class: sinif.join(' '), pathLength: 1 }, svg);
    d(p, gecis[b] - 600);
    if (sinif.includes('vurgu')) {
      p.setAttribute('filter', 'url(#dg-parla)');
      const c = s('circle', { r: 3.2, class: 'dg-isik' }, svg); d(c, gecis[b] + 400);
      const am = s('animateMotion', { dur: '2.6s', repeatCount: 'indefinite', path: dd, begin: `${(gecis[b] + 400) / 1000}s` }, c);
      void am;
    }
  });
  for (const id in N) {
    const [x, y, ad] = N[id];
    const g = s('g', { class: 'dg-dugum dg ' + (kapali.has(id) ? 'kapali' : parlak.has(id) ? 'vurgu' : yol.length || vurgu === 'dogru' ? 'hafif' : '') }, svg);
    d(g, gecis[id]);
    const w = id === 'bilmeyerek' ? 150 : 130;
    s('rect', { x: x - w / 2, y: y - 22, width: w, height: 44, rx: 22 }, g);
    const t = s('text', { x, y: y + 6.5, 'text-anchor': 'middle' }, g); t.textContent = ad;
  }
  return temel(kok, 3400);
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
  if (v.kim) { const k = h('div', 'kim dg', '— ' + v.kim, kok); d(k, bitis); }
  return temel(kok, bitis + 1100);
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
