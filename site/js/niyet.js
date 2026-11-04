// niyet.js — kullanıcı cevabını sınıflandırır. Sözleşme: icerik/AKIS-SEMA.md "Cevap işleme sırası".
// siniflandir({cevap, beat, soru}) -> Promise<{tur, yol?}>
//   tur: ara | kacamak | yol | global | serbest | ret | onay | konu_disi
//   global: {tur:'global', g:<globalYol>, eslesen} — beat yolları eşleşmedi, serbest olmayan soruda globalYollar eşleşti (motor yönlendirir)
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
const KACAMAK = ['bilmiyorum', 'bilmem', 'belki', 'ne bileyim', 'gec', 'pas', 'bos ver', 'farketmez', 'fark etmez', 'hmm', 'hmmm', 'hmmmm', 'ilginc', 'neyse', 'ne diyeyim', 'nasil desem', 'valla', 'bilemedim'];
const SERT_RET = /\b(olmadim|olmadi|olmuyor|olmam|katilmiyorum|inanmiyorum|saciyma|yine de|hala|ikna degilim)\b/;
const HAYIR = /\bhayir\b/;
const KATILIYORUM = /^(haklisin|haklisiniz|katiliyorum|kabul ediyorum)\b/;
const GENEL_ONAY = /\b(evet|haklisin|haklisiniz|mantikli|makul|katiliyorum|ikna oldum|kabul ediyorum|kabul|tamam|anladim|dogru|tabii|tabi)\b/;

// MTR-2: itiraz bağlaçları. "Tabii, ama …" / "Evet … yine de …" -> söz sonraki kısımdadır; öncesi nezaket/ödündür, ikna sayılmaz.
const KARSIT = /\b(ama|fakat|ancak|lakin|yine de|ne var ki|tek sorun)\b/g;
function karsitBol(m) {
  const r = [...m.matchAll(KARSIT)];
  if (!r.length) return { var: false, son: m };
  const son = m.slice(r[r.length - 1].index + r[r.length - 1][0].length).trim();
  return { var: true, son };
}

// MTR-1: bazı sorularda "evet" = sunumun savına karşı çıkmaktır ("…açıklanabilir mi?", "…olabilir mi?", "…var mı?").
// Böyle sorularda "Hayır, etmez / mümkün değil" = katılma (onay); "Evet, açıklanabilir" = itiraz.
const EVET_KARSI = /\b(aciklanabil\w*|olabil\w*|yapabil\w*|surdurebil\w*|edebil\w*|durabil\w*|kurabil\w*|yazabil\w*|saglam|mumkun|olur|olurdu|eder|yapar|var|biliyor|goruyor|benziyor|ediyor|verir|baglar|kabul eder)\s+(mi|mu|mi\?|musun|miydin|miydi|muydu|miyim|mi sence|mu sence)\b/;
const EVET_KARSI_ISTISNA = /\b(geliyor|geldi|edelim|bakalim|baslayalim|inceleyelim|ister|ciddiye)\b/;
const evetKarsiMi = (q) => { const t = normalize(q?.metin ?? q ?? ''); return !!t && EVET_KARSI.test(t) && !EVET_KARSI_ISTISNA.test(t); };
// cevabın "olumsuz yargı" öbekleri (soruya bağlı olarak katılma anlamı taşır)
const NEG_CEVAP = /\b(hayir|etmez|etmezdi|yapmaz|yapmazdi|olmaz|olmazdi|olamaz|olamazdi|vermezdim|gormuyorum|mumkun degil|sanmiyorum|zor gorunuyor|pek degil|aciklanamaz|aciklanamiyor|aciklayamaz|durmuyor|durmaz|duramaz|yok)\b/g;
const ACIK_KATILIM = /\b(haklisin|haklisiniz|katiliyorum|ikna oldum|kabul ediyorum|mantikli|makul)\b/; // açık katılma: soru biçimi ne olursa olsun itiraz sayılmaz
const POZ_CEVAP = /\b(evet|eder|yapar|olur|olurdu|olabilir|mumkun|aciklanabilir|aciklayabilir|durabilir|edebilir|edebilirdi|yapabilir|var)\b/;
// itiraza dönmesi gereken, soruya bağlı genel anahtarlar: yalnız bunlarla eşleşen 'ikna' yolu "evet-karşı" sorularda sayılmaz
const GENEL_POZ_ANAHTAR = new Set(['evet', 'tabii', 'tabi', 'dogru', 'olur', 'olabilir', 'mumkun', 'aciklanabilir', 'haklisin', 'eder', 'yapar', 'var', 'mantikli', 'makul', 'tamam']);

