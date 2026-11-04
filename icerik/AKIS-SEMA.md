# Akış Sözleşmesi (v2) — Sinematik "Konuşan Sunum"

Bu dosya içerik yazarları ile motor arasındaki **tek sözleşmedir**. İki taraf da buna birebir uyar.

## Deneyim özeti
- Tek ekran. Karanlık, yıldızlı gece. Sunum, büyük ve zarif tipografiyle **tek tek beliren cümlelerle** kullanıcıyla konuşur.
- Bölüm, menü, harita, ilerleme çubuğu **yok**. Metodun şeması arka planda çalışır.
- Kullanıcı yalnız sorulara cevap verir (serbest yazı + 2–3 silik öneri çipi). Nereye gidileceğini **cevabın isabet ettiği yer** belirler.
- Sunum önce **kullanıcının şüphesini ve düzeyini** öğrenir, sonra **yalnız o şüpheye isabet eden** kısa ve öz cevabı verir. Tatmin olmazsa her seferinde yeni, daha güçlü bir örnek gelir.
- Hitap: **"sen"** (sıcak, saygılı, samimi). Peygamber için olumsuz ihtimal anılırken "hâşâ" edebi korunur. Hz. Muhammed adı ilk geçişte "Hz. Muhammed", sonra "o" / "Peygamber" olabilir; (s.a.v.) yazılmaz (ekranda sade), dayanak alanında serbest.
- "Hayır" tek başına `ikna` yollarını engellemez ("Hayır, artık demiyorum"); "ikna olmadım / yine de / değil" gibi sert olumsuzluklar engeller (anahtarın kendisi olumsuzluk içeriyorsa geçerli).
- **Kaynaklar sunumun İÇİNDE (v2.1):** Oryantalist/akademik tanıklıklar **isimle** verilir ("Tarihçi W. Montgomery Watt şöyle der…"). Her olgu/alıntı satırı `kaynak` alanı taşır; motor bunu satırın altında küçük künye olarak gösterir, dokununca tam künye sunum içinde açılır. Kullanıcı sunumun dışına (link) gönderilmez. Sunumun sonunda (ve "⋯" menüsünde) **Kaynakça** sahnesi vardır.
- Kitabın kendisi (Peygamberliğin İspatı) ekranda kaynak olarak anılmaz; kitabın aktardığı **asıl kaynaklar** (Watt, Hitti, Corpus Coranicum, Birmingham Üniversitesi raporu vb.) anılır.
- Açılışta format bir kez açıklanır: "Konuşurken çoğunlukla Müslüman olmayan, Batılı akademisyenlerin kaynaklarını kullanacağız — çünkü tarafsız bir zemin istiyoruz." 
- **Uydurma yok.** Her olgu `dayanak` alanında (gizli) kaynağıyla durur. Bilgi bankası: `docs/bolumler/*.md`, `docs/metod-haritasi.md`. Kitap dışı ekleme → `"ek": true` ve bölgenin `docs/onay/<bolge>.md` listesine eklenir (kullanıcı onayı).

