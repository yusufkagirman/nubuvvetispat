// panel.js — Sunum kontrol paneli. Veri: ../akis-veri.js (window.AKIS_VERI). Sınıflandırıcı: ../js/niyet.js (motorla aynı).
import { siniflandir, normalize } from '../js/niyet.js';

const $ = (id) => document.getElementById(id);
const h = (tag, cls, metin, ata) => { const e = document.createElement(tag); if (cls) e.className = cls; if (metin != null) e.textContent = metin; if (ata) ata.appendChild(e); return e; };
const SVGNS = 'http://www.w3.org/2000/svg';
const sv = (tag, attrs = {}, ata) => { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (ata) ata.appendChild(e); return e; };
const DIZI = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);

const BOLGELER = ['acilis', 'zemin', 'haber', 'samimiyet', 'fetanet', 'mucize', 'kapanis'];
const BOLGE_AD = { acilis: 'Açılış', zemin: 'Zemin', haber: 'Haber', samimiyet: 'Samimiyet', fetanet: 'Fetanet', mucize: 'Mucize', kapanis: 'Kapanış' };
const RENK = { acilis: '#8fa3c9', zemin: '#d9a95f', haber: '#6cc0e5', samimiyet: '#e07a9a', fetanet: '#b08be8', mucize: '#5fd39a', kapanis: '#c9c9c9' };
const TUR_RENK = { ikna: '#5fd39a', itiraz: '#f0b45a', yonlendir: '#6cc0e5', profil: '#b08be8', ret: '#ff6b6b' };

// ---------- veri ----------
const veri = window.AKIS_VERI;
const beats = new Map();
const bolgeOf = (id) => { const b = id.split('.')[0]; return BOLGELER.includes(b) ? b : 'kapanis'; };
const siralama = [];
if (veri?.bolgeler) for (const b of veri.bolgeler) for (const x of b.beats || []) { beats.set(x.id, x); siralama.push(x.id); }
const kisa = (id) => id.split('.').slice(1).join('.') || id;

// ---------- notlar ----------
const NOT_ANAHTAR = 'nubuvvet.panel.notlar';
let notlar = {};
try { notlar = JSON.parse(localStorage.getItem(NOT_ANAHTAR) || '{}') || {}; } catch { notlar = {}; }
const notKaydet = () => { try { localStorage.setItem(NOT_ANAHTAR, JSON.stringify(notlar)); } catch { /* */ } notSayGuncelle(); };
const notSayGuncelle = () => { $('not-say').textContent = Object.values(notlar).filter((v) => v.trim()).length; };

// ---------- kenarlar ----------
const kenarlar = []; // {s,t,tip:'sonraki'|'yol'|'dallan'|'varsayilan', tur?, etiket}
function kenarlariKur() {
  const harita = new Map();
  const ekle = (s, t, tip, tur, et) => {
    if (!t) return;
    const k = `${s}|${t}|${tip}|${tur || ''}`;
    if (harita.has(k)) { const e = harita.get(k); if (et) e.etiketler.push(et); return; }
    const e = { s, t, tip, tur, etiketler: et ? [et] : [] };
    harita.set(k, e); kenarlar.push(e);
  };
  for (const [id, b] of beats) {
    ekle(id, b.sonraki, 'sonraki');
    ekle(id, b.varsayilan, 'varsayilan');
    (b.dallan || []).forEach((d) => ekle(id, d.git, 'dallan', null, kosulYaz(d.kosul)));
    (b.yollar || []).forEach((y) => ekle(id, y.git, 'yol', y.tur, `${y.tur}: ${DIZI(y.anahtar).slice(0, 2).join(' / ')}`));
  }
  kenarlar.forEach((e) => { e.etiket = e.etiketler.slice(0, 2).join(' | ') + (e.etiketler.length > 2 ? ' …' : ''); });
}
const kosulYaz = (k) => Object.entries(k || {}).map(([a, v]) => `${a}=${DIZI(v).join('|')}`).join(' & ');

// ---------- yerleşim ----------
const NW = 220, IH = 131, NH = IH + 22, GAPX = 300, VG = 26, X0 = 40, Y0 = 56;
const poz = new Map();
function yerlesimKur() {
  const sayac = {};
  for (const id of siralama) {
    const b = bolgeOf(id), c = BOLGELER.indexOf(b);
    const r = (sayac[b] = (sayac[b] ?? -1) + 1);
    poz.set(id, { x: X0 + c * GAPX, y: Y0 + r * (NH + VG), c, r });
  }
}
function kenarYolu(sid, tid) {
  const a = poz.get(sid), b = poz.get(tid);
  if (!a || !b) return null;
  const ay = a.y + NH / 2, by = b.y + NH / 2;
  if (a.c === b.c) {
    if (b.r === a.r + 1) return `M${a.x + NW / 2},${a.y + NH} L${b.x + NW / 2},${b.y}`;
    const dx = 28 + Math.min(70, Math.abs(b.r - a.r) * 5);
    return `M${a.x + NW},${ay} C${a.x + NW + dx},${ay} ${b.x + NW + dx},${by} ${b.x + NW},${by}`;
  }
  if (b.c > a.c) { const sx = a.x + NW, ex = b.x, d = Math.max(40, (ex - sx) / 2); return `M${sx},${ay} C${sx + d},${ay} ${ex - d},${by} ${ex},${by}`; }
  const sx = a.x, ex = b.x + NW, d = Math.max(40, (sx - ex) / 2);
  return `M${sx},${ay} C${sx - d},${ay} ${ex + d},${by} ${ex},${by}`;
}

// ---------- durum ----------
const S = {
  sec: null, bolgeAcik: new Set(BOLGELER), dog: false, ek: false, notlu: false, ara: '',
  kenar: { sonraki: true, yol: true, dallan: true, varsayilan: true },
  persona: '', personaYol: [],
  profil: { tanri: '', din: '', kaynakGuveni: '', bilgi: '', supheTuru: '', iddia: '' }, kapali: [],
};

