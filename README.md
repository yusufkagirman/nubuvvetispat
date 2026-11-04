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

## Kontrol paneli
Sunumun tüm karelerini ve cevaba göre nasıl dallandığını tek yerde görmek/denetlemek için: `site/panel.html` (vanilla; `akis-veri.js` + motorun `js/niyet.js` sınıflandırıcısını kullanır).
```bash
scripts/hazirla.sh && cd site && python3 -m http.server 8123   # http://localhost:8123/panel.html
scripts/panel-ekran.sh            # her kare için site/panel/ekran/<id>.jpg + docs/sunum-haritasi.md (içerik değişince yeniden çalıştır)
```
- **Akış grafiği:** bölge sütunlarında düğümler; kenarlar sonraki (düz), yollar (tür renkli, etiket: tür + ilk 2 anahtar), dallan (kesikli turuncu), varsayılan (noktalı). Kaydır/yakınlaştır (tekerlek, sürükle, iki parmak). Düğüme dokun: seçilen karenin kenarları ve etiketleri belirir.
- **Detay:** satırlar + kaynak künyesi, soru/çipler, yollar (hedefe tıklanır), ek örnekler, kompozisyon, köprü, dallan, gizli dayanak, "doğrulanacak"/"ek" rozetleri, ekran görüntüsü.
- **Simülatör:** seçili karede bir cevap yaz → niyet (yol/ret/onay/kaçamak…) ve gidilecek kare (girişteki dallan zinciriyle). Profil (tanri, din, kaynakGuveni, bilgi, supheTuru, iddia, kapalı dallar) elle seçilip dallan sonuçları görülür.
- **Persona yolları:** 6 persona (`docs/test-raporu.md`) kural tabanlı simüle edilip grafikte numaralı vurgulanır (gerçek test değil, yön gösterir).
- **Süzgeç:** metin arama, bölge, doğrulanacak, ek, notlu.
- **Notlar:** her kareye not (tarayıcıda saklanır). "Notlar" düğmesi → `[beat id] not metni` biçiminde Markdown/JSON kopyala-indir; Claude'a yapıştırıp geri bildirim ver.
- **"Sunumda bu kareyi aç":** panel içinde iframe'de sunumu açıp `__sunum.git(id)` çağırır; kapatınca sunum ilerlemen (localStorage) geri yüklenir.
Ekran görüntüleri: `docs/ekran/panel-*.png`.
