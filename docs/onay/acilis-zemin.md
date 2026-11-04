# Onay bekleyen ekler: acilis + zemin

Kitap dışı eklemeler (`"ek": true`, `"dogrulanacak": true`). Hepsi itiraz cevabı niteliğinde, kısa; kullanıcı onayına kadar yayına alınmamalı.

| Beat | İtiraz yolu | Eklenen içerik | Kaynak / dayanak | Risk |
|---|---|---|---|---|
| `zemin.yazim` | "Osman mushafları yaktırdı" | Çoğaltmadan sonra farklı sayfaların toplatıldığı anlatılır (itirazın kabulü); cevap kitabın Sıffin/ittifak mantığına dayanır | Buhârî, Fezâilü'l-Kur'ân, Kur'an'ın toplanması bâbı (hadis numarası teyit edilecek) | Düşük (itirazın kendisi kaynaklı) |
| `zemin.hafizlar` | "Hafızlar da yanılabilir" | Hafızın başkasına dinletmesi (icazet/karşılıklı dinleme) ve yazı-ezber çapraz denetimi | Kitap yalnız icazet silsilesini söyler (s. 33-34); karşılıklı denetim genel bilgi, kaynak eklenecek | Düşük-orta |
| `zemin.hafizlar` | "Farklı kıraatler var" | Kıraatlerin aynı yazı iskeletinde, çoğunlukla telaffuz/küçük okuyuş farkı olduğu | Kitap kıraatleri yalnız s. 82'de birliktelik listesinde anar; ayrıntı için kıraat ilmi kaynağı (ör. İbnü'l-Cezerî, en-Neşr) eklenecek | Orta |
| `zemin.karbon` | "Sana palimpsesti" | Silinmiş alt yazıda bazı küçük kelime ve ayet sırası farkları bildirildiği; tek yazma sistemli tahrifi göstermez | Sadeghi & Goudarzi, "Ṣanʿāʾ 1 and the Origins of the Qurʾān", Der Islam 87 (2012). Kitapta yalnız Cambridge palimpsestinin listeden çıkarıldığı yazar (s. 39) | Orta-yüksek: karşı tarafın en bilinen argümanı; ifade ("küçük", "bildirilir", "düşündürür") temkinli tutuldu, makale ile birebir teyit edilmeli |
| `zemin.musrikler` | "Ona şair/kâhin/sihirbaz dediler" | Düşmanların peygamberliği reddettiği, ama somut bir tarihî hata/yalan gösteremedikleri; peygamberlik meselesi sonraya bırakılıyor | Kur'an'ın kendi kaydı: Hicr 15:6, Sâffât 37:36, Yûnus 10:2, Tûr 52:29 | Düşük (Kur'an'dan) |

## Kitapta olup dikkat edilenler (ek değil)
- Mushaf sayısı: ekranda **44** yazma (kitabın özet cümlesi). İçindekilerdeki 45 ile s. 79-80 arasındaki tutarsızlık `docs/dogrulanacaklar.md` A bölümünde; yedi tek sayfalık parça ekranda kullanılmadı.
- Sıffin: ekranda yalnız "çoğaltmadan 7 yıl sonra"; "vefattan 27 yıl" kullanılmadı (657 − 632 = 25 ile kitabın 27'si arasında tutarsızlık).
- Hafız sayısı: Türkiye ≈200 bin (kabaca), dünya "milyonlarca" (kabaca); 3-4 milyon rakamı kullanılmadı.
- Tevbe 9:128 için "%60 Hz. Muhammed dönemi" (yazarın kaba hesabı) kullanılmadı.
- Armstrong'un "düşmanlar vahyin sahte olduğunu iddia etmedi" ifadesi, Kur'an'ın kendi kayıtlarıyla çeliştiği için alınmadı.
- Kadı Abdülcabbar yalnız "bir Mutezile âlimi" olarak anıldı (yaşadığı dönem tartışmalı).
- Mushaf görselleri için yayın öncesi lisans doğrulaması gerekir (`docs/gorseller.md`).

## v2.1 eklemeleri: antik metin kıyası (kitap dışı ek)

Yeni beat `zemin.kiyasYazma` (`"ek": true`). Tüm satırlar `kaynak` ile künyeli ve `dogrulanacak: true`; kullanıcı onayına kadar yayına alınmamalı. Kitaptaki McDowell tablosu (`zemin.kiyas`, yazım → en eski kopya süreleri) ekrandadır ve ek değildir; **yazma sayıları ve sonrası kitapta yoktur**.

| Beat | Eklenen içerik | Kaynak | Risk |
|---|---|---|---|
| `zemin.kiyasYazma` | Elimizdeki yazma sayısı: Herodot ≈8, Eflatun ≈7, Sezar (Galya Savaşları) ≈10 | F. F. Bruce, *The New Testament Documents: Are They Reliable?* (McDowell'in dayandığı gelenekle uyumlu sayılar) | Orta: sayılar kaynağa göre değişir ("civarı" denildi); sayfa teyit edilecek |
| `zemin.kiyasYazma` | Tacitus *Annals* ilk altı kitabı tek yazmaya dayanır | Metin neşri literatürü (Mediceus I); kaynak sayfası eklenecek | Düşük-orta |
| `zemin.kiyasYazma` | Homeros *İlyada* için "binden fazla yazma ve papirüs" | Klasik filoloji literatürü (ör. Reynolds & Wilson) | Düşük-orta; kitaptaki "400 yıl" aralığıyla birlikte okunmalı |
| `zemin.kiyasYazma` | Yeni Ahit: 5.000'den fazla Yunanca yazma; en eski parçalar 2. yüzyıl | Bruce M. Metzger, *The Text of the New Testament* | Orta: Yeni Ahit'in iyi belgelendiği dürüstçe kabul edilir (kıyas Kur'an'ın "daha erken" olduğu noktasına dayanır); sayfa teyit |
| `zemin.kiyasYazma` | Theophanes, Herakleios savaşlarını olaylardan yaklaşık 190 yıl sonra (≈810-814) yazdı | Mango & Scott, *The Chronicle of Theophanes Confessor* (Oxford, 1997) | Orta: yazım tarihi bilinen konsensüs; Rum bölümünde Bizans kaynaklarına itiraz gelirse hazır cevap |
| `zemin.kiyasYazma` | "Ardından milyonlarca el yazması nüsha" | Hamidullah (kitap s. 80-81); kitaptan | Düşük (kitaptan) |

**Bilerek eklenmeyenler:** Prokopios için yazma aralığı (kaynak doğrulanamadı; `docs/eksikler.md`); Livius ve Genç Plinius satırları ekrana sığmadığı için çıkarıldı (kitapta var).

## v2.1: açılış formatı (`acilis.format`)

Kitap dışı değil, yeni anlatım: oryantalist/akademik kaynak tercihinin gerekçesi (tarafsız zemin, "kendi kaynağıyla kendini ispat" döngüsünden kaçınma). Olgu iddiası içermez; yalnız üslup onayı gerekir.