// ---------- SVG çizim ----------
let svg, gKenar, gDugum, gPersona, gEt;
const vb = { x: 0, y: 0, w: 1600, h: 1000 };
const dugumEl = new Map(), kenarEl = [];
function sekliKur() {
  svg = $('svg'); svg.replaceChildren();
  const defs = sv('defs', {}, svg);
  const g = sv('g', {}, svg);
  BOLGELER.forEach((b, i) => { const t = sv('text', { x: X0 + i * GAPX, y: 34, class: 'bolge-bas' }, g); t.textContent = BOLGE_AD[b]; t.style.fill = RENK[b]; });
  gKenar = sv('g', {}, g); gPersona = sv('g', {}, g); gDugum = sv('g', {}, g); gEt = sv('g', {}, g);
  for (const e of kenarlar) {
    const d = kenarYolu(e.s, e.t); if (!d) continue;
    const renk = e.tip === 'yol' ? (TUR_RENK[e.tur] || '#888') : e.tip === 'dallan' ? '#ff9f43' : e.tip === 'varsayilan' ? '#9aa3bd' : '#5b6684';
    const p = sv('path', { d, class: 'kenar', stroke: renk }, gKenar);
    if (e.tip === 'dallan') p.setAttribute('stroke-dasharray', '6 4');
    if (e.tip === 'varsayilan') p.setAttribute('stroke-dasharray', '2 4');
    kenarEl.push({ e, p });
  }
  for (const id of siralama) {
    const b = beats.get(id), p = poz.get(id), r = bolgeOf(id);
    const n = sv('g', { class: 'dugum', transform: `translate(${p.x},${p.y})`, tabindex: 0, 'data-id': id, role: 'button', 'aria-label': id }, gDugum);
    n.style.setProperty('--c', RENK[r]);
    sv('rect', { width: NW, height: NH }, n);
    const im = sv('image', { x: 1, y: 1, width: NW - 2, height: IH, preserveAspectRatio: 'xMidYMid slice', class: 'kucuk' }, n);
    im.setAttribute('href', `panel/ekran/${id}.jpg`);
    const t = sv('text', { x: 8, y: IH + 15 }, n); t.textContent = kisa(id).slice(0, 30);
    const t2 = sv('text', { x: NW - 8, y: IH + 15, class: 'alt', 'text-anchor': 'end' }, n); t2.textContent = (b.gizliDugum ? b.gizliDugum + ' · ' : '') + `${(b.satirlar || []).length} satır` + (b.soru ? ' · ?' : '');
    if (beatDogrulanacak(b)) sv('circle', { cx: NW - 8, cy: 8, r: 3.5, class: 'dog' }, n);
    if (beatEk(b)) sv('circle', { cx: NW - 19, cy: 8, r: 3.5, class: 'ek' }, n);
    if ((notlar[id] || '').trim()) sv('circle', { cx: NW - 30, cy: 8, r: 3.5, class: 'nt' }, n);
    n.addEventListener('click', (ev) => { ev.stopPropagation(); sec(id); });
    n.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); sec(id); } });
    dugumEl.set(id, n);
  }
  uygulaVB();
}
function uygulaVB() { svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`); }
function sigdir() {
  let maxR = 0; Object.values(BOLGELER).forEach(() => {}); for (const p of poz.values()) maxR = Math.max(maxR, p.y + NH);
  const W = X0 * 2 + (BOLGELER.length - 1) * GAPX + NW + 100, H = maxR + 40;
  const r = svg.getBoundingClientRect(); const oran = (r.width || 800) / (r.height || 600);
  vb.w = Math.max(W, H * oran); vb.h = vb.w / oran; vb.x = -20; vb.y = 0; uygulaVB();
}
function zoom(f, cx, cy) {
  const r = svg.getBoundingClientRect();
  const px = cx == null ? 0.5 : (cx - r.left) / r.width, py = cy == null ? 0.5 : (cy - r.top) / r.height;
  const nw = Math.min(6000, Math.max(200, vb.w / f)), nh = nw * (vb.h / vb.w);
  vb.x += (vb.w - nw) * px; vb.y += (vb.h - nh) * py; vb.w = nw; vb.h = nh; uygulaVB();
}
function panZoomBagla() {
  const ptr = new Map(); let son = 0, surukleme = false;
  svg.addEventListener('wheel', (e) => { e.preventDefault(); zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); }, { passive: false });
  svg.addEventListener('pointerdown', (e) => { ptr.set(e.pointerId, { x: e.clientX, y: e.clientY }); surukleme = false; if (ptr.size === 2) { const [a, b] = [...ptr.values()]; son = Math.hypot(a.x - b.x, a.y - b.y); } });
  svg.addEventListener('pointermove', (e) => {
    if (!ptr.has(e.pointerId)) return;
    const o = ptr.get(e.pointerId), r = svg.getBoundingClientRect();
    if (ptr.size === 1) {
      const dx = e.clientX - o.x, dy = e.clientY - o.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) surukleme = true;
      vb.x -= dx * vb.w / r.width; vb.y -= dy * vb.h / r.height; uygulaVB();
    }
    ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptr.size === 2) { const [a, b] = [...ptr.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (son) zoom(d / son, (a.x + b.x) / 2, (a.y + b.y) / 2); son = d; }
  });
  const bitir = (e) => { ptr.delete(e.pointerId); son = 0; };
  svg.addEventListener('pointerup', bitir); svg.addEventListener('pointercancel', bitir); svg.addEventListener('pointerleave', bitir);
  svg.addEventListener('click', () => { if (!surukleme) { /* boşa tıklama: seçimi koru */ } });
  $('z-art').onclick = () => zoom(1.3); $('z-eks').onclick = () => zoom(1 / 1.3); $('z-sig').onclick = sigdir;
}
function merkezle(id) {
  const p = poz.get(id); if (!p) return;
  vb.x = p.x + NW / 2 - vb.w / 2; vb.y = p.y + NH / 2 - vb.h / 2; uygulaVB();
}

// ---------- süzgeç ----------
const beatDogrulanacak = (b) => JSON.stringify(b).includes('"dogrulanacak":true');
const beatEk = (b) => b.ek === true || (b.yollar || []).some((y) => y.ek) || (b.ekOrnekler || []).some((e) => e.ek);
function metinHavuzu(id) {
  const b = beats.get(id); const p = [id, b.gizliDugum, b.dayanak, b.kompozisyon, notlar[id], b.soru?.metin, ...(b.soru?.cipler || []), ...DIZI(b.kopru)];
  (b.satirlar || []).forEach((s) => p.push(s.metin, s.kaynak && Object.values(s.kaynak).join(' ')));
  (b.yollar || []).forEach((y) => p.push(...DIZI(y.anahtar), ...DIZI(y.yanit)));
  (b.ekOrnekler || []).forEach((e) => { (e.satirlar || []).forEach((s) => p.push(s.metin)); p.push(typeof e.soru === 'string' ? e.soru : e.soru?.metin); });
  return normalize(p.filter(Boolean).join(' \n '));
}
const havuzOnbellek = new Map();
function eslesir(id) {
  const b = beats.get(id);
  if (!S.bolgeAcik.has(bolgeOf(id))) return false;
  if (S.dog && !beatDogrulanacak(b)) return false;
  if (S.ek && !beatEk(b)) return false;
  if (S.notlu && !(notlar[id] || '').trim()) return false;
  if (S.ara.trim()) {
    const q = normalize(S.ara); if (!q) return true;
    if (!havuzOnbellek.has(id) || notlar[id] !== undefined) havuzOnbellek.set(id, metinHavuzu(id));
    return havuzOnbellek.get(id).includes(q);
  }
  return true;
}
const sureAktif = () => S.dog || S.ek || S.notlu || S.ara.trim() || S.bolgeAcik.size < BOLGELER.length;
function gorunumuYenile() {
  const aktif = sureAktif(); let say = 0;
  const personaSet = new Set(S.personaYol.map((x) => x.id));
  for (const [id, n] of dugumEl) {
    const e = eslesir(id); if (e) say++;
    n.classList.toggle('sol', aktif && !e);
    n.classList.toggle('bul', aktif && e);
    n.classList.toggle('sec', id === S.sec);
    if (S.persona) n.classList.toggle('sol', !personaSet.has(id) && !(id === S.sec));
  }
  $('sayac').textContent = aktif ? `${say}/${beats.size} kare` : `${beats.size} kare`;
  for (const { e, p } of kenarEl) {
    const goster = S.kenar[e.tip];
    p.style.display = goster ? '' : 'none';
    p.classList.toggle('cik', e.s === S.sec);
    p.classList.toggle('gel', e.t === S.sec && e.s !== S.sec);
  }
  gEt.replaceChildren();
  if (S.sec) {
    kenarEl.filter(({ e }) => S.kenar[e.tip] && (e.s === S.sec) && e.etiket).forEach(({ e }) => {
      const a = poz.get(e.s), b = poz.get(e.t); if (!a || !b) return;
      const t = sv('text', { x: (a.x + b.x + NW) / 2 + (a.c === b.c ? 50 : 0), y: (a.y + b.y) / 2 + NH / 2 - 3, class: 'kenar-et', 'text-anchor': 'middle' }, gEt);
      t.textContent = e.etiket.slice(0, 48);
    });
  }
  gPersona.replaceChildren();
  S.personaYol.forEach((x, i) => {
    const prev = S.personaYol[i - 1];
    if (prev && prev.id !== x.id) { const d = kenarYolu(prev.id, x.id); if (d) sv('path', { d, class: 'kenar persona' }, gPersona); }
  });
  gEt.querySelectorAll?.('.pn-no').forEach((n) => n.remove());
  const sirada = new Map();
  S.personaYol.forEach((x, i) => { if (!sirada.has(x.id)) sirada.set(x.id, i + 1); });
  for (const [id, no] of sirada) {
    const p = poz.get(id); const g = sv('g', { class: 'pn-no', transform: `translate(${p.x - 2},${p.y + 2})` }, gEt);
    sv('circle', { r: 8 }, g); sv('text', { y: 3 }, g).textContent = no;
  }
}

// ---------- seçim & detay ----------
function sec(id, merk) {
  if (!beats.has(id)) return;
  S.sec = id; gorunumuYenile(); if (merk) merkezle(id);
  detayCiz();
  if (matchMedia('(max-width:860px)').matches) $('detay').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
const lnk = (id, ata) => { const b = h('button', 'lnk' + (beats.has(id) ? '' : ' yok'), id + (beats.has(id) ? '' : ' (yok)'), ata); b.type = 'button'; if (beats.has(id)) b.onclick = () => sec(id, true); return b; };
const kunye = (k) => {
  if (!k) return null;
  const p = [k.yazar, k.eser && `“${k.eser}”`, [k.yer, k.yil].filter(Boolean).join(' '), k.sayfa && `s. ${k.sayfa}`, k.kurum, k.not].filter(Boolean);
  return p.join(' · ');
};
function satirCiz(s, ata) {
  const d = h('div', 'ln' + (s.vurgu ? ' vurgu' : ''), null, ata);
  if (s.metin) h('div', '', s.metin, d);
  if (s.kaynak) { const k = h('div', 'kaynak', '📖 ' + (kunye(s.kaynak) || ''), d); if (s.kaynak.dogrulanacak) h('span', 'rb k', 'doğrulanacak', k); }
  if (s.gorsel) { h('div', 'meta', '🖼 ' + s.gorsel, d); const i = h('img', '', null, d); i.src = s.gorsel; i.loading = 'lazy'; i.alt = ''; i.onerror = () => i.remove(); }
  if (s.diyagram) { h('div', 'meta', '◇ diyagram: ' + s.diyagram.tur, d); h('pre', '', JSON.stringify(s.diyagram.veri, null, 1).slice(0, 700), d); }
  if (s.ek) h('span', 'rb e', 'ek', d);
  if (s.dogrulanacak) h('span', 'rb k', 'doğrulanacak', d);
}
function detayCiz() {
  const kök = $('detay'); kök.replaceChildren();
  const id = S.sec, b = beats.get(id); if (!b) return;
  const r = bolgeOf(id);
  const bas = h('h2', '', null, kök); const s1 = h('span', 'id', id, bas); s1.style.color = RENK[r];
  const rb = h('div', '', null, kök);
  h('span', 'rb', BOLGE_AD[r], rb);
  if (b.gizliDugum) h('span', 'rb', 'düğüm ' + b.gizliDugum, rb);
  if (beatEk(b)) h('span', 'rb e', 'ek (kitap dışı)', rb);
  if (beatDogrulanacak(b)) h('span', 'rb k', 'doğrulanacak', rb);
  if (b.kapat) h('span', 'rb g', 'ikna olursa kapatır: ' + b.kapat, rb);
  const bar = h('div', 'satirbtn', null, kök);
  const ac = h('button', '', 'Sunumda bu kareyi aç ▶', bar); ac.onclick = () => onizlemeAc(id);
  const ln = h('a', 'lnk', 'sunum.html?git=' + id, bar); ln.href = (location.pathname.endsWith('panel.html') ? 'index.html' : 'sunum.html') + '?git=' + encodeURIComponent(id); ln.target = '_blank'; ln.title = 'Yeni sekme (index.html ?git desteklemiyorsa baştan açılır)'; ln.style.alignSelf = 'center';

  // not
  h('h3', '', 'Notun (localStorage)', kök);
  const ta = h('textarea', '', null, kök); ta.value = notlar[id] || ''; ta.placeholder = 'Bu kare hakkında geri bildirim / düzeltme isteği…';
  ta.oninput = () => { notlar[id] = ta.value; if (!ta.value.trim()) delete notlar[id]; notKaydet(); havuzOnbellek.delete(id); notIsareti(id); };

  // ekran görüntüsü
  h('h3', '', 'Ekran görüntüsü', kök);
  const im = h('img', 'ekran-img', null, kök); im.src = `panel/ekran/${id}.jpg`; im.loading = 'lazy'; im.alt = id + ' ekran görüntüsü';
  im.onerror = () => { im.replaceWith(h('p', 'bos', 'Ekran görüntüsü yok — scripts/panel-ekran.sh çalıştır.')); };

  // sahne
  if (b.sahne) { h('h3', '', 'Sahne', kök); h('div', 'anh', Object.entries(b.sahne).filter(([, v]) => v).map(([k, v]) => `${k}: ${typeof v === 'object' ? v.tur : v}`).join(' · '), kök); }

  // dallan
  if (b.dallan?.length) {
    h('h3', '', 'Dallan (girişte, ilk uyan)', kök);
    b.dallan.forEach((d) => { const y = h('div', 'yol', null, kök); h('span', 'rb e', kosulYaz(d.kosul), y); h('span', '', ' → ', y); lnk(d.git, y); });
  }
  // satırlar
  h('h3', '', `Satırlar (${(b.satirlar || []).length})`, kök);
  (b.satirlar || []).forEach((s) => satirCiz(s, kök));
  // soru
  if (b.soru) {
    h('h3', '', 'Soru', kök);
    h('div', 'ln vurgu', typeof b.soru === 'string' ? b.soru : b.soru.metin, kök);
    const cd = h('div', '', null, kök); (b.soru.cipler || []).forEach((c) => h('span', 'rb', c, cd));
    if (b.soru.serbest) h('span', 'rb g', 'serbest', cd);
  }
  // yollar
  if (b.yollar?.length) {
    h('h3', '', `Yollar (${b.yollar.length})`, kök);
    b.yollar.forEach((y) => {
      const d = h('div', 'yol', null, kök);
      h('span', 'tur t-' + y.tur, y.tur, d);
      if (y.git) { h('span', '', '→ ', d); lnk(y.git, d); } else if (y.tur !== 'itiraz' && y.tur !== 'ret') h('span', 'anh', '→ varsayılan/sonraki', d);
      if (y.ek) h('span', 'rb e', 'ek', d);
      if (y.dogrulanacak) h('span', 'rb k', 'doğrulanacak', d);
      h('div', 'anh', 'anahtar: ' + DIZI(y.anahtar).join(', '), d);
      if (y.profil) h('div', 'anh', 'profil ← ' + JSON.stringify(y.profil), d);
      if (y.yanit) DIZI(y.yanit).forEach((t) => h('div', 'ln', t, d));
    });
  }
  const sonraki = h('div', 'yol', null, kök); h('b', '', 'sonraki: ', sonraki); if (b.sonraki) lnk(b.sonraki, sonraki); else h('span', 'anh', '—', sonraki);
  if (b.varsayilan) { h('b', '', '  varsayılan: ', sonraki); lnk(b.varsayilan, sonraki); }
  // ekOrnekler
  if (b.ekOrnekler?.length) {
    h('h3', '', `Ek örnekler (${b.ekOrnekler.length})`, kök);
    b.ekOrnekler.forEach((e, i) => {
      const d = h('div', 'yol', null, kök); h('b', '', `#${i + 1}`, d); if (e.ek) h('span', 'rb e', 'ek', d);
      (e.satirlar || []).forEach((s) => satirCiz(s, d));
      h('div', 'ln vurgu', 'Soru: ' + (typeof e.soru === 'string' ? e.soru : e.soru?.metin || ''), d);
    });
  }
  if (b.kompozisyon) { h('h3', '', 'Kompozisyon', kök); h('div', 'ln vurgu', b.kompozisyon, kök); }
  if (b.kopru) { h('h3', '', 'Köprü (kaçamak)', kök); DIZI(b.kopru).forEach((t) => h('div', 'ln', t, kök)); }
  if (b.dayanak) { h('h3', '', 'Dayanak (editör notu — ekranda görünmez)', kök); h('div', 'dayanak', b.dayanak, kök); }

  simulatorCiz(kök, b);
}
function notIsareti(id) {
  const n = dugumEl.get(id); if (!n) return;
  n.querySelector('.nt')?.remove();
  if ((notlar[id] || '').trim()) sv('circle', { cx: NW - 30, cy: 8, r: 3.5, class: 'nt' }, n);
}

