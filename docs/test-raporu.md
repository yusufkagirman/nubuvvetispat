# Test Raporu — v2 (sinematik konuşan sunum)

Tarih: 2026-11-03. Yöntem: Playwright (Chromium) ile gerçek kullanıcı gibi, `git(id)` ile **atlamadan**, açılıştan kapanışa serbest Türkçe cevap yazarak; yalnız zamanlayıcılar `window.__sunum.hiz(0.03)` ile hızlandırıldı. Her adımda beat, soru, cevap, sınıflandırma sonucu, ekrana giden satırlar kaydedildi (ekran metni DOM/motor çıktısından denetlendi). Ek olarak tüm çipler (217) `niyet.js` ile tek tek sınıflandırılıp beklenen yola gidip gitmediğine bakıldı.

## Persona yolları (son koşu, düzeltmelerden sonra)

| # | Persona | Yol | Adım | Sonuç |
|---|---|---|---|---|
| 1 | Ateist, "sonradan yazılmış", kaynağa güvenmez | açılış → zemin (12 beat, hepsi ikna) → haber → "uydurdu" → samimiyet (güç; bir itiraz, bir "ikna olmadım" → yeni örnek; sonra ikna) → haber.kalan-s → fetanet (sara → ... ) → haber.kalan-ikisi → mucize (Rum) → kapanış | 61 | temiz bitti, tekrar yok |
| 2 | Hristiyan, "Yahudi/Hristiyanlardan öğrenmiş" | acilis.sorun → ogrendi → haber → fetanet.teshis "birinden öğrendi" → ogrenme → kitapehli → mucize kıssalar (köle itirazı, ek örnek) → kapanış | 33 | temiz |
| 3 | Agnostik, kaçamak ("bilmem", "neyse", "hmm", "ne bileyim") | profil soruları serbest kabul → haber → her beat'te 3 kaçamaktan sonra nazik geçiş; art arda iki beat'te "ara verelim mi" → devam | 84 | döngüye girmedi, sonlandı |
| 4 | "Epilepsi hastasıydı" | acilis.sorun → hasta-yanildi → zemin (karbon) → haber → fetanet.hastalik → sara (itiraz, "ikna olmadım", ikna) → toplum/siyasi/Cengiz → ... → mucize (belagat) → kapanış | 61 | temiz |
| 5 | Deist, "doğru söylüyor olabilir" | merak → zemin.karbon → haber → "doğru söylüyor" → mucize.giris-dogru → belagat → kapanış (açık-harita) | 28 | temiz |
| 6 | Ara veren | samimiyet.teshis'te "şimdilik yeter" → veda → dokununca aynı soru; samimiyet.guc'ta "şimdilik bu kadar" → sayfa yenileme → "Kaldığın yerden devam edelim mi?" → Evet → aynı soru | 28 | kayıt/devam doğru |
| 7 | (ek) İnatçı: her cevap "yine de ikna olmadım" | samimiyet tüm beat'ler × ek örnekler → komp → ikinci girişte aynı yolu tekrarlamadan mucize'ye geçti | 105 | sonlandı |

Tüm koşularda: yasaklı ifade taraması (`s. NN`, "sayfa" atıfı, Watt/Goldziher/Hart/Dermenghem/Armstrong/Hitti/Bodley/Caetani vb., kitap adı) **temiz**; sayfa hatası/konsol hatası **yok**.

## Bulunan ve düzeltilen sorunlar

