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

const ARA_VER = ['ara ver', 'ara veriyorum', 'ara verelim', 'ara vermek istiyorum', 'sonra devam', 'sonra devam ederim', 'yeter bu kadar', 'simdilik bu kadar', 'sonra donerim'];
// Kelime sınırıyla eşleşir: "yeterli", "yetersiz" gibi sözcükler yanlışlıkla ara vermeye yol açmasın.
const kelimeVar = (m, a) => (` ${m} `).includes(` ${a} `);
const RET = /\b(olmadim|olmadi|olmuyor|olmam|degil|hayir|katilmiyorum|inanmiyorum|saciyma|yine de|hala)\b/;
const RET_DEGILSIZ = /\b(olmadim|olmadi|olmuyor|olmam|hayir|katilmiyorum|inanmiyorum|saciyma|yine de|hala)\b/;
const KATILIYORUM = /^(haklisin|haklisiniz|katiliyorum|kabul ediyorum)\b/; // "Haklısınız, ... değil" gibi onay çipleri 'değil' içerse de onaydır

const anahtarlar = (l) => (l || []).map(normalize).filter(Boolean);
// Kısa anahtarlar (<=4 harf: 'gec', 'sara', 'deli'...) tam sözcük olarak aranır; 'geçmiş', 'saray' gibi sözcüklere takılmasın.
const var_ = (m, a) => (a.length <= 4 ? kelimeVar(m, a) : m.includes(a));
const esles = (m, l) => anahtarlar(l).some((a) => var_(m, a));
// En uzun eşleşen anahtarın uzunluğu (0 = eşleşme yok); çakışmada daha özgül (uzun) anahtar kazansın.
const skor = (m, l) => anahtarlar(l).reduce((b, a) => (var_(m, a) && a.length > b ? a.length : b), 0);

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
  if (ARA_VER.some((a) => kelimeVar(m, a))) return { niyet: 'ara_ver' };
  // Yönlendirme ve itirazlar: en uzun (en özgül) anahtar kazanır; eşitlikte yönlendirme.
  let en = { skor: 0 };
  for (const [ad, y] of Object.entries(n.yonlendir || {})) { const k = skor(m, y.anahtar); if (k > en.skor) en = { skor: k, r: { niyet: 'yonlendir', hedef: y.hedef, yon: ad } }; }
  if (!KATILIYORUM.test(m) || RET_DEGILSIZ.test(m)) {
    for (const i of dugum.itirazlar || []) { const k = skor(m, i.anahtar); if (k > en.skor) en = { skor: k, r: { niyet: 'itiraz', itirazId: i.id } }; }
  }
  if (en.r) return en.r;
  if (m.replace(/\?/g, '').length < 3) return { niyet: 'kacamak' };
  if (KATILIYORUM.test(m) && !RET_DEGILSIZ.test(m)) return { niyet: 'ikna' };
  if (RET.test(m)) return { niyet: 'ikna_olmadi' }; // "ikna olmadım" gibi olumsuzlama, 'ikna' anahtarından önce yakalanır
  if (esles(m, n.ikna?.anahtar)) return { niyet: 'ikna' };
  if (esles(m, n.kacamak?.anahtar)) return { niyet: 'kacamak' };
  if (m.includes('?') && !dugumAnahtarlari(dugum).some((a) => m.includes(a))) return { niyet: 'konu_disi' };
  return { niyet: 'ikna_olmadi' };
}

let aktif = kuralTabanli;
export function siniflandiriciyiDegistir(fn) { aktif = fn; }
export async function siniflandir(cevap, dugum) { return aktif(cevap, dugum); }