// ---------- dallan çözümü (motor + durum.kosulSaglanir ile aynı anlam) ----------
function kosulOk(k, P, K) {
  const ks = Object.keys(k || {}); if (!ks.length) return false;
  return ks.every((a) => {
    const v = k[a];
    if (a === 'kapali') return DIZI(v).every((d) => K.includes(d));
    if (a === 'acik') return DIZI(v).some((d) => !K.includes(d));
    const g = a.startsWith('profil.') ? P[a.slice(7)] : undefined;
    return Array.isArray(v) ? v.includes(g) : g === v;
  });
}
function dallanCoz(id, P, K) {
  const zincir = [id]; let say = 0;
  while (say++ < 20) {
    const b = beats.get(zincir[zincir.length - 1]); if (!b) break;
    const d = (b.dallan || []).find((x) => kosulOk(x.kosul, P, K) && x.git !== zincir[zincir.length - 1]);
    if (!d) break; zincir.push(d.git);
  }
  return zincir;
}

// ---------- simülatör ----------
const PROFIL_SEC = { tanri: ['evet', 'hayir', 'emin-degil'], din: ['yok', 'hristiyan', 'yahudi', 'diger', 'musluman-degil'], kaynakGuveni: ['yuksek', 'orta', 'dusuk'], bilgi: ['az', 'orta', 'cok'],
  supheTuru: ['kuran-degisti', 'kaynak-guvensiz', 'uydurdu', 'hasta-yanildi', 'ogrendi', 'mucize-yok', 'genel'], iddia: ['sahtekar', 'deli', 'dogru', 'kararsiz'] };
