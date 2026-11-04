# İçerik Değerlendirmesi — v2.1 Akış (6 bölge, 126 beat)

> Değerlendirici ajan raporu. **İçerik ve kod düzenlenmedi**, yalnız bu dosya yazıldı.
> Tarih: 2026-11-04. Okunan: `CLAUDE.md`, `icerik/AKIS-SEMA.md`, `docs/test-raporu.md`, `docs/etkilesim-modeli.md`, `docs/dogrulanacaklar.md`, `docs/eksikler.md`, `docs/onay/*.md`, `docs/metod-haritasi.md` (§3–§5), `docs/bolumler/*` (taramalı), `icerik/akis/*.json` (tamamı), `site/js/niyet.js`.
> Denenen: `scripts/hazirla.sh` → `site/` statik sunucu (8140) → Playwright (Chromium, `__sunum.hiz(0.03)`), **6 persona tam yolculuk (toplam ~450 adım)** + **31 hedefli mikro-test** (tek beat'e `git()` ile gidip tek cevap). Sunucu kapatıldı.
> Ham dökümler: `…/scratchpad/dgr/{ateist,hristiyan,yahudi,deist,genc,saldirgan}.txt`, `pol.out`, `pol2.out`.

**Eşzamanlı çalışan içerik ajanından kalanlar (bitmemiş):** (1) **Açılış kancası yok** — `acilis.merhaba` hâlâ "Gece. Her yer sessiz."; `acilis.onizleme` eklendi ama kanca değil. (2) **Merak cümleleri** yalnız `haber.*` ve `mucize.gecis` sonlarında; `samimiyet`, `fetanet`, `zemin` beat geçişlerinde yok. (3) **Ayet kartları** 32 adet (samimiyet 12, mucize 9, zemin 7, fetanet 4); `zemin.tahrif`, `fetanet.hudeybiye/ongoru`, `mucize.kissa-yusuf/adem` ve `samimiyet.tutulma` ana satırlarında (Tevbe 40 yalnız mağara EK'sinde) yok; meal'ler `dogrulanacak`. (4) `zemin.ozet-*` eklendi (kısa yol çalışıyor) ama "Tamam, makul" gibi gerçekçi onaylar tanınmıyor (bkz. MTR-5).

---

## 1. Genel değerlendirme

### Puanlar (1–10)

| Ölçüt | Puan | Tek cümle gerekçe |
|---|---|---|
| **İkna gücü / metoda sadakat** | **6.5** | Kapalı devre iskeleti (haber → 3 ihtimal → samimiyet/fetanet → mucize) net ve zarif; ilzam soruları çoğunlukla gerçekten yüzleştiriyor. Ama fetanet dalı "bilmeden yanılma"yı "ağır psikoz"a indirgiyor, bu yüzden **en güçlü itiraz (sağlıklı ama yanılmış vizyoner) cevapsız**; savaşlar, Beni Kureyza, Aişe, "ayetler işine geliyordu" gibi **muhatabın ilk akla gelen itirazları hiç yok**. |
| **Doğruluk / kaynak** | **5.5** | Çoğu olgu kaynaklı. Ama **kendi iç çelişkileri** (Armstrong ifadesi bir yerde "kasten kullanılmadı", başka yerde ekranda), **yanlış genelleme** (Gassani/Lahmi "tek tanrıcılığa geçmedi"), **kaynağı tersine işleyen kullanım** (San'a palimpsesti, Corpus Coranicum "24 sayfa", Nag Hammadi), **aşırı iddia** ("yeryüzünde Kur'an kadar yazması olan kitap yok" — hemen üstteki tabloda Yeni Ahit 5.000+) var. |
| **Anlatım** | **7.5** | Kısa, sahneli, sinematik; "sen" dili sıcak; vurgu ve ayet anları iyi. Zayıf: kalıp soru cümleleri (319 sorunun 41'i "Peki…", 18'i "Senin iddian…", 15'i "mantıken…"), yanlış atıf ("Senin iddian bir sahtekârdı" — kullanıcı öyle demediyse), hâşâ edebinin yalnız dal girişlerinde kalması (64 olumsuz ifadeden 1'inde), basketbol/Messi/Irak benzetmeleri. |
| **Akış / etkileşim** | **5.0** | **Sınıflandırıcı kutupluluk hatası** (aşağıda) kullanıcıyı çoğu zaman ikna olmadığı hâlde "ikna oldu", ikna olduğu hâlde "ret" saydırıyor; gerçek itirazlar sessizce "yeni örnek"e çevriliyor; uzun/ilgisiz/saldırgan kullanıcı için çıkış yok; "Müslüman olmak istiyorum" gibi kritik niyet yok sayılıyor; "Buna birazdan geleceğiz" sözü **hiç tutulmuyor**. |

### Güçlü yanlar (korunmalı)
1. **Mimari:** zemin → haber → ihtimaller → dal → mucize → kapanış; "dal yalnız kullanıcı ikna olunca kapanır" ilkesi dürüst; `kapanis.harita-acik` (gezilmeyen dalı kapalı saymama) çok iyi.
2. **Kur'an-içi "utanç ölçütü" delilleri** (Abese, Tevbe 43, İsra 74–75, Kıyâme 16–19, Duhâ 3/9–10, Ahzâb 37): bütün sunumun en sağlam, en az itiraz edilebilir argümanları. Ayet kartları bunları çok güçlendiriyor.
3. **Samimiyet bölgesindeki kurgu:** "zırhı rehinde ölen", "oğlunun ölümünde tutulmayı düzelten" (`samimiyet.tutulma`) — sunumun en iyi "aha" anı; vurgu `"an"` ile işaretlenmeye değer.
4. **Rum kehaneti sahneleri:** somut tarihler, ayetin Mekke'deki alay/bahis bağlamı, beş şart (`mucize.rum-kehanet`): sonuçsuz bırakmayan, doğrulanabilir tek mucize penceresi.
5. **Format dürüstlüğü:** `zemin.ikna` "Kur'an kendi hakkında iddia taşır; delil olarak değil, sınanabilir iddia olarak" cümlesi; `samimiyet.kapanis` "Bu, peygamberliği tek başına kanıtlamaz" cümlesi; `kapanis.karar`.
6. **Kısa yol (`zemin.ozet-*`)** çalışıyor; persona 2/4'te zemin 5 beat'te geçildi.

### Zayıf yanlar (özet)
1. **Fetanet'in mantık boşluğu:** "bilmeden yanılma" = "hastalık" (psikoz/sara) eşitlendi; başarı ≠ deneyimin gerçekliği. Joan of Arc / Swedenborg / Joseph Smith tipi **sağlıklı vizyoner** itirazı (persona 1'in tam yazdığı) cevapsız ve — daha kötüsü — yanlış kutuya ("hasta" anahtarı) düşüp tersini söyleyen cevap alıyor.
2. **Kutupluluk (polarity) hatası** — kural tabanlı sınıflandırıcı "evet"i hep ikna, "hayır"ı hep ret sayıyor; ilzam soruları ise çoğunlukla "…mı?" biçiminde **ve beklenen cevap "hayır"**. Sonuç: "Hayır, etmez" → ret, "Evet, bir sahtekâr yapabilir" → ikna.
3. **Anlaşılmayan itiraz = yeni örnek** (kullanıcı "duyulmadı" hisseder). Gerçek itirazlar (Aişe, Kureyza, Haccâc, "kılıçla yaydı", apokrifler, "ayetler sonradan hadislere eklenmiş") anahtar tutmazsa alakasız `ekOrnek` gelir.
4. **Doğruluk riskleri** (aşağıda MCZ/ZMN/FTN): üçü P0.
5. **Bazı beat'ler "göstermek zorunda" retoriği taşıyor** ("Vardı diyen göstermek zorunda") ve kullanıcı gerçekten gösterdiğinde (Pseudo-Matta, Tomas) bunu yok sayıyor.
6. **Yahudi/Hristiyan muhatap için saygı vaadi** (`acilis.din`: "kutsal kitabına saygıyla konuşacağız") ile **kıssa beat'lerinin dili** ("hatalarını da kopyalar", "Eyyub kıssasında … lanet eder", "ağır ifadeler atfedilir") çelişiyor.

---

## 2. Persona yolculukları

Tüm koşular `hiz(0.03)`; cevaplar serbest metin (çip değil), gerçekçi Türkçe.

### P1 — Ateist-materyalist, bilgili (114 adım, kapanış: veda)
Yol: acilis → "Osman mushafları yaktırdı, sonradan yazılmış" → zemin (ayrıntılı) → … → haber → "bilmeden yanılıyor, samimi ama" → fetanet → kapanış.

| Cevabım | Ekran tepkisi | Değerlendirme |
|---|---|---|
| `zemin.yazim`: "Osman başka mushafları yaktırdı…" | itiraz yanıtı: "çoğaltmadan sonra farklı sayfaların toplatıldığı anlatılır… " | **İyi** (anahtar tuttu) |
| `zemin.siffin`: "Bu hikâye de sonradan Müslüman kaynaklarda yazılmış, tek kaynak" | alakasız `ekOrnek` (500 nüsha) | **Kaçırıldı**; en güçlü itiraz (kaynak dairesi) cevapsız |
| `zemin.tahrif`: "Haccac Kur'an'da değişiklik yaptığı rivayet edilir" | `ekOrnek` (Hâricîler) | **Kaçırıldı** |
| `zemin.siffin`: "Tamam, makul" | ikna sayılmadı, 2 ek örnek + kompozisyon | **Hata** ("makul/tamam" tanınmıyor) |
| `zemin.kiyasYazma`: "Yeni Ahit'in 5000 yazması var, Kur'an'ın o kadar…" | `ekOrnek` (Duygu tablosu) | **Kaçırıldı**; üstelik ekranda Altıkulaç "yeryüzünde Kur'an kadar yazması olan başka kitap yok" diyor |
| `zemin.musrikler`: "Hristiyanlar hatalar buldu: Meryem Harun'un kardeşi, Haman" | "Kur'an bu rolü açıkça üstlenir…" | **Yanıt alakasız**; ekranda "açık bir hata itirazı bilinmiyor" yazılı |
| `haber.dorduncu`: "Evet, bence var: samimi dinî deneyim, hasta da değildi" | "epilepsi, halüsinasyon, vizyon… hepsi aynı kutuda" | **Kısmen iyi** — ama sonraki adım "hasta" anahtarıyla fetanet.giris'e atıyor ("…en ağır psikoz tablolarından biridir") |
| `haber.demet`: "İspat yükü iddia edende. Ben bir şey ispatlamak zorunda değilim" | `ekOrnek` ("on mucize, on samimiyet…") | **Kaçırıldı** ("ispatlamak" ≠ "ispat etmek") |
| `fetanet.teshis`: "Temporal lob epilepsisi olabilir" | fetanet.hastalik → "Sara mı, halüsinasyon mu?" | **TLE hiç ele alınmıyor** |
| `fetanet.formul`: "Başarı, deneyimin gerçek olduğunu göstermez" | `ekOrnek`: "72 yaşında Cebrail göründü… yazılım sistemi" | **Çökme noktası**: itirazın tam isabetli, cevap saçma analoji |
| `fetanet.toplum`: "Arabistan savaşçı bir toplumdu" | `ekOrnek` (Dozy kardeşlik) | **Doğru itiraz, cevap yok** (ekranda "savaş sanatını bilmeyen toplum" yazıyor) |
| `fetanet.siyasi`: "Sonra kılıçla yaydı" | `ekOrnek` (Ebubekir hutbesi) | **Kaçırıldı**; ekran "Güçle değil, fikir ve ahlakla" |
| `fetanet.ongoru`: "Bu tahminler olaydan sonra hadislere eklenmiş" | `ekOrnek`: "Irak, Çin ve ABD'den güçlü…" | **Kaçırıldı** (vaticinium ex eventu) + saçma benzetme |
| `fetanet.kapanis`: "Jeanne d'Arc da ses duyuyordu, ordu yönetti, **hasta değildi**" | itiraz yanıtı: "Sarayı konuştuk… hastalık bunu açıklıyorsa…" | **Yanlış kutu** ("hasta" olumsuzlaması yok sayıldı) |
| `mucize.gecis` | "Pencerelerin hepsine baktık." | **Yalan** (yalnız belagat'a bakmıştı) |
| `kapanis.soru`: "Kur'an'daki bilimsel hatalar hâlâ aklımda" | "Yazdığın için teşekkür ederim… İyi sorular iyi bir yolun işaretidir." | **Yok sayıldı** |

**Sonuç:** Bilgili ateist ~10 gerçek itiraz yazdı; **yalnız 2'sine (Osman, hafızlar) uygun cevap** aldı. Sunumun güvenilirlik kaybı burada.

### P2 — Kültürel Hristiyan, "Hristiyanlardan/İncil'den öğrenmiş" (37 adım)
Akış akıcı, temiz (kısa yol + `fetanet.kitapehli` → kıssalar). Tıkanma noktaları:
- `fetanet.kitapehli`: "Araplar … **tek tanrıcılığa geçmediler**. Gassaniler Bizans'ın, Lahmiler İran'ın komşusuydu. Orada böyle bir atılım olmadı." → Gassaniler/Lahmiler **Hristiyan**, Himyar kralları Yahudi idi. Hristiyan muhatap ilk cümlede "yanlış" der.
- `mucize.kissa-sonuc`: "Mekke'de bilinen anlatılardan: apokrif İnciller, Meryem'in hurma ağacı, İsa'nın kilden kuşları" → cevap: "Bilgi düzeylerini sırala… **'Vardı' diyen bunu göstermek zorunda.**" Kullanıcı tam da gösterdi (Pseudo-Matta, Tomas'ın Çocukluk İncili); sunum duymamış gibi davranıyor. **En kritik saygı/doğruluk kaybı.**
- `mucize.kissa-*` dili Hristiyan/Yahudi okur için "kutsal metin hatalı" izlenimi veriyor (yukarıda).
- "Tamam, makul" 3 kez ikna sayılmadı (`mucize.tanim`).

### P3 — Yahudi (63 adım)
- `acilis.sorun`: "Mucize ve kanıt istiyorum. **Ama Beni Kureyza'da ne olduğunu da merak ediyorum**" → Kureyza **yok sayıldı** (`mucize-yok` olarak sınıflandı).
- `haber.ihtimaller`: "Bilerek yalan… Yahudi kabilelerini sürdü, **Kureyza'da erkeklerin kafasını kestirdi**" → samimiyet.giris'e yönlendi, hiçbir tepki yok; ve `acilis.din` "Musa'nın mirasına da saygıyla konuşacağız" vaadi boşta.
- `samimiyet.guc`: "Medine'de iktidarı elde etti, Yahudilere karşı savaş açtı" → `ekOrnek` (başkenti değiştirmedi).
- Sonuç: Bu muhatap için sunum **kör**; samimiyet dalının "güç/iktidar" bölümü Medine'yi neredeyse hiç anmıyor.

### P4 — Deist (26 adım)
- Cevap: "Doğru söylüyor olabilir **ama Tanrı insanlarla konuşur mu bilmiyorum**" → doğrudan `mucize.giris-dogru`: "Bu, dürüst ve cesur bir cümle." **Deist'in asıl itirazı (neden vahiy?) hiç ele alınmıyor**, sunum onu "doğru söylüyor" diye etiketliyor.
- Yalnız Rum penceresine baktı → `mucize.gecis`: "Pencerelerin hepsine baktık." + `kapanis.harita-acik`: "Mucizeler … dil, gelecek, geçmiş" (yalnız biri görüldü).
- `kapanis.soru`: "**Müslüman olmak istiyorum, ne yapmam gerekiyor?**" → "Yazdığın için teşekkür ederim… Kendine iyi bak." (**P0 UX: en önemli niyet kaçırıldı**).

### P5 — İlgisiz/şüpheci genç (114 adım!)
- "lol hepsi masal bence, kimin umrunda" → "Sorun değil. **Merak, en iyi başlangıç.**" (alay/ilgisizlik "merak" sanıldı)
- Her beat'te 3× aynı soru + `kacamak` köprüsü; samimiyet dalının **10 beat'ini** "hmm/neyse/uzun çok/saçma/bilmem" ile 7'şer cevapla gezdi. "**uzun çok**", "bu kadar uzun olmasa" cümleleri iki kez yazıldı: sistem tepki vermedi. Kısa yol/özet/ara-ver **önerilmedi** (`ara ver` önerisi yalnız "art arda iki beat" kuralıyla ve çok geç).
- Sonuç: Etkileşim çıkmaz değil ama **zorlayıcı** ve "özgür hissetme" ilkesine aykırı.

### P6 — Saldırgan/alaycı (88 adım)
- "Sen bir botsun değil mi? Kim para veriyor sana?" → "En eski ve en ciddi itiraz bu: 'Bilerek söylemiş olabilir.'" (anlamsız eşleşme).
- Küfür ("Siktir et bunları"), "Hahaha tabii canım", "Çok saçma, bırak" → sistem aynı tonda yeni örnek vermeye devam etti; **yumuşak çıkış/özür/ara teklifi yok**.
- `samimiyet.kadin`: "**Aişe 6 yaşındaydı, açıkla bunu bakalım**" → alakasız `ekOrnek` (Hatice 25 yıl). Mikro-test: "Peki Aişe kaç yaşındaydı?" → "**Buna birazdan geleceğiz.** Şimdi şunu soruyordum:" → **söz tutulmuyor** (böyle bir beat yok). En güvenilirlik zedeleyen an.
- Olumlu: hakaret/küfür sunumu çökertmedi, döngüye girmedi, 88 adımda temiz bitti.

### Mikro-testler (tek beat, tek cevap)

| Beat | Cevap | Gerçekte | Olması gereken |
|---|---|---|---|
| `fetanet.sara` | "Evet, açıklanabilir" | **ikna** (formul'a geçti) | ret/itiraz |
| `samimiyet.gece` | "Evet, secde edebilir" | **ikna** | ret |
| `samimiyet.gece` | "Hayır, etmez" / "Hayır, bir sahtekâr böyle yapmaz" / "Hayır, bu mümkün değil" | **ret** (yeni örnek) | ikna |
| `samimiyet.kapanis` | "**Evet**" (= "demeye devam ediyorum") | **dal kapandı** ("Bilerek yalan ihtimali kapandı… kendi ikna olduğun adımlarla buldun") | ret |
| `samimiyet.mal` | "Evet, mal için yalan söylemiştir **ama** zırh rehinde kalmış" | ikna | itiraz/ret ("ama" yok sayıldı) |
| `fetanet.siyasi` | "Tabii ki, **ama** savaşlarla da yaydı" | ikna (ongoru'ya geçti) | itiraz |
| `fetanet.kapanis` | "Evet, ayakta durabilir" | **ikna, dal kapandı** | ret |
| `fetanet.zeka` | "Evet, zeki biri hem sanrı yaşar hem başarılı olur" | ikna | ret |
| `fetanet.sara` | "Hayır, açıklanamaz" | ret | ikna |
| `mucize.rum-kehanet` | "Evet biliyorum" (=örnek biliyorum) | ikna (`mucize.devam`) | itiraz |
| `zemin.sahabe` | "Evet, susabilirler" / `zemin.hafizlar` "Evet olabilir" | ikna | ret |
| `haber.ihtimaller` | "Başka bir ihtimal: … hasta değildi, sadece yoğun dinî deneyim" | `fetanet.giris`: "…en ağır psikoz tablolarından biridir" | `fetanet.vizyoner` |
| `haber.ihtimaller` | "Beni Kureyza'da 700 erkeği öldürttü" | `haber.belirsiz` "Karar vermek acele iş değil" | kureyza beat'i |
| `kapanis.soru` | "Müslüman olmak istiyorum" / "Kur'an'da bilimsel hata var…" | veda (jenerik) | özel beat |
| `acilis.sorun` | "Ben sadece neden bu kadar uzun olduğunu merak ediyorum" | "Merak, en iyi başlangıç" | özet teklifi |

---

## 3. Bölge bulguları

Öncelik: **P0** = yanlış/yanıltıcı ya da kırık etkileşim, yayın öncesi şart; **P1** = ciddi kalite; **P2** = parlatma.
**Onay**: "Evet" = yeni olgu/argüman, ton değişimi ya da hassas dinî konu (kullanıcıya sunulmalı). "Hayır" = doğruluk düzeltmesi, silme, dil bilgisi, tutarlılık.

### 3.0 Motor / etkileşim (içeriği doğrudan etkileyen) — `site/js/niyet.js`, `motor.js`

| ID | Sorun | Öneri | Öncelik | Onay |
|---|---|---|---|---|
| **MTR-1** | **Kutupluluk.** `GENEL_ONAY` (`evet, doğru, tabii…`) her beat'te ikna; `HAYIR` her yerde ret. İlzam soruları "…mı?" ve beklenen cevap "hayır". | Şemaya `"evet": "ikna"\|"ret"` (vars. `"ikna"`) ve `"hayir": "ret"\|"ikna"` alanları ekle; "…mı/mü?" biçimli retorik sorulara içerik yazarı `"evet":"ret","hayir":"ikna"` yazsın. Aksi hâlde **her** ilzam beat'ine `yollar`'a şu iki satır eklensin (örnek, samimiyet.*): `{"tur":"ikna","anahtar":["hayır etmez","etmez","yapmaz","olmaz","mümkün değil","sanmıyorum","zor görünüyor","pek değil","hayır"],"git":"<aynı>"}` ve `{"tur":"ret","anahtar":["evet eder","eder","yapar","olur","mümkün","yine de","olabilir"]}`. Kalıcı çözüm: LLM sınıflandırıcı (soru + cevap + yön). | **P0** | Hayır |
| **MTR-2** | **"ama/fakat/ancak/yine de" yok sayılıyor** ("Tabii ki, ama savaşlarla da yaydı" → ikna). | `GENEL_ONAY` yalnız cümlede `\b(ama|fakat|ancak|lakin|yine de|ne var ki|tek sorun)\b` **yoksa** geçerli; varsa `itiraz` (kısa ise) ya da `ret`. | **P0** | Hayır |
| **MTR-3** | **Olumsuzlama yakınlığı:** "hasta **değildi**" → "hasta" anahtarı. | Anahtar eşleşmesinde anahtarın ±2 sözcük çevresinde `değil/değildi/yok/olmayan/hayır` varsa o `itiraz/yonlendir` anahtarını **sayma**; `hasta değil|sağlıklı|hastalık yok` için ayrı yol (bkz. HBR-3, FTN-9). | **P0** | Hayır |
| **MTR-4** | **EK soruları ana beat'in çiplerini taşıyor** (ör. `haber.keskin` EK "Üçüncü bir açıklaman var mı?" çipleri "Bence olabilir / Hayır, ya var ya yok"). | Her `ekOrnek`'e `cipler` alanı; yoksa varsayılan `["Haklısın, açıklaması zor","Yine de ikna olmadım"]` (serbest sorularda çipsiz). | **P1** | Hayır |
| **MTR-5** | **`GENEL_ONAY` listesi dar:** "tamam, makul, olur, anladım, kabul, doğrudur, evet haklı" eksik. | Listeye `makul, tamam, olur, anladim, kabul, bu kadar yeter` ekle (MTR-2 korumasıyla). | **P1** | Hayır |
| **MTR-6** | **Eşleşmeyen uzun/itirazlı cevap sessizce `ekOrnek`.** | 5+ sözcüklü, eşleşmeyen cevapta `ekOrnek`ten önce **tanıma satırı** (3 varyant dönsün): "Bunu duydum: [cevabın ilk 6 sözcüğü]… Şimdi şu örneğe bak, sonra döneriz." + cevabı `profil.itirazlar[]`'a yaz; kapanışta "Bende kalan itirazların" sahnesi (bkz. YNI-9). Kullanıcı "duyulmadığını" hissetmesin. | **P1** | **Evet** (yeni etkileşim) |
| **MTR-7** | **"Buna birazdan geleceğiz" sahte söz** (`kopru`/konu dışı soru). Karşılığı olan düğüm yoksa söz tutulmuyor. | Konu dışı soruda yalnız o konuyu karşılayan beat/anahtar varsa "geleceğiz"; yoksa: "Bu soruya bu sunumda henüz hazır bir bölüm yok; bunu not ettim. İstersen önce buradaki soruyu kapatalım." + kapanışta "Cevaplayamadığımız sorular" listesi. | **P0** | Hayır |
| **MTR-8** | **Hakaret/küfür/alay** (`siktir, saçma, boş laf, hahaha, bot musun`) `ret` sayılıp yeni örnek veriliyor. | Yeni niyet `sert`: tek seferlik yumuşak çıkış — "Seni sinirlendirdiysem özür dilerim. Bu bölüm seni yoruyorsa bırakabiliriz. İstersen **en çok itiraz ettiğin şeyi** yaz, ona bakayım; ya da 'ara ver' de." Art arda 2 `sert`te `ozet.kisa`/`kapanis.veda`. | **P1** | **Evet** (ton) |
| **MTR-9** | **Uzunluk/ilgisizlik sinyali** (`uzun, sıkıldım, kısa olsun, özet, umrumda değil, masal`). | Global niyet `kisalt` → `ozet.kisa` (bkz. YNI-7) → `kapanis.giris`. `acilis.sorun`'da "masal/umrumda değil" için `acilis.ilgisiz`. | **P1** | **Evet** |
| **MTR-10** | **Dal yeniden açma yok:** `haber.kalan-ikisi` "Bunu ben söylemiyorum. Kendi verdiğin cevaplar seni buraya getirdi." — kullanıcı alışkanlıkla "haklısın" demişse manipülatif. | Satırı: "Bunu ben söylemiyorum; senin 'ikna oldum' dediğin adımlar buraya getirdi. Yanlış anlaşıldıysam hangi adıma dönmek istersin?" + çip "Bir adıma dönelim" (`kapali` dizisinden o dalı çıkar). | **P1** | **Evet** |
| **MTR-11** | `fetanet.devam` ("Şimdi bir de başarılara bakmak gerek") formul'dan sonra bile çıkıyor; `mucize.gecis` "Pencerelerin hepsine baktık" kısmi gezide yalan. | Koşul `gezildi` (motor ziyaret listesi) ekle veya metinleri nötrle (bkz. FTN-15, MCZ-1). | **P1** | Hayır |

### 3.1 Açılış

**ACL-1 · `acilis.merhaba` — kanca yok** · P1 · Onay: Evet (ton)
- Mevcut: "Gece. / Her yer sessiz. / Böyle sessiz bir anda, eski bir soru geri gelir."
- Sorun: "Gece. Her yer sessiz." sinema klişesi; ilk 3 satır bilgi taşımıyor. Kanca somut bir gizem/çelişki olmalı.
- Öneri (4 alternatiften biri, sinematik ritimli):
  - *A:* "Kırk yaşında bir tüccar bir mağaradan titreyerek iner. / 'Beni örtün,' der. / Yirmi üç yıl sonra, bütün Arap Yarımadası onun sözüyle yaşıyordur. / Bu hikâyeye ya gülersin, ya inanırsın, ya da sorarsın: **nasıl?**"
  - *B:* "Bir adam 'Allah benimle konuşuyor' dedi. / Bunu yirmi üç yıl boyunca, bedeli neyse ödeyerek söyledi. / Şimdi sana bir şey sorayım: **sen olsan ona ne derdin?**" (serbest soru, çipsiz — kullanıcıyı ilk cümlede devreye sokar)

**ACL-2 · `acilis.davet`, `acilis.tanri` — "Seni ikna etmeye çalışmayacağım" / "Kimseyi bir şeye inandırmaya çalışmıyoruz"** · P1 · Onay: Evet (ton)
- Sorun: Sunumun bütün yapısı (ilzam soruları, "ikna", kapanıştaki "Geriye tek yol parlıyor") ikna eder; açıkça yalan değil ama **dürüst değil** ve muhatap ilk "ikna oldum mu?" sorusunda bunu fark eder.
- Öneri: `acilis.davet` ilk satır → "**Seni bir sonuca zorlamayacağım.**"; `acilis.tanri` ("Emin değilim" yanıtı) → "Dürüst bir yer burası. Çok insan orada duruyor. / Yalnız delilleri sıralayıp **sana soracağım**; tartmak senin."

**ACL-3 · `acilis.format` — "oryantalistlerin"** · P2 · Onay: Hayır
- "oryantalist" Batı akademisinde yüklü bir terim (Said sonrası); hedef kitle (ateist/Batılı) rahatsız olabilir. → "Batılı tarihçilerin ve akademisyenlerin" yeterli. (Ayrıca kaynaklar arasında Altıkulaç, McDowell, Kadı Abdülcebbar var; "çoğunlukla" doğru.)

**ACL-4 · `acilis.din` — Yahudi/Hristiyan saygı vaadi** · P1 · Onay: Evet (hassas)
- Vaat ("Musa'nın mirasına da saygıyla konuşacağız", "kendi kutsal kitabına da saygıyla") ile `mucize.kissa-*` ve Kureyza eksikliği çelişiyor (bkz. MCZ-6, YNI-2). Ya vaat kısaltılmalı ("Kendi geleneğine saygıyla yaklaşacağım") ya içerik düzeltilmeli.

**ACL-5 · `acilis.sorun` anahtarları** · P1 · Onay: Hayır
- "lol hepsi masal bence, kimin umrunda" `merak`'a (anahtar `hepsi`) düşüyor. `sadece merak` yolundan **`hepsi` anahtarını çıkar**; ayrı yol: `["masal","umrumda değil","boş","sıkıcı","saçma","ilgisiz","uzun"]` → `acilis.ilgisiz` (YNI-7).
- Ayrıca eklenmeli: `["kureyza","aişe","savaş","kılıç","köle","kadın","mucize","bilim"]` → ilgili hızlı yönlendirme (YNI-1/2/3).

**ACL-6 · `acilis.bilgi` "saygı duyuyorum" yanıtı** · P2 · Onay: Hayır
- "'Saygın biri' ile 'Allah'tan haber getiren biri' arasında büyük bir fark var. Oraya bakacağız." — "Oraya bakacağız" iyi; ancak "büyük fark" cümlesi hafif vaaz. → "Saygı duyman güzel. 'Saygın biri' ile 'Allah'tan haber getirdiğini söyleyen biri' farklı sorular; ikincisine bakacağız."

### 3.2 Zemin

**ZMN-1 · `zemin.musrikler` (+ `zemin.sahabe`) — "metindeki olgulara dair açık bir hata ya da yalan itirazı bilinmiyor"** · **P0** · Onay: Evet
- Mevcut: "Ama metindeki olgulara dair açık bir hata ya da yalan itirazı bilinmiyor." Soru: "…hata suçlaması kaydı yok. Bu mantıken nasıl mümkün?" / `zemin.sahabe`: "Metinde tarihî bir yanlış olsaydı, önce onlar itiraz ederdi."
- Sorun: **Olgu olarak yanlış.** İlk dönem Müslüman kaynaklar bile Necran Hristiyanlarının "Meryem Harun'un kardeşi mi?" itirazını aktarır (Müslim); 8. yüzyıldan beri Hristiyan polemik (Haman, Meryem/Miryam, Üzeyr…) var; Kur'an'ın kendisi "uydurdu", "başkaları yardım etti" suçlamalarını kaydeder (Hûd 13, Nahl 103, Furkân 4–5). Bölümün asıl iddiası **metnin sonradan değiştirilmediği**, olguların doğruluğu değil: ikisi karıştırılmış. (`docs/onay/acilis-zemin.md` da Armstrong ifadesini aynı gerekçeyle dışlıyor.)
- Öneri (satır 6 + soru):
  - Satır: "**Ama bu itirazların hiçbiri şunu demiyor: 'Bu metin sonradan değiştirildi.'**"
  - Soru: "İddia: metin sonradan değişti. Veri: onu kollayan düşmanları vardı, itirazlarını yazdılar ve **'değiştirildi' diyen tek bir kayıt yok**. Bu mantıken nasıl mümkün?"
  - `zemin.sahabe` satır 7: "**Metin sonradan değiştirilseydi**, önce onlar itiraz ederdi." Soru: "İddia: metin sonradan değişti. Veri: bunu ilk duyanlar … itiraz kaydı yok."
  - **Yeni `itiraz` yolu** (`zemin.musrikler`): anahtar `["meryem","harun","haman","hata var","tarihî hata","yanlış bilgi","zülkarneyn","üzeyr"]`, yanıt: "Doğru: içeriğe dair itirazlar da var (ör. 'Harun'un kardeşi' ifadesi, Haman). **O ayrı bir tartışma**: metnin değiştirilmesi değil, metnin ne dediği. Şu an sorduğum şey birincisi. İkincisine — kıssalar ve tarih — mucize bölümünde dürüstçe döneceğiz." (`ek:true`, `dogrulanacak:true`; kaynak: Müslim, "Âdâb" 9; Nahl 16/103, Furkân 25/4–5)

**ZMN-2 · `zemin.corpus` / `zemin.cografya` — San'a palimpsesti yanlış kullanılıyor** · **P0** · Onay: Hayır (iddia kaynağın söylediğine çekiliyor)
- Mevcut: `zemin.corpus`: "Ayet, karbon aralığı 606 ile 649 olan bir yazmada bile yerinde duruyor. / Peygamber'in zamanına çok yakın bir yazmada." `zemin.cografya` EK2: "Yemen'de bir yazmanın karbon aralığı… Sadeghi ve Bergmann: %68 614–656, %95 578–669 … **Peygamber'in zamanına bu kadar yakın bir yaprak bugünkü metni taşıyorsa…**"
- Sorun: 578–669 aralığı **San'a palimpsestinin (DAM 01-27.1) derisine** ait; Sadeghi–Bergmann'ın asıl tezi **alt metnin standart (Osmani) olmayan bir kodeks** olduğudur (aynı sunumda `zemin.karbon` itirazında Sadeghi–Goudarzi "küçük kelime/sıra farkları" diye anılıyor). Yani aynı yazma bir yerde "fark var ama tek yazma", başka yerde "bugünkü metni taşıyan, Peygamber'e en yakın yaprak" oluyor → bilgili muhatap bunu bir cümlede çürütür. Ayrıca `zemin.karbon`'un kendi cümlesi ("test **malzemenin** yaşını ölçer") gereği karbon aralığı yazı için **"en erken" sınırıdır**, "Peygamber'e yakınlık" kanıtı değildir.
- Öneri:
  - `zemin.karbon` satır 3: "Test **yazının değil, yazıldığı derinin** yaşını ölçer: yazı ancak deriden sonra gelebilir. Tek yıl vermez; aralık verir."
  - `zemin.corpus`: satır 6–7 → "Ayet, ilk yüzyıla ait en eski yazmalarında da yerinde duruyor." (aralık/yazma kimliği teyit edilene dek `"dogrulanacak": true`, kimlik belirtilmesin); soru: "…ayet, ilk yüzyılın yazmalarında zaten var. 'Sonradan eklendi' mantıken nasıl savunulur?"
  - `zemin.cografya` **EK2'yi sil** (San'a). EK1 (Paris + Tübingen "649–675") de ayrıştırılsın: Tübingen için kaynaklı (%95,4: 649–675), Paris Parisino-petropolitanus için **ayrı** aralık (Marx–Jocham 2019) — iki yazmanın tıpatıp aynı aralık vermesi `docs/dogrulanacaklar.md` A-3'teki "tekrar sayım" şüphesini taşıyor.
  - `zemin.cografya` diyagramı ("Gönderilen merkezler: Medine, Basra, Şam, Kûfe ↔ Bugün elimizdeki yazmalar: Topkapı/San'a… Londra/Paris/Tübingen…") Osman nüshalarıyla **bire bir eşleştirme iddiası**: akademide kabul edilmiyor. Başlığı "Kitabın eşleştirmesi (tartışmalı)" yap ya da "Farklı merkezlerde yazıldığı düşünülen yazmalar".

**ZMN-3 · `zemin.kiyasYazma` — Altıkulaç ifadesi tabloyla çelişiyor + "milyonlarca"** · **P0** · Onay: Hayır
- Mevcut: tabloda "Yeni Ahit (Yunanca): 5.000'den fazla" ↔ "Mushaf uzmanı Tayyar Altıkulaç: yeryüzünde Kur'an kadar yazması olan başka kitap yok." Sağ sütun: "Kırk dört erken yazma / Ardından **milyonlarca el yazması nüsha**".
- Sorun: Aynı ekranda iki çelişkili iddia; "milyonlarca el yazması" (Hamidullah) kontrolsüz; sütunlar farklı kategorileri kıyaslıyor. Bilgili muhatap güveni kaybeder. `docs/dogrulanacaklar.md` A-2'de 44/45 tutarsızlığı zaten kayıtlı.
- Öneri: Altıkulaç satırını **sil**; yerine:
  - "**Yazma sayısında Yeni Ahit açık ara önde.** Kur'an'ın farkı sayı değil, hız: ilk yapraklar vefattan birkaç on yıl içinde, ezber zinciri ise bugüne kesintisiz."
  - Diyagram sağ sütunu: ["Erken dönem (ilk iki yüzyıl) yazma: kırk dolayında", "Yazıya geçiş: Peygamber'in hayatında", "Ezber zinciri: kesintisiz"] — "milyonlarca el yazması" kaldırılsın.
  - `Zafer Duygu` EK: "araştırmacı Zafer Duygu'nun tablosunda" → "Yeni Ahit araştırmacılarının yaygın tarihlemesinde İnciller yaklaşık 70 ile 110 arasına yerleşir." (kaynak: R. Brown / B. Ehrman — `dogrulanacak`; Duygu'nun kimliği `dogrulanacaklar` B-1'de açık değil, v2.1 "akademik tanık" ilkesine uymuyor.)

**ZMN-4 · `zemin.siffin` — kaynak dairesi** · P1 · Onay: Evet
- Sorun: Sıffin anlatısını aktaran kaynaklar (Nasr b. Müzahim, Taberî) 9–10. yüzyıl Müslüman eserleri; "mızraklarda 500 nüsha" da öyle. Ateist persona bunu ilk yazdı. Ayrıca "aynı metne bağlıydı" = *bir* Kur'an'a başvurdular; metnin *özdeşliği* değil.
- Öneri: `yollar`'a `itiraz`: anahtar `["müslüman kaynak","sonradan yazılmış","tek kaynak","taberi","kaynak güvenilmez","uydurma hikâye"]`, yanıt:
  - "Haklısın: Sıffin'i bize **Müslüman tarihçiler** aktarıyor, o yüzden bunu tek başına delil saymıyorum."
  - "Ama Batılı tarihçiler de olayı kabul ediyor ve ikisi de aynı şeyi söylüyor: iki düşman taraf **ortak bir Kitap** varsayıyor."
  - "Asıl ağırlık bir sonraki adımda: elimizdeki yazmalar." (`ek:true`)
- Satır 7: "…iki düşman ordu aynı metne bağlıydı" → "…iki düşman ordu **ortak bir Kitap'a** başvurdu."

**ZMN-5 · `zemin.tahrif` — Haccâc, İbn Mesud, Şii tahrif rivayetleri** · P1 · Onay: Evet
- Satır 6: "Ama metnin değiştirilmesi üzerine **tek bir ihtilaf kaydı bilinmiyor**." — aşırı iddia. Haccâc b. Yusuf'un birkaç kelimeyi değiştirdiği rivayeti (Ebû Dâvûd, *Kitâbu'l-Huruf*), İbn Mesud/Übey mushaflarının farkları, Şii tahrif rivayetleri **bilinen** ve bilgili muhatabın ilk sayacağı şeyler. (Persona 1 yazdı.)
- Öneri: Satır 6 → "Ama **metnin sistemli biçimde değiştirildiğini** iddia eden tek bir ihtilaf kaydı bilinmiyor." + yeni `itiraz`: anahtar `["haccac","haccâc","ibn mesud","mesud","übey","şii","şia","farklı mushaf","tahrif rivayeti"]`, yanıt: "Doğru: Müslüman kaynaklar kendi içlerindeki ayrıntıları bile kaydeder: Haccâc'ın bir avuç kelimeyi düzelttiği, İbn Mesud'un mushafında farklılıklar olduğu anlatılır. / Ama bunlar **adı sanı belli, tek tek kelimelerle sınırlı** ve itiraz edenlerce hemen kaydedilmiş farklar. Saklanmış sistemli bir değişiklik bunun tersine görünür." (`ek:true`, `dogrulanacak:true`)

**ZMN-6 · `zemin.hadis` — "hadise dayanan bir şey kurmayacağım" vaadi** · P1 · Onay: Evet
- Vaat: "Bu yüzden ben hadise dayanan bir şey kurmayacağım. Kullanacağım hadisler Batılı tarihçilerin de kullandığı hadisler olacak." Oysa `haber.keskin` (iblis/ateş, Cebrail'in imamlığı, Übey), `samimiyet.*` (zırh, Fatıma/hizmetçi, gece namazı, tutulma "bu söz tüm hadis kitaplarında…"), `fetanet.ongoru` (Hendek alayı) hadis/siyer tabanlı.
- Öneri: Vaadi dürüstleştir: "**Önce Kur'an'ın kendi cümlelerine ve Batılı tarihçilerin de kullandığı anlatılara dayanacağım. Bir anlatı yalnızca hadiste/siyerde geçiyorsa bunu açıkça söyleyeceğim.**" ve uygulamada hadis-tabanlı satırların başına "Bir rivayete göre…" (zaten çoğunda var; `haber.keskin` EK'lerinde ve `samimiyet.aile/gece/mal` satırlarında yok).

**ZMN-7 · `zemin.kiyas` / `zemin.ozet-kiyas`** · P2 · Onay: Hayır
- "Hiçbirinde aradaki süre dört yüz yılın altına inmiyor" → "…**yaklaşık dört yüz yılın altına inmiyor** (Homeros ≈400)". Tablo McDowell (Hristiyan savunucu) üzerinden; ekranda zaten künyeli. OK.

**ZMN-8 · `zemin.yazim` / `zemin.ozet-yazim` — "yaklaşık bir yıl sonra tek nüshada toplandı"** · P2
- Geleneksel anlatı (Ebubekir dönemi); Batılı akademide kabul görmeyen/tartışılan bir ayrıntı (Wansbrough, Burton). Satıra "Geleneksel anlatıya göre" eklenmeli: "**Geleneksel anlatıya göre**, vefatından yaklaşık bir yıl sonra yazılanlar tek bir nüshada toplandı." (`ozet-yazim` aynı). Onay: Hayır (hedge).

**ZMN-9 · `zemin.ozet-yazma`** · P1 · Onay: Hayır — "Birmingham… aralık 568–645" tek başına, açıklamasız bir sayı ve bir sonraki satır "hepsi aynı metni taşıyor". `zemin.karbon`'daki "en erken sınır" cümlesi (ZMN-2) buraya da: "Karbon yazının **en erken** tarihini verir; en eski yapraklar Peygamber'in zamanına çok yakındır."

**ZMN-10 · `zemin.ikincil` Peloponnesos benzetmesi** · P2 — "Peloponnesos Savaşı'nı biz bir Atinalının kaleminden okuyoruz. Yine de tarih yazılıyor." Propaganda itirazına zayıf cevap (Thukydides da taraflıydı; tarih eleştirel okunur). → "Taraflı yazarlar da tarih yazar; biz onları eleştirel okuruz. Burada eleştirel okuyoruz: ispat için yazılmış bir cümle değil." Onay: Hayır.

### 3.3 Haber

**HBR-1 · `haber.keskin` — "hayal = hastalık" kısayolu** · P1 · Onay: Evet
- Mevcut itiraz yanıtı satır 3: "Bir kişi hayalini yaşıyorsa bu hastalık; bilerek yapıyorsa hile. İkisinin arası yok."
- Sorun: Ateist persona'nın yazdığı "mistik/yoğun deneyim" itirazını **hasta/yalan ikilisine sıkıştırıyor**; metodun en zayıf noktası burada başlıyor (bkz. FTN-9).
- Öneri (satır 3 yerine): "**Burada ayırt etmemiz gereken iki şey var: bir deneyim yaşamak ve onu 'Allah bana konuştu' diye bir haber olarak bildirmek.** Deneyimin ne olduğuna (sağlıklı bir yanılgı mı, hastalık mı) birazdan bakacağız. Ama bildirilen şey bir olgu: dediği ya oldu, ya olmadı."

**HBR-2 · `haber.keskin` EK'leri — hadis-tabanlı, hassas, baskıcı sorular** · P1 · Onay: Evet
- EK1 (iblis/ateş parçası; `docs/dogrulanacaklar.md` D: "H16 iblis sahnesi yalnız muhatap isterse açılan kutu" demişti) + EK2 (Cebrail'in imamlığı) + EK3 (Übey) hadistir ve vaadi bozar (ZMN-6). Soru kalıbı "Bunu hâşâ hayal diye okursan ağır bir hastalık, bilerek diye okursan anlamsız bir hile çıkıyor. Orta yol nerede?" retorik baskı.
- Öneri: EK1'e "**Bir rivayete göre**, akşam namazında…" ile başla; soru: "Bu sahneyi anlatan kişi ya gerçekten böyle yaşadı, ya da başka birine yaşatmak için anlattı. **Bunların dışında bir açıklaman var mı?**" (baskı yok). EK2/3'e de "Rivayete göre".

**HBR-3 · `haber.dorduncu` — "hasta değildi / manevi deneyim" itirazı** · **P0** · Onay: Evet
- Mevcut `itiraz`: `reformcu…, ilham, vizyon, rüya, manevi tecrübe, manevi` → yanıt: "İyi niyetli bir reformcu 'melek geldi' derken bunun doğru olmadığını biliyorsa, bu ihtimal bilerek kutusundadır… **İsim değişti, kutu aynı. Yeni bir kapı açılmadı.**"
- Sorun: `vizyon/rüya/manevi tecrübe/ilham` **bilmeden yanılmayı** işaret eder, "bilerek"i değil; yanıt kullanıcının dediğiyle çelişiyor. Persona 1: "samimi dinî deneyim, hasta da değildi" → "hepsi aynı kutuda: bilmeden yanılma" (kısmen doğru) ama bu "hasta" kutusu.
- Öneri: `itiraz`'ı ikiye böl.
  - *(a) `["reformcu","iyi niyetli","toplum önderi","devrimci","ahlak öğretmeni","mecaz","mecazi","sembolik"]`* — mevcut yanıt (mecaz/reformcu).
  - *(b) `["vizyon","ilham","rüya","manevi tecrübe","manevi","dinî deneyim","hasta değil","hasta değildi","sağlıklıydı","bilinçaltı","kendi zihni","içinden geldi"]` → yanıt:* "Bu **yeni bir kapı değil ama önemli bir ayrım**: bilmeden yanılmak için hasta olmak gerekmez. / Sağlıklı, zeki, samimi bir insan da yaşadığı yoğun bir deneyimi yanlış yorumlayabilir. / Bunu hastalıkla çürütemeyiz; **tam bu yüzden onu ayrıca ciddiye alacağız.**" → `git: "fetanet.vizyoner"` (YNI-4) + `profil: {"iddia":"deli","vizyoner":"evet"}`.

**HBR-4 · `haber.demet` — ispat yükü** · P1 · Onay: Evet
- Mevcut `itiraz` ("kanıtlamak zorunda değilim"): "Bir delile itiraz etmek, kendi iddianı ispat etmek değildir. 'Peygamber değil' diyorsan, 'neden böyle bir şey olmuş?' sorusunu da açıklamak gerekir."
- Sorun: Sunum "ispat yükü sende" diyor gibi okunuyor; ateist bunu "burden shifting" sayar; ayrıca anahtar `ispatlamak/ispat yükü` tutmuyor (Persona 1).
- Öneri: anahtarlara `["ispatlamak","ispat yükü","yük iddia edende","iddia sahibi","kanıtlama yükü"]` ekle; yanıt:
  - "**Haklısın: ispat yükü iddia sahibinde — burada bu bize ait.** O yüzden delilleri önüne koyuyorum."
  - "Senden istenen: delili duyup tartmak. Bir delili kabul etmiyorsan bunun yerine hangi açıklamayı koyduğunu da görmek isterim; çünkü reddettiğin şey bir olgu."
- `soru.metin` "Bu yük sana adil geliyor mu?" → "**İtiraz eden de, reddettiği her delilin yerine bir açıklama koymak zorunda.** Bu sana adil geliyor mu?"

**HBR-5 · `haber.dorduncu` `kahin` yanıtı** · P1 · Onay: Hayır
- "Peki kâhinlerde gerçek bir şey görüldüğünü kabul edersen, onun söylediğini neden dışarıda bırakırsın?" bulanık/anlamsız. → "Kâhinler de bu iki kutudan birine düşer: ya hile ya hayal. **Ayrıca kâhin 'Allah benimle konuşuyor' demez; kehanet iddiası başka, vahiy iddiası başka.**" (kaynak: H15 düğümü; kitaptan).

**HBR-6 · `haber.agac` satır 4–5** · P1 · Onay: Hayır
- "Ya da bilmeden: hâşâ, bir yanılgı, bir hastalık." → "Ya da bilmeden: hâşâ, **içtenlikle yanılmış** — bir hastalık, bir hayal ya da yanlış bir yorum." (FTN-9 ile tutarlı, "hâşâ" korunuyor.)

**HBR-7 · `haber.kopru-uydurdu` satır 4** · P1 · Onay: Hayır — dil bilgisi ve noktalama
- "Kazanç **de** bedel de ölçülebilir. Peki bu iddianın hesabı nasıl çıkıyor?…" → "Kazanç **da** bedel de ölçülebilir. Bu iddianın hesabı nasıl çıkıyor…" (soru işareti + üç nokta birlikte kullanılmasın: `haber.kopru-uydurdu`, `mucize.gecis`.)

**HBR-8 · Deist için vahiy ihtiyacı yok** · P1 · Onay: Evet — bkz. YNI-6 (`haber.vahiy-gerek`).

**HBR-9 · `haber.kalan-s/f/ikisi`** · P2 — "Bir kapı kapandı. Ötekilerin ardında ne var, henüz görmedik…" iki beat'te birebir aynı. `kalan-s`: "…bilmeden yanılma kapısında ne var, henüz görmedik…"; `kalan-f`: "…bilerek yalan kapısında ne var…". Onay: Hayır.

### 3.4 Samimiyet

**SMM-1 · Ortak soru kalıbı: "Senin iddian bir sahtekârdı. Ama bir sahtekâr…"** (14 beat) · **P1** · Onay: Hayır
- Sorun: (1) **yanlış atıf** — `haber.sirayla/belirsiz` yolunda kullanıcı öyle dememiştir; (2) monoton ("Senin iddian…" 18 soru); (3) **hâşâ edebi** yok (64 olumsuz ifadeden 1'inde); (4) çoğu "…mı?" biçimli, kutupluluk hatası (MTR-1).
- Öneri: kalıbı **"Diyelim ki, hâşâ, [X]. O hâlde [somut olgu] neden [somut davranış]?"** yap. Hazır metinler:

| Beat | Yeni `soru.metin` |
|---|---|
| `samimiyet.mal` | "Diyelim ki, hâşâ, amacı maldı. Güç elindeyken zırhı rehinde ölen biri, bu yalandan ne kazandı?" |
| `samimiyet.aile` | "Diyelim ki, hâşâ, ailesine konfor sağlamak istedi. Kızının elleri el değirmeninden nasır tutmuşken ona hizmetçi vermeyen biri bu yalandan ne bekliyordu?" |
| `samimiyet.guc` | "Diyelim ki, hâşâ, derdi iktidardı. Servet ve liderlik masada hazırken 'hayır' diyen biri bu yalandan ne bekliyordu?" |
| `samimiyet.uzlasma` | "Diyelim ki, hâşâ, herkesin gönlünü almak istedi. Uzlaşmanın bu kadar kolay olduğu bir yerde kapıyı neden kapattı?" |
| `samimiyet.taif` | "Diyelim ki, hâşâ, kazanç bekliyordu. On üç yıl boyunca yalnız bedel ödeyen biri neyi bekliyordu?" |
| `samimiyet.sohret` | "Diyelim ki, hâşâ, derdi şöhretti. Kendisini azarlayan cümleleri herkese okutan biri imajını nasıl kurmuş olur?" |
| `samimiyet.tutulma` | "Diyelim ki, hâşâ, bir fırsat kolluyordu. Oğlunun ölümünde gökyüzünün 'ağladığını' söyleyen kalabalığı düzelten biri fırsatı neden kaçırdı?" |
| `samimiyet.kadin` | "Diyelim ki, hâşâ, derdi şehvetti. Bu hayat, böyle bir derdin bekleyeceği hayata benziyor mu?" |
| `samimiyet.kabile` | "Diyelim ki, hâşâ, kabilesini yükseltmek istedi. Kabileciliğin tam kalbine saldıran biri bunu neden yapar?" |
| `samimiyet.yuk` | "Diyelim ki, hâşâ, insanları çekmek istedi. En çok tepki çeken yükleri getiren biri bunu neden yapar?" |
| `samimiyet.gece` | "Diyelim ki, hâşâ, bunun bir yalan olduğunu biliyordu. Kimse görmezken saatlerce ayakta durması neye hizmet ediyor?" |
| `samimiyet.deger` | "Diyelim ki, hâşâ, siyasi bir hesap yapıyordu. Gücü eline geçince amcasının katilini affeden biri hangi hesabı yapıyor?" |
| `samimiyet.etkilenme` | "Diyelim ki, hâşâ, ahireti uydurmuştu. Ölüm döşeğinde hesabı bu kadar ciddiye alması neye hizmet eder?" |
| `samimiyet.vahiy` | "Diyelim ki, hâşâ, her şeyi planlamıştı. Planlı bir yalancı kendi 'büyük günü'nü neden korku ve şüpheyle anlatır?" |
| `samimiyet.ikinci` | "Diyelim ki, hâşâ, bu metni kendisi yazdı. Kendisini hem uyaran hem teselli eden ayrı bir ses neden kurar?" |
| `samimiyet.kiyamet` | "Diyelim ki, hâşâ, bu metni masa başında yazdı. Yazanın kendisini düzelten bir kesinti koyması neye yarar?" |

  Aynı kalıp `fetanet.*` için: `fetanet.siyasi` "Senin iddian: ağır bir sanrı yaşıyordu." → "Diyelim ki, hâşâ, ağır bir sanrı yaşıyordu. Aynı kişinin bir toplum kurması mantıken nasıl bir araya gelir?"; `fetanet.ummi` "Senin iddian: kendi kendine yanıldı." → "Diyelim ki, hâşâ, kendi kendine yanıldı. Toplum da eğitim de açıklamıyor; başarı ise ortada. Bu nasıl bir araya gelir?"; `fetanet.kapanis` "Senin iddian: hâşâ samimiydi, ama yanılıyordu." → "Diyelim ki, hâşâ, samimiydi ama yanılıyordu."

**SMM-2 · Tekrar eden itiraz yanıtları (`strateji`, `rivayet`, `güç kazandı`)** · P1 · Onay: Evet
- Üç yanıt 10+ beat'te birebir; `rivayet` yanıtı ("sonradan hikâye yazanlar kahramanı parlatır… ailesinin açlığını anlatan… anlatılar kimse kahramanı parlatmak için uydurmaz") **zırh/açlık/hasır anlatıları için tersine işler**: zühd anlatısı İslam geleneğinde *övgüdür*. Bilgili muhatap: "Hasır izi anlatısı tam da kahraman parlatmadır."
- Öneri `rivayet` standart yanıtı (tüm samimiyet.* beat'lerinde):
  - "**Haklısın: bu anlatıları bize sonraki nesiller aktardı ve zühd anlatıları övgü tonu taşır.**"
  - "O yüzden en çok ağırlığı **Kur'an'ın kendi cümlelerine** veriyorum: Abese'de yüz çevirmesi, Tevbe 43'te izin vermesi, İsra 75'te 'meyledecektin' — bunlar kahramanı parlatmak için yazılmaz."
  - "Zırh, hasır, açlık gibi anlatılar bunların yanında **destekleyici**; tek başına dayanak yapmıyorum."
  - `strateji` yanıtı 3. cümle: "Burada ise **çoğu zaman** bedeli en yüksek yol seçilmiş." ("her seferinde" aşırı).

**SMM-3 · `samimiyet.kadin` — Aişe, Zeynep, "vahiy işine geliyordu" yok** · **P0** · Onay: Evet (hassas) — bkz. YNI-1, YNI-5
- Mevcut itiraz yolları `evlendi/çok eş/siyasi evlilik` (kısa, "hükme bağlamıyoruz"). `docs/onay/samimiyet.md`: Zeyd–Zeyneb yalnız `samimiyet.sohret` EK2'de "uyarı tonu" bağlamında; **Aişe yaşı hiç yok**; mikro-test: "Peki Aişe kaç yaşındaydı?" → "Buna birazdan geleceğiz" (söz tutulmuyor, MTR-7).
- Öneri: `itiraz`'a `["aişe","ayşe","aise","kaç yaşında","çocuk gelin","pedofil","dokuz yaş","altı yaş"]` → `git:"samimiyet.aise"` (YNI-1); `["zeynep","zeyneb","evlatlık","zeyd","ayet işine geldi","tam zamanında ayet"]` → `git:"samimiyet.isine-gelen"` (YNI-5).

**SMM-4 · `samimiyet.kadin` satır 3** · P1 · Onay: Hayır
- "On dokuzuncu yüzyıla kadar bu görüş itirazsız dolaştı; sonra modern tarihçiler bunu bıraktı." → "…**sonra modern tarihçilerin çoğu bunu bıraktı**." (aşırı genelleme hedge.)

**SMM-5 · `samimiyet.tutulma` — en güçlü "aha" anı, ve bir küçük kusur** · P1 · Onay: Hayır
- Satır 6 ("O kalktı ve şöyle dedi…") `"vurgu": "an"` olsun (bölge başına 1–2 kuralı: samimiyet'te bu ve `samimiyet.sohret` ayet anı).
- `itiraz` yanıtında "**27 Ocak 632**" → `dogrulanacak` (halka açık astronomik kataloglarla teyit); kaynak künyesi yok.

**SMM-6 · `samimiyet.kutsalyalan`** · P2 · Onay: Hayır — "Yalan, kendi yalancısını bu kadar zora sokmaz." zayıf genelleme ("gerçek inançlı biri de zorlanır"). → "**Hesaplı** bir yalan yalancısını bu kadar zora sokmaz." Ayrıca "Bruno/Diyojen" yanıtı: "Bruno da, Diyojen de samimiydi" — "samimiyet tek başına peygamberlik göstermez" doğru ve dürüst; iyi.

**SMM-7 · `samimiyet.kapanis` — dolaylı aktarım alıntı olarak** · P1 · Onay: Hayır
- Rodinson alıntısı ("Samimi bir Muhammed'i açıklamak, sahtekâr bir Muhammed'i açıklamaktan çok daha kolaydır.") `dayanak`'ta "kitaptan paraphrase, tam metin doğrulanacak" ama ekranda **doğrudan alıntı** (`alinti` diyagramı tırnaklı). Watt ("Hilekâr ya da yaşlı bir şehvet düşkününün işi değil") ve Dozy ("Kötü bir yalancı…") için aynı.
- Öneri: `alinti.metin` başına "Rodinson'a göre, " / "Watt'ın hükmü şu yönde: " ekle ve kısa tırnak **kaldır** (dolaylı anlatım), `kaynak.not`'a "ifade kitabın Türkçe aktarımından özetlenmiştir" zaten var; kartta **görünsün**. Asıl metin teyit edilince tırnak geri gelir.

**SMM-8 · `samimiyet.kabile` EK2 — "konu bana da ağır"** · P2 · Onay: Hayır — "İstersen en zor örneği de anlatayım; konu bana da ağır. Ölçülü anlatıyorum." Anlatıcıya duygu atfı + hafif manipülatif. → "İstersen en hassas örneği de anlatayım; ölçülü anlatacağım." (`docs/dogrulanacaklar.md` D ile uyumlu: "yalnız muhatap isterse açılan kutu".)

**SMM-9 · Delil sıralaması** · P2 · Onay: Evet — Varsayılan yol `teshis` → `güç` ("Güç ve iktidar" çipi ilk): `samimiyet.guc` büyük ölçüde İbn İshak rivayeti (Utbe, "güneşi sağ elime"; `dayanak`: "sıhhat derecesi tartışmalı"). En sağlam bölümler (`sohret`, `vahiy`, `ikinci`, `kiyamet`, `tutulma`) sonlara düşüyor. Öneri: `samimiyet.teshis` için varsayılan `güç` yanıtı bile önce `samimiyet.sohret` (ve Kur'an-içi kartlar) göstersin; ya da çiplerin yanına "Kendi hakkında nasıl konuşuyor?" çipi.

### 3.5 Fetanet

**FTN-1 · `fetanet.giris` — "Diyelim ki şunu söyledin" + "en ağır psikoz"** · **P1** · Onay: Evet
- Mevcut: "Diyelim ki şunu söyledin: hâşâ, samimiydi… Bugünün tıbbında bu, **en ağır psikoz tablolarından biridir**." (`haber.belirsiz/sirayla` ve Hristiyan yolundan gelen kullanıcı bunu söylememiştir.)
- Sorun: (1) yanlış atıf; (2) tıbbi iddia aşırı: görsel/işitsel deneyim = psikoz değil; psikiyatri kültürel olarak makul dinî deneyimi patoloji saymaz (DSM-5 kültürel çerçeve). Bilgili muhatap güvenini yitirir; (3) ardından `fetanet.doktor` samanlık adam.
- Öneri (satırlar):
  - "Diyelim ki, hâşâ, samimiydi: yalan söylemiyordu, gördüğüne gerçekten inanıyordu."
  - "Ama gördükleri dış dünyada gerçek değildi."
  - "Bu, iki yoldan okunabilir."
  - "Ya **ciddi bir hastalık** tablosu: yirmi üç yıl, gece gündüz, görerek, duyarak."
  - "Ya da **sağlıklı bir zihnin**, yaşadığı yoğun bir deneyimi yanlış yorumlaması." [vurgu]
  - "İkisine de dürüstçe bakacağız."
  - Soru: "Sen hangisine yakınsın?" çipler: ["Hastalık", "Sağlıklı ama yanıldı", "Bilmiyorum"]; yönlendir: `hastalık/hasta/psikoz/sara`→`fetanet.doktor`; `sağlıklı/vizyon/deneyim/yorum`→`fetanet.vizyoner`.

**FTN-2 · `fetanet.doktor` — "Amcam üç aydır melek görüyor"** · P1 · Onay: Evet
- Sorun: Beş özelliği üst üste (emir, tehdit, özel biri sanma, her şeyi feda, hem görme hem duyma) yığıp "doktor ciddi der" — **doğal sonuç; analoji yönlendirici**. Bilgili muhatap "işlev ve çevre sorusu atladın" der.
- Öneri: Soru kalsın ama gerçekçi tamamlama: "**Doktor ayrıca şunu sorar: bu kişi yaşamını, ilişkilerini, kararlarını nasıl yürütüyor? Kültüründe böyle deneyimler normal mi?**" ve `teshis` satırları: "Doktor büyük ihtimalle gülmez. Bir tablo olduğunu söyler. **Ama işlevi ve çevreyi de sorar**; cevaplar, tanıyı belirler."

**FTN-3 · `fetanet.sara` — kutupluluk, TLE, Babinski** · **P0** · Onay: Evet
- `ikna` anahtarında `"evet"` var; soru "…sara ile açıklanabilir mi?" → "Evet, açıklanabilir" = ikna (MTR-1). **Anahtardan `evet`, `haklisin` çıkar**; `ret`: `["evet","açıklanabilir","olabilir","mümkün"]`.
- **Temporal lob epilepsisi (TLE) eksik** (Persona 1; modern internet versiyonu bu). Yeni `itiraz`: anahtar `["temporal","şakak","tle","nöbetsiz","kısmi nöbet","geschwind","dinî deneyim epilepsi","kısmi epilepsi"]`, yanıt:
  - "Doğru: **şakak lobu (temporal) epilepsisi** ile dinî deneyim arasında bir ilişki 1970'lerden beri tartışılıyor; ama bilimsel olarak **tartışmalı** ve nedensel kanıt yok."
  - "Ayrıca bu tür nöbetlerin tarihî kayıtlarda iz bırakması beklenirdi (bilinç bulanıklığı, nöbet sonrası zihinsel çöküntü). Yok."
  - "Üstelik nöbet, **Rum gibi isabetli ve ayrıntılı bir haberi** ya da bir toplumun kurulmasını açıklamaz. O iki soru bu bölümün ve bir sonrakinin konusu." (`ek:true`, `dogrulanacak:true`; Geschwind 1975; Persinger; Ramachandran — "tartışmalı" etiketi kaynaktan teyit)
- `EK3` ("Başarılı birinin hikâyesini dinlerken tıp kitaplarına koşar mıyız?…") zayıf/retorik; kaldır.
- "Babinski bu tanının yanlış olduğunu gösterdi" → `dogrulanacak:true` (Babinski histeriyi yeniden tanımladı; "çürüttü" aşırı). Öneri: "Sprenger'in histeri tanısı da sonraki nörologlarca terk edildi."

**FTN-4 · `fetanet.formul` — EK1 saçma analoji; ana yol** · **P1** · Onay: Hayır (silme) / Evet (yeni itiraz yanıtı)
- EK1 ("72 yaşında 'Bana Cebrail göründü' diyor. Sonra… karmaşık bir yazılım sistemi") **sil**.
- `itiraz` (yeni): anahtar `["başarı deneyimi","deneyimi doğrulamaz","gerçek olduğunu göstermez","başarı kanıt değil","başarı doğruluk","başarı ile","vizyoner"]` → yanıt: "**Doğru: başarı, deneyimin gerçek olduğunu göstermez.** Burada başarıyı yalnız şu soruya cevap olarak kullanıyoruz: bu insan 'ağır bir bozukluk' tablosuna uyuyor mu? / Deneyimin **kaynağı** sorusu başka deliller istiyor: bilinemeyecek haberler, metnin kendisi, Rum." → `git:"fetanet.vizyoner"`.

**FTN-5 · `fetanet.toplum` / `fetanet.cengiz` — "savaş sanatını bilmeyen toplum"** · **P0** · Onay: Hayır (doğruluk)
- `fetanet.cengiz` satır 5: "Burada ise **savaş sanatını bilmeyen** bir toplum vardı." — Bedevi toplumu **sürekli gazve/baskın** yapan, yetenekli savaşçı bir toplumdu (Persona 1 yazdı). → "Burada ise **kabile baskını** vardı ama **devlet, düzenli ordu ve ortak hukuk** yoktu: baskın yapmak ile devlet kurmak aynı şey değil."
- `fetanet.toplum`: yeni `itiraz` `["savaşçı","kabile savaşı","savaşmayı biliyor","gazve","baskın","akıncı"]` → yanıt: "Doğru: Arabistan savaşçı bir toplumdu; ama savaşçılık **bir devlet** üretmiyordu — kan davası ve kabile asabiyeti her birliği bozardı. Mesele savaşmak değil, **kabileleri aşan bir hukuk ve sadakat** kurmak." (`ek:true`).
- EK "1650'de Osmanlı'dayız… ulus devlet" kafa karıştırıcı; sil.

**FTN-6 · `fetanet.siyasi` — "Güçle değil, fikir ve ahlakla" + "o gidince de dağılmadı"** · **P0** · Onay: Evet
- Sorun: "İlk on üç yıl boyunca silah yok. Yalnızca ikna. … Kan davalı kabileler, tek bir toplum oldu. **Güçle değil, fikir ve ahlakla.** Üstelik o gidince de dağılmadı." Medine'de on yıl savaş; vefatın hemen ardından **Ridde savaşları** (zaten `docs/bolumler/01`'de Ridde (Dozy) geçiyor). Cümle olgusal olarak yanıltıcı; "kılıçla yaydı" itirazını yok sayar.
- Öneri (satır 4–7):
  - "İlk on üç yıl boyunca silah yok. Yalnızca ikna."
  - "Sonra Medine geldi — ve **savaşlar da**: Bedir, Uhud, Hendek, Mekke. Bunu saklamıyoruz."
  - "Ama soru şu: **yalnız kılıç**, kan davalı kabileleri ortak hukuka, ortak ibadete, ortak sadakate dönüştürür mü?"
  - "Vefatından hemen sonra ciddi bir kriz yaşandı (Ridde savaşları). **Yine de düzen ayakta kaldı.**" (`ek:true`)
  - Soru: "Diyelim ki, hâşâ, bir sanrıydı. **Kılıç da yetmiyorsa**, bu başarıyı sanrı mı açıklar?" (çipler: "Gelmiyor", "Cengiz Han da yaptı", "Kılıçla yayıldı"). `Kılıçla yayıldı` → `fetanet.savas` (YNI-3).

**FTN-7 · `fetanet.ongoru` — vaticinium ex eventu, "Beni öldüremezsiniz", Irak, anonim âlim** · **P1** · Onay: Evet
- `itiraz` (yeni): anahtar `["sonradan eklenmiş","sonradan uydurulmuş","olaydan sonra","hadise eklenmiş","geriye dönük","fetihten sonra uydurulmuş"]`, yanıt: "**Haklı bir kaygı**: fetihlerden sonra uydurulan kehanet rivayetleri gerçekten var. O yüzden iki şeyi ayırıyorum: (1) hadislerde geçen ve fetihten sonra yazıya geçen anlatılar; (2) metni **fetihlerden önce sabit** olan bir kehanet — Rum suresi. Şimdi ikincisine bakalım." → `git:"mucize.rum-giris"` (`kapat` yok). (`ek:true`)
- EK3 ("Beni öldüremezsiniz") **sil**: Uhud'da yaralandığı, zehirlenme girişimleri bilinir; olgusal olarak tartışmalı. EK1 (Irak/Çin/ABD) **sil** (benzetme olgu yerine abartı). "Eski bir İslam âlimi der ki" (×3) → "Mutezile âlimi Kadı Abdülcebbar'a göre" (`docs/onay/fetanet.md` kimliği veriyor; v2.1 isimle kaynak ilkesi).

**FTN-8 · `fetanet.kitapehli` — Gassani/Lahmi hatası** · **P0** · Onay: Hayır (doğruluk)
- Mevcut: "Araplar onlarla yüzlerce yıldır komşuydu. Ama kırk yıl boyunca … **tek tanrıcılığa geçmediler**. Gassaniler Bizans'ın, Lahmiler İran'ın komşusuydu. Orada böyle bir atılım olmadı."
- Sorun: Gassaniler (Hristiyan), Lahmiler (Nasturi Hristiyan), Yemen'de Himyar'ın Yahudi kralları, Necran Hristiyanları — **tek tanrıcı Araplar vardı**. Hristiyan/Yahudi muhatap bunu ilk görür.
- Öneri:
  - "Araplar onlarla yüzlerce yıldır komşuydu."
  - "Gassaniler Hristiyan'dı ve Bizans'ın, Lahmiler Hristiyan'dı ve İran'ın komşusuydu; Yemen'de bir dönem Yahudi bir krallık bile vardı."
  - "**Yine de bu temaslardan Arabistan'ı bir kuşakta değiştiren bir hareket doğmadı.**"
  - "Temas varsa, bu sıçrama neden yalnız onunla başladı?" [vurgu]

**FTN-9 · EKSİK: `fetanet.vizyoner` — sağlıklı ama yanılmış vizyoner** · **P0** · Onay: Evet — bkz. YNI-4 (JSON).
- `fetanet.kapanis` satır 4–6 ("Plan, hukuk, ahlak, devlet: bunlar sanrının değil, berrak bir aklın işi. **Benzerini başaran bir insan gösterebilir misin?**") ve EK3 ("Gösteremezse, bu iş onun takatiyle açıklanamaz") **tekil örnek safsatasıdır** (her tarihî şahsiyet tektir); Joan of Arc ordu yönetti, Swedenborg bilim insanıydı, Joseph Smith toplum kurdu. Persona 1 doğrudan yazdı.
- Kapanış önerisi (satır 5–6 yerine): "Plan, hukuk, ahlak, devlet: bunlar **bozuk bir zihnin** değil, berrak bir aklın işi." / "Ama berrak bir akıl da **içtenlikle yanılabilir**. Onu hastalıkla çürütemeyiz — ayrı bir ölçüt lazım." [vurgu] / "**O ölçüt, söylediklerinin içeriği**: yanılmış bir zihin bilmediği geçmişi, beklenmedik geleceği doğru söyleyebilir mi?" → soru + `fetanet.vizyoner`'a değil, doğrudan `mucize.giris`'e yönlendirme (profil `iddia: deli` kalsın; dal **kapanmasın**). EK3'ü sil.

**FTN-10 · `fetanet.ummi` — etimoloji, "el-Emin", EK 1** · **P1** · Onay: Evet
- "'Ümm', anne demek. Anadan doğduğu gibi: eğitim almamış." → tartışmalı; Batılı araştırmacılar sıkça "kutsal kitap verilmemiş (ümmî = gayr-i Yahudi/Arap)" anlamını önerir. "Bilip gizlemiş olsaydı, buna 'el-Emin' demezlerdi." → **non sequitur**.
- Öneri (satır 1–2, 4): "Peki okuma yazma? Kur'an ona **'ümmî'** der. / **Kelimenin tam anlamı tartışılır: okuma yazma bilmeyen ya da kutsal kitap verilmemiş bir Arap.** İki durumda da sonuç aynı: kitaplarla yetişmiş biri değildi." Satır "Bilip gizlemiş…" **sil**. EK1 ("Ümmi olduğu halde, bugün bile dünya nüfusunun önemli bir kısmınca ilmin toplandığı bir kitabı getiren kişi sayılır") **sil** (anlamsız genelleme).

**FTN-11 · `fetanet.ogrenme / bahira2 / ummi / yetisme` — "kimse 'orada öğrendin' demedi / yalanlayan çıkmadı"** · **P0** · Onay: Evet
- Sorun: Kur'an kendisi "Ona bir insan öğretiyor" (Nahl 103) ve "başka bir topluluk ona yardım etti… eskilerin masalları" (Furkân 4–5) suçlamalarını kaydeder; `docs/bolumler/06-mucize.md` (s. 440–445) bunu zaten tartışıyor. Ekran ise "Sonradan şiddetle karşı çıkanlar neden hiç 'orada öğrendin' demedi?" ve "Yalanlayabilirlerdi. Yalanlayan çıkmadı." diyor: **ekrana yansıyan satır, kitabın kendi analiziyle ve Kur'an'la çelişiyor.** (`fetanet.devam`: "Elimizde isim yok, zaman yok, tanık yok." aynı.)
- Öneri: `bahira2` satır 5: "Karşı çıkanlar bir şey söyledi: **'Ona bir insan öğretiyor.'** (Kur'an bu itirazı kendisi kaydeder.) Ama **hiçbiri Bahira'yı ya da on iki yaşındaki bir yolculuğu göstermedi**; gösterdikleri kişiler yabancı dilli kölelerdi ve Kur'an'ın cevabı şuydu: 'Ona nisbet ettikleri kişinin dili yabancıdır, bu ise apaçık Arapçadır.'" Ek ayet kartı Nahl 16:103. `dogrulanacak:true`.
  - `bahira2` EK1 (Hûd/Kasas "öncesinde bunları bilmiyordun" + "Yalanlayabilirlerdi. Yalanlayan çıkmadı") → "**Bu söze itiraz edildi mi?** İtirazlar kaydedildi (yukarıdaki iki ayet); ama iddiayı çürütecek bir isim, zaman ya da tanık gösterilmedi."
  - `fetanet.devam` satır 2: "Elimizde isim yok, zaman yok, tanık yok." → "**Kimden, ne zaman, kimin gözü önünde?** sorularına sağlam bir cevap bulamadık."
  - `fetanet.ummi` EK (Ankebût 48 itirazsız) → "Bu söz, Mekke'de okundu ve itiraz kaydı yok" yerine "**Bu söz okunduğu çatışma ortamında, 'ama biliyordu' diyen biri çıkıp kanıt getirmedi**" (daha dar).

**FTN-12 · `fetanet.tolerans` — cizye/vergi, "Bauer" kimliği** · P1 · Onay: Hayır (hedge)
- "Vergi için dinini değiştiren insan sayısı, ağır baskı altında bile az olmuştur… önce ödediler, sonra kendi istekleriyle Müslüman oldular" tartışmalı (Emevi mali politikaları dönüşümü teşvik etti — Dennett/Bulliet çizgisi); `docs/onay/fetanet.md` zaten "kapalı ifade, basılı teyit" diyor. → "**Kimi araştırmacılara göre** vergi için dinini değiştirenlerin sayısı… (tartışmalı)." EK1 "Tarihçi Bauer" (Thomas mı Susan Wise Bauer mı — `docs/eksikler.md`) **kimlik belirsizken ekrandan çıkarılsın**.
- Ayrıca dhimmî statüsünün **eşitsizlik** boyutu (ayrı vergi, ayrı hukuki statü) hiç anılmıyor; Yahudi/Hristiyan muhatap için bir cümle: "Eşit değillerdi; ama o dönemin Bizans ve Pers ölçüleriyle kıyaslandığında din özgürlüğü **görece geniş** tanındı." (`ek:true`).

**FTN-13 · `fetanet.ahlak`** · P1 · Onay: Hayır — "Kız çocuklarını diri diri gömmek, yaygın bir gelenekti." → "…**bazı kabilelerde görülen** bir gelenekti." (araştırmacılar yaygınlığı tartışıyor). `dogrulanacaklar.md` "Armstrong dn. 314 kız bebeklerin hayatta kalma şansı" bağlamıyla tutarlı.

**FTN-14 · `fetanet.hudeybiye` / `ongoru`** · P2 · Onay: Hayır — "Hendek'e bak… Mekke, bundan sonra bir daha hücum savaşı yapacak gücü bulamadı." doğru; sorun yok. "Tüm tecrübeli siyasetçiler yanılırken, o doğru okudu." → "**Çoğu** tecrübeli sahabi ve müşrik…" (genelleme).

**FTN-15 · `fetanet.devam`** · P1 · Onay: Hayır — Persona 1/2: formul'dan geliş sonrası "Şimdi bir de başarıların kendisine bakmak gerek" mantık hatası. → satır 3: "**Şimdi bu yolların hangi ihtimali bıraktığına bakalım.**" ve `soru`: "Başarılara daha önce baktık mı…" yerine "Devam edelim mi?" (çipler: "Devam", "Bir daha bakalım").

**FTN-16 · `fetanet.sara` EK "Sprenger"** · P2 — Sprenger/Weil "histeri" iddiası **Babinski ile** değil sonraki nörolojiyle terk edildi (bkz. FTN-3).

### 3.6 Mucize ve Kapanış

**MCZ-1 · `mucize.gecis` — "Pencerelerin hepsine baktık"** · **P1** · Onay: Hayır
- Üç persona (ateist/deist/Hristiyan) yalnız tek pencere görüp bu cümleyi gördü; `kapanis.harita(-acik)` "Mucizeler… dil, gelecek, geçmiş" benzeri. → `mucize.gecis` satır 1: "**Baktığın pencerelerden şimdilik yeterince gördün.**" satır 2: "Geriye tek bir soru kaldı: bütün bunlar sana ne söylüyor" (`?…` → `…`). `kapanis.harita-acik` satır 6: "Mucizeler ise haberin doğruluğuna doğrudan bakan delillerdir: **dil, gelecek, geçmiş — hepsine bakmak zorunda değildin.**" Ayrıca gezilmeyen pencereler için `mucize.gecis`'e `soru` ekle: "İstersen bir pencere daha açabiliriz" (çip: "Başka pencere", "Toparlayalım") → `mucize.devam`.

**MCZ-2 · `mucize.kissa-giris … -sonuc` — saygı, doğruluk ve çerçeve** · **P0** · Onay: Evet (hassas)
- Mevcut çerçeve: "Kur'an, Tevrat'tan ve İncil'den kopyalandı. … Kopyalayan biri metni de kopyalar, **hatalarını da**." / `kissa-sonuc`: "**Kur'an hiçbir kıssada Tevrat'ın kopyası değil. Ya sorunlu yeri anlatmaz, ya düzelterek anlatır.**" / `kissa-yusuf` EK: "Eldeki metinde bazı peygamberlere **ağır ifadeler** atfedilir." / `kissa-adem`: "yılan mı doğru söyledi?".
- Sorun: (1) **Akademik fikir birliği paralellik yönünde**: Meryem'in hurma ağacı (Pseudo-Matta), İsa'nın kilden kuşları (Tomas'ın Çocukluk İncili), Ashâb-ı Kehf (Süryani Yakup), Zülkarneyn (Süryani İskender Romansı), Harut-Marut/Enoh motifleri, İbrahim'in putları (Midraş) — Kur'an Yahudi/Hristiyan geleneği içinde **konuşur**. "Hiçbirinde kopya değil" tezi (en azından bu cümleyle) çürütülebilir. (2) Yahudi/Hristiyan okur için "hatalı metin" dili saygı vaadini (ACL-4) bozar. (3) Apokrifler konusunda **olgusal hata**: "Apokrif metinlerin çoğu 1945'te Mısır'da bulundu" (Nag Hammadi gnostik metinleri; Pseudo-Matta ve Tomas'ın Çocukluk İncili bunlar değil, yüzlerce yazmayla/yüzyıllardır bilinir). (4) "Corpus Coranicum'un listesi 24 sayfa" **tezi tersine çeviriyor**: liste, Kur'an çevresindeki metinlerin ne kadar çok olduğunu göstermek için hazırlanmış paralel/ortam derlemesi. (5) "Fransız bir doktor (Bucaille)… bilimsel eleştiri alan konulardan hiçbirini bulamadı": Bucaille güvenilirliği tartışmalı bir kaynaktır ve iddia (Kur'an'da bilimsel hata yok) yaygın itiraz görüyor. (6) "Aynı ismin iki metinde geçmesi alıntı kanıtı değil. 1980 darbesi… Kenan Evren" tonu ciddi tartışmayı komedileştiriyor.
- Öneri — hazır metinler:
  - `kissa-giris` satır 2–5 yerine:
    - "“Kur'an, Tevrat'tan ve İncil'den kopyalandı.” [vurgu]"
    - "Bu itirazın ciddi bir ilmî yanı var: Kur'an'daki kimi kıssalar Tevrat'la, hatta İncil dışı eski Hristiyan anlatılarıyla **gerçekten örtüşür**."
    - "O yüzden soru 'benzerlik var mı?' değil: **'benzerliğin açıklaması ne?'**"
    - "Bir anlatıyı alıp kendi sözüyle yazan, aldığını **taşır**. Kendi anlatısını kuran ise yer yer **ayrılır**."
    - "İki metni yan yana koyup bakalım: nerede aynı, nerede ayrı?"
  - `kissa-sonuc` satır 2–4 yerine: "Kur'an'ın kıssaları, **Tevrat'ın kopyası gibi okunmuyor**: kimi ayrıntıyı hiç anlatmıyor, kimi yerde ayrı bir vurgu kuruyor." / "**Ama** bunun anlamı, benzer motiflerin hiç duyulmadığı olmaz." / "Soru şu: bu benzer motifler **Mekke'de nereden** duyulmuş olabilir ve ayrılan yerler nereden gelmiş?"
  - `kissa-sonuc` `itiraz` yeni yol (Persona 2): anahtar `["apokrif","pseudo","tomas","çocukluk incili","meryem hurma","hurma ağacı","kilden kuş","yedi uyurlar","ashab-ı kehf","zülkarneyn","iskender romansı","süryani","midraş","talmud"]`, yanıt:
    - "**Bunlar ciddi örnekler ve akademisyenlerin çoğu bu paralelliği kabul ediyor.**"
    - "Meryem'in hurma ağacı (Pseudo-Matta), İsa'nın kilden kuşları (Tomas'ın Çocukluk İncili) gibi motifler Kur'an'da, kendi anlatısıyla bütünleşmiş olarak geçiyor."
    - "Bunun iki okuması var: Muhammed bu anlatıları **duydu** ya da (Müslüman okumaya göre) **aynı kaynaktan** geldi. Birincisini seçersen, **öğrenme ihtimaline** döneriz: kimden, ne zaman, hangi dilde? (O soruların cevabı `fetanet.ogrenme`'de.)"
    - "Seçtiğin okuma ne olursa olsun, **'yok' demek mümkün değil**; mümkün olan, bu motiflerin **tamamını** açıklayıp açıklamadığını sormak."
    - (`ek:true`, `dogrulanacak:true`; Reynolds, *The Qur'an and Its Biblical Subtext*; Griffith; Corpus Coranicum "Texts from the Environment")
  - **Sil:** `kissa-sonuc` EK1 (Firavun "gök ve yer ağlamadı" ritüel metin — `docs/dogrulanacaklar.md` B-85 "yazarın kendi çıkarımı"; ekran zaten "Bir okuma olarak" diyor ama kelime kelime cevap iddiası zayıf), `kissa-giris` EK1–EK3 (24 sayfa, Nag Hammadi, Kenan Evren), `kissa-yaratilis` EK2 (Fransız doktor). Saklanacaksa ek örnek olarak yalnız "Râ'inâ" (Bakara 104) korunur ve "gizli hakaret" iddiasına `dogrulanacak`.
  - **Sert dil → yumuşak dil:** "hata/hatalar" → "farklılık/farklı vurgu"; "sorunlu yer" → "farklı yer"; "ağır ifadeler atfedilir" → "daha sert ifadeler vardır".

**MCZ-3 · `mucize.belagat-nebi` — Armstrong ifadesi** · **P0** · Onay: Hayır (silme + mevcut olguya çekme)
- Mevcut: "Karen Armstrong'a göre düşmanlar vahiylerin sahte olduğunu iddia etmedi." / "Açıklayamadıkları bir şey olduğu belliydi."
- Sorun: `docs/onay/acilis-zemin.md`: "Armstrong'un 'düşmanlar vahyin sahte olduğunu iddia etmedi' ifadesi, **Kur'an'ın kendi kayıtlarıyla çeliştiği için alınmadı**." (zemin.musrikler `dayanak`: aynı). Ama bu beat'te ekranda ve `kaynak` kartında (`s. 180`) duruyor. Kur'an: "uydurdu" (Hûd 13, Yunus 38), "şair/kâhin/sihirbaz/mecnun". Üçüncü cümle ("Açıklayamadıkları bir şey olduğu belliydi") sonuç çıkarımı, kaynaksız.
- Öneri: Her iki satırı sil; yerine: "Kur'an, düşmanlarının tepkisini kaydeder: 'şair', 'kâhin', 'sihirbaz'. **Ama bu metnin yerine geçecek bir metin getirilemedi.**" (zaten `zemin.musrikler`'deki ayetlerle uyumlu; Müseylime EK'iyle çelişmiyor: "denendi, değeri" Bodley). Kaynak kartı: Armstrong silinsin ya da "Hz. Muhammed'in tepkilerine bakışı" gibi doğrulanmış bir ifade.

**MCZ-4 · `mucize.belagat-giris` — "misl = denk", Messi/Ronaldo, basketbol ×3** · **P1** · Onay: Evet
- "Çoğu çeviri 'benzer' der. Ama misl, 'denk' demektir." sözlüksel iddia tartışmalı (tefsirler "benzer/mislini" der); "Messi'nin misli Ronaldo'dur" futbol benzetmesi sinematik tonu ve ciddiyeti bozuyor; basketbol benzetmesi aynı sunumda **3 kez** (`mucize.tanim`, `belagat-giris` yol, EK3). Eksik itiraz: **"Güzellik özneldir; ölçüt nedir?"**.
- Öneri:
  - Satır 3–5 yerine: "Ayetteki kelime: **'misl'**. / Meydan okuma taklit istemiyor; **aynı nitelikte** bir söz istiyor." / "Yani kendi özgün eserinle de karşılık verebilirsin."
  - EK3 (basketbol), `yol` "ben de yaparım" (basketbol), `mucize.tanim` EK1 (basketbol) **birini bırak**.
  - Yeni `itiraz`: `["özneldir","ölçüt","güzellik","zevk meselesi","objektif değil","ölçülemez"]` → "Haklısın: güzellik ölçülemez. **Ama meydan okuma 'en güzel' değil, 'benzer' istiyor**, hakemler de o günün şairleri ve Arapçanın ustalarıydı. Onlar 'benzerini yaptık' diyebilirlerdi; denendi ve sonuç Bodley'in sözüyle 'değeri sıfır' bulundu. (Bu ölçüt de mükemmel değil; ama başka bir ölçüt de önerilmiş değil.)" (`ek:true`)

**MCZ-5 · `mucize.belagat-siir` / `-nebi` EK'leri** · P2 · Onay: Hayır — (a) "Mehmet Akif'in Çanakkale şiirinin üstünde bir eser… Bunu bir heyet bugün yapabilir mi?" Türkçe şiir kıyası konu dışı ve karşılaştırma zayıf; sil. (b) "Bir anı aktarılır: **Fransız bir müzisyen**…" (`docs/dogrulanacaklar.md` B: "Gilbert anısı, kaynağı yalnız Hamidullah") → "Hamidullah'ın aktardığına göre, **Gilbert adlı bir Fransız müzisyen**…" ya da sil. (c) `belagat-nebi` `bilinçaltı` yanıtı: "Bu bir açıklama değil, açıklamama biçimi." küçümseyici → "Bilinçaltı bir etiket; ama çalışması için malzeme gerekir: dil ustalığı, şiir kulağı. Margoliouth'un tespiti tersini gösteriyor."

**MCZ-6 · `mucize.rum-*` — küçük doğruluk/dil ayarları** · P1 · Onay: Hayır
- `rum-ayet` satır 4: "bid'. Yani üç ile **on** arası." → "Yani üç ile **dokuz** (kimi sözlükler **on**) arası." (klasik sözlük tanımı 3–9). Ebubekir–Übey bahsi satır: "Sonra süre **on** yıla" → hadis versiyonları 9 yıl der (Tirmizî) → "Sonra süre **uzatıldı**, deve yüze çıktı." (`dogrulanacak`)
- `rum-giris` satır 4: "Karargâhları İstanbul'un karşı yakasında, Üsküdar'a kuruldu." ✓ ; `rum-tahmin` satır 2: "Persler İstanbul'un karşısında **on yıldan fazla** ordugâh kurmuştu." → "Persler İstanbul'un **karşı yakasına kadar dayanmıştı**." (Gibbon atfı: "on yıl" aşırı; 615–626 kesintili).
- `rum-tahmin` EK2 "**Tarihçiler bunu böyle sezdirir.**" **sil** (uydurma atıf; kaynak yok).
- `rum-ayet` `itiraz` eksik: **kıraat** `["kıraat","okunuş","ghalabat","yenildi mi yendi","fiil kalıbı","yenecek mi yenildi"]` → "Doğru: Kur'an'da bu ayetlerin **iki okunuşu** rivayet edilir (Rumlar 'yenildi' ya da 'yendi'). Çoğunluk okunuşu 'yenildi'. Eski tefsirler ikisini de tartışır ve ikinci okunuş, Müslümanların Bizans karşısındaki zaferine dair daha geç bir yorumu yansıtır." (`ek:true`, `dogrulanacak:true`; kaynak: Tirmizî "Tefsîr" 3193, Zemahşerî, Nöldeke)
- Bell: "Mekkî sayanlar arasında … Bell" cümlesi ve Bell alıntısı (`dogrulanacak:true`) için, Bell'in yeniden düzenlemesinde Rûm 30:1–5'in **sonradan gözden geçirilmiş** sayılıp sayılmadığı asıl kaynaktan teyit edilmeli; sonuç tersse Bell listeden ve alıntıdan çıkarılmalı.

**MCZ-7 · `mucize.haber-felsefesi` — Hume ve mütevatir çelişkisi** · P1 · Onay: Evet
- Satırlar "Kalabalık bir topluluğun yalanda birleşemeyeceği haber bilgi verir. Buna 'mütevatir' denir" ↔ EK3: "mucize haberlerinin çoğu **birkaç ravide** kalır. Bir defalık olayda şahit azdır": kendi kendini çürütüyor. Düz Dünya/"Psikologlar ünlü deneyi tekrar etmeden kabul eder" benzetmeleri zayıf ve çoğu "tekrar krizi" bilen muhatabı ters teper.
- Eksik: **Hume** ("olağanüstü iddia olağanüstü delil ister"). 
- Öneri: EK3 sil. `itiraz` ekle: `["hume","olağanüstü iddia","olağanüstü kanıt","sagan","olağanüstü delil"]` → "**Hume'un ölçütü haklı bir ölçüt:** olağanüstü bir iddia sağlam delil ister. Bu yüzden önce uzak geçmişteki mucize anlatılarına değil, **bugün de kontrol edilebilen** deliller (dil, Rum, kıssalar) üzerinden gidiyoruz." → `git:"mucize.teshis"`. `ek:true`.

**MCZ-8 · `mucize.sihir`** · P1 · Onay: Hayır
- "Tartışmada asla. Ancak karşındaki gözünün önünde şaşırtıcı bir şey yapmışsa." aşırı ("sihirbaz" hakaret olarak da kullanılır). → "**Tartışmada pek.** 'Sihirbaz' çoğu zaman, karşındakinin etkisini inkâr edemediğinde yapıştırdığın bir etikettir." `itiraz` yanıtı "Mecaz, hakiki anlamın üstüne delille kurulur" **yerine** "Mecaz olabilir: 'sihir gibi etkili söz'. **Bu bile** belagatın itirafıdır." (zaten son cümle). Satır 5 "İtirazın kendisi, bir şey yaşandığını ele verir." → "İtirazın kendisi, **bir etkinin** yaşandığını ele verir."

**MCZ-9 · `kapanis.soru` — niyet kaçırılıyor** · **P0** · Onay: Evet — bkz. YNI-8, YNI-9
- "Müslüman olmak istiyorum" ve "bilimsel hatalar" jenerik vedaya düşüyor. `yollar`'a: `["müslüman olmak","müslüman olmak istiyorum","nasıl müslüman","şehadet","kelime-i şehadet","islam'a girmek","ihtida"]` → `kapanis.baslangic`; `["bilim","bilimsel","hata","çelişki","dağ","embriyo","evrim","big bang"]` → `kapanis.bilim`; `["kureyza","aişe","savaş","köle","kadın","şiddet"]` → `kapanis.sorularim`. `varsayilan`: `kapanis.veda`'ya "Yazdığını **not aldım**." satırı ekle (kullanıcı yazdığı metne göre).

**MCZ-10 · `kapanis.harita` / `kapanis.karar`** · P2 · Onay: Hayır — `kapanis.harita` "Geriye tek yol parlıyor: haber doğruydu." çok iyi sinematik; ama "Samimiyet delillerine baktın. Bu yol sönükleşti" yalnız kullanıcı kapattıysa (zaten `harita-acik`). `kapanis.karar` "Bu yol delil toplamaktan fazlası. Müslümanlar buna 'hidayet' der…" ✓ dürüst.

---

## 4. Eksik itirazlar ve önerilen yeni beat taslakları

### Eksik itirazlar (öncelik sırası)

| # | İtiraz | Kim sorar | Önerilen yer |
|---|---|---|---|
| 1 | **Aişe'nin yaşı** | Saldırgan, Batılı, ateist | `samimiyet.aise` (YNI-1) |
| 2 | **Medine, Yahudi kabileleri, Kureyza** | Yahudi, ateist, tarihçi | `samimiyet.kureyza` (YNI-2) |
| 3 | **"Kılıçla yaydı"/savaşlar** | Hemen herkes | `fetanet.savas` (YNI-3) |
| 4 | **Sağlıklı vizyoner (Joan, Swedenborg, Smith), TLE** | Ateist, Batılı | `fetanet.vizyoner` (YNI-4) |
| 5 | **"Vahiy tam işine geliyordu" (Zeynep, Ahzâb)** | Ateist, saldırgan | `samimiyet.isine-gelen` (YNI-5) |
| 6 | **Önce samimi, sonra çıkar** (kademeli yozlaşma) | Tarihçi, Hristiyan | `samimiyet.kademeli` (YNI-6) |
| 7 | **Deist: neden vahiy?** | Deist, agnostik | `haber.vahiy-gerek` (YNI-7) |
| 8 | **Başka dinlerin kurucuları** (Joseph Smith, Mirza Gulam, Bab; "her dinin samimi kurucusu var") | Ateist, Hristiyan | Hem YNI-4'ün parçası hem `mucize.rum-kehanet` ek örneği |
| 9 | **Kur'an'da bilimsel/tarihî hatalar** | Ateist | `kapanis.bilim` (YNI-8) ya da yeni bölge |
| 10 | **Kıraatler / farklı mushaflar** (İbn Mesud) | Bilgili | `zemin.tahrif`/`hafizlar` itirazı (ZMN-5) |
| 11 | **"Kılıçla vahiy: Hudeybiye vs. Kureyza"** vb. | Yahudi | YNI-2 |
| 12 | **Meryem–Harun, Haman, Zülkarneyn** | Hristiyan, Yahudi | ZMN-1 itiraz + MCZ-2 itiraz |
| 13 | **Hume / mucize ihtimali** | Ateist, deist | MCZ-7 |
| 14 | **Hadis tabanlı kehanet = vaticinium ex eventu** | Ateist | FTN-7 |
| 15 | **"İslam'ı bir lider uydurmadı; Arabistan'da zaten hanifler vardı"** (Hanif, Zeyd b. Amr, Varaka) | Tarihçi | `fetanet.ogrenme` itirazı (`hanif`, `Varaka` anahtarları zaten `kissa-giris`'te; `fetanet.ogrenme`'ye de eklenmeli) |
| 16 | **"Müslüman olmak istiyorum / sonra ne yapayım?"** | Deist, genç | `kapanis.baslangic` (YNI-8) |

### Beat taslakları (şemaya uygun)

> Hepsi `"ek": true`, `"dogrulanacak": true`. Hassas olanlar (YNI-1, 2, 5) **kullanıcı onayı olmadan yayına alınmamalı**. `gizliDugum` değerleri geçici (`—`). Kaynak künyeleri doğrulanana dek `kaynak` nesnesi boş bırakıldı (uydurulmadı).

**YNI-1 · `samimiyet.aise`** (Aişe'nin yaşı — hassas)

```json
{
  "id": "samimiyet.aise",
  "gizliDugum": "—",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "gokyuzu" },
  "satirlar": [
    { "metin": "Bu soruyu atlamayacağım. Haklı bir soru." },
    { "metin": "Rivayetlere göre Aişe ile nikâh çok erken yaşta kıyıldı; birlikte yaşamaya yaklaşık dokuz yaşında başladılar." },
    { "metin": "Bu rivayet erken dönem hadis kitaplarında geçer; bazı Müslüman araştırmacılar yaşı farklı hesaplar." },
    { "metin": "Yedinci yüzyılda Arabistan'da da Bizans'ta da çok erken evlilik bilinen bir uygulamaydı." },
    { "metin": "Bu, bugünkü ölçümüzle rahatsız edici olmasını ortadan kaldırmaz.", "tempo": "yavas" },
    { "metin": "Ama burada sorduğum şey, bunun bugün nasıl yargılanacağı değil.", "vurgu": true },
    { "metin": "Soru: bu hayat, 'şehvet için yalan söyleyen bir adam' iddiasını destekliyor mu?" }
  ],
  "soru": {
    "metin": "Bir davranışı bugünün ölçüleriyle yargılamak ile, o davranışın arkasında 'bile bile yalan' olduğunu söylemek aynı şey mi?",
    "cipler": ["Ayrı şeyler", "Hâlâ rahatsız ediyor", "Bu cevap yetmedi"],
    "serbest": false,
    "ipucu": "Aklından geçeni yaz. Kaçmayacağım."
  },
  "yollar": [
    { "tur": "ikna", "anahtar": ["ayrı şeyler", "ayrı", "farklı şeyler", "haklısın"], "git": "samimiyet.kadin" },
    { "tur": "itiraz", "anahtar": ["rahatsız", "ahlaksız", "kabul edilemez", "ürkütücü", "tiksindirici"],
      "yanit": [
        "Rahatsız olman anlaşılır; bunu savunmaya çalışmıyorum.",
        "Burada tek iddia şu: bu evlilik, 'çıkar için bile bile yalan' tezini desteklemiyor. Başka ahlaki değerlendirmeyi yapmak senin hakkın.",
        "İstersen bu konuyu sunumdan sonra ayrıca konuşabiliriz."
      ] }
  ],
  "ekOrnekler": [
    { "satirlar": [ { "metin": "Düşmanları, ona yönelttikleri onlarca ithamda bu evliliği bir ahlak saldırısına çevirmedi." }, { "metin": "O günün ölçüsüne göre bu, tartışma konusu değildi." } ], "soru": "Bu evlilik o dönemde bir skandal sayılmadıysa, bunu 'şehvet düşkünlüğünün' kanıtı yapmak neye dayanıyor?" }
  ],
  "kompozisyon": "Bu konuyu sen nasıl değerlendiriyorsun? Kendi cümlelerinle yaz; not alacağım.",
  "kopru": ["Buna dürüstçe cevap vereceğim. Önce şunu soruyordum:"],
  "sonraki": "samimiyet.kadin",
  "dayanak": "Rivayet: Buhârî, Müslim (Aişe evliliği). Yaş tartışması: Müslüman araştırmacılar (ör. Hamîdullah, çağdaş yaş hesabı yazarları) ile klasik kaynaklar. Batılı: Watt, Muhammad at Medina. ONAY GEREKİR: ton ve yaş ifadesi. 'Düşmanları ithamda bu evliliği kullanmadı' ifadesi sessizlikten delildir; kaynak: Watt/Ibn Ishaq taraması gerekir. Kaynak künyeleri doğrulanmadı."
}
```

**YNI-2 · `samimiyet.kureyza`** (Medine Yahudi kabileleri — hassas, iskelet)

```json
{
  "id": "samimiyet.kureyza",
  "gizliDugum": "—",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "col" },
  "satirlar": [
    { "metin": "Bunu soran haklı: Medine dönemi Yahudi kabilelerle ilişkilerin kötüleştiği, karanlık bir sayfa da içeriyor." },
    { "metin": "Bir sözleşme yapılmıştı. Sonraki yıllarda kabilelerden bazıları Medine'den sürüldü; Hendek'ten sonra Kureyza kabilesi kuşatıldı." },
    { "metin": "Kaynaklara göre Kureyza, Mekkelilerle işbirliği yaptığı gerekçesiyle, kendi seçtikleri bir hakemin hükmüyle yargılandı; erkeklerin çoğunun idam edildiği aktarılır." },
    { "metin": "Sayı kaynaklarda farklı geçer; kimi modern araştırmacılar hem sayıyı hem ayrıntıları tartışır.", "tempo": "yavas" },
    { "metin": "Bunu geçiştirmeyeceğim: bugünün ölçüsüyle ağır bir olay.", "vurgu": true },
    { "metin": "Burada sorduğum şey başka: bu olay 'güç düşkünü bir yalancı' tablosunu mu destekliyor?" }
  ],
  "soru": {
    "metin": "Bu olay, onun samimiyeti hakkında ne söylüyor? Kendi okumanı yaz.",
    "cipler": ["Savaş hukuku gibi duruyor", "Güç hırsı gibi duruyor", "Bilmiyorum"],
    "serbest": true
  },
  "yollar": [
    { "tur": "profil", "anahtar": ["savaş hukuku", "hukuk", "hakem", "ihanet"], "git": "samimiyet.kadin", "profil": { "kureyza": "hukuk" } },
    { "tur": "profil", "anahtar": ["güç hırsı", "güç", "hırs", "zulüm", "katliam"], "git": "samimiyet.guc", "profil": { "kureyza": "hirs" } }
  ],
  "varsayilan": "samimiyet.kadin",
  "kopru": ["Bu soruyu cevapsız bırakmayacağım. Ama önce şunu soruyordum:"],
  "sonraki": "samimiyet.kadin",
  "dayanak": "ONAY GEREKİR (hassas): Medine Sözleşmesi, Beni Kaynuka/Nadir sürgünü, Kureyza (627, Sa'd b. Muaz hükmü); sayı 600–900 (İbn İshak/Guillaume), Arafat ve Barakat Ahmad şüpheci; Watt, Muhammad at Medina. Bu iskelet yalnız çerçevedir: 'savaş hukuku' savunması kullanıcıyla netleştirilmeden kesin hükme çevrilmemeli. Hiçbir tarihî ayrıntı doğrulanmadı."
}
```

**YNI-3 · `fetanet.savas`** ("kılıçla yaydı")

```json
{
  "id": "fetanet.savas",
  "gizliDugum": "F8",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "col" },
  "satirlar": [
    { "metin": "'Sonunda kılıçla yaydı.' Bu itiraz haklı bir yerden geliyor." },
    { "metin": "Medine'de savaşlar oldu: Bedir, Uhud, Hendek, sonra Mekke. Saklamak mümkün değil; saklamıyoruz." },
    { "metin": "Ama iki ayrı soru var." },
    { "metin": "Birincisi: bu savaşların ahlakî değerlendirmesi. Bunu burada hükme bağlamıyoruz.", "tempo": "yavas" },
    { "metin": "İkincisi: bu savaşlar, 'ağır bir sanrı yaşıyordu' iddiasını açıklıyor mu?", "vurgu": true },
    { "metin": "Hudeybiye'de silahsız umreye çıkmayı, Hendek'te hendek kazmayı, Mekke'yi kansız almayı: bir sanrı mı planladı?" }
  ],
  "soru": {
    "metin": "Savaşların olması, 'sanrı' iddiasını destekliyor mu, yoksa başka bir tartışma mı?",
    "cipler": ["Başka bir tartışma", "Yine de destekliyor", "Bilmiyorum"],
    "serbest": false
  },
  "yollar": [
    { "tur": "ikna", "anahtar": ["başka bir tartışma", "ayrı", "farklı konu", "haklısın"], "git": "fetanet.ongoru" },
    { "tur": "ret", "anahtar": ["destekliyor", "yine de", "kılıç"] }
  ],
  "ekOrnekler": [
    { "satirlar": [ { "metin": "Vefatından hemen sonra Arap kabilelerinde ciddi bir kriz yaşandı (Ridde savaşları)." }, { "metin": "Yine de ortak hukuk ve ibadet düzeni ayakta kaldı." } ], "soru": "Yalnız kılıçla birleşmiş bir toplum, kurucusunun ölümünün hemen ardından bu krizi nasıl atlatır?" }
  ],
  "kompozisyon": "Savaşlar ve bir toplumun kuruluşu: bunları 'sanrı' ile nasıl uzlaştırıyorsun?",
  "sonraki": "fetanet.ongoru",
  "dayanak": "FTN-6 ile birlikte. Medine savaşları: Watt, Muhammad at Medina; Ridde: Dozy (kitap s. 108). Ahlakî değerlendirme bilinçli olarak yapılmıyor. ONAY GEREKİR (ton, 'saklamıyoruz')."
}
```

**YNI-4 · `fetanet.vizyoner`** (sağlıklı ama yanılmış — en kritik eksik beat)

```json
{
  "id": "fetanet.vizyoner",
  "gizliDugum": "F24",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "gokyuzu" },
  "satirlar": [
    { "metin": "Şimdi en güçlü itirazlardan birine geliyoruz." },
    { "metin": "'Hasta değildi. Sağlıklı, zeki, samimi biriydi. Yaşadığı yoğun bir deneyimi Tanrı'dan sandı.'", "vurgu": true },
    { "metin": "Bunu hastalıkla çürütemeyiz. Tarihte örnekleri var: Jeanne d'Arc ordu yönetti, Swedenborg bilim insanıydı, Joseph Smith bir toplum kurdu." },
    { "metin": "Hepsi samimiydi; hepsinin yaşadığı bir şey vardı." },
    { "metin": "O hâlde ölçüt değişiyor.", "tempo": "yavas" },
    { "metin": "Yanılmış ama sağlıklı bir zihin, kendi bilgisinin ve çağının ötesine geçemez.", "vurgu": "an" },
    { "metin": "Yani şuna bakacağız: söylediği haberler — geçmiş, gelecek, dil — yanılmış bir zihnin ürünü olabilir mi?" }
  ],
  "soru": {
    "metin": "Sağlıklı ama yanılmış biri, bilmediği bir geçmişi ve herkesin beklentisinin tersi bir geleceği doğru söyleyebilir mi? Önce bakmak ister misin?",
    "cipler": ["Bakalım", "Bence söyleyebilir", "Bilmiyorum"],
    "serbest": true
  },
  "yollar": [
    { "tur": "yonlendir", "anahtar": ["bakalım", "evet bakalım", "bakmak isterim", "göster"], "git": "mucize.giris" },
    { "tur": "itiraz", "anahtar": ["söyleyebilir", "şans", "tesadüf", "tahmin"],
      "yanit": [
        "Olabilir; bunu sınamanın tek yolu örneğe bakmak.",
        "Beş şart koyacağım: net aralık, herkesin beklentisinin tersi, tek tahmin, kırk yaşına kadar kehanet yok, iki büyük devletin kaderi.",
        "Şartlar tutuyorsa, 'yanılmış zihin' açıklaması zorlaşır; tutmuyorsa elimde başka delil kalmaz."
      ] }
  ],
  "varsayilan": "mucize.giris",
  "sonraki": "mucize.giris",
  "dayanak": "FTN-9, FTN-4, HBR-3. Jeanne d'Arc (1412-1431), Swedenborg (1688-1772), Joseph Smith (1805-1844): genel tarih bilgisi, ek:true; doğrulanacak (genel kaynaklar). Dal KAPANMAZ: bu beat kapat taşımaz. Not: 'çağının ötesine geçemez' ifadesi bir varsayımdır; kullanıcıya 'sınanabilir ölçüt' olarak sunuluyor, kanıt olarak değil."
}
```

**YNI-5 · `samimiyet.isine-gelen`** ("vahiy tam işine geliyordu" — hassas)

```json
{
  "id": "samimiyet.isine-gelen",
  "gizliDugum": "S12",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "gokyuzu" },
  "satirlar": [
    { "metin": "Eski ve ciddi bir itiraz: 'Vahiy tam işine geldiği anda geliyordu.'" },
    { "metin": "Bu itirazı yapanlar arasında Batılı tarihçiler de var. Kimi ayetlerin toplumsal bir ihtiyaca denk geldiği doğru." },
    { "metin": "Ama o hâlde aynı metinde işine gelmeyen ayetler neden var?", "vurgu": true },
    { "metin": "Abese: 'yüzünü ekşitti'. Tevbe 43: 'izin vermeseydin'. Ahzâb 37: 'insanlardan çekiniyordun'. İsra 75: 'neredeyse meyledecektin'." },
    { "metin": "Bunlar işine gelen ayetler gibi görünmüyor." }
  ],
  "soru": {
    "metin": "Her ayeti işine gelen bir metin, kendisini azarlayan ayetlere neden yer verir?",
    "cipler": ["Açıklaması zor", "Seçici okuyorsun", "Bilmiyorum"],
    "serbest": false
  },
  "yollar": [
    { "tur": "ikna", "anahtar": ["açıklaması zor", "zor", "haklısın", "mantıklı"], "git": "samimiyet.kapanis" },
    { "tur": "itiraz", "anahtar": ["seçici", "cherry", "kiraz", "bile bile", "dürüst değil"],
      "yanit": [
        "Haklısın: seçici okumak mümkün; zaten her iki türden örnek var.",
        "Bu yüzden sana şunu öneriyorum: 'işine geleni' ve 'işine gelmeyeni' ayrı ayrı say; hangi taraf ağır basıyor?"
      ] }
  ],
  "sonraki": "samimiyet.kapanis",
  "dayanak": "ONAY GEREKİR (hassas). Ahzâb 33/37, 33/50-53, Tahrîm 66/1 (Aişe hadisi 'Rabbinin arzularına çabuk yetiştiğini görüyorum': Buhârî) — itirazın ilk dalı; cevap Kur'an-içi uyarı ayetleri (docs/bolumler/03-samimiyet.md, 33/37 notu, dn. 519: ismet inancı korunur). 'Batılı tarihçiler de yapar' ifadesi doğrulanacak (Watt, Rodinson)."
}
```

**YNI-6 · `samimiyet.kademeli`** (başta samimi, sonra çıkar)

```json
{
  "id": "samimiyet.kademeli",
  "gizliDugum": "S1",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "safak" },
  "satirlar": [
    { "metin": "Belki en akla yatkın itiraz bu: 'Başta samimiydi. Güç kazandıkça dini işine yarattı.'" },
    { "metin": "Bu ihtimal, 'bilerek yalan' ile 'bilmeden yanılma'nın ortasında bir şey." },
    { "metin": "Test basit: güç arttıkça hayat değişti mi?", "vurgu": true },
    { "metin": "Fethin ertesinde 'kral değilim' diyen biri. Rehinde zırhla ölen biri. Hasırın izi böğründe kalan biri." },
    { "metin": "Ve güç arttıkça, onu azarlayan ayetler de azalmadı: Tevbe 43, Ahzâb 37 Medine'de indi." }
  ],
  "soru": {
    "metin": "Güç arttıkça hayatı da değil, ayetlerin tonu da gevşemediyse, 'sonradan işine yaradı' iddiası neye dayanıyor?",
    "cipler": ["Haklısın, dayanmıyor", "Yine de olabilir", "Emin değilim"],
    "serbest": false
  },
  "yollar": [
    { "tur": "ikna", "anahtar": ["dayanmıyor", "haklısın", "mantıklı", "zor"], "git": "samimiyet.kapanis" }
  ],
  "sonraki": "samimiyet.kapanis",
  "dayanak": "Önerilen yeni itiraz-yol. Tevbe 43 (Medine, Tebük öncesi), Ahzâb 37 (Medine) Kur'an-içi. Hasır/zırh: kitabın S12 anlatıları (hadis tabanlı; destekleyici). ONAY GEREKİR: yeni argüman."
}
```

**YNI-7 · `haber.vahiy-gerek`** (deist için) ve `acilis.ilgisiz` + `ozet.kisa`

```json
{
  "id": "haber.vahiy-gerek",
  "gizliDugum": "Z1",
  "ek": true,
  "dogrulanacak": true,
  "dallan": [],
  "sahne": { "arkaplan": "gokyuzu" },
  "satirlar": [
    { "metin": "Bir Yaratıcı'ya inanıyorsun ama bir dine değil." },
    { "metin": "Bu durumda doğal bir soru çıkıyor: 'Neden bir insanla konuşsun?'", "vurgu": true },
    { "metin": "Bu soruyu peşinen cevaplamayacağım." },
    { "metin": "Yalnız şunu söylüyorum: Yaratıcı'nın insanla konuşması mantıksal olarak imkânsız değil." },
    { "metin": "Mümkünse, 'konuşuyor' diyen birinin sözünü bir haber olarak tartabiliriz." }
  ],
  "soru": {
    "metin": "Bir Yaratıcı insanlara yol göstermek isteseydi, bunu hangi yolla yapmasını beklerdin?",
    "cipler": ["Akıl yeter", "Bir elçi gönderebilir", "Bilmiyorum"],
    "serbest": true
  },
  "yollar": [
    { "tur": "itiraz", "anahtar": ["akıl yeter", "akıl", "vahye gerek yok", "gerek yok"],
      "yanit": [
        "Akıl çok şey gösterir; ama ölümden sonra ne olacağı, nasıl yaşanacağı gibi sorularda akıllar bile birbirinden ayrılıyor.",
        "Ben bunu kabul etmeni istemiyorum; yalnız bir ihtimal olarak bırakıyorum."
      ] },
    { "tur": "ikna", "anahtar": ["elçi", "gönderebilir", "peygamber", "olabilir", "bilmiyorum"], "git": "haber.teori" }
  ],
  "varsayilan": "haber.teori",
  "sonraki": "haber.teori",
  "dayanak": "Deist muhatap için eksik düğüm (docs/metod-haritasi.md §4.2 'Önce Tanrı'nın varlığını/doğaüstünün mümkün olduğunu ispatlayın' Z1, Z4). Bağlantı: acilis.din'e ['deist','deizm','deistim'] → profil {din:'diger', deizm:'evet'}; haber.giris dallan [{kosul:{'profil.deizm':'evet'}, git:'haber.vahiy-gerek'}]."
}
```

```json
{
  "id": "ozet.kisa",
  "gizliDugum": "R8",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "safak" },
  "satirlar": [
    { "metin": "Uzun geldiyse özür dilerim. İşte iki dakikalık özet." },
    { "metin": "Bir adam 'Allah benimle konuşuyor' dedi. Bu bir haber: ya doğru, ya yanlış." },
    { "metin": "Yanlışsa ya bilerek yalan, ya bilmeden yanılma." },
    { "metin": "Bilerek yalan: zırhı rehinde öldü, oğlunun ölümünde gökyüzü alametini reddetti, kendini azarlayan ayetleri okuttu." },
    { "metin": "Bilmeden yanılma: bu tabloya uyan bir hastalık bulunmadı; sağlıklı bir yanılgı ise söylediklerinin doğruluğuyla sınanır." },
    { "metin": "Rum suresi: 614'te herkes Bizans'ın bittiğini düşünürken, birkaç yıl içinde galip geleceğini söyledi.", "vurgu": true }
  ],
  "soru": {
    "metin": "Bu kısa özetten sonra ne yapalım?",
    "cipler": ["Devam edelim", "Bir yerde ayrıntı isterim", "Burada bırakalım"],
    "serbest": true
  },
  "yollar": [
    { "tur": "yonlendir", "anahtar": ["ayrıntı", "detay", "derin"], "git": "haber.ihtimaller" },
    { "tur": "yonlendir", "anahtar": ["devam", "tamam", "kapanış", "bırakalım", "yeter"], "git": "kapanis.giris" }
  ],
  "varsayilan": "kapanis.giris",
  "sonraki": "kapanis.giris",
  "dayanak": "MTR-9. Özet; yeni olgu yok. 'Bu tabloya uyan bir hastalık bulunmadı' ifadesi fetanet.kapanis ile tutarlı olmalı (FTN-9 sonrası: 'bozuk zihin' tablosu)."
}
```

**YNI-8 · `kapanis.baslangic`, `kapanis.bilim`, `kapanis.sorularim`**

```json
{
  "id": "kapanis.baslangic",
  "gizliDugum": "R8",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "safak" },
  "satirlar": [
    { "metin": "Bunu yazman, kolay bir cümle değil." },
    { "metin": "Ben bir sunumum; senin yerine hiçbir şey yapamam, yapmamalıyım da." },
    { "metin": "Müslümanlar için bu adım iki tanıklık cümlesidir: 'Allah'tan başka ilah yoktur; Muhammed O'nun elçisidir.'", "tempo": "yavas" },
    { "metin": "Şahit gerekmez; acele de gerekmez." },
    { "metin": "Sorularını bilen, seni dinleyen biriyle konuş: bir İslam bilgini ya da güvendiğin bir Müslüman." },
    { "metin": "Karar senin; ve sunum burada bitse de sorular bitmez.", "vurgu": true }
  ],
  "sonraki": "kapanis.veda",
  "dayanak": "ONAY GEREKİR (ürün kararı: davet/yönlendirme dili, belirli bir kuruma bağlantı verilmemeli). Şehadet metni genel; uygulama tarif edilmiyor."
}
```

```json
{
  "id": "kapanis.bilim",
  "gizliDugum": "R8",
  "ek": true,
  "dogrulanacak": true,
  "sahne": { "arkaplan": "gokyuzu" },
  "satirlar": [
    { "metin": "Bilimsel itirazlar önemli: dağlar, güneşin batışı, embriyoloji, yaratılışın günleri." },
    { "metin": "Bu sunum bu konulara bilerek girmedi: cevabı uzun, tefsir ve bilim tarihi gerektiriyor ve tek cümleyle yarım kalır." },
    { "metin": "Dürüst olmak gerekirse bu bir eksik. Not ettim.", "vurgu": true },
    { "metin": "İstersen şimdilik kendi itirazını biraz daha ayrıntılı yaz; hangi ayetten, hangi bilimsel bulguyla çeliştiğini düşünüyorsun?" }
  ],
  "soru": { "metin": "Hangi ayet ve hangi bulgu?", "cipler": ["Yazmak isterim", "Şimdilik yeter"], "serbest": true },
  "varsayilan": "kapanis.veda",
  "sonraki": "kapanis.veda",
  "dayanak": "Yer tutucu: bilimsel itirazlar için ayrı bölge (ya da dürüstçe 'bu sunumda yok') kararı gerekir. Kaynak: tefsir/bilim literatürü; ayrıntılı cevap yazılmadan ek örnek eklenmemeli."
}
```

```json
{
  "id": "kapanis.sorularim",
  "gizliDugum": "R8",
  "sahne": { "arkaplan": "gokyuzu" },
  "satirlar": [
    { "metin": "Yazdığın sorunun cevabı bu sunumda henüz yok." },
    { "metin": "Bunu saklamıyorum. Not ettim.", "vurgu": true },
    { "metin": "İstersen buraya yazdığın itirazları sana bir liste olarak göstereyim; bir sonraki sürümde cevaplanmayı bekleyenleri." }
  ],
  "sonraki": "kapanis.veda"
}
```

**YNI-9 · `kapanis.itirazlar-listesi`** — `profil.itirazlar[]` listesini (MTR-6, MTR-7) kullanıcıya "Cevabını henüz hazırlamadığım sorular" diye gösteren kapanış sahnesi; veri toplamaz, yalnız yerel gösterir. (JSON yazılmadı: motor desteği gerekiyor.)

**YNI-10 · `acilis.ilgisiz`** (kısa)

```json
{
  "id": "acilis.ilgisiz",
  "gizliDugum": "—",
  "ek": true,
  "sahne": { "arkaplan": "gokyuzu" },
  "satirlar": [
    { "metin": "Anladım. Seni zorla tutmayacağım." },
    { "metin": "İki dakikalık bir özet ister misin? Beğenmezsen kapat; kimse küsmez." }
  ],
  "soru": { "metin": "Özet ister misin?", "cipler": ["Evet, kısa olsun", "Hayır, bırakalım"], "serbest": true },
  "yollar": [
    { "tur": "yonlendir", "anahtar": ["evet", "kısa", "olur", "özet"], "git": "ozet.kisa" },
    { "tur": "yonlendir", "anahtar": ["hayır", "bırak", "yok", "boşver"], "git": "kapanis.veda" }
  ],
  "varsayilan": "ozet.kisa",
  "sonraki": "ozet.kisa"
}
```

---

## 5. Sahneler: görsel/diyagram ve "aha" anları

**Güçlenmesi gereken anlar**
| Beat | Öneri |
|---|---|
| `samimiyet.tutulma` ("O kalktı ve şöyle dedi…") | `"vurgu": "an"` (sunumun en iyi anı); sahne: `isik` + kısa `sessiz: true` (2,5 sn) — "güneşin tutulduğu gün, oğlunu gömdüğü gün". |
| `samimiyet.sohret` (Abese 1–2 ayeti) | Ayet kartı iyi; aynı beat'te `Tevbe 43`/`İsra 75` arka arkaya — "**Bu cümleleri kendisi okudu, ezberletti**" satırını `"vurgu": "an"` yap. |
| `fetanet.vizyoner` (YNI-4) | `"vurgu": "an"` zaten işaretlendi. |
| `zemin.cografya` | `karsilastirma` yerine yeni diyagram: harita (dört şehir noktası, ok); zaman çizelgesi `zaman` zaten var. Mevcut tablo, Osman eşleştirmesi iddiası nedeniyle (ZMN-2) risk taşıyor. |
| `kapanis.harita` | `ihtimaller` diyagramı iyi; "Geriye tek yol parlıyor" `"vurgu": "an"` (bölge başına 1–2 kural: kapanış). |

**Yanlış yerde / gereksiz**
- `zemin.kiyasYazma` `karsilastirma` tablosu (NT 5000+ ↔ Kur'an "kırk dört / milyonlarca") **yanlış izlenim** yaratıyor (ZMN-3).
- `zemin.siffin` `sayac` (500) EK'de ve `alinti` (Hodgson) EK'de — kaynak dairesi itirazından sonra anlamlı; mevcut sırayla "kanıt yığma" hissi.
- `mucize.kissa-*` `karsilastirma` diyagramları (Yusuf/Âdem/Yaratılış) metinsiz "iki sütun" — kullanıcı neyi kıyasladığını okuyamıyor; ekran görüntüsünde diyagram **soru anında kayboluyor** (yalnız satır + soru kalıyor): kıyas tablosu zamanında okunamaz. Öneri: karşılaştırma diyagramları soru anında **küçülerek** ekranda kalsın (motor zaten `soru-an` ölçeği var; test edilen sürümde `karsilastirma` görünmedi).

**Eksik "aha" anları**
1. **Açılış** (ACL-1): ilk 20 saniyede çarpıcı bir görüntü/ses yok.
2. **İhtimaller ağacı ilk gösterimi** (`haber.agac`): 7 satır, her satırda diyagram vurgusu; asıl "kapalı devre" cümlesi ("Bu kadar. Çünkü yalnızca iki soru sorduk") `"vurgu": "an"` alsın; diğer vurgu `true` kalsın.
3. **Rum**: `rum-donus` ("Ayetin penceresi: 614'ten 618'e, on yıl ekle… Üç sefer, tam bu pencerenin içinde.") — zaman diyagramı + `"vurgu": "an"` (şimdi `true`).
4. **Kapanış**: son sahne dinginlik; kullanıcının kendi "kapattığı dalları" gösteren görselleştirme güzel (`harita-acik`).

---

## 6. Uygulama paketi (onay gerektirmeyen P0/P1 — doğrudan uygulanabilir)

> Her madde tek başına uygulanabilir; yeni olgu/argüman eklemez (silme, ifade daraltma, dil bilgisi, tutarlılık, kaynak künyesi). Beat id'leri güncel (08:20 itibarıyla) sürümdür.

### A. Doğruluk / tutarlılık düzeltmeleri (içerik)

| # | Beat | Değişiklik |
|---|---|---|
| U1 | `fetanet.kitapehli` | Satır 3–4'ü FTN-8 metniyle değiştir ("Gassaniler Hristiyan'dı…"). |
| U2 | `mucize.belagat-nebi` | "Karen Armstrong'a göre düşmanlar vahiylerin sahte olduğunu iddia etmedi." ve "Açıklayamadıkları bir şey olduğu belliydi." satırlarını sil; kaynak `kaynak` nesnesinden Armstrong s.180'i kaldır. |
| U3 | `zemin.kiyasYazma` | Altıkulaç satırını sil; "Yazma sayısında Yeni Ahit açık ara önde. …" satırını ekle (ZMN-3); diyagram sağ sütunundan "milyonlarca el yazması" çıkar; "araştırmacı Zafer Duygu'nun tablosunda" → "Yeni Ahit araştırmacılarının yaygın tarihlemesinde". |
| U4 | `zemin.cografya` | EK2 (Sadeghi/Bergmann) sil; diyagram başlığı "Kitabın eşleştirmesi (tartışmalı)"; EK1'de Paris/Tübingen aralıklarını ayrı ayrı yaz ya da kaldır. |
| U5 | `zemin.corpus` | Satır 6–7'yi ZMN-2 metniyle değiştir; "606 ile 649" aralığını çıkar (`dogrulanacak`). |
| U6 | `zemin.karbon` | Satır 3 → "Test yazının değil, yazıldığı derinin yaşını ölçer: yazı ancak deriden sonra gelebilir…"; `zemin.ozet-yazma` satırına "en erken" nitelemesi ekle. |
| U7 | `zemin.musrikler`, `zemin.sahabe` | Hata-itirazı yerine "değiştirildi" iddiası (ZMN-1) — **yalnız cümle daraltma kısmı**; yeni `itiraz` yolu onay listesinde. |
| U8 | `zemin.tahrif` | "tek bir ihtilaf kaydı bilinmiyor" → "…metnin sistemli biçimde değiştirildiğini iddia eden tek bir ihtilaf kaydı bilinmiyor." |
| U9 | `fetanet.cengiz` | "savaş sanatını bilmeyen" cümlesini FTN-5 metniyle değiştir. |
| U10 | `fetanet.formul` EK1, `fetanet.toplum` EK(1650), `fetanet.ongoru` EK1 (Irak) ve EK3 ("Beni öldüremezsiniz"), `fetanet.sara` EK3, `fetanet.kapanis` EK3, `fetanet.ummi` EK1 | **Sil**. |
| U11 | `fetanet.ummi` | Etimoloji ve "el-Emin" satırlarını FTN-10 metniyle değiştir. |
| U12 | `fetanet.giris` | Satır 1 → "Diyelim ki, hâşâ, samimiydi: …"; satır 7 "en ağır psikoz" → "ciddi bir hastalık tablosu olabilir" (FTN-1'in tam yeniden yapılandırması onay listesinde). |
| U13 | `fetanet.ongoru` | "Eski bir İslam âlimi der ki" → "Mutezile âlimi Kadı Abdülcebbar'a göre" (×3). |
| U14 | `fetanet.ahlak` | "yaygın bir gelenekti" → "bazı kabilelerde görülen bir gelenekti". |
| U15 | `fetanet.tolerans` | EK1 ("Tarihçi Bauer") ekrandan çıkar (kimlik belirsiz); "Vergi için dinini değiştiren insan sayısı … az olmuştur" cümlesine "Kimi araştırmacılara göre" ekle. |
| U16 | `mucize.rum-tahmin` | "on yıldan fazla ordugâh" → "karşı yakasına kadar dayanmıştı"; EK2 "Tarihçiler bunu böyle sezdirir." sil. |
| U17 | `mucize.rum-ayet` | "üç ile on arası" → "üç ile dokuz (kimi sözlükler on) arası"; bahis satırında "Sonra süre on yıla" → "Sonra süre uzatıldı". |
| U18 | `mucize.kissa-giris` EK1–EK3, `mucize.kissa-sonuc` EK1 (Firavun), `mucize.kissa-yaratilis` EK2 (Fransız doktor), `mucize.belagat-siir` EK2 (Çanakkale), `mucize.haber-felsefesi` EK3 | **Sil.** |
| U19 | `mucize.gecis` | Satır 1 → "Baktığın pencerelerden şimdilik yeterince gördün." ; `kapanis.harita-acik` satır 6 → "…dil, gelecek, geçmiş — hepsine bakmak zorunda değildin."; `?…` → `…`. |
| U20 | `mucize.sihir` | Satır 3 "Tartışmada asla." → "Tartışmada pek."; satır 5 "bir şey yaşandığını" → "bir etkinin yaşandığını". |
| U21 | `haber.kopru-uydurdu` | "Kazanç de bedel de" → "Kazanç da bedel de"; "?…" → "…". |
| U22 | `samimiyet.kapanis` + diğer `alinti` (Rodinson, Watt, Dozy, Bell) | `dayanak`'ta "paraphrase" denen alıntıları **dolaylı anlatıma** çevir ("Rodinson'a göre, …") ve tırnağı kaldır (SMM-7). |
| U23 | `samimiyet.tutulma` | "27 Ocak 632" ifadesine `dogrulanacak:true`; satır 6'ya `"vurgu": "an"`. |
| U24 | `samimiyet.kabile` EK2 | "konu bana da ağır" cümlesini kaldır (SMM-8). |
| U25 | `samimiyet.kadin` | "modern tarihçiler bunu bıraktı" → "modern tarihçilerin çoğu bunu bıraktı" (SMM-4). |
| U26 | `fetanet.devam` | Satır 3 → "Şimdi bu yolların hangi ihtimali bıraktığına bakalım."; soru → "Devam edelim mi?" (FTN-15). |
| U27 | `zemin.yazim`, `zemin.ozet-yazim` | "Vefatından yaklaşık bir yıl sonra…" → "**Geleneksel anlatıya göre**, vefatından yaklaşık bir yıl sonra…". |
| U28 | `zemin.ikincil` | Peloponnesos satırı (ZMN-10 metni). |
| U29 | `haber.kalan-s`, `haber.kalan-f` | Son satırı ayrıştır (HBR-9). |
| U30 | `haber.agac` | "bir yanılgı, bir hastalık" → "içtenlikle yanılmış — bir hastalık, bir hayal ya da yanlış bir yorum" (HBR-6). |
| U31 | `acilis.format` | "oryantalistlerin ve tarihçilerin" → "Batılı tarihçilerin ve akademisyenlerin" (ACL-3). |
| U32 | `acilis.sorun` | `sadece merak` yolundan `hepsi` anahtarını çıkar. |

### B. Dil/ton tutarlılığı (toplu)

| # | Kapsam | Değişiklik |
|---|---|---|
| U33 | `samimiyet.*` (16 beat), `fetanet.siyasi/ummi/kapanis` | "Senin iddian bir sahtekârdı. Ama bir sahtekâr…" kalıbını SMM-1 tablosundaki "Diyelim ki, hâşâ, …" soru metinleriyle değiştir. |
| U34 | Tüm `samimiyet.*` ve `fetanet.*` beat'leri | Soru kalıplarını çeşitlendir: kalıp dağılımı (`Peki…` ≤ %5, `mantıken nasıl` ≤ 5 yerde). |
| U35 | `mucize.tanim` EK1, `mucize.belagat-giris` `yol:"ben de yaparım"` ve EK3 | Basketbol benzetmesinden **yalnız birini bırak**; `belagat-giris` "Messi'nin misli Ronaldo'dur" satırı sil (MCZ-4 satır 3–5 ile birlikte onay listesinde, burada yalnız silme). |

### B′. Yollar (anahtar) düzeltmeleri — onay gerektirmeyen

| # | Beat | Değişiklik |
|---|---|---|
| U36 | `fetanet.sara` | `ikna` anahtarlarından `evet`, `haklisin`, `mantikli` çıkar; `ret` ekle `["evet","açıklanabilir","olabilir","mümkün"]`. |
| U37 | `samimiyet.kapanis` | `ikna`'dan `evet`, `haklısın`, `mantıklı` çıkar (anahtarlar: `artık demiyorum, demiyorum, ikna oldum, kabul ediyorum, vazgeçtim`); `ret` ekle `["evet","hâlâ","devam ediyorum","yine de"]`. |
| U38 | `fetanet.kapanis` | `ikna` anahtarından `evet` çıkar; `ret` ekle `["evet","durabilir","duruyor"]`. |
| U39 | `mucize.rum-kehanet` | `ikna` anahtarlarından `evet haklısın` dışındaki serbest `evet` kullanımını engelle; `itiraz`'a `"evet biliyorum"`, `"biliyorum"` ekle. |
| U40 | `samimiyet.gece`, `samimiyet.*` (retorik "…mı?" soruları), `zemin.hafizlar`, `zemin.sahabe`, `fetanet.zeka`, `fetanet.ongoru` | MTR-1 çiftini ekle: `ikna: ["hayır etmez","etmez","yapmaz","olmaz","mümkün değil","sanmıyorum","zor görünüyor","pek değil"]`, `ret: ["evet olur","evet eder","eder","yapar","olabilir","mümkün"]`. |
| U41 | `haber.demet` | `itiraz` anahtarlarına `ispatlamak, ispat yükü, yük iddia edende` ekle (yanıt metni onay listesinde; geçici olarak mevcut `kanıtlamak zorunda değilim` yanıtı kullanılsın). |
| U42 | `kapanis.soru` | `varsayilan` → `kapanis.veda` kalsın ama `kapanis.veda`'ya "**Yazdığını not aldım.**" satırı ekle (kullanıcı metni gösterilmeden). |

### C. Motor (`site/js/niyet.js`, `motor.js`) — builder ajanı

| # | Değişiklik |
|---|---|
| U43 | MTR-2: `ama/fakat/ancak/yine de…` içeren cevaplarda `GENEL_ONAY` uygulanmasın. |
| U44 | MTR-3: anahtardan ±2 sözcük içinde olumsuzlama varsa anahtar eşleşmesini sayma ("hasta değildi"). |
| U45 | MTR-4: `ekOrnek.cipler` desteği; yoksa varsayılan çipler. |
| U46 | MTR-5: `GENEL_ONAY`'a `makul, tamam, olur, anladım, kabul`. |
| U47 | MTR-7: "Buna birazdan geleceğiz" yalnız hedefi olan konularda; yoksa "Bu soruya henüz hazır bir bölüm yok; not ettim." |
| U48 | MTR-11: ziyaret listesi (`durum.gezilen`) ve `dallan` koşulu `"gezildi": "beat.id"`. |

---

## 7. Onay gerektiren kararlar (kullanıcıya)

| K# | Karar | Neden |
|---|---|---|
| K1 | **Fetanet'in "hastalık" eşitlemesini kaldırıp `fetanet.vizyoner`'ı eklemek** (YNI-4, FTN-1, FTN-9, HBR-3) | En güçlü itirazın cevabı; sunumun iddia düzeyini değiştirir ("hastalıkla çürüttük" → "ölçüt: içerik"). |
| K2 | **Aişe, Kureyza, "ayetler işine geliyordu", savaşlar** beat'leri (YNI-1, 2, 5, 3) | Hassas dinî/tarihî konular; yeni olgu; üslup. İsterseniz yalnız dürüst "bu soruyu not aldık, bu sunumda yok" yanıtı (MTR-7) ile başlanabilir. |
| K3 | **Kıssa bölümünün çerçevesini değiştirmek** ("kopya değil" → "paralellik var, benzerliğin açıklaması?") ve Pseudo-Matta/Tomas itiraz yanıtı (MCZ-2) | Sunumun argümanını inceltir ama akademik olarak savunulabilir ve Hristiyan/Yahudi muhatap için şart. |
| K4 | **Hadis vaadi** (ZMN-6) ve samimiyet delil ağırlığını Kur'an-içi cümlelere kaydırma (SMM-2, SMM-9) | Argümanın dayanak dengesi değişir. |
| K5 | **"Seni ikna etmeye çalışmayacağım"** ifadesinin değiştirilmesi (ACL-2) | Ton/dürüstlük. |
| K6 | **Hakaret/ilgisiz/uzun** için yumuşak çıkış ve `ozet.kisa` (MTR-8/9, YNI-7/10) | Yeni etkileşim yolu. |
| K7 | **"Müslüman olmak istiyorum" kapanışı** (YNI-8 `kapanis.baslangic`) | Ürün kararı (davet/yönlendirme). |
| K8 | **Bilimsel itirazlar**: dürüstçe "bu sunumda yok" mu (YNI-8 `kapanis.bilim`), yoksa yeni bölge mi? | Kapsam. |
| K9 | **Hume cevabı, kıraat itirazı, San'a palimpsesti/Tahrif (Haccâc) yanıtları** (MCZ-7, MCZ-6, ZMN-2/5) | Yeni argümanlar; kaynak teyidi gerekir. |
| K10 | **Kaynaklarda "Müslüman olmayan" ilkesinin esnetilmesi**: Altıkulaç, McDowell, Duygu, Kadı Abdülcebbar — ilke "çoğunlukla" mı "yalnız"? | `zemin.kiyasYazma` düzeltmesiyle ilişkili. |

---

*Not: Bu rapor, `docs/test-raporu.md`'deki "Kalanlar" notlarını (zemin uzunluğu, tekrarlar, kural tabanlı sınıflandırıcının sınırı) doğruluyor ve sınıflandırıcının **kutupluluk/olumsuzlama** hatasını yeni bir sınıf olarak ekliyor; bu sınıf `docs/test-raporu.md` testlerinde çip tıklaması kullanıldığı için görünmemişti. Serbest metinli gerçekçi kullanıcıda öne çıkıyor.*