**Sınıflandırma / akış**
1. **Çipin kendisi ikna sayılmıyordu** (çıkmaz): `haber.keskin` "Hayır, ya var ya yok" ve `samimiyet.kapanis` "Hayır, artık demiyorum" cevaplarında "hayır" tüm `ikna` yollarını devre dışı bırakıyordu; kullanıcı çipe basıp sonsuza dek aynı soruya düşüyordu. `niyet.js`: "hayır" tek başına `ikna`yı engellemez; "ikna olmadım/yine de/değil" gibi sert olumsuzluklar engeller, ama eşleşen anahtarın kendisi olumsuzluk içeriyorsa ("kurgu değil") geçerlidir.
2. `haber.dorduncu` "Evet, bence var" genel onay sayılıp "yok" gibi ilerliyordu → yeni yol türü `ret` (niyet.js destekler; haber.json'a anahtarlar).
3. `haber.kopru-*` "Başka ihtimale bakmak isterim" → "isterim" anahtarı yüzünden "evet" sayılıyordu → "başka ihtimal(e)" anahtarları eklendi.
4. "Haklısın" (onay) `haber.kalan-*`/`haber.ihtimaller`'de "haklı" anahtarıyla "doğru söylüyor" seçimi sanılıp mucizeye atlatıyor ve "‘Doğru olabilir’ dedin" gibi kullanıcının söylemediği bir cümleyle karşılıyordu → bare "haklı" anahtarı çıkarıldı; "doğru söylemiyor / doğru değil" ifadeleri `haber.belirsiz`'e yönlenir.
5. `mucize.rum-kehanet` ikna anahtarlarına "tanımıyorum, rastlamadım, duymadım, bulamadım, örnek yok" eklendi.
6. KACAMAK listesine "bilmem, neyse, ne diyeyim, nasıl desem, hmmm…" eklendi.
7. **Kaçamak döngüsü**: kaçamak/konu dışı cevapta sonsuz "köprü + aynı soru". Artık 3. kaçamakta "Önemli değil; devam edelim" ile `sonraki`ye (dal kapanış sorusundaysa `mucize.giris`e) geçilir; art arda iki beat'te kaçamaksa "biraz ara verelim mi" (ara ver + devam). Dal kapatılmaz.
8. **Aynı itirazı tekrarlama**: kullanıcı aynı itirazı tekrarlayınca aynı yanıt iki kez gösteriliyordu → ikinci kez veya 4. itirazda sıradaki ek örneğe geçilir.
9. **Tekrar eden "Bunu not ettim…"** üç varyanta döner.
10. **İkna olmayan kullanıcı aynı dalı baştan döner** (kapanış → haber.kalan → ihtimaller → yine samimiyet): dal tamamlanıp kapanmadıysa dala yeniden girişte tekrar edilmez, saygılı bir cümleyle `mucize.giris`e geçilir.
11. **Kapanış haritası dürüst değildi**: kullanıcı iki dalı da kendi beyanıyla kapatmadıysa (deist, Hristiyan, inatçı vb.) harita "Samimiyet delillerine baktın. Bu yol sönükleşti" diyordu. `durum.js`'e `acik` koşulu eklendi; `kapanis.harita` bu durumda yeni `kapanis.harita-acik` beat'ine yönlenir (yeni olgu yok, yalnız yönlendirme metni; bkz. içerik notu).
12. Ekrandaki tek kişi adı atfı: `samimiyet.vahiy` ek örneğindeki "Dozy'a göre" → "Batılı bir oryantalistin tespitine göre". (Dayanak alanında kaynak durur.)

**Görsel**
- Mushaf/görsel arka plan: görsel ilk ~1.6 sn net ve aydınlık görünür (sinematik reveal), metin gelmeden önce `ekran.js` 1.9 sn bekler; sonra koyulaşır (~%72 siyah katman + radyal vinyet + merkezde koyu elips + alt gradyan), hafif blur (2px) ve güçlü text-shadow. Altın vurgu `#f6dfa8`.
- **Hayalet satırlar**: çıkan satır artık kendi yüksekliği kadar yukarı kayarak (transform) ve sönerek çıkar; giren satır alttan (26px) yükselir; eski satırlar aynı oranda yukarı kaydığı için aynı konumda iki satır olmaz. Son satır `.eski` olarak %42 opaklıkta kalır.
- **Soru anı**: `soru-an` sınıfıyla diyagram küçülür/yukarı alınır (masaüstü ölçek .74; dar ekranda yalnız yukarı), soru ve giriş alanı rahat sığar; kelime blur'u animasyon bitince tamamen kalkar. Test koşuları için `hiz()` artık CSS geçişlerini de kapatır (`.hizli`).
- Açılış: büyük, ağır harf aralıklı, kelime kelime odaklanan başlık + altın ince çizgi.
- Çip kontrastı artırıldı (.5 → .74, çerçeve .22).

## Kalanlar / notlar
- Zemin bölgesi sıralı 12 sorudur; ikna olan kullanıcı için bile uzun (tek tek "ikna" ile geçmek gerekir). `zemin.ikna` ve `gerek yok/geçelim` yolu mevcut ama kullanıcıya hatırlatılmıyor; sonraki iterasyonda "özet ve atla" çipi düşünülebilir.
- Aynı olgular bazı beat'lerde tekrar eder (ör. Hudeybiye/ahlak/Rum ek örnekleri benzer cümleler kullanıyor); içerik düzeyinde ayıklanabilir (kapsam dışı bırakıldı).
- Kural tabanlı sınıflandırıcı serbest cümlede sınırlıdır ("Ama güç kazandı sonunda" gibi ayrıntılar ancak anahtara denk gelirse itiraz yanıtı alır; aksi halde sıradaki ek örnek verilir). LLM sınıflandırıcı takılabilir arayüzü (`siniflandiriciyiDegistir`) hazır.
- Kayıt/devam kontrolü yalnız localStorage ile test edildi (anonim; sunucu yok).
- Canvas `filter: blur` Safari'de desteklenmez; orada görsel blur'suz (daha koyu overlay ile) kalır, okunurluk korunur.

## Ekran görüntüleri
`docs/ekran/v2-*.png` yeniden üretildi (deviceScaleFactor 2; masaüstü 1280x760, mobil 390x844): 01 açılış, 02 profil sorusu, 03a mushaf reveal (net görsel), 03 mushaf + yazı, 04 çöl, 05 ihtimaller + soru, 06 zaman (Rum), 07 denklem, 08 karşılaştırma, 09 demet, 10 galeri, 11–14 mobil (mushaf, soru, ihtimaller, zaman), 15 kapanış haritası (iki dal kapalı), 15b kapanış (dal açık).

## v3 tasarım paketi (builder, yeniden başlatma sonrası tamamlama)
**Durum:** `docs/tasarim-onerileri.md` §3'teki 16 madde kodda mevcut (kontrast/dokunma, soru formu, nefes, cevap anı, tempo/an/sessizlik, tipografi ve hareket token'ları, kaynak künyesi + cam kart + Kaynakça sahnesi, takımyıldız, mushaf ayarı, ses, performans, erişilebilirlik). Ek kararlar: Emil tarzı basılı `scale(.97)`, tutarlı radius/boşluk, sıcak palet, Arapça ayet anı (Amiri, `site/fonts/`), kaynakçada sabit atıf (Tanzil / Diyanet mealinden uyarlama / Amiri OFL), yapay düşünme gecikmesi yok.
**Bu turda düzeltilenler:** ayet künyesi küçük harfe çevriliyordu (artık "Rûm Sûresi, 2–4"); Kaynakça sahnesinin arka planı, altındaki satırları gösteriyordu (perde koyulaştırıldı, alt boşluk artırıldı, atıf yazısı kontrastı .62).