async function cevapSimule(beat, metin) {
  const c = await siniflandir({ cevap: metin, beat, soru: beat.soru });
  const sonrakiId = beat.sonraki || beat.varsayilan || null;
  const o = { c, satirlar: [], hedef: null, notlar: [], profilYaz: null };
  switch (c.tur) {
    case 'ara': o.ozet = 'Ara ver: ilerleme kaydedilir, veda satırı.'; break;
    case 'kacamak': o.ozet = 'Kaçamak: köprü satırı + aynı soru tekrarlanır (3. kaçamakta sonraki’ye geçilir).'; o.hedef = null; o.notlar.push(`3. kaçamakta → ${sonrakiId || 'mucize.giris'}`); break;
    case 'konu_disi': o.ozet = 'Konu dışı soru: not edilir, köprü + aynı soru.'; break;
    case 'ret': {
      o.ozet = 'Ret / ikna değil: sıradaki ek örnek (yeni sahne + yeni soru).';
      o.satirlar = (beat.ekOrnekler?.[0]?.satirlar || []).map((s) => s.metin); o.notlar.push(`${(beat.ekOrnekler || []).length} ek örnek var; tükenince kompozisyon → ${sonrakiId || '—'}`); break;
    }
    case 'onay': o.ozet = 'Genel onay (ikna gibi).'; o.hedef = beat.sonraki || null; if (beat.kapat) o.notlar.push(`dal kapanır: ${beat.kapat}`); break;
    case 'serbest': o.ozet = 'Serbest cevap: profil.' + beat.id + ' olarak kaydedilir.'; o.hedef = beat.varsayilan || beat.sonraki || null; break;
    case 'yol': {
      const y = c.yol; o.yol = y; o.ozet = `Yol eşleşti: ${y.tur} (anahtar: ${DIZI(y.anahtar).join(', ')})`;
      if (y.profil) o.profilYaz = y.profil;
      if (y.tur === 'itiraz') { o.satirlar = DIZI(y.yanit); o.notlar.push('Yanıt gösterilir, ilzam sorusu tekrar sorulur.'); }
      else if (y.tur === 'profil') o.hedef = y.git || beat.varsayilan || beat.sonraki || null;
      else { o.hedef = y.git || beat.sonraki || beat.varsayilan || null; if (y.tur === 'ikna' && beat.kapat) o.notlar.push(`dal kapanır: ${beat.kapat}`); }
      break;
    }
    default: o.ozet = c.tur;
  }
  return o;
}
function simulatorCiz(kök, b) {
  h('h3', '', 'Simülatör — “Bu cevabı yazsam ne olur?”', kök);
  const ta = h('textarea', '', null, kök); ta.placeholder = 'Kullanıcının cevabını yaz… (örn. “ikna olmadım”, “bence uydurmuş”)';
  const cipler = h('div', 'satirbtn', null, kök);
  const sonuc = h('div', '', null, kök);
  const calistir = async (metin) => {
    ta.value = metin; sonuc.replaceChildren();
    const o = await cevapSimule(b, metin);
    const d = h('div', 'sonuc', null, sonuc);
    h('div', '', null, d).innerHTML = '';
    const t = h('div', '', null, d); h('b', '', 'Niyet: ', t); t.append(o.c.tur);
    h('div', '', o.ozet, d);
    if (o.yol) h('span', 'tur t-' + o.yol.tur, o.yol.tur, d);
    if (o.profilYaz) { const merged = { ...S.profil, ...o.profilYaz }; h('div', 'anh', 'profil ← ' + JSON.stringify(o.profilYaz), d); S.profil = merged; profilKontrolYenile(); }
    o.satirlar.forEach((x) => h('div', 'ln', x, d));
    o.notlar.forEach((x) => h('div', 'anh', '• ' + x, d));
    if (o.hedef) {
      const z = dallanCoz(o.hedef, S.profil, S.kapali);
      const g = h('div', '', null, d); h('b', '', 'Gideceği beat: ', g); lnk(o.hedef, g);
      if (z.length > 1) { h('div', 'anh', 'Girişte dallan (şu profille) → ', d); z.slice(1).forEach((x, i) => { lnk(x, d); if (i < z.length - 2) h('span', 'anh', ' → ', d); }); }
    }
  };
  const bt = h('button', '', 'Sınıflandır', cipler); bt.onclick = () => ta.value.trim() && calistir(ta.value);
  ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) bt.click(); });
  (b.soru?.cipler || []).forEach((c) => { const x = h('button', '', 'çip: ' + c, cipler); x.onclick = () => calistir(c); });
  // tüm çipler özeti
  if (b.soru?.cipler?.length) {
    const det = h('details', '', null, kök); h('summary', '', 'Çipler nereye düşer?', det);
    const tb = h('table', '', null, det);
    (async () => { for (const c of b.soru.cipler) { const o = await cevapSimule(b, c); const tr = h('tr', '', null, tb); h('td', '', c, tr); h('td', '', o.c.tur + (o.yol ? '/' + o.yol.tur : ''), tr); const td = h('td', '', null, tr); if (o.hedef) lnk(o.hedef, td); else td.textContent = '—'; } })();
  }
  // profil
  h('h3', '', 'Profil ile dallan', kök);
  const pk = h('div', 'prof', null, kök); pk.id = 'prof-kutu';
  profilKontrolYap(pk);
  const sonuc2 = h('div', '', null, kök); sonuc2.id = 'dallan-sonuc';
  dallanSonucYenile();
  const det = h('details', '', null, kök); h('summary', '', 'Bu profille tüm dallanlı kareler', det);
  const tb = h('table', '', null, det); tb.id = 'dallan-tablo';
  dallanTabloYenile();
}
function profilKontrolYap(pk) {
  pk.replaceChildren();
  Object.entries(PROFIL_SEC).forEach(([k, vals]) => {
    const l = h('label', '', k, pk); const s = h('select', '', null, l); s.dataset.k = k;
    ['', ...vals].forEach((v) => { const o = h('option', '', v || '—', s); o.value = v; });
    s.value = S.profil[k] || '';
    s.onchange = () => { S.profil[k] = s.value; dallanSonucYenile(); dallanTabloYenile(); };
  });
  const l = h('label', '', 'kapalı dallar', pk); const w = h('div', '', null, l);
  ['samimiyet', 'fetanet', 'zemin'].forEach((d) => { const cb = h('label', 'cb', null, w); const i = h('input', '', null, cb); i.type = 'checkbox'; i.checked = S.kapali.includes(d); i.onchange = () => { S.kapali = i.checked ? [...S.kapali, d] : S.kapali.filter((x) => x !== d); dallanSonucYenile(); dallanTabloYenile(); }; cb.append(d); });
}
function profilKontrolYenile() { const pk = $('prof-kutu'); if (pk) profilKontrolYap(pk); dallanSonucYenile(); dallanTabloYenile(); }
function dallanSonucYenile() {
  const k = $('dallan-sonuc'); if (!k || !S.sec) return; k.replaceChildren();
  const z = dallanCoz(S.sec, S.profil, S.kapali);
  const d = h('div', 'sonuc', null, k);
  if (z.length === 1) h('div', '', 'Bu profille “' + S.sec + '” girişinde dallanma YOK; kare olduğu gibi oynar.', d);
  else { h('b', '', 'Girişte yönlenir: ', d); z.forEach((x, i) => { if (i) h('span', 'anh', ' → ', d); lnk(x, d); }); }
}
function dallanTabloYenile() {
  const tb = $('dallan-tablo'); if (!tb) return; tb.replaceChildren();
  for (const [id, b] of beats) {
    if (!b.dallan?.length) continue;
    const z = dallanCoz(id, S.profil, S.kapali); const tr = h('tr', '', null, tb);
    const td = h('td', '', null, tr); lnk(id, td);
    const t2 = h('td', '', z.length > 1 ? '→ ' : 'dallanmaz', tr); if (z.length > 1) lnk(z[z.length - 1], t2);
  }
}