## Dosyalar
- `icerik/akis/<bolge>.json` — bölgeler: `acilis`, `zemin`, `haber`, `samimiyet`, `fetanet`, `mucize` (mucize dosyası `kapanis` beat'lerini de içerir).
- Motor tüm bölgeleri tek havuzda birleştirir. Beat id'leri **global ve benzersiz**: `"<bolge>.<ad>"` (ör. `zemin.mushaflar`).

```json
{ "bolge": "zemin", "giris": "zemin.giris", "beats": [ /* Beat */ ] }
```

## Beat
```jsonc
{
  "id": "zemin.mushaflar",
  "gizliDugum": "Z11",                 // metod-haritasi düğümü (yalnız iz için)
  "dallan": [                          // GİRİŞTE değerlendirilir; ilk uyan koşul varsa hemen oraya gidilir
    { "kosul": { "profil.kaynakGuveni": "yuksek" }, "git": "haber.giris" },
    { "kosul": { "kapali": "samimiyet" }, "git": "fetanet.giris" }
  ],
  "sahne": {                           // isteğe bağlı; beat boyunca arka plan
    "arkaplan": "gokyuzu",             // gokyuzu | col | safak | isik | mushaf
    "gorsel": "gorseller/mushaflar/kitaptan/20-birmingham-1.jpg",   // arkaplan "mushaf" ise
    "diyagram": null                   // aşağıdaki katalogdan biri + "veri"
  },
  "satirlar": [                        // 2–7 satır; her satır ≤ 18 kelime
    { "metin": "Bir yazmayı düşün." },
    { "metin": "Bugün Birmingham'da duran iki yaprak.", "gorsel": "gorseller/mushaflar/kitaptan/20-birmingham-1.jpg" },
    { "metin": "Karbon testi: Peygamber'in hayatıyla örtüşen yıllar.", "vurgu": true },
    { "metin": "", "diyagram": { "tur": "sayac", "veri": { "sayi": 45, "etiket": "erken dönem yazma" } } }
  ],
  "soru": {                            // yoksa satırlar bitince "sonraki"ye geçilir
    "metin": "Peki metin sonradan değiştirilseydi, bu yapraklar neyi gösterirdi?",
    "cipler": ["Değişmemiş demek ki", "Yine de emin değilim"],
    "serbest": false                   // true: her cevap kabul edilir (profil soruları), eşleşmezse "varsayilan"
  },
  "yollar": [                          // cevap eşleştirme; EN UZUN eşleşen anahtar kazanır
    { "tur": "ikna",     "anahtar": ["değişmemiş", "haklısın", "mantıklı"], "git": "haber.giris" },
    { "tur": "itiraz",   "anahtar": ["karbon", "yanılabilir", "test"], "yanit": ["Karbon testi tek başına değil…", "…"] },
    { "tur": "yonlendir","anahtar": ["uydurdu", "yalan"], "git": "samimiyet.giris", "profil": { "iddia": "sahtekar" } },
    { "tur": "profil",   "anahtar": ["evet", "inanıyorum"], "profil": { "tanri": "evet" } },
    { "tur": "ret",      "anahtar": ["evet bence var"] }          // cevap ret sayılır (sıradaki ekOrnek); "evet" gibi genel onay kelimeleri yanlış ikna sanılmasın diye
  ],
  "varsayilan": "acilis.sonraki",      // serbest sorularda hiçbir yol eşleşmezse
  "ekOrnekler": [                      // "ikna olmadım"/ret → sırayla; her biri yeni kısa sahne + kendi ilzam sorusu
    { "satirlar": [ { "metin": "…" } ], "soru": "Bu durumda …?", "sahne": { } }
  ],
  "kompozisyon": "Peki tüm bu verileri birlikte nasıl açıklıyorsun?",  // ekOrnekler tükenince
  "kopru": ["Buna birazdan geleceğiz. Şimdi şunu soruyordum:"],          // kaçamak/konu dışı
  "kapat": "samimiyet",                // isteğe bağlı: bu beat'te "ikna" gelirse bu dal kapalı sayılır
  "sonraki": "zemin.hafizlar",
  "dayanak": "Gizli editör notu: kitap s. 57; Birmingham 568–645 karbon aralığı… (ekranda görünmez)"
}
```

## Cevap işleme sırası (motor)
1. **Global:** "ara ver / sonra devam / şimdilik yeter / çık" → kaydet, veda satırı. Dönüşte kaldığı beat'ten devam.
2. **yollar** (normalize: küçük harf, Türkçe aksan sadeleştirme; kelime sınırı; en uzun anahtar kazanır; olumsuzluk "ikna olmadım", "değil" vb. önce yakalanır):
   - `profil` → değerleri yaz; `git` varsa git, yoksa `varsayilan`/`sonraki`.
   - `itiraz` → `yanit` satırlarını göster → ilzam sorusunu tekrar sor.
   - `yonlendir` / `ikna` → profil yaz, `kapat` varsa dalı kapat, `git` (yoksa `sonraki`).
3. **Genel onay** (yolda tanımlı değilse): "evet, haklısın, mantıklı, katılıyorum, ikna oldum" → `ikna` gibi: `kapat`, `sonraki`.
4. **Genel ret:** "hayır, ikna olmadım, katılmıyorum, emin değilim, yine de" → sıradaki `ekOrnek` (satırlar + soru). Bitti ise `kompozisyon` sorusu → her cevap kaydedilir → saygılı bir köprü ("Bunu not ettim. Bununla birlikte devam edelim.") → `sonraki`.
5. **Kaçamak / boş / konu dışı:** `kopru` satırlarından biri + **aynı soru** tekrar. Konu dışı soru not edilir. **Döngü kırıcı:** art arda 3 kaçamak → "devam edelim" ile `sonraki`ye geçilir (dal kapanış sorusundaysa `mucize.giris`e); art arda 2 beat'te kaçamak → "ara verelim mi" önerisi. Aynı itiraz ikinci kez ya da 4. itiraz → itiraz cevabı tekrarlanmaz, sıradaki `ekOrnek`e geçilir. `samimiyet`/`fetanet` dalı baştan sona gezilip kapanmadıysa dala yeniden girişte (`*.giris`) tekrar edilmez, `mucize.giris`e geçilir.
6. `serbest: true` ve eşleşme yok → cevabı `profil.<beat id>` olarak kaydet → `varsayilan` ya da `sonraki`.
7. Var olmayan beat'e gidilirse: zarif bir "Bu kısmı hazırlıyoruz; şimdilik buraya kadar" kapanışı.

## Global yollar (UYGULANDI — motor: `site/js/motor.js` `globalIsle`, `site/js/niyet.js` `globalEsle`; davranış: `docs/onay/global-yollar.md`)
Konu bağımsız niyetler her beat'e anahtar eklenmeden bir kez tanımlanır. Kökte (herhangi bir bölge dosyasında; `genel.json` önerilir) `globalYollar` dizisi: `{ "ad", "anahtar": [], "git", "tekrar": { "say", "git" }, "itiraz": true, "yanit": [] }`. `hazirla.sh` tüm `icerik/akis/*.json` dosyalarını (bilinmeyen bölge adları dahil) alır.
- **Sıra:** "ara ver" → beat `yollar` (eşleşirse global'e bakılmaz) → serbest olmayan sorularda `globalYollar` (ilk eşleşen kazanır) → genel onay/ret/kaçamak. `serbest: true` sorularda (profil soruları, kompozisyon, `genel.yumusak`) global devre dışıdır.
- **Eşleşme:** normalize + kelime başı (≤ 4 harfli anahtar tam sözcük). Cevap ≤ 12 sözcükse ya da anahtar cümlenin başındaysa tetiklenir (uzun serbest cümlede yanlış alarm olmasın).
- **Yerleşik varsayılan:** içerikte tanım yoksa motor `niyet.js` `VARSAYILAN_GLOBAL` kullanır (sıra: `muslumanOlmak` → `kapanis.muslumanOlmak`; `notEttim` → `genel.notEttim`; `sert` → `genel.yumusak`, art arda 2 kez → `kapanis.ozet-cikis`; `bilim` → `genel.bilim`; `kisalt` → `kapanis.ozet-cikis`). İçerikte aynı `ad` varsa alan alan üzerine yazılır; yeni `ad` eklenir.
- **`itiraz: true`:** kullanıcı cümlesi `profil.itirazlar[]`'a yazılır (`bilim`, `notEttim`; `donus` beat'inde serbest cevap da yazılır).
- **Hedef beat yoksa:** tanımdaki `yanit` satırları (sabit metin) gösterilir ve aynı soru yeniden sorulur. `genel.notEttim` içerikte yoksa motor "Bu konuyu not ettim. Bu sunumda henüz ele almıyoruz…" sabit metnini kullanır (Aişe'nin yaşı, Kurayza/Kureyza, "Yahudileri öldürdü" anahtarları). İçerik yazılırsa `genel.notEttim` (`donus: true`) beat'i öncelik alır.
- **`"donus": true` (beat alanı):** global yoldan girilen beat `git`siz biterse (satırlar bitince, `sonraki`siz; ya da `git`siz bir yol eşleşince) kullanıcı **kaldığı soruya** döner: motor "Kaldığımız yere dönelim." der, kaynak beat'in satırlarını tekrarlamadan (aynı ana/ek soru kipinde) soruyu yeniden sorar. Kaynak soru bir yığında (`durum.donus`, en çok 5, kayıtlı) tutulur; donus beat'inden başka donus beat'ine geçilirse (`genel.yumusak` → `ozet-cikis`) asıl kaynak korunur. `donus` olmayan bir beat'e girilince yığın temizlenir. Yığın boşsa `varsayilan`/`sonraki`, o da yoksa kapanış.
- **Ziyaret listesi (U48/MTR-11):** `durum.gezilen` girilen beat id'lerini tutar. Koşullarda `"gezildi": "beat.id"` (ya da dizi: hepsi gezildi) ve `"gezilmedi"`.
- **MTR-7:** konu dışı soruda "Buna birazdan geleceğiz" denmez (karşılığı olmayan konuya söz verilmez): "Bu soruya bu sunumda henüz hazır bir bölüm yok; bunu not ettim. İstersen önce buradaki soruyu kapatalım." Kaçamak köprüsü (`kopru`) değişmedi.
- **MTR-4/U45:** `ekOrnekler[].cipler` yoksa ana sorunun çipleri taşınmaz; varsayılan `["Haklısın, açıklaması zor","Yine de ikna olmadım"]` (ana soru serbestse çipsiz).

## Profil değişkenleri (ortak sözlük)
- `tanri`: evet | hayir | emin-degil
- `din`: yok | hristiyan | yahudi | diger | musluman-degil
- `kaynakGuveni`: yuksek | orta | dusuk
- `bilgi`: az | orta | cok
- `supheTuru`: kuran-degisti | kaynak-guvensiz | uydurdu | hasta-yanildi | ogrendi | mucize-yok | genel
- `iddia`: sahtekar | deli | dogru | kararsiz
- `deizm`: evet (deist beyanı; `acilis.yonlendir` → `haber.vahiy-gerek`, `mucize.giris` → `mucize.hume`). `vizyoner`: evet (sağlıklı-yanılgı itirazı). `hume`: evet.
- `kapali`: motor tarafından tutulan kapalı dallar listesi (`samimiyet`, `fetanet`, `zemin`…); `"kosul": {"kapali": "x"}` = x kapalıysa.
- Koşul eşleşmesi: değer string ise eşitlik, dizi ise "içinden biri". `"acik": ["samimiyet","fetanet"]` = listedekilerden en az biri HÂLÂ kapanmamış.

## Bölge giriş noktaları (sabit — bölgeler birbirine bunlarla bağlanır)
| id | anlam |
|---|---|
| `acilis.merhaba` | başlangıç |
| `zemin.giris` | kaynaklara güven (Kur'an'ın korunmuşluğu, tarihî kaynaklar). Girişte `supheTuru`/`kaynakGuveni`'ne göre dallanır |
| `haber.giris` | haberin kendisi, ihtimaller |
| `haber.ihtimaller` | kullanıcıya "sence hangisi?" sorulan dal seçimi (samimiyet/fetanet/mucize'ye yönlendirir) |
| `samimiyet.giris` | "bilerek yalan" ihtimali |
| `fetanet.giris` | "bilmeden yanılma / hastalık / çevresinden öğrenme" ihtimali |
| `mucize.giris` | doğrudan doğruluk delilleri |
| `kapanis.giris` | (mucize.json içinde) toparlama, saygılı veda, "istersen kaldığın yerden devam" |

Dal kapanınca ("ikna" + `kapat`) yazar `haber.kalan` beat'ine gider (haber.json yazar): "Bir ihtimal kapandı. Geriye ne kaldı?" — `dallan` ile kapalı dallara göre bir sonraki dala ya da mucizeye yönlendirir.

## Diyagram kataloğu (motor bunları animasyonlu çizer)
| tur | veri | anlam |
|---|---|---|
| `ihtimaller` | `{ "vurgu": "yalan" \| "bilerek" \| "bilmeyerek" \| "dogru" \| null, "kapali": ["bilerek"] }` | Haber → Doğru / Yalan → Bilerek / Bilmeyerek, ışık çizgileriyle |
| `demet` | `{ "cubuklar": ["…","…","…"] }` | tek tek kırılan çubuklar, demet kırılmaz |
| `zaman` | `{ "noktalar": [{ "yil": "610", "etiket": "…" }] }` | yatay zaman çizgisi |
| `sayac` | `{ "sayi": 45, "etiket": "…", "onek": "", "sonek": "" }` | büyük sayı sayarak belirir |
| `karsilastirma` | `{ "sol": {"baslik","maddeler":[]}, "sag": {…} }` | iki sütun |
| `denklem` | `{ "parcalar": ["Başarı", "=", "Son durum", "−", "(Toplum + Birey)"] }` | parça parça beliren denklem |
| `alinti` | `{ "metin": "…", "kim": "W. Montgomery Watt", "kaynak": {…} }` | büyük, ince yazıyla alıntı |
| `galeri` | `{ "gorseller": ["gorseller/…jpg", …], "etiketler": ["…"] }` | yavaş geçişli görsel dizisi |

## Kaynak alanı (v2.1)
Satıra veya diyagram verisine eklenir:
```json
"kaynak": { "yazar": "W. Montgomery Watt", "eser": "Muhammad at Mecca", "yer": "Oxford", "yil": "1953", "sayfa": "52", "not": "Kimlik: İskoç oryantalist, Edinburgh Üniv.", "dogrulanacak": false }
```
Alanlar: `yazar`, `eser`, `yer`, `yil`, `sayfa` (kaynak eserin sayfası), `not` (= `kimlik`, takma ad; kart/alıntı altında kimlik satırı), `alinti` (kartta gösterilen kısa metin), `dogrulanacak` (true ise kartta/kaynakçada küçük "doğrulanıyor" işareti). Motor: satır belirdikten ~700 ms sonra altında fısıltı künyesi (`Yazar · Eser · Yer, Yıl · s. N`; dar ekranda `Yazar · Eser, Yıl`); satırdaki yazar adı sözcüğü altı noktalı çizgiyle dokunulabilir olur; künyeye/isme dokununca sahne duraklar, cam kaynak kartı açılır (Esc / dışarı dokun / aşağı kaydır kapatır; dış bağlantı yok). `alinti` diyagramında `veri.kaynak` varsa `kim` düğmeye döner ve altına kimlik satırı gelir. Görülen kaynaklar karşılaşma sırasıyla yerelde tutulur; "⋯ > Kaynaklar" ve kapanıştaki "Kaynakça" sahnesi görülenleri parlak, görülmeyenleri soluk listeler.

Künye bilgisi bilgi bankasında (docs/bolumler, docs/kaynakca.md) yoksa uydurulmaz: bilinen alanlar yazılır, eksik alan için `"dogrulanacak": true` ve `docs/eksikler.md`'ye satır eklenir.

## Görseller
Yalnız `gorseller/mushaflar/kitaptan/*.jpg` (repo: `public/gorseller/mushaflar/kitaptan/`) mevcut. Başka görsel yolu yazma; atmosfer (çöl, şafak, ışık, yıldız) motor tarafından prosedürel üretilir.

## Anlatı ritmi ve tipografi alanları (v3)
Satır (`satirlar[]`) üzerinde, hepsi isteğe bağlı ve geriye uyumlu:
| alan | değer | etki |
|---|---|---|
| `tempo` | `"hizli"` \| `"yavas"` | hızlı: kelimeler 36 ms aralıkla, kısa süre (kısa vuruşlar); yavaş: 150 ms aralık, ağır blur'lu, uzun süre. Varsayılan mevcut ritim. Kalıp: soru ← kısa vuruşlar ← uzun nefes ← vurgu ← soru |
| `duraklama` | ms | satır bittikten sonra ek bekleme (dokununca atlanır) |
| `sessiz` | `true` | satır yok: sahne boşalır, `duraklama` (vars. 2500 ms) kadar yalnız yıldızlar; ses açıksa ana ses %20'ye iner |
| `vurgu` | `true` \| `"an"` | `true`: altın, büyük. `"an"`: aha anı — sahne boşalır, yıldızlar 700 ms söner, tek satır en büyük/ince ve harf aralığı açılarak belirir, altın hale, alçak tını. **Kural: sunumda en çok ~12 `an`, bölge başına 1–2** |
| `ayet` | `{arapca, meal, sure, no}` | ayet anı: Arapça büyük, sağdan sola (Amiri, OFL, `site/fonts/`) kelime kelime belirir; sonra Türkçe meal; sonra `Rûm Sûresi, 2–4` künyesi. Diyagram olarak da: `{tur:"ayet", veri:{…}}`. Ayet metni yayın öncesi iki kaynaktan teyit edilir (`dogrulanacak`) |
Metin içinde `*anahtar sözcük*` → altın, ağırlık 500 (yıldız karakteri başka amaçla kullanılmaz; ekrana basılmaz).
Soru (`soru{}` ve `ekOrnekler[].ipucu`): `ipucu` = giriş alanı yer tutucusu (yoksa "Aklından geçeni yaz…"); `buyuk: true` = büyük soru, form 3 sn sonra (varsayılan 1.8–2.6 sn) gelir. Soru satırından sonra form hep kısa bir nefesle gelir; dokununca atlanır.
Motor (içerik yazmaz): yazarken gökyüzü yavaşlar, imleç ucunda yıldız nabzı; cevap parşömen renkte altın sol çizgiyle 1.5 sn kalıp yıldızlara karışır; kapanan dal diyagramda söner (yıldız kararır, çizgi kopar, bakır halka); menüde Hız: Yavaş/Normal/Hızlı. Tasarım denemesi: `index.html?ornek=1` → `site/ornek-akis.json` yüklenir.
