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

## v2.2: kullanıcı onaylı akış değişiklikleri (A1, A4, A6, ayet sahneleri)

Aşağıdakiler kullanıcı tarafından onaylandı; kayıt ve takip için listelenir. Kitap dışı olanlar ayrıca işaretlidir.

| Değişiklik | Beat'ler | Not |
|---|---|---|
| A1 açılış kancası: ihtimaller ağacı önizlemesi (kanıtlamaz; sıra korunur) | `acilis.onizleme` (format sonrası, profil sorularından önce) | Diyagram `ihtimaller`, vurgu null |
| A6 zemin "kısa yol / derin yol" seçimi | `zemin.giris` (soru değişti), `zemin.supheSor` (eski ilk soru buraya taşındı), `zemin.ozet-yazim`, `zemin.ozet-yazma`, `zemin.ozet-kiyas`, `zemin.ozet-ikincil`, `zemin.ozet-son` | Kısa yol zemini kapalı işaretlemez. Yeni olgu yok: satırlar mevcut zemin beat'lerinden özetlendi (kitap dışı yazma sayıları kullanılmadı) |
| A4 bölüm sonu merak cümleleri | `zemin.kopru`, `zemin.kisa`, `haber.kisisel`, `haber.kopru-*`, `haber.sirayla`, `haber.kalan-s/-f/-ikisi`, yeni `mucize.gecis` (mucize -> kapanış köprüsü; eski `kapanis.giris` yolları buraya yönlendirildi) | Tek satırlık vurgu cümlesi; abartısız |
| Arapça ayet satırları (`"ayet"` alanı) | 32 satır: Rûm 30:2-4, 30:5; Bakara 2:23, 2:104; İsra 17:88, 17:74-75; Kıyâme 75:16-19; Duhâ 93:3, 93:6-8, 93:9-10; Abese 80:1-2; Tevbe 9:43, 9:40, 9:128-129; En'âm 6:35; Âl-i İmrân 3:144, 3:93; Mâide 5:104; Alak 96:1-5; Kâfirûn 109:1-6; Ankebût 29:48; Kasas 28:86; Yûsuf 12:3; Furkân 25:33; Tekvîr 81:8-9; Kalem 68:46; Hûd 11:49; Duhân 44:29; Yâsîn 36:69; Zuhruf 43:31; Enfâl 8:31 | Arapça `quran-json@3.1.2`'den; meal Diyanet'ten uyarlandı, `dogrulanacak:true` |

### Dikkat edilmesi gerekenler (kullanıcı kararı bekler)
- **Hicr 15:9 (koruma)** `zemin.ikna` içine eklendi; bu ayet metnin korunmuşluğunu kendi iddiası olarak söyler. Müslüman olmayan muhatap için döngüsel olmasın diye öncesine "delil olarak değil, sınanabilir bir iddia olarak" çerçeve cümlesi kondu. Bu çerçeve cümlesi kitapta yok (**kitap dışı ek**); istenmezse ayet satırıyla birlikte çıkarılır.
- **Bilerek eklenmeyen ayetler (hassas):** Ahzâb 33:37 ("içinde sakladığın", `samimiyet.sohret` ek 1) ve Tevbe 9:113 (Ebu Talib, `samimiyet.kabile` ek 1). Kitap bu iki yerde ölçülü anlatım ister (dn. 519; metod-haritasi §4); ayet metni ekranda tam gösterilince tartışma açabilir. Kullanıcı isterse eklenir.
- **Belirsiz atıflı, eklenmeyen:** "Bu apaçık bir sihirbazdır" (`mucize.sihir`; 10/2, 38/4, 46/7, 51/52 gibi birden çok yerde geçer), "Sen orada değildin" (`fetanet.kitapehli`, Kasas 28:44/46 ve Âl-i İmrân 3:44 olasılığı), Şûrâ 42:52 (`fetanet.ummi` ek 2'nin ilk satırı; uzun ayet), Bakara 2:214 (sabır).
- Tevbe 9:40 (`samimiyet.tutulma` ek 0) ve Âl-i İmrân 3:93 uzun ayetlerdir; ekranda tam gösterilir, kısaltılmadı.