// ---------- personalar ----------
// Her persona: serbest metin kuralları (beat id regex → cevap). Gerisi: o beat'in ilk "ikna" anahtarı / ilk çip.
const PERSONALAR = [
  { id: 'ateist', ad: '1 · Ateist, “sonradan yazılmış”, kaynağa güvenmez', kural: [[/^acilis\.tanri/, 'hayır'], [/^acilis\.din/, 'hiçbiri'], [/^acilis\.bilgi/, 'pek bilmiyorum'], [/^acilis\.kaynak/, 'pek güvenmem'], [/^acilis\.sorun/, 'metin sonradan yazılmış olabilir'], [/^haber\.dorduncu/, 'hayır, yok'], [/^haber\.(ihtimaller|belirsiz)$/, 'bilerek yalan söylüyor, sahtekâr'], [/^haber\.kalan-s/, 'bilmeden yanılma, deli'], [/^haber\.kalan-ikisi/, 'doğru söylüyor olmalı']] },
  { id: 'hristiyan', ad: '2 · Hristiyan, “Yahudi/Hristiyanlardan öğrenmiş”', kural: [[/^acilis\.tanri/, 'evet'], [/^acilis\.din/, 'hristiyan'], [/^acilis\.bilgi/, 'biraz biliyorum'], [/^acilis\.kaynak/, 'duruma göre'], [/^acilis\.sorun/, 'yahudilerden ve hristiyanlardan öğrenmiş'], [/^haber\.dorduncu/, 'hayır, yok'], [/^haber\.(ihtimaller|belirsiz)$/, 'bilmeden yanılıyor, deli'], [/^haber\.kalan-f/, 'doğru söylüyor']] },
  { id: 'agnostik', ad: '3 · Agnostik, kaçamak (“bilmem”, “neyse”)', hepsi: 'bilmem', kural: [[/^acilis\.davet/, 'başlayalım'], [/^acilis\.tanri/, 'emin değilim']] },
  { id: 'epilepsi', ad: '4 · “Epilepsi hastasıydı”', kural: [[/^acilis\.tanri/, 'emin değilim'], [/^acilis\.din/, 'hiçbiri'], [/^acilis\.bilgi/, 'biraz biliyorum'], [/^acilis\.kaynak/, 'duruma göre'], [/^acilis\.sorun/, 'epilepsi hastasıydı'], [/^haber\.dorduncu/, 'epilepsi'], [/^haber\.(ihtimaller|belirsiz)$/, 'bilmeden yanılıyor, deli'], [/^haber\.kalan-f/, 'doğru söylüyor']] },
  { id: 'deist', ad: '5 · Deist, “doğru söylüyor olabilir”', kural: [[/^acilis\.tanri/, 'evet'], [/^acilis\.din/, 'hiçbiri'], [/^acilis\.bilgi/, 'biraz biliyorum'], [/^acilis\.kaynak/, 'çok güvenirim'], [/^acilis\.sorun/, 'sadece merak ediyorum'], [/^haber\.(ihtimaller|belirsiz|kopru)/, 'doğru söylüyor']] },
  { id: 'ara', ad: '6 · Ara veren (samimiyette “şimdilik yeter”)', araSamimiyet: true, kural: [[/^acilis\.tanri/, 'hayır'], [/^acilis\.din/, 'hiçbiri'], [/^acilis\.sorun/, 'kendi çıkarı için uydurmuş olabilir'], [/^haber\.(ihtimaller|belirsiz)$/, 'sahtekâr']] },
];
async function personaYuru(p) {
  const yol = []; let id = 'acilis.merhaba'; const P = {}; let K = []; const ziyaret = {}; let adim = 0, bitis = 'sona erdi';
  while (id && adim++ < 260) {
    // dallan
    let z = dallanCoz(id, P, K); id = z[z.length - 1];
    const b = beats.get(id); if (!b) { yol.push({ id, not: 'beat yok' }); bitis = 'beat yok'; break; }
    ziyaret[id] = (ziyaret[id] || 0) + 1; if (ziyaret[id] > 3) { bitis = 'döngü'; break; }
    yol.push({ id });
    if (p.araSamimiyet && /^samimiyet\./.test(id) && yol.filter((x) => /^samimiyet\./.test(x.id)).length >= 2 && b.soru) { yol[yol.length - 1].not = 'ara ver'; bitis = 'ara verdi'; break; }
    if (!b.soru) { id = b.sonraki || null; continue; }
    let kac = 0, sonraki = null;
    for (let t = 0; t < 8 && sonraki === null; t++) {
      let metin = (p.kural.find(([re]) => re.test(id)) || [])[1];
      if (t > 0 && !p.hepsi) metin = 'ikna oldum, haklısın';
      if (!metin) { const ik = (b.yollar || []).find((y) => y.tur === 'ikna'); metin = p.hepsi || (ik ? DIZI(ik.anahtar)[0] : b.soru.cipler?.[0] || 'haklısın'); }
      if (t > 0 && p.hepsi) metin = p.hepsi;
      const o = await cevapSimule(b, metin);
      if (o.yol?.profil) Object.assign(P, o.yol.profil);
      const c = o.c.tur;
      if (c === 'ara') { bitis = 'ara verdi'; sonraki = ''; break; }
      if (c === 'kacamak' || c === 'konu_disi') { if (++kac >= 3) sonraki = b.sonraki || b.varsayilan || ''; continue; }
      if (c === 'serbest') { P['_' + id] = metin; sonraki = b.varsayilan || b.sonraki || ''; continue; }
      if (c === 'ret' || o.yol?.tur === 'itiraz') continue;
      if (c === 'onay' || o.yol?.tur === 'ikna') { if (b.kapat && !K.includes(b.kapat)) K = [...K, b.kapat]; }
      sonraki = o.hedef || b.sonraki || b.varsayilan || '';
    }
    if (sonraki === null) sonraki = b.sonraki || b.varsayilan || '';
    id = sonraki || null;
    if (bitis === 'ara verdi') break;
  }
  return { yol, bitis, kapali: K };
}
async function personaSec(pid) {
  S.persona = pid; S.personaYol = [];
  const kut = $('persona-bilgi');
  if (!pid) { kut.hidden = true; gorunumuYenile(); return; }
  const p = PERSONALAR.find((x) => x.id === pid);
  const r = await personaYuru(p); S.personaYol = r.yol;
  kut.replaceChildren(); kut.hidden = false;
  const bas = h('div', '', null, kut); h('b', '', p.ad, bas);
  h('div', 'anh', `${r.yol.length} adım · bitiş: ${r.bitis} · kapalı: ${r.kapali.join(', ') || '—'} (kuralla simüle; gerçek test: docs/test-raporu.md)`, kut);
  const ol = h('ol', '', null, kut); r.yol.forEach((x) => { const li = h('li', '', x.id + (x.not ? ` (${x.not})` : ''), ol); li.onclick = () => sec(x.id, true); });
  gorunumuYenile();
}