const kelimeVar = (m, a) => ` ${m} `.includes(` ${a} `);
const basta = (m, a) => ` ${m}`.includes(` ${a}`);
const anahtarlar = (l) => (Array.isArray(l) ? l : l ? [l] : []).map(normalize).filter(Boolean);
// Kısa anahtarlar (<=4 harf) tam sözcük; uzunlar sözcük başında eşleşir (Türkçe ekler için).
const var_ = (m, a) => (a.length <= 4 ? kelimeVar(m, a) : basta(m, a));
export const skor = (m, l) => anahtarlar(l).reduce((b, a) => (var_(m, a) && a.length > b ? a.length : b), 0);

// MTR-3: anahtarın hemen önünde/sonunda (aynı cümlecikte, ±2 sözcük) "değil/değildi/yok/olmayan" varsa o anahtar sayılmaz ("hasta değildi").
const OLUMSUZ = new Set(['degil', 'degildi', 'degilmis', 'degildir', 'yok', 'yoktu', 'yoktur', 'olmayan']);
const OLUMSUZ_ICEREN = /\b(degil\w*|yok\w*|olmayan|hayir)\b/;
const sozcukla = (cevap) => normalize(String(cevap ?? '').replace(/[,.;:!…\n]+/g, ' zzv ')).split(' ').filter(Boolean);
function olumsuzlanmis(tok, a) {
  const kt = a.split(' ');
  const uyar = (i) => kt.every((k, j) => (k.length <= 4 ? tok[i + j] === k : (tok[i + j] || '').startsWith(k)));
  let gorulen = false;
  for (let i = 0; i + kt.length <= tok.length; i++) {
    if (!uyar(i)) continue;
    gorulen = true;
    let neg = false;
    for (let d = 1; d <= 2 && !neg; d++) { const w = tok[i - d]; if (w === 'zzv' || w == null) break; if (OLUMSUZ.has(w)) neg = true; }
    for (let d = 0; d < 2 && !neg; d++) { const w = tok[i + kt.length + d]; if (w === 'zzv' || w == null) break; if (OLUMSUZ.has(w)) neg = true; }
    if (!neg) return false; // olumsuzlanmamış bir geçiş var
  }
  return gorulen; // eşleşme var ve hepsi olumsuzlanmış
}
// yol anahtarlarının skoru; olumsuzlanmış (ve kendisi olumsuz içermeyen) anahtarlar düşer. ikna: istisna için ikinci dönüş
function yolSkor(m, tok, anahtar, { genelPozDus } = {}) {
  let en = 0, eslesen = '';
  for (const a of anahtarlar(anahtar)) {
    if (!var_(m, a) || a.length <= en) continue;
    if (!OLUMSUZ_ICEREN.test(a) && olumsuzlanmis(tok, a)) continue;
    if (genelPozDus && GENEL_POZ_ANAHTAR.has(a)) continue;
    en = a.length; eslesen = a;
  }
  return { k: en, eslesen };
}

