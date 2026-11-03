// durum.js — kullanıcı durumu. localStorage (try/catch), erişilemezse bellekte yedek.
// Hesap yok; ileride `depola` adaptörü uzak bir uygulamayla değiştirilebilir.
const ANAHTAR = 'nubuvvet.akis.v2';

const bos = () => ({
  surum: 2,
  beat: null,        // şu anki beat id
  satir: 0,          // gösterilen satır indeksi
  asama: 'satir',    // 'satir' | 'soru'
  soru: null,        // {mod:'ana'|'ek'|'komp', idx}
  profil: {},        // sözleşmedeki profil değişkenleri (+ "<beat id>" serbest cevapları)
  kapali: [],        // kapalı dallar
  cevaplar: {},      // {beatId: [{metin, t}]}
  konuDisi: [],
  kompozisyon: {},
  ek: {},            // {beatId: ekOrnek indeksi}
  bitti: false,
  t: Date.now(),
});

let bellek = null;
const depola = {
  oku() { try { return localStorage.getItem(ANAHTAR); } catch { return bellek; } },
  yaz(s) { try { localStorage.setItem(ANAHTAR, s); } catch { bellek = s; } },
  sil() { try { localStorage.removeItem(ANAHTAR); } catch { /* */ } bellek = null; },
};

export const durum = bos();
try { const s = depola.oku(); if (s) Object.assign(durum, JSON.parse(s)); } catch { /* bozuk kayıt */ }

export function kaydet() { durum.t = Date.now(); depola.yaz(JSON.stringify(durum)); }
export function sifirla() {
  depola.sil();
  for (const k of Object.keys(durum)) delete durum[k];
  Object.assign(durum, bos());
}
export const devamVar = () => !!durum.beat && !durum.bitti;
export function cevapEkle(id, metin) { (durum.cevaplar[id] ||= []).push({ metin, t: Date.now() }); kaydet(); }
export function kapat(dal) { if (dal && !durum.kapali.includes(dal)) { durum.kapali.push(dal); kaydet(); } }

// Koşul: nesne içindeki tüm anahtarlar VE ile sağlanmalı.
//  "profil.x": string = eşitlik, dizi = içinden biri.  "kapali": string = o dal kapalı, dizi = HEPSİ kapalı.
export function kosulSaglanir(kosul) {
  if (!kosul) return false;
  const anahtarlar = Object.keys(kosul);
  if (!anahtarlar.length) return false;
  return anahtarlar.every((k) => {
    const v = kosul[k];
    if (k === 'kapali') return (Array.isArray(v) ? v : [v]).every((d) => durum.kapali.includes(d));
    const gercek = k.startsWith('profil.') ? durum.profil[k.slice(7)] : durum[k];
    return Array.isArray(v) ? v.includes(gercek) : gercek === v;
  });
}