// ---------- notlar penceresi ----------
function notMarkdown() {
  const s = siralama.filter((id) => (notlar[id] || '').trim()).map((id) => `[${id}] ${notlar[id].trim().replace(/\n+/g, ' ')}`);
  return s.length ? s.join('\n') : '(not yok)';
}
function notJson() { const o = {}; siralama.filter((id) => (notlar[id] || '').trim()).forEach((id) => { o[id] = notlar[id].trim(); }); return JSON.stringify(o, null, 2); }
function notlarAc() {
  const d = $('not-dlg'); d.replaceChildren();
  h('h2', '', 'Notlarım', d);
  h('p', 'anh', 'Kopyalayıp Claude’a yapıştır. Biçim: [beat id] not metni', d);
  const ta = h('textarea', '', null, d); ta.readOnly = true; ta.value = notMarkdown();
  const b = h('div', 'satirbtn', null, d);
  const kop = h('button', '', 'Markdown kopyala', b); kop.onclick = async () => { ta.value = notMarkdown(); try { await navigator.clipboard.writeText(ta.value); kop.textContent = 'Kopyalandı ✓'; } catch { ta.select(); } };
  const jb = h('button', '', 'JSON göster', b); jb.onclick = () => { ta.value = notJson(); };
  const mb = h('button', '', 'Markdown göster', b); mb.onclick = () => { ta.value = notMarkdown(); };
  const ind = (ad, ic, tip) => { const x = h('button', '', ad, b); x.onclick = () => { const a = h('a'); a.href = URL.createObjectURL(new Blob([ic()], { type: tip })); a.download = ad.includes('JSON') ? 'sunum-notlari.json' : 'sunum-notlari.md'; a.click(); }; };
  ind('JSON indir', notJson, 'application/json'); ind('Markdown indir', notMarkdown, 'text/markdown');
  const lst = h('div', '', null, d);
  siralama.filter((id) => (notlar[id] || '').trim()).forEach((id) => { const r = h('div', 'nl', null, lst); const bt = lnk(id, r); bt.addEventListener('click', () => d.close()); r.append(' ' + notlar[id].trim()); });
  const k = h('button', '', 'Kapat', d); k.onclick = () => d.close(); k.style.marginTop = '8px';
  d.showModal();
}