const ONCELIK = { ret: 5, yonlendir: 4, itiraz: 3, profil: 2, ikna: 1 };

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
  const m0 = normalize(cevap);
  if (ARA_VER.some((a) => kelimeVar(m0, a))) return { tur: 'ara' };
  if (m0.replace(/[^a-z0-9]/g, '').length < 2) return { tur: 'kacamak' };
  const karsi = evetKarsiMi(soru);
  // "evet-karşı" sorularda olumsuz yargı ("mümkün değil", "etmez") ret değil katılmadır: sertlik hesabından çıkar
  const negVar = karsi && new RegExp(NEG_CEVAP.source).test(m0);
  const mSert = negVar ? m0.replace(NEG_CEVAP, ' ').replace(/\s+/g, ' ').trim() : m0;
  const pozVar = POZ_CEVAP.test(m0.replace(NEG_CEVAP, ' ')) && !ACIK_KATILIM.test(m0);
  const kb = karsitBol(m0);
  const m = m0, tok = sozcukla(cevap);
  const sert = SERT_RET.test(mSert) || (/\bdegil\b/.test(mSert) && !KATILIYORUM.test(mSert));
  // "evet, açıklanabilir" (evet-karşı soruda olumlu yargı) = itiraz: genel olumlu anahtarlarla 'ikna' yolu sayılmaz
  const genelPozDus = karsi && pozVar && !negVar;
  // 1) yollar: en uzun anahtar kazanır; eşitlikte yonlendir > itiraz > profil > ikna. Olumsuz cevapta "ikna" yolları devre dışı.
  // "ama/fakat/yine de" varsa sonraki kısım ağırlıklıdır: önce o kısımda aranır; yoksa bütünde aranır ama 'ikna' yolları devre dışıdır.
  const ara = (metin, tk, ikna) => {
    let en = null;
    for (const y of beat.yollar || []) {
      if (y.tur === 'ikna' && !ikna) continue;
      const { k, eslesen } = yolSkor(metin, tk, y.anahtar, { genelPozDus: genelPozDus && y.tur === 'ikna' });
      if (!k) continue;
      // 'ikna' yolları sert olumsuzlukta devre dışı; ama anahtarın kendisi olumsuzluk içeriyorsa ("kurgu değil") geçerli.
      // Yalnız "hayır" ikna'yı engellemez ("Hayır, artık demiyorum", "Hayır, ya var ya yok" soruya verilen cevaptır).
      if (y.tur === 'ikna' && sert && !SERT_RET.test(eslesen) && !/\bdegil\b/.test(eslesen)) continue;
      const p = ONCELIK[y.tur] ?? 0;
      if (!en || k > en.k || (k === en.k && p > en.p)) en = { y, k, p };
    }
    return en;
  };
  let en = null;
  if (kb.var && kb.son) { en = ara(kb.son, sozcukla(kb.son), true); if (en && en.y.tur === 'ikna' && sert) en = null; }
  if (!en) en = ara(m, tok, !kb.var);
  if (en) return en.y.tur === 'ret' ? { tur: 'ret' } : { tur: 'yol', yol: en.y };
  if (soru?.serbest) return { tur: 'serbest' };
  const gl = globalEsle(m0); // beat yolu eşleşmedi, serbest soru değil: global yollar
  if (gl) return { tur: 'global', ...gl };
  if (sert) return { tur: 'ret' };
  // 2) soruya göre kutupluluk
  if (kb.var) return { tur: 'ret' };                       // "Tabii, ama …": itiraz; ikna sayılmaz
  if (karsi && negVar && !pozVar) return { tur: 'onay' };   // "Hayır, etmez" -> katılıyor
  if (karsi && pozVar && !negVar) return { tur: 'ret' };    // "Evet, açıklanabilir" -> itiraz
  if (HAYIR.test(m) && !GENEL_ONAY.test(m)) return { tur: 'ret' };
  if (GENEL_ONAY.test(m)) return { tur: 'onay' };
  if (KACAMAK.some((a) => kelimeVar(m, a))) return { tur: 'kacamak' };
  if (m.includes('?')) {
    const kume = beatKelimeleri(beat);
    if (!m.split(' ').some((w) => w.length >= 5 && kume.has(w.slice(0, 5)))) return { tur: 'konu_disi' };
  }
  return { tur: 'ret' };
}