**Sınıflandırıcı (`site/js/niyet.js`, MTR-1/2/3/5):**
- MTR-1: soru "…açıklanabilir/olabilir/eder/var mı…" biçimindeyse "evet" karşı çıkıştır. "Hayır, etmez / mümkün değil" = katılma (onay), "Evet, açıklanabilir" = itiraz (genel olumlu anahtarlarla `ikna` yolu sayılmaz). "Haklısın/makul/ikna oldum" gibi açık katılma bunu ezer.
- MTR-2: "ama/fakat/ancak/lakin/yine de/ne var ki/tek sorun" sonrası kısım ağırlıklı; önce orada aranır, yoksa bütünde `ikna` yolları kapalı aranır; genel onay uygulanmaz.
- MTR-3: anahtarın ±2 sözcüğünde (virgül sınırına kadar) değil/değildi/yok/olmayan varsa anahtar düşer ("hasta değildi" fetanet.hastalik'e gitmez). Kendisi olumsuz içeren anahtarlar muaf.
- MTR-5: onay listesine makul, tamam, anladım, kabul.
**Test:** 22 serbest-metin kutupluluk vakası (fetanet.sara/zeka/kapanis, mucize.rum-nesh/kissa-giris, zemin.hadis, haber.demet, samimiyet.kapanis, fetanet.teshis) 22/22 geçti. 6 persona regresyonu + ara-veren: ateist 36 adım, Hristiyan 39, agnostik 14 (3 kaçamak döngü kırıcı), sara 37, deist 19, inatçı 83, ara/devam aynı beat; hepsi önceki sonuçlarla aynı. Konsol/sayfa hatası yok; 360 px'te yatay taşma yok. Ekranlar (2x): `docs/ekran/v3-01…08` (açılış, soru masaüstü+mobil, künye + kaynak kartı masaüstü/mobil, mushaf, takımyıldız, Kaynakça, ayet).
**Notlar:** MTR-4 (ek örnek çipleri), MTR-6..11 içerik/etkileşim kararı gerektirir, yapılmadı. Kaynakça listesi dinamik; yalnız içerikte `kaynak` alanı olan satırları gösterir.
