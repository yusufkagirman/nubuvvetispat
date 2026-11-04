# Tasarım Önerileri — Sinematik Konuşan Sunum (v2 → v3)

Hazırlayan: tasarımcı ajan. Kapsam: yalnız inceleme ve öneri; kod yazılmadı. İncelenen: `CLAUDE.md`, `icerik/AKIS-SEMA.md`, `docs/test-raporu.md`, `README.md`, `site/index.html`, `site/stil.css`, `site/js/{ekran,gok,diyagram,ses,main,motor}.js`, `docs/ekran/v2-01, 03, 05, 12`, içerik istatistiği (`icerik/akis/*.json`). Canlı gezinti yapılmadı; değerlendirme kod + ekran görüntülerine dayanır.

Ölçek: S = yarım güne kadar, M = 1–3 gün, L = bir haftadan uzun. Öncelik: P0 = hemen, P1 = ilk paket, P2 = sonra.

---

## 1. Mevcut durum teşhisi

### Güçlü yanlar
- **Tek ekran fikri ve sahne motoru sağlam.** Satır yığını (FLIP ile kayan, "eski" olarak silikleşen satırlar), soru anında diyagramın küçülmesi (`.soru-an`), iptal edilebilir söz mimarisi (`ekran.js` `_vaat/_oynat`) profesyonel hissettiriyor.
- **Açılış çok iyi** (`v2-01-acilis.png`): aralıklı serif, kelime kelime odaklanan blur, altın ince çizgi, tek kayan yıldız, neredeyse görünmez ipucu. Marka dili burada doğmuş.
- **Mushaf reveal** (`gok.js` `gorseller`): görselin önce net görünüp sonra yazı için kararması doğru sinematik refleks.
- **Prosedürel atmosfer** (yıldız paralaksı, Samanyolu, şafak, çöl katmanları) bağımlılıksız ve hafif; mobil çöl karesi (`v2-12`) etkileyici.
- **Ses mimarisi** (drone + yankılı kristal tını) doğru yönde; varsayılan kapalı olması saygılı.
- **Erişilebilirlik temeli var:** `aria-live` okuyucu, `prefers-reduced-motion`, `:focus-visible`, dokunmatikte otomatik odak yok.

### Zayıf yanlar (akıcılık ve kilitleme açısından)
1. **Ritim tek tonlu.** `ekran.js` `satir()`: süre = `1400 + 320 × kelime` (vurgu +500). Her satır aynı kalıpla gelir; kelime blur'u, aynı easing, aynı yükselme. Sessizlik, hızlanma, "nefes" yok. 630 satır ve ~100 soru aynı metronomda akıyor. Gerilim–çözülme dengesi içerikte var ama **sunumda görünmüyor**.
2. **Dramaturji eğrisi geç doruğa çıkıyor.** Açılış (10 beat) güçlü, ama ardından profil soruları ve **zemin bölgesi: 17 beat / 15 soru** gelir (`zemin.json`); `test-raporu.md` bunun "ikna olan kullanıcı için bile uzun" olduğunu teyit ediyor. İhtimaller ağacı (kitabın asıl "aha"sı) ancak bunlardan sonra geliyor. İlk 5 dakikada ekranda kilitleyecek bir "vaat" yok.
3. **Soru anı sinematik dünyadan kopuyor.** `v2-05-ihtimaller.png`: gradyansız düz bir `input` + üç beyaz çerçeveli "pill" çip + `Düşünceni yaz…`. Metinle aynı serif, ama çipler `--sans` ve web-formu hissi veriyor; "yazılan cevap" ekrandan hemen gidip yerini 1 satırlık silik italik `cevap`'a bırakıyor (`cevapGoster`); kullanıcının sözü **sahnenin bir parçası olmuyor**.
4. **Diyagramlar çalışıyor ama sahnenin dışında duruyor.** `v2-05`: ağaç düğümleri düz web-UI "pill"leri (koyu dolgu, mavi çerçeve); yalnız vurguda altın yanıyor. Kapanan dal sönüyor ama bir **an** olarak yaşanmıyor. Ağaç, sunumun logosu olabilecek görsel kimlik; şu an bir şema.
5. **Tipografi: tek ağırlık, tek renk.** `.satir` 400 ağırlık, `#e9edf6`; vurgu = sadece büyük + altın. Orta düzey bir hiyerarşi yok (örn. rakam/anahtar kelime vurgusu, kısa "tek kelimelik" satırlar, sessiz ara satırlar). `v2-03-mushaf.png`'de iki satır grubu birbirine yakın tonda; üst grup (eski) okunaksız derecede silik.
6. **Arapça ayet gösterimi yok.** Hiçbir beat'te Arapça yazı/ayet tipografisi yok (`icerik/akis/*.json` taraması: ayet metni için alan yok). Kitabın en güçlü sahnelerinden biri (Kur'an'ın kendi sesi) görsel olarak karşılanmıyor.
7. **Kaynaklar sunumda görünmez.** `grep "kaynak"` → içerikte **0** satır `kaynak` alanı taşıyor; motorda künye bileşeni, kart veya Kaynakça sahnesi yok. Yeni kural (v2.1) uygulanmamış durumda.
8. **Sahne geçişleri "temizle → yaz" ritmi.** `temizle()` her beat'te ~750 ms bekler; hepsi yukarı kayarak söner. Bölge/ruh hali değişimleri (zemin → haber → samimiyet) için ayrı bir geçiş dili yok; yalnız arka plan modu 1.8 sn'de çapraz solar.
9. **Çöl/şafak/ışık nadiren "görülüyor".** Metin merkezde ve her zaman üstte; manzara ancak boşluk kalırsa görünür. Letterbox/oran kullanılmıyor; kamera hissi yalnız mushafta (Ken Burns) var, gökyüzü ve çölde yok.
10. **Bekleme ölü.** Satırlar arası boşlukta ekran (yıldız kayması dışında) sessiz; "yazıyor/düşünüyor" mikro-animasyonu, soru sonrası "cevap alındı" geri bildirimi yok. Kullanıcı soruyu gönderdiğinde yalnız satır kaybolur.
11. **Erişilebilirlik / performans notları.** Ağır `canvas.filter: blur` (her karede); `aria-hidden` satırlar + `aria-live` tek metin (iyi) ama soru/çip akışı için canlı bölge güncellemesi yok. Sayaç ve kısa süreli geçişlerde okuma hızı kontrolü yok. Küçük ekranda `.cip` yazı 0.88rem (~14 px), dokunma hedefi ~34 px yükseklik; üst/alt metin bandının kontrastı mushafta yeterli ama yıldızlı gökte `.ipucu` (.42 alfa) ve `.ikon` (.38) neredeyse görünmez (WCAG altı).
12. **Menü ve ilerleme tutarsızlığı.** Hiç ilerleme hissi yok (tasarım gereği), ama kullanıcıya "yaklaşık ne kadar süreceği" bilgisi de verilmiyor; uzun (35+ dk) bir akışta bu terk riskidir. Üstelik bölge sonlarında dramatik kapanış ("kapı kapandı") hissi yok.

