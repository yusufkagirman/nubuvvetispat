// niyet.js — kullanıcı cevabını sınıflandırır. Sözleşme: icerik/AKIS-SEMA.md "Cevap işleme sırası".
// siniflandir({cevap, beat, soru}) -> Promise<{tur, yol?}>
//   tur: ara | kacamak | yol | serbest | ret | onay | konu_disi
// ASYNC ve DEĞİŞTİRİLEBİLİR: siniflandiriciyiDegistir(fn) ile ileride bir LLM sınıflandırıcı takılabilir (aynı imza).
// Sınıflandırıcı yalnız etiket üretir; içerik üretmez, yönlendirmeyi motor yapar.

export function normalize(s) {
  return String(s ?? '')
    .replace(/İ/g, 'i').replace(/I/g, 'ı')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9? ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const ARA_VER = ['ara ver', 'ara veriyorum', 'ara verelim', 'ara vermek istiyorum', 'sonra devam', 'sonra devam ederim',
  'sonra devam edelim', 'simdilik yeter', 'simdilik bu kadar', 'yeter bu kadar', 'sonra donerim', 'cikmak istiyorum', 'cik'];
const KACAMAK = ['bilmiyorum', 'belki', 'ne bileyim', 'gec', 'pas', 'bos ver', 'farketmez', 'hmm', 'hmmm', 'ilginc'];
const RET_DEGILSIZ = /\b(olmadim|olmadi|olmuyor|olmam|hayir|katilmiyorum|inanmiyorum|saciyma|yine de|hala|ikna degilim)\b/;
const KATILIYORUM = /^(haklisin|haklisiniz|katiliyorum|kabul ediyorum)\b/;
const GENEL_ONAY = /\b(evet|haklisin|haklisiniz|mantikli|katiliyorum|ikna oldum|kabul ediyorum|dogru|tabii|tabi)\b/;

const kelimeVar = (m, a) => ` ${m} `.includes(` ${a} `);
const basta = (m, a) => ` ${m}`.includes(` ${a}`);
const anahtarlar = (l) => (Array.isArray(l) ? l : l ? [l] : []).map(normalize).filter(Boolean);
// Kısa anahtarlar (<=4 harf) tam sözcük; uzunlar sözcük başında eşleşir (Türkçe ekler için).
const var_ = (m, a) => (a.length <= 4 ? kelimeVar(m, a) : basta(m, a));
export const skor = (m, l) => anahtarlar(l).reduce((b, a) => (var_(m, a) && a.length > b ? a.length : b), 0);

const ONCELIK = { yonlendir: 4, itiraz: 3, profil: 2, ikna: 1 };

function beatKelimeleri(beat) {
  const kume = new Set();
  const ekle = (t) => normalize(t).split(' ').forEach((w) => { if (w.length >= 5) kume.add(w.slice(0, 5)); });
  (beat.satirlar || []).forEach((s) => ekle(typeof s === 'string' ? s : s.metin));
  ekle(beat.soru?.metin ?? beat.soru);
  (beat.ekOrnekler || []).forEach((e) => ekle(e.soru));
  (beat.yollar || []).forEach((y) => anahtarlar(y.anahtar).forEach(ekle));
  return kume;
}

async function kuralTabanli({ cevap, beat, soru }) {
  const m = normalize(cevap);
  if (ARA_VER.some((a) => kelimeVar(m, a))) return { tur: 'ara' };
  if (m.replace(/[^a-z0-9]/g, '').length < 2) return { tur: 'kacamak' };
  const olumsuz = RET_DEGILSIZ.test(m) || (/\bdegil\b/.test(m) && !KATILIYORUM.test(m));
  // 1) yollar: en uzun anahtar kazanır; eşitlikte yonlendir > itiraz > profil > ikna. Olumsuz cevapta "ikna" yolları devre dışı.
  let en = null;
  for (const y of beat.yollar || []) {
    if (olumsuz && y.tur === 'ikna') continue;
    const k = skor(m, y.anahtar);
    if (!k) continue;
    const p = ONCELIK[y.tur] ?? 0;
    if (!en || k > en.k || (k === en.k && p > en.p)) en = { y, k, p };
  }
  if (en) return { tur: 'yol', yol: en.y };
  if (soru?.serbest) return { tur: 'serbest' };
  if (olumsuz) return { tur: 'ret' };
  if (GENEL_ONAY.test(m)) return { tur: 'onay' };
  if (KACAMAK.some((a) => kelimeVar(m, a))) return { tur: 'kacamak' };
  if (m.includes('?')) {
    const kume = beatKelimeleri(beat);
    if (!m.split(' ').some((w) => w.length >= 5 && kume.has(w.slice(0, 5)))) return { tur: 'konu_disi' };
  }
  return { tur: 'ret' };
}

let aktif = kuralTabanli;
export function siniflandiriciyiDegistir(fn) { aktif = fn; }
export async function siniflandir(girdi) { return aktif(girdi); }
