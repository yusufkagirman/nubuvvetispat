// main.js — bileşenleri bağlar: veri yükleme, açılış, köşe kontrolleri, test kancaları.
import { Gok } from './gok.js';
import { Ses } from './ses.js';
import { Ekran } from './ekran.js';
import { Motor } from './motor.js';
import { durum, devamVar, sifirla, kaydet } from './durum.js';
import { siniflandiriciyiDegistir } from './niyet.js';

const $ = (id) => document.getElementById(id);
const azHareket = matchMedia('(prefers-reduced-motion: reduce)').matches;

async function veriYukle() {
  if (window.AKIS_VERI?.bolgeler?.length) return window.AKIS_VERI;
  try { const r = await fetch('ornek-akis.json'); if (r.ok) return await r.json(); } catch { /* */ }
  return null;
}

const gok = new Gok($('gok'), { azHareket });
const ses = new Ses();
const ui = new Ekran({ sahne: $('sahne'), yigin: $('yigin'), dgBeat: $('dg-beat'), dgSatir: $('dg-satir'), okuyucu: $('okuyucu') }, { gok, ses });
const motor = new Motor(ui);
gok.baslat();

// ---- köşe kontrolleri ----
const sesBtn = $('ses-btn');
const sesGuncelle = () => { sesBtn.setAttribute('aria-pressed', String(ses.acik)); sesBtn.setAttribute('aria-label', ses.acik ? 'Sesi kapat' : 'Sesi aç'); };
sesBtn.addEventListener('click', () => { ses.degistir(); sesGuncelle(); });
const menu = $('menu'), menuBtn = $('menu-btn'), bastan = $('m-bastan');
const menuKapat = () => { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); bastan.textContent = 'Baştan başla'; bastan.classList.remove('onay'); };
menuBtn.addEventListener('click', () => { const ac = menu.hidden; menu.hidden = !ac; menuBtn.setAttribute('aria-expanded', String(ac)); });
$('m-ara').addEventListener('click', () => { menuKapat(); motor.araVer(); });
bastan.addEventListener('click', () => {
  if (!bastan.classList.contains('onay')) { bastan.classList.add('onay'); bastan.textContent = 'Emin misin? Dokun'; return; }
  menuKapat(); baslatBastan();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { menuKapat(); menuBtn.focus(); } });
document.addEventListener('pointerdown', (e) => { if (!e.target.closest('.kose')) menuKapat(); });

// ---- etkileşim: ses kilidi + hızlandır ----
const etkilesimli = (t) => t.closest?.('.kose, form, button, input, a');
document.addEventListener('pointerdown', (e) => { ses.kilitAc(); sesGuncelle(); if (!etkilesimli(e.target)) ui.dokun(); }, { capture: true });
document.addEventListener('keydown', (e) => {
  ses.kilitAc(); sesGuncelle();
  if (etkilesimli(e.target) || e.ctrlKey || e.metaKey || e.altKey || e.key === 'Tab' || e.key === 'Escape') return;
  if (e.key === ' ') e.preventDefault();
  ui.dokun();
});

async function baslatBastan() {
  motor.durdur(); sifirla(); kaydet();
  await ui.temizle().catch(() => {});
  motor.baslat(false);
}

// ---- açılış ----
(async function ac() {
  const veri = await veriYukle();
  if (!veri) { await ui.satirlar(['Sunum içeriği yüklenemedi.', 'scripts/hazirla.sh çalıştırılmalı.']); return; }
  motor.yukle(veri);
  const hepsi = (veri.bolgeler || []).flatMap((b) => b.beats || []);
  hepsi.forEach((b) => { (b.sahne?.gorsel ? [b.sahne.gorsel] : []).forEach((g) => gok.yukle(g)); });
  const devam = devamVar();
  let secim;
  try { secim = await ui.acilis(devam); } catch { return; }
  if (secim === 'bastan') { sifirla(); kaydet(); }
  motor.baslat(secim === 'devam');
})();

// ---- test kancaları ----
window.__sunum = {
  motor, ui, gok, ses, durum, siniflandiriciyiDegistir,
  git: (id) => motor.git(id),
  hiz: (x) => { ui.hiz = x; },
  durumYaz: () => kaydet(),
};