// ---------- sunumda aç (iframe) ----------
const SUNUM_KEY = 'nubuvvet.akis.v2';
let yedek;
function onizlemeAc(id) {
  const kap = $('onizleme'), fr = $('onizleme-cerceve');
  try { yedek = localStorage.getItem(SUNUM_KEY); } catch { yedek = undefined; }
  $('onizleme-baslik').textContent = id + ' — sunum ilerlemen kare kapatılınca geri yüklenir';
  kap.hidden = false; fr.src = (location.pathname.endsWith('panel.html') ? 'index.html' : 'sunum.html');
  fr.onload = () => {
    const w = fr.contentWindow; let n = 0;
    const iv = setInterval(() => {
      if (++n > 120) return clearInterval(iv);
      try {
        const d = w.document;
        if (w.__sunum && d.querySelector('.ipucu.goster')) { d.body.dispatchEvent(new w.PointerEvent('pointerdown', { bubbles: true })); }
        if (w.__sunum && w.__sunum.durum.beat === 'acilis.merhaba' && d.querySelector('.satir')) { clearInterval(iv); w.__sunum.git(id); }
      } catch { clearInterval(iv); }
    }, 250);
  };
}
function onizlemeKapat() {
  const fr = $('onizleme-cerceve'); $('onizleme').hidden = true; fr.src = 'about:blank';
  try { if (yedek == null) localStorage.removeItem(SUNUM_KEY); else localStorage.setItem(SUNUM_KEY, yedek); } catch { /* */ }
}

