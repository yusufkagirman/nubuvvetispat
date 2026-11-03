// niyet.js — kullanıcı cevabını niyete ayıran sınıflandırıcı.
// v1: kural tabanlı (anahtar kelime eşleşmesi). Arayüz: siniflandir(cevap, dugum) -> Promise<{niyet, itirazId?, hedef?}>
// ASYNC ve DEĞİŞTİRİLEBİLİR: ileride ucuz bir LLM sınıflandırıcı (girdi: soru + cevap + düğümün niyet/itiraz
// listesi; çıktı: etiket) `siniflandiriciyiDegistir(fn)` ile takılır; aynı imzayı korumalıdır. İçerik üretmez.
// Niyetler: ikna | itiraz | yonlendir | ikna_olmadi | kacamak | konu_disi | ara_ver

export function normalize(s) {
  return String(s ?? '')
    .replace(/İ/g, 'i').replace(/I/g, 'ı')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9? ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const ARA_VER = ['ara ver', 'ara veriyorum', 'sonra devam', 'sonra devam ederim', 'yeter', 'simdilik bu kadar', 'sonra donerim'];
const RET = /\b(olmadim|olmadi|olmuyor|olmam|degil|hayir|katilmiyorum|inanmiyorum|saciyma|yine de|hala)\b/;

const anahtarlar = (l) => (l || []).map(normalize).filter(Boolean);
const esles = (m, l) => anahtarlar(l).some((a) => m.includes(a));

export function dugumAnahtarlari(d) {
  const n = d.niyetler || {}, out = [];
  (d.itirazlar || []).forEach((i) => out.push(...anahtarlar(i.anahtar)));
  Object.values(n).forEach((v) => { if (v?.anahtar) out.push(...anahtarlar(v.anahtar)); });
  Object.values(n.yonlendir || {}).forEach((v) => out.push(...anahtarlar(v.anahtar)));
  (d.baslik || '').split(/\s+/).forEach((w) => { const x = normalize(w); if (x.length > 4) out.push(x); });
  return out;
}

async function kuralTabanli(cevap, dugum) {
  const m = normalize(cevap);
  const n = dugum.niyetler || {};
  if (ARA_VER.some((a) => m.includes(a))) return { niyet: 'ara_ver' };
  if (m.replace(/\?/g, '').length < 3) return { niyet: 'kacamak' };
  for (const [ad, y] of Object.entries(n.yonlendir || {})) if (esles(m, y.anahtar)) return { niyet: 'yonlendir', hedef: y.hedef, yon: ad };
  for (const i of dugum.itirazlar || []) if (esles(m, i.anahtar)) return { niyet: 'itiraz', itirazId: i.id };
  if (RET.test(m)) return { niyet: 'ikna_olmadi' }; // "ikna olmadım" gibi olumsuzlama, 'ikna' anahtarından önce yakalanır
  if (esles(m, n.ikna?.anahtar)) return { niyet: 'ikna' };
  if (esles(m, n.kacamak?.anahtar)) return { niyet: 'kacamak' };
  if (m.includes('?') && !dugumAnahtarlari(dugum).some((a) => m.includes(a))) return { niyet: 'konu_disi' };
  return { niyet: 'ikna_olmadi' };
}

let aktif = kuralTabanli;
export function siniflandiriciyiDegistir(fn) { aktif = fn; }
export async function siniflandir(cevap, dugum) { return aktif(cevap, dugum); }