// ---- globalYollar (AKIS-SEMA "Global yollar") ----
// Yerleşik varsayılanlar; içerikte (herhangi bir bölge dosyasının kökünde) aynı `ad`lı tanım varsa o geçer, yeni adlar eklenir.
// Sıra önemlidir: ilk eşleşen kazanır. `yanit` yalnız `git` beat'i havuzda yoksa gösterilen sabit metindir.
const NOT = ['Bu konuyu not ettim.', 'Bu sunumda henüz ele almıyoruz; geçiştirmiyorum, dürüstçe söylüyorum.', 'Şimdi kaldığımız soruya dönelim.'];
export const VARSAYILAN_GLOBAL = [
  { ad: 'muslumanOlmak', git: 'kapanis.muslumanOlmak', anahtar: ['müslüman olmak', 'müslüman olmak istiyorum', 'müslüman olacağım', 'nasıl müslüman olunur', "islam'a girmek", 'islama girmek', 'şehadet', 'kelime-i şehadet', 'ihtida'] },
  { ad: 'notEttim', git: 'genel.notEttim', itiraz: true, yanit: NOT, anahtar: ['aişe', 'ayşe', 'aişenin', 'aişeyle', 'aişeyi', 'kurayza', 'kureyza', 'kurayzaoğulları', 'yahudileri öl', 'yahudileri kes', 'yahudileri katlet', 'yahudi katliam'] },
  { ad: 'sert', git: 'genel.yumusak', tekrar: { say: 2, git: 'kapanis.ozet-cikis' }, yanit: ['Seni sinirlendirdiysem özür dilerim.', 'İstersen bırakabiliriz; istersen en çok itiraz ettiğin şeyi yaz, not alırım.'], anahtar: ['siktir', 'salak', 'aptal', 'gerizekalı', 'bot musun', 'boş laf', 'saçma sapan', 'defol', 'hahaha'] },
  { ad: 'bilim', git: 'genel.bilim', itiraz: true, yanit: ['Bu sunumun konusu bu değil; itirazını not ettim.', 'Şimdi kaldığımız soruya dönelim.'], anahtar: ['bilim', 'bilimsel', 'evrim', 'embriyo', 'düz dünya', 'güneş çamurlu', 'çamurlu göze', 'dağlar çivi', 'big bang', 'yaratılış günleri', 'bilimle çelişiyor'] },
  { ad: 'kisalt', git: 'kapanis.ozet-cikis', yanit: ['Anladım; uzun sürdüğü için özür dilerim.', 'İstersen biraz ara verelim ya da kaldığımız yerden sürdürelim.'], anahtar: ['sıkıldım', 'çok uzun', 'uzun oldu', 'kısa olsun', 'özet', 'umrumda değil', 'masal', 'saçma'] },
];
let globaller = VARSAYILAN_GLOBAL;
export function globalYollariKur(icerik) {
  const l = VARSAYILAN_GLOBAL.map((d) => ({ ...d }));
  for (const g of Array.isArray(icerik) ? icerik : []) {
    if (!g || !g.ad || !g.anahtar) continue;
    const i = l.findIndex((d) => d.ad === g.ad);
    if (i >= 0) l[i] = { ...l[i], ...g }; else l.push({ ...g });
  }
  globaller = l;
  return l.length;
}
// Cevap kısaysa (<= 12 sözcük) ya da anahtar cümlenin başındaysa tetiklenir; uzun serbest cümlede yanlış alarm olmasın.
function globalEsle(m0) {
  const sayi = m0.split(' ').filter(Boolean).length;
  for (const g of globaller) {
    let en = '';
    for (const a of anahtarlar(g.anahtar)) if (var_(m0, a) && a.length > en.length && (sayi <= 12 || m0.startsWith(a))) en = a;
    if (en) return { g, eslesen: en };
  }
  return null;
}

let aktif = kuralTabanli;
export function siniflandiriciyiDegistir(fn) { aktif = fn; }
export async function siniflandir(girdi) { return aktif(girdi); }