// ---------- başlat ----------
function arayuzBagla() {
  const bc = $('bolgeler');
  BOLGELER.forEach((b) => {
    const x = h('button', 'cipb on', BOLGE_AD[b], bc); x.type = 'button'; x.style.setProperty('--c', RENK[b]);
    x.onclick = () => { if (S.bolgeAcik.has(b)) S.bolgeAcik.delete(b); else S.bolgeAcik.add(b); x.classList.toggle('on', S.bolgeAcik.has(b)); gorunumuYenile(); };
  });
  $('ara').oninput = (e) => { S.ara = e.target.value; gorunumuYenile(); };
  $('f-dog').onchange = (e) => { S.dog = e.target.checked; gorunumuYenile(); };
  $('f-ek').onchange = (e) => { S.ek = e.target.checked; gorunumuYenile(); };
  $('f-not').onchange = (e) => { S.notlu = e.target.checked; gorunumuYenile(); };
  PERSONALAR.forEach((p) => { const o = h('option', '', p.ad, $('persona')); o.value = p.id; });
  $('persona').onchange = (e) => personaSec(e.target.value);
  const ks = $('kenar-sec');
  [['sonraki', 'sonraki'], ['yol', 'yollar'], ['dallan', 'dallan'], ['varsayilan', 'varsayılan']].forEach(([k, ad]) => {
    const l = h('label', '', null, ks); const i = h('input', '', null, l); i.type = 'checkbox'; i.checked = true; i.onchange = () => { S.kenar[k] = i.checked; gorunumuYenile(); }; l.append(ad);
  });
  const lj = $('lejant');
  [['#5b6684', 'sonraki'], ['#ff9f43', 'dallan (kesikli)'], ['#9aa3bd', 'varsayılan (noktalı)'], ...Object.entries(TUR_RENK).map(([k, v]) => [v, 'yol: ' + k])].forEach(([c, t]) => { const s = h('span', '', null, lj); const i = h('i', '', null, s); i.style.borderColor = c; s.append(t); });
  const sp = h('span', '', null, lj); [['dog', 'doğrulanacak', '#ff6b6b'], ['ek', 'ek', '#f6dfa8'], ['nt', 'notlu', '#7fe0ff']].forEach(([, t, c]) => { const e = h('span', '', '● ' + t, sp); e.style.color = c; e.style.marginRight = '6px'; });
  $('b-notlar').onclick = notlarAc;
  $('onizleme-kapat').onclick = onizlemeKapat;
  notSayGuncelle();
}
function basla() {
  if (!beats.size) { $('detay').innerHTML = '<p class="bos">akis-veri.js yok: scripts/hazirla.sh çalıştır.</p>'; return; }
  kenarlariKur(); yerlesimKur(); arayuzBagla(); sekliKur(); panZoomBagla(); sigdir(); gorunumuYenile();
  window.addEventListener('resize', () => { const r = svg.getBoundingClientRect(); vb.h = vb.w * r.height / (r.width || 1); uygulaVB(); });
  const hash = decodeURIComponent(location.hash.slice(1)); if (beats.has(hash)) sec(hash, true);
  window.__panel = { beats, sec, personaSec, dallanCoz, cevapSimule, S, kenarlar };
}
basla();
