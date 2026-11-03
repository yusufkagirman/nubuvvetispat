# Nübüvvet İspatı — Sinematik "Konuşan Sunum"

Tek ekran, karanlık yıldızlı gece, kinetik tipografi, Ken Burns görseller, animasyonlu diyagramlar ve isteğe bağlı prosedürel ambiyans sesi.
Statik, sunucusuz, derleme gerektirmez (vanilla HTML/CSS/ES modules, harici bağımlılık ve font yok). Sözleşme: `icerik/AKIS-SEMA.md`.

## Çalıştırma
```bash
scripts/hazirla.sh              # icerik/akis/*.json -> site/akis-veri.js ; public/gorseller -> site/gorseller
cd site && python3 -m http.server 8123   # http://localhost:8123
```
- `hazirla.sh` bağlantıları denetler (kırık `git/sonraki/varsayilan`, yinelenen id) ve uyarı yazar.
- `site/akis-veri.js` yoksa (ya da boşsa) sayfa `site/ornek-akis.json` dosyasını `fetch` ile yükler (motor testi için örnek akış).
- `akis-veri.js` ve `site/gorseller/` `.gitignore`'dadır.

## Yapı (`site/js/`)
| dosya | görev |
|---|---|
| `main.js` | bileşenleri bağlar, açılış ("dokun ya da bir tuşa bas", "Kaldığın yerden devam edelim mi?"), köşe kontrolleri, test kancaları |
| `motor.js` | AKIS-SEMA "Cevap işleme sırası" (ara ver, yollar/en uzun anahtar, olumsuzluk, genel onay/ret, ekOrnekler → kompozisyon, köprü, serbest/varsayılan, dallan, kapat, var olmayan beat) |
| `niyet.js` | normalize + eşleştirme; **async ve değiştirilebilir** sınıflandırıcı (`siniflandiriciyiDegistir`, ileride LLM) |
| `durum.js` | beat id + satır + aşama + profil + kapalı dallar + cevaplar (localStorage, bellekte yedek); koşul değerlendirme |
| `ekran.js` | satır yığını (kinetik tipografi, FLIP), soru anı, diyagram/sahne katmanları, aria-live |
| `gok.js` | canvas: yıldız alanı, kayan yıldız, modlar `gokyuzu/col/safak/isik/mushaf`, Ken Burns, çapraz geçiş |
| `diyagram.js` | `ihtimaller, demet, zaman, sayac, karsilastirma, denklem, alinti, galeri` |
| `ses.js` | Web Audio drone + kristal tını + soru tonu (varsayılan kapalı) |

## Davranış notları
- Koşullar: çok anahtar = VE; `profil.x` dizi değer = içinden biri; `kapali` dizi = hepsi kapalı.
- `ihtimaller` diyagramı kullanıcının gerçek kapalı dallarını (samimiyet→bilerek, fetanet→bilmeyerek) `veri.kapali` ile birleştirir.
- `sonraki` ve `soru` olmayan son beat oturum sonudur: yıldızlar kalır, "Baştan başla" bağlantısı belirir.
- Dokunma/tıklama/boşluk/Enter: satırı tamamlar, ikinci dokunuş sonraki satıra geçirir. `prefers-reduced-motion` desteklenir.

## Test kancaları
Konsolda `window.__sunum`: `git(id)`, `durum`, `hiz(0.05)` (zamanlayıcıları hızlandırır), `motor`, `ui`, `gok`, `ses`.

Ekran görüntüleri: `docs/ekran/v2-*.png`.