---

## 2. Öneriler

### A. Anlatı ritmi ve dramaturji

**A1. Üç perdeli yeniden akış: "Vaat → Zemin → Doruk"**
- **Problem:** İhtimaller ağacı ve "kapalı devre" fikri (asıl vurucu) 20+ beat sonra; zemin uzun, sıralı, tekdüze.
- **Öneri:** Açılışta (`acilis.iddia` sonrası) ağacı bir kez, **kısa bir önizleme olarak** göster: "Üç ihtimal var. Hangisi doğruysa, diğer ikisi çökmek zorunda. Yolun sonunda seni bekleyen bu." (≈ 25 sn, soru yok.) Sonra profil ve zemin. Zemin içinde "özet ve geç" çipi (test-raporu önerisi) ve ikna eden kullanıcı için tek ekranlık "Zemin özeti" (`zemin.kisa` zaten var) ile kısa yol. Ağaç, ilk `haber.ihtimaller`'de önizlemenin **devamı** olarak gelir (tanıdık "geri dönüş" anı).
- **Etki:** Yüksek (ilk 3 dakika kancası, ilerleme beklentisi, zemin yorgunluğu azalır).
- **Zorluk:** M (içerik düzenleme + 1–2 yeni beat; motor değişikliği yok).
- **Risk:** Kitabın kronolojisini ("zemin → haber → …") bozma algısı. Çözüm: önizleme "ne yapacağız" der, kanıtlamaz; sıra korunur.
- **Dosyalar:** `icerik/akis/acilis.json`, `zemin.json`, `haber.json`.
- **Öncelik:** P0 · **Onay:** **Evet** (içerik/akış sırası, CLAUDE.md "adım atlama" kuralı).

**A2. Gerilim–çözülme döngüsü: her beat'e "tempo etiketi"**
- **Problem:** Tüm satırlar aynı hızda; düşünme/şok/sakin ayrımı yok.
- **Öneri:** Satıra isteğe bağlı `"tempo": "yavas" | "hizli" | "sessiz"` ve `"duraklama": ms` alanı (şema geriye uyumlu). Hızlı: kısa 3–4 kelimelik art arda "vuruşlar" (320 ms/kelime yerine 180 ms, 0.55 s yükselme). Yavaş: ağır, tek satır, kelimeler arası 140 ms. Sessiz: satır yok, 2–3 sn boşluk + yıldız. Varsayılan tempo mevcut davranış. Önerilen kalıp: **soru ← kısa vuruşlar ← uzun nefes ← vurgu ← soru**.
- **Etki:** Yüksek. **Zorluk:** M (şema + `ekran.js satir()` süre/gecikme; içerik pasında sadece kilit beat'lere etiket).
- **Risk:** İçerik ekibine ek yük; etiketi olmayan beat'ler eski ritimde kalır (tutarsızlık).
- **Dosyalar:** `icerik/AKIS-SEMA.md`, `ekran.js`, `stil.css` (`.satir.hizli .w` vb.).
- **Öncelik:** P1 · **Onay:** Hayır (şema genişletme; içerikte tempo atama ayrı iş).

**A3. "Aha" anları için sahne vuruşu (`an` efekti)**
- **Problem:** İlzam anı (ör. "Doğru söylüyor… geriye yalnız bu kalır"; Birmingham aralığı 568–645) vurguda sadece altın renk + 500 ms.
- **Öneri:** `"vurgu": "an"` türü: önce 700 ms kararma (yıldızlar bir an söner), tek satır, harf aralığı genişleyerek (letter-spacing .02em → .08em) ortaya çıkar, altın ışık halesi + alçak tını + (ses açıksa) kısa sessizlik. Yalnız bölge başına 1–2 kez kullan.
- **Etki:** Yüksek (hatırlanır sahneler). **Zorluk:** S–M. **Risk:** Aşırı kullanım etkisini öldürür; kural: sunumda ≤ 12 "an".
- **Dosyalar:** `ekran.js`, `stil.css`, `gok.js` (kısa karartma API'si `soluk(ms)`), `ses.js` (`an()` tınısı).
- **Öncelik:** P1 · **Onay:** Hayır.

**A4. Bölge sonu cliffhanger'ı ve "kapı" geçişi**
- **Problem:** Zemin→haber, haber→dal, dal→mucize geçişleri sıradan beat geçişi gibi; "bir şey kapandı/açıldı" duygusu zayıf.
- **Öneri:** Her bölge çıkışına 8–12 sn'lik **geçiş sahnesi** şablonu: 1) önceki sonucu tek cümleyle çerçevele ("Kaynak meselesini kapattık: yazı sağlam."), 2) kısa sessizlik (2 sn), 3) bir sonraki soruyu **soru değil merak** cümlesiyle aç ("Peki biri sana, sizden önce de bir kez yaşanmış bir şey anlatsaydı…"). Görsel: gök rengi sıcaktan soğuğa/ışığa kayar; kapanan dal ağaçta gerçekten söner (bkz. F2).
- **Etki:** Yüksek. **Zorluk:** M (içerik + `kapat` olayında `ui` kancası). **Risk:** Mevcut dalların kapanış formülüyle ("ikna oldun mu?") çakışma. **Dosyalar:** `icerik/akis/*.json` (`.kapanis`, `haber.kalan*`), `motor.js` (`kapat` sonrası olay), `diyagram.js`.
- **Öncelik:** P1 · **Onay:** Evet (içerik metni/ton).

**A5. "Soruya hazırlık" mikro-sessizliği**
- **Problem:** Soru, son satırın hemen ardından ~1100 ms sonra form olarak beliriyor.
- **Öneri:** Soru satırı geldikten sonra 1.8–2.5 sn yalnız soru (form gizli) ve yıldızlar; sonra form. Büyük sorular ("Sence hangisi?") için 3 sn. Mobilde klavye açılmaması zaten doğru.
- **Etki:** Orta. **Zorluk:** S. **Risk:** Hızlı kullanıcıyı bekletmek; bu yüzden dokununca atla (`dokun()` zaten hızlandırabilir).
- **Dosyalar:** `ekran.js soruSor`. **Öncelik:** P1 · **Onay:** Hayır.

**A6. Zemin kısaltma + "geç" tutamacı**
- **Problem:** Test raporu: ikna olan kullanıcı 12 soruyu tek tek geçmek zorunda; `zemin.ikna` var ama hatırlatılmıyor.
- **Öneri:** Her 3. zemin sorusunda soru altında silik ikinci çip: "Bu kısmı biliyorum, geçelim" → `zemin.kisa`. Kullanıcı "bilgi: cok" veya "kaynakGuveni: yuksek" ise zemin başında otomatik "kısa yol mu?" teklifi.
- **Etki:** Yüksek (terk azalır). **Zorluk:** S–M. **Risk:** Atlayan kişi ileride temel eksikten itiraz edebilir → motor `zemin` kapalı işaretlemez, yalnız özet verir. **Dosyalar:** `zemin.json`, `ekran.js` (ikincil çip tipi).
- **Öncelik:** P0 · **Onay:** Evet (zemin bütünlüğü/kitap metodu).

### B. Tipografi ve kompozisyon

**B1. Üç katmanlı tipografik skala**
- **Problem:** Hiyerarşi yok (yalnız metin / vurgu / soru).
- **Öneri:** `--t-fisilti` (0.9–1.1rem, harf aralığı .14em, küçük harf, soluk — "sahne notu"/künye), `--t-anlati` (mevcut 1.4–2.3rem), `--t-vurgu` (1.75–3.1rem), `--t-an` (2.2–4.2rem, ince 300, `letter-spacing .05em`). Satıra `"boyut"` yok; mevcut `vurgu` / yeni `an` yetmeli. Anahtar kelime vurgusu için metinde `*altın*` işareti (motor `<em class=k>` üretir; altın ışıma, ağırlık 500).
- **Etki:** Orta-yüksek. **Zorluk:** S–M. **Risk:** Eski içerikte `*` karakteri kullanımı; öncesinde tarama. **Dosyalar:** `ekran.js _satirEl`, `stil.css`, `AKIS-SEMA.md`.
- **Öncelik:** P1 · **Onay:** Hayır.

**B2. Satır kırılımı ve ritim**
- **Problem:** `text-wrap: balance` var ama `max-width:34rem`; Türkçe'de uzun kelimeler (ör. "çoğaltıldı") ve tek kelimeli yetim satırlar (`v2-12`: "yazıldı, toplandı, çoğaltıldı." üç ögeli liste tek satırda). 
- **Öneri:** Virgüllü üçlemeler (`a, b, c.`) için otomatik **üç vuruş**: `a,` … `b,` … `c.` kelime grupları arası 260 ms'lik ek bekleme (veya `|` ile içerikten elle). Yetim kelimeyi önlemek için `text-wrap: pretty` yedek; başlık düzeyinde `max-width: 18ch`'e kadar daralt.
- **Etki:** Orta. **Zorluk:** S. **Dosyalar:** `ekran.js _satirEl`, `stil.css`. **Öncelik:** P1 · **Onay:** Hayır.

**B3. Renk disiplini**
- **Problem:** Altın yalnız vurgu için, ama `.cip`, `.ikon`, `.ipucu` gri-beyaz; kontrast düşük (`.ikon` .38, `.ipucu` .42 alfa).
- **Öneri:** Palet: **Gece** (#02030a–#0a1022), **Parşömen** (metin #efe8d8 — saf mavi-beyaz yerine hafif sıcak), **Altın** (vurgu #f0d49a), **Mühür kırmızısı/bakır** yalnız "kapanan dal" için (#b4543a), **Soğuk mavi** yalnız diyagram çizgisi. Kontrast: ikincil metin ≥ 4.5:1 (şu an ≈ 3:1). Metni `#e9edf6` → `#efe9db` yap (mushaf/çölle uyum).
- **Etki:** Orta. **Zorluk:** S. **Risk:** Marka rengi değişimi görsel kimlik. **Dosyalar:** `stil.css :root`, `index.html theme-color`.
- **Öncelik:** P1 · **Onay:** Evet (marka rengi); kontrast düzeltmesi tek başına onaysız yapılabilir.

**B4. Arapça ayet sahnesi (yeni diyagram türü `ayet`)**
- **Problem:** Kur'an'ın kendi sesi sahnede yok; "ayet" gösterimi yok.
- **Öneri:** `{ "tur": "ayet", "veri": { "arapca": "…", "meal": "…", "kaynak": "Sure no:ayet" } }`. Tasarım: Arapça **tek satır büyük** (clamp 2.2–4rem), sağdan sola (`dir=rtl lang=ar`), ince altın ışıma, **harf harf değil kelime kelime** soldan değil **sağdan** belirir (RTL doğal), ardından 1.5 sn sessizlik, sonra meal sade italik, altında künye (sure:ayet, fısıltı boyutu). Yazı tipi: sistem `"Amiri"` yok; güvenli yığın `"Geeza Pro","Noto Naskh Arabic","Amiri","Traditional Arabic",serif`; kalite için **Noto Naskh Arabic (OFL)** yerel `woff2` (≈ 80 KB subset) önerilir — harici CDN değil. Harekeli metin için doğru iki sıra.
- **Etki:** Yüksek (kilit "aha" sahneleri). **Zorluk:** M. **Risk:** Ayet metni doğruluğu (diyanet/hafs standardı, mushaf kaynağı); yazım hatası ciddi saygısızlık sayılır → her ayet `dogrulanacak` ile ve iki kaynaktan teyit. Font lisansı (OFL serbest).
- **Dosyalar:** `diyagram.js`, `stil.css`, `AKIS-SEMA.md`, `site/yazi/` (yeni font). **Öncelik:** P1 (motor tarafı) · **Onay:** **Evet** (hangi ayetler, Arapça metin, ton).

**B5. Sayı ve tarih kompozisyonu**
- **Öneri:** `sayac`/`zaman` için tabular-nums + eski stil rakam (`font-variant-numeric: oldstyle-nums`) seri tipte zarif; yıl çizgisinde bugünle kontrast (örn. 610 ↔ 2024 aralığı "zaman genişleyen çizgi"). **Zorluk:** S. **Öncelik:** P2 · **Onay:** Hayır.

### C. Hareket tasarımı

**C1. Easing ve süre sistemi (tek kaynak)**
- **Problem:** Süreler dağınık (.6/.8/.9/1.1/1.2/1.8 sn), tek easing `cubic-bezier(.2,.7,.2,1)` + `ease`. Bir "his" tutarsızlığı.
- **Öneri:** Token'lar: `--e-giris: cubic-bezier(.16,1,.3,1)` (hızlı çık, uzun yavaşla), `--e-cikis: cubic-bezier(.7,0,.84,0)`, `--e-nefes: cubic-bezier(.45,0,.55,1)`; süreler: `--s-ince 240`, `--s-kelime 700`, `--s-sahne 1400`, `--s-bolge 2600`. Girişler uzun-yavaş, çıkışlar kısa (satır çıkışı .6 sn → .45 sn). Kelime delay'i 70 ms yerine **aksan eğrisi**: ilk iki kelime daha hızlı, son kelime ağır (son kelimeye +120 ms).
- **Etki:** Orta (kalite hissi). **Zorluk:** S. **Risk:** Test hızlandırma (`.hizli`) etkilenmez. **Dosyalar:** `stil.css`, `ekran.js`.
- **Öncelik:** P1 · **Onay:** Hayır.

**C2. Kamera hissi: tüm sahnelere hafif "sürüklenme"**
- **Problem:** Ken Burns yalnız mushafta; gök/çöl statik (yıldız hafif sola kayıyor).
- **Öneri:** `gok.js`: yıldız katmanlarında **3 derinlik** zaten var → imleç/jiroskop ile ±6 px paralaks (mobil: `deviceorientation` izinsiz olmadığından yalnız dokunma sırasında hafif kayma; iOS izin istemez kullanma). Çölde katman hızlarını beat süresine bağla; şafakta güneş yükselişini beat satır sayısıyla eşle (şu an 16 sn sabit zaman). Sahne değişiminde 0.6 sn'lik **dolly-in** (ölçek 1.00→1.04).
- **Etki:** Orta-yüksek. **Zorluk:** M. **Risk:** Hareket hastalığı → `prefers-reduced-motion`'da kapalı. **Dosyalar:** `gok.js`, `ekran.js`. **Öncelik:** P2 · **Onay:** Hayır.

**C3. Geçiş efektleri sözlüğü (sahne.gecis)**
- **Öneri:** `sahne.gecis`: `"solma"` (mevcut), `"isik"` (kısa beyaz-altın parlama, 600 ms — vahiy/mucize girişi), `"perde"` (yatay ince perde — bölge değişimi), `"nefes"` (gök 1 sn kararır, tekrar açılır — dal kapanışı). Hepsi canvas katmanı + CSS; ek varlık yok.
- **Etki:** Orta-yüksek. **Zorluk:** M. **Risk:** Aşırılaşma; en çok 4 tür.
- **Dosyalar:** `gok.js`, `ekran.js temizle`, `AKIS-SEMA.md`. **Öncelik:** P2 · **Onay:** Hayır.

**C4. Letterbox (sinematik oran)**
- **Öneri:** Mushaf/galeri/çöl sahnelerinde üst-alt 7vh siyah bant (2.2:1 hissi) 1.2 sn'de açılır; yalnız **görsel vurgu** anlarında (A3 "an" ile birlikte), tüm akışta değil. Mobilde dikey ekranda bant yerine vinyet güçlendir (bant mobilde alan çalar).
- **Etki:** Orta. **Zorluk:** S. **Risk:** Menü/ikon çakışması (köşe kontrolleri bant üstünde kalmalı). **Dosyalar:** `stil.css`, `ekran.js`. **Öncelik:** P2 · **Onay:** Hayır.

### D. Etkileşim

**D1. Cevap anı: kullanıcının cümlesi sahneye dönüşsün**
- **Problem:** Gönderince cevap tek silik italik satır olup 1.3–3 sn'de kayboluyor (`cevapGoster`); kullanıcı sunumun parçası olduğunu hissetmiyor.
- **Öneri:** Cevap **kendi tipografisiyle ve altın ince tırnakla** belirsin ("— senin sözün" etiketi yok; yalnızca yeni renk: parşömen + hafif altın çizgi sol kenarda), sahnede 1.4 sn kalsın, sonra **yukarı süzülüp yıldızlara karışsın** (küçülerek, opaklık azalarak, kısa ışık izi). Çip seçimi de aynı işlenir (çip düğmesi yazıya genişler). Sistem yanıtı sonrasında cevaptan **bir kelimeyi** ("ikna olmadım" → "olmadın…") geri yansıtan "ayna" satırı: içerik dalı için `yankı` şablonu (`"Anlıyorum: {anahtar}."`) — niyet eşleşen anahtar kelimesi.
- **Etki:** Yüksek (kullanıcı kendini duyulmuş hisseder). **Zorluk:** M. **Risk:** Yankı yanlış anlamlandırma (yanlış kelimeyi tırnaklarsa ters etki) → yalnız `yollar.anahtar` eşleşmiş ve içerikte `yanki` tanımlıysa kullan.
- **Dosyalar:** `ekran.js cevapGoster`, `stil.css`, `motor.js` (eşleşen anahtarı iletme). **Öncelik:** P1 (animasyon) / P2 (yankı) · **Onay:** Hayır.

**D2. Soru formu: web formu hissini sil**
- **Problem:** `v2-05`: bordür çizgi + yer tutucu + çiplerin çerçeveli hapları. Çipler "buton" gibi.
- **Öneri:** Çipler **çerçevesiz, sadece metin**, aralarında ince `·` ya da altın nokta; hover'da altın alt çizgi. Yer tutucu: soruya özel kısa ("Aklından geçeni yaz…" yerine bağlama özel, soru nesnesine `ipucu` alanı; yoksa "Aklından geçeni yaz…"). Gönder `↵` yerine ince ok. Mobilde çipleri **yatay kaydırmalı tek satır** (flex-wrap yerine) değil: dikey 3 satır, 48 px yükseklik, tam genişlik tıklama.
- **Etki:** Orta-yüksek. **Zorluk:** S. **Dosyalar:** `stil.css`, `ekran.js _form`. **Öncelik:** P0 · **Onay:** Hayır.

**D3. Beklemede mikro-animasyonlar**
- **Öneri:** (a) Form açıkken yazı imleci yanında **tek yıldız nabzı** (4 sn döngü). (b) 25 sn cevap gelmezse soru satırı çok hafif "nefes" alır (opaklık .9↔1) ve aşağıda silik "acele yok" (en fazla bir kez). (c) Gönderildikten sonra sistemin düşünme anında (yanıt hazırlanırken 600–900 ms yapay gecikme **ekle**: anlık yanıt "bot" hissi verir) üç noktalı değil, **tek yıldızın parlayıp sönmesi**. (d) Yazarken (input event) arka plandaki yıldız hareketi 20% yavaşlar: "dinliyor" hissi.
- **Etki:** Orta-yüksek. **Zorluk:** S–M. **Risk:** Yapay gecikme kasıtlı olduğundan hızlandırma (dokun) ile atlanabilmeli. **Dosyalar:** `ekran.js`, `gok.js` (`hizCarpani`), `stil.css`. **Öncelik:** P1 · **Onay:** Hayır.

**D4. Mobil jestler**
- **Öneri:** Dokun = hızlandır (var). Ekle: **aşağı kaydırma** = "tekrar oku" (önceki 3 satırı 4 sn göster, sonra devam); **yukarı çek** = "ara ver"; uzun basma = yalnız ses/menü. Tüm jestler gizli ama ilk açılışta tek seferlik ipucu ("aşağı çek: tekrar"). `touch-action` ayarı korunur.
- **Etki:** Orta. **Zorluk:** M. **Risk:** Yanlış tetikleme, klavye ile çakışma; ipucu yeterince belirgin olmayabilir. **Dosyalar:** `main.js`, `ekran.js`. **Öncelik:** P2 · **Onay:** Hayır.

**D5. Geri alma ve "bir önceki satıra dön"**
- **Öneri:** Kullanıcı yanlış çipe bastıysa 3 sn'lik "Geri al" (yalnız çip cevaplarında, ince metin, form yerinde). **Zorluk:** M (motor durumu geri sarma). **Öncelik:** P2 · **Onay:** Hayır.

### E. Kaynakların sunum içinde gösterimi

Tasarım ilkesi: **kaynak, sahnenin dışındaki bir dipnot değil; sahnenin "güvenilirlik katmanı"**. Üç seviye, her biri bir öncekini isteğe bağlı açar.

**E1. Seviye 1 — Anlatıda isim (zorunlu)**
Metinde isim ("Tarihçi W. Montgomery Watt şöyle der…") içerik tarafından verilir; bu zaten kuraldır. Tasarım gereği: isim satırın içinde **altın değil**, hafif ağırlıkla (500) ve parşömen üzerinde ince alt çizgi (`border-bottom: 1px dotted rgba(240,212,154,.45)`) — dokunulabilir olduğu belli olur ama bağlantıya benzemez.

**E2. Seviye 2 — Satır altı künye ("fısıltı satırı")**
- Satırın hemen altında, `--t-fisilti` boyutunda, harf aralığı .12em, soluk (.55 alfa), **satır bittikten 700 ms sonra** süzülerek gelir: `Watt · Muhammad at Mecca · Oxford, 1953`. Sayfa varsa künyenin sonunda `· s. 52` (kitap/sayfa kuralı: bu, **kaynak eserin** sayfası, kitabın değil; v2'nin "kitap sayfası yok" kuralı ile çelişmez).
- Satır yok olunca künye de onunla gider; kalıcı değildir. Mobilde tek satıra sığmıyorsa `Yazar · Eser, yıl` (sayfa ve yer kart içinde).
- Doğrulanmamış künye (`dogrulanacak: true`): künye yine görünür ama sonunda `·` yerine ince soru işareti **gösterme**; bunun yerine bu satırı yayında hiç gösterme (onay listesinde bekler). Yayın ölçütü: `dogrulanacak:true` künye ekranda yok, yalnız isim anlatıda varsa bile sorumluluk içerikte.

**E3. Seviye 3 — Kaynak kartı (dokununca)**
- Künye veya isme dokununca **sahne durmaz, kısılır**: arka plan %40'a kararır, satır yığını 0.6 ölçeğe küçülür, altta yukarıdan **yarım ekran cam panel** (backdrop-blur 14px, 1 px altın üst çizgi) açılır. İçerik: büyük yazar adı (serif 1.6rem), "kimlik" notu (`kaynak.not`: "İskoç oryantalist, Edinburgh Üniv."), eser/yer/yıl/sayfa, **ilgili kısa alıntı** (2–3 satır, italik), alt kısımda "Kaynakça'da gör" ve "Kapat". Kapatma: dışarı dokun/Esc/aşağı kaydır. Sunumdan **çıkarmaz**, dış bağlantı yok.
- Motor: kart açıkken `ui.dokun()` hızlandırması kapalı, zamanlayıcılar `duraklat()` (yeni küçük API: `ui.duraklat()/surdur()`); kapanınca kaldığı yerden devam.
- Erişilebilirlik: kart `role="dialog"`, odak tuzağı, `aria-labelledby`.
- **Etki:** Yüksek (güven + sahneyi bozmama). **Zorluk:** M–L (duraklat/sürdür kritik, mevcut `cur` zamanlayıcıları iptal-tabanlı). **Risk:** Duraklatma hataları; kart içeriğinin uzunluğu mobilde taşması. **Dosyalar:** `ekran.js`, `stil.css`, `index.html` (kart kökü), `motor.js`, `AKIS-SEMA.md` (kaynak alanına `kimlik`, `alinti` ekleme).
- **Öncelik:** P1 (E2 + kart iskeleti) · **Onay:** Hayır (kural zaten onaylı); kart metinleri içerik onayına tabi.

**E4. Seviye 4 — Sunum içi Kaynakça sahnesi**
- Menüde ("⋯") "Kaynaklar" girişi ve kapanışta. Görünüm: sahne gibi **yıldızlı zemin, yavaş kayan liste**; her kaynak bir "yıldız-işaret": isim büyük, altında eser/yıl; dokununca E3 kartı. Kullanıcının **o oturumda gördüğü** kaynaklar parlak, görmedikleri soluk (`durum.gorulenKaynaklar`); başlık: "Bugün konuşurken yaslandıklarımız". Alfabetik değil **karşılaşma sırasıyla**.
- **Etki:** Orta-yüksek (şeffaflık, saygı). **Zorluk:** M. **Risk:** Listeyi tam tutmak için içerikte `kaynak` alanlarının doldurulması şart (şu an 0). **Dosyalar:** `durum.js`, `ekran.js`, `main.js`, yeni `icerik/akis/kaynakca.json` veya `kapanis.kaynakca` beat'i. **Öncelik:** P1 (tek sayfa) · **Onay:** Evet (hangi kaynaklar ve yazarların tanıtım metinleri).

**E5. İsimli kaynak anının dramaturjisi**
- Oryantalist isim ilk kez geçince **kısa bir "tanıklık" vuruşu**: karşılaştırma/alıntı diyagramında isim altın küçük harf (versalet) ve altında tek satır kimlik ("Gayrimüslim tarihçi, 1953"). Böylece "tarafsız kaynak" vaadi **görsel olarak** her seferinde tazelenir (açılış formatı bir kez söylüyor).
- **Etki:** Orta-yüksek. **Zorluk:** S (alıntı diyagramı zaten `kim`, `kaynak` alıyor; kimlik satırı eklenir). **Öncelik:** P1 · **Onay:** Hayır.

### F. Görsel atmosfer

**F1. Yıldız alanı ve gök**
- Güçlü; öneri: yıldızlara 2 renk sıcaklığı zaten var. Ekle: **ışıma katmanı** (çok yavaş, 40 sn periyotlu, %8 parlaklık dalgalanması ile "nefes"), nadir ikinci kayan yıldız (soru anında asla, yalnız satır akışında). Nebulayı sahneye göre renklendir (zemin: soğuk mavi; haber: mor; samimiyet: bakır; fetanet: yeşilimsi-gri; mucize: altın). **Zorluk:** S. **Öncelik:** P2 · **Onay:** Hayır.

**F2. İhtimaller ağacı = takımyıldız**
- **Problem:** Düz hap düğümleri (`v2-05`).
- **Öneri:** Düğümler **yıldız**, kenarlar **ince çizgi**, etiketler fısıltı yazı; ağaç gökyüzündeki "burç" gibi: Haber en parlak yıldız. Vurgu: yıldız parlar + halka açılır. **Kapanan dal:** yıldız yavaşça söner, çizgi kopar (bir parça aşağı kayar), bakır tonda tek halka; sunumdaki en önemli "kapanış" anı. Kapalı olmayan ama tamamlanmış "ikna olmadı" durumu ayrı: gri çizgi, soru işareti yıldızı.
- **Etki:** Yüksek (görsel imza). **Zorluk:** M. **Risk:** Okunabilirlik (etiketler küçülmesin; min 16 px). **Dosyalar:** `diyagram.js ihtimaller`, `stil.css`. **Öncelik:** P1 · **Onay:** Hayır.

**F3. Çöl, şafak ve ışık: "sahne kimlikleri"**
- Öneri: Her bölgeye ışık kimliği (sakin gece → soğuk şafak → sıcak gün batımı → sert öğle ışığı → altın huzmeler). `kur()` zaten mod harmanlıyor; ekle **bölge paleti** (3 renk) ve **ufuk çizgisi** (çöl dışında da alçak bir kum çizgisi/siluet). Çöl katmanlarına **ince rüzgâr tozu** (alfa .06 parçacık). Hz. Muhammed/Mekke sahnelerinde **hayvan/insan silueti yok** (ikon/figür sorunu): yalnız ufuk, yıldız, ışık. **Zorluk:** M. **Onay:** Evet (figür kararı: figürsüzlük teyidi). **Öncelik:** P2.

**F4. Mushaf sahneleri**
- **Problem:** `v2-03`: görsel çok kararıyor (rv sonrası ≈ %72+ vinyet); yazılar okunur ama mushaf **neredeyse kayboluyor**; blur 2px.
- **Öneri:** "Net" fazını uzat (2.2 sn), sonra karartmayı **%55**'e çek; metin okunurluğu için görselin **yan tarafına kaydır** (yazı sol/orta, mushaf sağa odaklı Ken Burns) veya yazı arkasına yalnız **tek koyu elips** bırak (zaten var) — tüm ekranı kapatma. Satırlar arasında 2 sn'lik "yalnız görsel" nefesi (`gorsel` + boş metin satırı zaten destekleniyor, 4.2 sn); kullanılan beat'leri çoğalt. Görsel altı lisans/künye fısıltısı (E2 ile aynı bileşen).
- **Etki:** Yüksek. **Zorluk:** S–M. **Risk:** Okunabilirlik; ölçmek için kontrast testi (üst bölge). **Dosyalar:** `gok.js gorseller`, `stil.css`. **Öncelik:** P1 · **Onay:** Hayır (lisanslar ayrı).

**F5. Renk paleti ve oran**
- Bkz. B3, C4. Ek: köşe ikonları için hafif parlaklık (.38 → .6), başlangıçta 3 sn belirgin sonra soluk.

### G. Ses

**G1. Katmanlı ambiyans**
- Mevcut drone iyi. Ekle (prosedürel, dosyasız): **bölge rengi** (filtre kesim frekansı ve akor kaydırma: zemin sakin/saf beşli, samimiyet kısa-ikili gerilim, fetanet düşük ve ince, mucize açık majör + yüksek hava), **soru tonu** (zaten), **"an" tınısı** (A3: alçak + uzun yankı), **kapanış dal tınısı** (düşen iki nota, 2.2 sn), **sessizlik anı** (A2 `sessiz`: master gain 600 ms'de %20'ye iner, yankı kuyruğu kalır).
- **Etki:** Orta-yüksek (sesli kullanıcılarda). **Zorluk:** M. **Risk:** Tarayıcı ses politikası (kullanıcı eylemi sonrası), mobilde pil. **Dosyalar:** `ses.js`, `ekran.js`, `motor.js` (bölge olayı). **Öncelik:** P1 (sessizlik + an tınısı), P2 (bölge renkleri) · **Onay:** Hayır (prosedürel). **Kaydedilmiş müzik/dosya veya insan sesi = onay şart.**

**G2. Sesli anlatım (seslendirme)**
- Opsiyonel. Sinematik değer yüksek ama: Peygamber/ayet seslendirmesi, kıraat, ses sanatçısı seçimi ve lisans, çok dilli planlama. **Sınır:** TTS yalnız erişilebilirlik için sistemin kendi sesi (Web Speech) opsiyonel; marka sesi ayrı karar.
- **Zorluk:** L. **Öncelik:** P2 · **Onay:** **Evet (kesin).**

**G3. Ayet/ezan/kıraat sesleri**
- Müslüman olmayan muhataba "Kur'an okunuşu" arka planı itici olabilir veya dayatma gibi algılanabilir; ayrıca saygı sınırları. **Öneri:** Varsayılan **yok**. **Onay:** **Evet.** **Öncelik:** P2.

### H. Erişilebilirlik ve performans

**H1. Kontrast ve ölçek:** `.ikon` .38 → .62, `.ipucu` .42 → .6, `.satir.eski` .42 → .5, `.cip` metni .74 → .85; küçük metinlerde min 14 px → 15 px; mobil çip 48 px yüksek. Kontrast ölçümünü mushaf üstünde de yap. **S, P0, onay yok.**

**H2. Okuma hızı ve duraklatma:** `prefers-reduced-motion` tam destek var; ek: kullanıcı ayarı "Yavaş/Normal/Hızlı" (süre çarpanı `ui.hiz`) menüde; ekran okuyucu kullanıcıları için **tüm satır akışını** `aria-live` metninde sırayla ver; soru/çip/giriş alanı `role=group aria-label=soru`; "Atla/Hızlandır" klavye kısayolu ipucu (`Boşluk`). **M, P1.**

**H3. Klavye:** Menü `Esc` ile kapanıyor (iyi); soru formunda `Tab` sırası input→çipler; kaynak kartı odak tuzağı; `↵` gönderimi. **S, P1.**

**H4. Performans:** `canvas.filter: blur` (Safari desteklemiyor, diğerlerinde pahalı) → görsel yüklenince bir kez **ofscreen canvas'a önceden bulanık sürüm** çizip kare başına `drawImage` ile kullan. Yıldızlar 900'e kadar (`W*H/1700`) → mobilde ≤ 350. `requestAnimationFrame`'i `prefers-reduced-motion` dışında da 30 fps'e düşür (şu an tam hız); batarya tasarrufu. Görseller: `Image` ön yükleme sırası, 44 mushaf JPG boyutu (kitaptan; yeniden boyutlama gerekebilir: ≤ 1920 px, ≤ 350 KB, WebP yedeği). **M, P1 (blur önbelleği + mobil yıldız), P2 (WebP).**

**H5. Dil/okuma:** `lang="tr"` doğru; Arapça parçalar `lang="ar" dir="rtl"`. `<title>`: "Biraz konuşalım" yerine ilerlemede değişmeyen sabit (iyi); sosyal paylaşım için `meta description`/`og:*` (yayın hazırlığı). **S, P2.**

**H6. Gizlilik:** localStorage yalnız yerel; ses tercihi de. Kaynak "görülenler" listesi yerelde kalmalı (zaten). **Onay:** gerekmez.

---

## 3. İlk uygulama paketi (builder için)

Hepsi **onay gerektirmeyen** P0+P1 işleri; her madde tek başına birleştirilebilir. İçerik değiştiren maddeler (A1, A4, A6, B3-renk, B4, E4 liste içeriği, F3) pakete **girmedi**; bunlar için aşağıdaki "Onay bekleyen kararlar" kullanılacak.

1. **Kontrast/dokunma düzeltmesi (H1).** `stil.css`: `.ikon` rengi .62, `.ipucu` .6, `.satir.eski` .5, `.cip` renk .85, `.cip` min-yükseklik 44 px, yazı 15 px. Mushaf karelerinde üst satır grubunun okunurluğunu elle kontrol et.
2. **Soru formu cilası (D2).** `.cip`'i çerçevesiz metne çevir (alt çizgi hover), `.alan input` placeholder'ı soru nesnesindeki isteğe bağlı `ipucu` alanından al (yoksa "Aklından geçeni yaz…"); mobilde çipleri tam genişlik dikey, 48 px.
3. **Soru öncesi nefes (A5).** `ekran.js soruSor`: form gecikmesini `1100` → `1800 + 70×kelime` (≤ 2600), soru "büyük" ise (`q.buyuk`) 3000. `dokun()` ile atlanabilir kalsın.
4. **Cevap anı dönüşümü (D1, animasyon kısmı).** `cevapGoster`: cevap 1.5 sn parşömen renkte, sol kenarda ince altın çizgi, sonra küçülerek/yukarı süzülerek sön; çip tıklanınca aynı akış. `prefers-reduced-motion`'da yalnız opaklık.
5. **Beklemede mikro-animasyon + düşünme anı (D3 a, c, d).** İmleç yanında tek yıldız nabzı; gönderim sonrası 600–900 ms "tek yıldız parlama" (iptal edilebilir, `dokun()` ile atlanır); yazarken `gok.hizCarpani = 0.8`.
6. **Tempo ve sessizlik alanı (A2).** Şemaya ekle: satırda `"tempo": "hizli"|"yavas"`, `"duraklama": ms`, `"sessiz": true`. `ekran.js satir()` süre/gecikme çarpanları; `.satir.hizli .w` 180 ms aralık, `.satir.yavas .w` 140 ms ek. İçerik beat'lerine **işaret koyma bu pakette yok**; yalnız motor desteği ve `acilis.merhaba` ile `acilis.iddia` için örnek uygulama (içerik ekibi onaylar).
7. **"An" vuruşu (A3).** `"vurgu": "an"`: 700 ms karartma (`gok.soluk`), harf aralığı animasyonu, altın hale, `ses.an()` tınısı. Sunum başına ≤ 12 sınırı kod değil içerik kuralı; `AKIS-SEMA.md`'ye yaz.
8. **Tipografi skalası (B1, B2).** `--t-fisilti/--t-anlati/--t-vurgu/--t-an` token'ları; `*anahtar*` altın vurgu işareti; üçleme ve yetim kelime önleme; `text-wrap: pretty` yedeği. `*` içeren mevcut içerik varsa uyar (hazirla.sh kontrolü).
9. **Easing/süre token'ları (C1).** Yukarıdaki `--e-*`, `--s-*` değerleri; satır çıkışı .45 sn; son kelime +120 ms.
10. **Kaynak künyesi ve kartı (E2, E3, E5).** Şema: kaynak alanına `kimlik` (mevcut `not`) ve `alinti` (opsiyonel kısa metin) alanları; `Ekran.satir` satırda `kaynak` varsa 700 ms sonra fısıltı künyesi; isim ve künyeye dokunma → `ui.duraklat()` + cam panel (dialog, odak tuzağı, Esc/dışarı dokun/aşağı kaydır kapatır) → `ui.surdur()`. `alinti` diyagramında `kim` altına kimlik satırı. Dış bağlantı yok. Henüz `kaynak` alanı olmayan içerik için test verisi `site/ornek-akis.json`'a eklenmeli.
11. **Kaynakça sahnesi iskeleti (E4, motor tarafı).** `durum.gorulenKaynaklar` (yerel); menüye "Kaynaklar"; yıldızlı liste sahnesi (görülen parlak, görülmeyen soluk); her öğe E3 kartını açar. İçerik listesi `kapanis` beat'ine dayanır; liste dinamik (gösterilen kaynaklardan).
12. **İhtimaller ağacı = takımyıldız (F2).** `diyagram.js ihtimaller`: yıldız düğümler, vurguda halka, kapanan dalda sönme + kopan çizgi + bakır halka (kapalı = `veri.kapali` + durum). Okunabilir minimum yazı 16 px.
13. **Mushaf sahnesi ayarı (F4).** `gok.js`: net faz 2.2 sn; karartma ≤ %55; yalnız görsel nefesi için mevcut boş-satır desteğini kullan; vinyet/elips korunur.
14. **Ses: sessizlik + an tınısı (G1 kısmı).** `ses.sessizlik(ms)` (master %20'ye iner), `ses.an()`, `ses.dalKapandi()`; çağrılar `ekran.js`/`motor.js` olaylarından.
15. **Performans (H4 kısmı).** Mushaf bulanığını bir kez ofscreen canvas'a bake et; mobilde yıldız tavanı 350; ses/animasyon `document.hidden` iken durdur (var).
16. **Erişilebilirlik (H2, H3).** Menüde "Hız: Yavaş/Normal/Hızlı" (`ui.hiz`); soru formunda `role=group`; kaynak kartı odak tuzağı; test: `window.__sunum.hiz()` ile Playwright regresyonu (`docs/test-raporu.md` senaryoları).

Önerilen sıra: 1 → 2 → 3 → 9 → 8 → 4 → 5 → 6 → 7 → 14 → 12 → 13 → 10 → 11 → 15 → 16. Her adım sonrası altı persona testini yeniden koş.

---

## 4. Kullanıcı onayı gerektiren kararlar

| # | Karar | Neden kritik |
|---|---|---|
| 1 | **A1: Açılışta ihtimaller ağacı önizlemesi ve akış sırası değişimi** | Kitabın kronolojisi ve CLAUDE.md "adım atlama yok" kuralı |
| 2 | **A6: Zemin için "geç/özet" yolları** | Zemin bütünlüğü (kapalı devre ispatın temeli) |
| 3 | **A4: Bölge geçiş metinleri ve cliffhanger cümleleri** | Ton/içerik |
| 4 | **B4: Arapça ayetlerin sunumda yer alması, hangi ayetler, font** | Dini metin doğruluğu, saygı, lisans (Noto Naskh OFL) |
| 5 | **B3: Marka paleti değişimi** (parşömen metin, bakır kapanma rengi) | Görsel kimlik |
| 6 | **E4: Kaynakça listesi içeriği, yazar kimlik notları** | Gayrimüslim yazarların nitelendirilmesi ("İskoç oryantalist" vb.), doğruluk (`dogrulanacak`) |
| 7 | **F3: Figürsüzlük teyidi** (Mekke/Peygamber sahnelerinde insan/hayvan silueti yok) | Dini hassasiyet |
| 8 | **G2: Sesli anlatım/seslendirme, marka sesi** | Ücretli/telifli, ton |
| 9 | **G3: Kur'an okunuşu/ezan gibi gerçek ses varlıkları** | Müslüman olmayan muhatapta algı; lisans |
| 10 | **Ücretli varlıklar** (stok müzik, fotoğraf, font) | Bütçe/lisans; öneri: yalnız prosedürel + OFL + kamu malı |
| 11 | **Yapay "düşünme" gecikmesi** (D3c) | Dürüstlük: kullanıcı AI sanmasın; ileride LLM katmanı gelince netleştirilmeli |

Onay gerekmeyenler: tipografi/hareket/kontrast/erişilebilirlik/performans düzeltmeleri, soru formu cilası, tempo/"an" motor desteği, kaynak kartı **bileşeni** (içeriğin kendisi hariç), takımyıldız ağacı, prosedürel ses.
