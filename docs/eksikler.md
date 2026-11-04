# Eksikler — İnternet Gerektiren / Doğrulanacak İşler

> Bulut oturumunda ağ kısıtlı olduğu için yapılamayanlar. Yerel Claude oturumunda (internetli) tamamlanacak.
> Her satır: Ne | Nerede (dosya/beat) | Neden yapılamadı | Nasıl tamamlanır

## Genel
| Ne | Nerede | Neden | Nasıl |
|---|---|---|---|
| Mushaf görsellerinin lisans/kaynak doğrulaması | `docs/gorseller.md`, `public/gorseller/` | commons/gallica/islamic-awareness erişimi engelli | Her görselin kurum sayfasını aç, lisansı ve tam künyeyi yaz; mümkünse yüksek çözünürlüklü resmî görselle değiştir |
| Corpus Coranicum künyesi ve ilgili yazma kayıtları | `icerik/akis/zemin.json` (Corpus Coranicum beat'i) | corpuscoranicum.de erişilemiyor | Proje sayfası, yazma ID'leri, karbon tarihleri sayfalarının künyesini ekle |
| Birmingham radyokarbon raporu (Oxford Radiocarbon Accelerator Unit, 2015) künyesi | zemin karbon beat'i | ağ | Üniversite basın bülteni + rapor künyesi |
| Sadeghi & Goudarzi (2012) Sana palimpsesti — sayfa ve tam künye | zemin itiraz cevabı | ağ | Der Islam 87 makalesinden doğrula |
| Antik metin kıyası verileri (İlyada, Herodot, Tacitus, Platon, Julius Caesar, Bizans tarihçileri, İncil yazmaları): yazar ölümü → en eski yazma arası süre, yazma sayısı | zemin antik kıyas beat'i | ağ; kitapta yalnız bir kısmı var | Akademik kaynaklardan (ör. Bruce Metzger, F. F. Bruce; yazma katalogları) doğrula |
| Oryantalist alıntıların asıl kaynaktan (İngilizce/Fransızca orijinal) doğrulanması | tüm `alinti` diyagramları | ağ; kitabın Türkçe aktarımından alındı | Orijinal eser ve sayfadan karşılaştır |
| Eksik künye alanları (`"dogrulanacak": true` olan kaynaklar) | `icerik/akis/*.json` | bilgi bankasında yok | `grep -n dogrulanacak icerik/akis/*.json` ile listele ve tamamla |

## v2.1 kaynak künyeleri (`"dogrulanacak": true`)

> `kaynak` nesnesi olan satırlarda künye alanı bilgi bankasında yoksa boş bırakıldı (uydurulmadı). Türkçe basım künyesi (yer/yıl) `docs/kaynakca.md`'den; "sayfa" boşsa kitaptaki dipnotta yalnız kitap sayfası vardı, **asıl eserin sayfası** yerelde (ağlı oturumda) bulunacak. Her satır için ayrıca alıntının asıl dilden karşılaştırması önerilir.

| Yazar | Eser (künyede yazan) | Beat'ler | Eksik alanlar | Nasıl tamamlanır |
|---|---|---|---|---|
| Alexander A. Vasiliev | Bizans İmparatorluğu Tarihi (Alfa, Türkçe çev.) | `mucize.rum-donus` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Auguste Bailly | Bizans Tarihi (Tercüman 1001 Temel Eser, Türkçe çev.) | `mucize.rum-tahmin` | sayfa, yer, yil | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Bauer (Thomas ya da Susan Wise Bauer; teyit edilecek) | (eser belirtilmemiş) | `fetanet.tolerans` | eser, sayfa, yer, yil | Kitaptaki 'Bauer' atfının hangi eser olduğunu (Thomas Bauer mı, Susan Wise Bauer mı) kitap dipnotundan belirle; künyeyi yaz |
| Behnam Sadeghi ve Mohsen Goudarzi | Ṣanʿāʾ 1 and the Origins of the Qurʾān (Der Islam 87) | `zemin.karbon` | sayfa, yer | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Behnam Sadeghi ve Uwe Bergmann | The Codex of a Companion of the Prophet and the Qur'an of the Prophet (Arabica) | `zemin.cografya` | sayfa, yer | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Bernard Lewis | Tarihte Araplar (Pegasus, Türkçe çev.) | `samimiyet.kapanis` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Bruce M. Metzger | The Text of the New Testament | `zemin.kiyasYazma` | sayfa, yer, yil | KİTAP DIŞI EK: yazma sayıları/tarihler eserden sayfa ile doğrulansın (docs/onay/acilis-zemin.md) |
| Corpus Coranicum | Corpus Coranicum veri tabanı: ayet ve yazma navigatörü | `mucize.kissa-giris`, `zemin.corpus` | sayfa, yil | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Cyril Mango ve Roger Scott | The Chronicle of Theophanes Confessor (Theophanes, Chronographia çevirisi) | `zemin.kiyasYazma` | sayfa | KİTAP DIŞI EK: yazma sayıları/tarihler eserden sayfa ile doğrulansın (docs/onay/acilis-zemin.md) |
| D. S. Margoliouth | Muhammed ve İslam'ın Yükselişi (Ankara Okulu, Türkçe çev.) | `zemin.musrikler` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Edward Gibbon | Roma İmparatorluğunun Gerileyiş ve Çöküş Tarihi (İndie Kitap, Türkçe çev.) | `mucize.rum-donus`, `mucize.rum-tahmin` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| F. F. Bruce | The New Testament Documents: Are They Reliable? | `zemin.kiyasYazma` | sayfa, yer, yil | KİTAP DIŞI EK: yazma sayıları/tarihler eserden sayfa ile doğrulansın (docs/onay/acilis-zemin.md) |
| François Deroche | La transmission écrite du Coran dans les débuts de l'islam: le codex Parisino-petropolitanus | `zemin.cografya` | sayfa, yer | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Ira M. Lapidus | İslam Toplumlarının Tarihi (İletişim, Türkçe çev.) | `fetanet.toplum` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Josh McDowell | Hüküm Gerektiren Yeni Kanıtlar (Türkçe çev.) | `zemin.kiyas` | yer, yil | Künyeyi tamamla; ifadeyi asıl metinle karşılaştır |
| Kadı Abdülcabbar | Tesbîtu Delâili'n-Nübüvve (Türkiye Yazma Eserler Kurumu) | `zemin.tahrif` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Karen Armstrong | İslam Peygamberinin Biyografisi Hazreti Muhammed (Koridor, Türkçe çev.) | `fetanet.siyasi`, `fetanet.toplum`, `fetanet.ummi`, `fetanet.yetisme` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Leone Caetani | İslam Tarihi (Ankara Okulu, Türkçe çev.) | `fetanet.kapanis`, `zemin.sahabe` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Lesley Hazleton | İlk Müslüman (Kitabix, Türkçe çev.) | `fetanet.hudeybiye`, `fetanet.sara`, `samimiyet.vahiy` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Marshall G. S. Hodgson | İslam'ın Serüveni (Phoenix, Türkçe çev.) | `zemin.siffin` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Maxime Rodinson | Muhammed (Doruk, Türkçe çev.) | `fetanet.siyasi`, `mucize.belagat-nebi`, `mucize.belagat-siir`, `samimiyet.kapanis`, `zemin.siffin` | sayfa, yer | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Oxford Radiocarbon Accelerator Unit ve Birmingham Üniversitesi | Birmingham Kur'an yapraklarının radyokarbon tarihlemesi | `zemin.karbon` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| R. V. C. Bodley | Hazreti Muhammed (Nebioğlu, Türkçe çev.) | `fetanet.sara`, `fetanet.yetisme` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Reinhart P. A. Dozy | İslam Tarihi (Gri Yayınevi, Türkçe çev.) | `fetanet.toplum`, `samimiyet.guc`, `samimiyet.kapanis`, `samimiyet.vahiy` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Richard Bell | The Qur'an: Translated, With a Critical Re-Arrangement of the Surahs, c. 2 | `mucize.rum-ayet` | yer, yil | Künyeyi tamamla; ifadeyi asıl metinle karşılaştır |
| Sir William Muir | Kur'an: Mahiyeti, Öğretisi ve Kitabı Mukaddeslerle İlgili Tanıklığı (Ankara Okulu, Türkçe çev.) | `zemin.yazim` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Sir William Muir | The Life of Mahomet, c. 2 | `mucize.rum-ayet` | yer, yil | Künyeyi tamamla; ifadeyi asıl metinle karşılaştır |
| Susan Wise Bauer | Ortaçağ Dünyası (Alfa Tarih, Türkçe çev.) | `mucize.rum-tahmin` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Tayyar Altıkulaç | Mesâhif-i Kadîme (IRCICA) | `zemin.kiyasYazma` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Thomas W. Arnold | İslam'ın Tebliğ Tarihi (İnkılab, Türkçe çev.) | `samimiyet.yuk` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Tübingen Üniversitesi Kütüphanesi | Tübingen mushafının radyokarbon tarihlemesi | `zemin.cografya` | sayfa, yil | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| W. Montgomery Watt | Hz. Muhammed: Peygamber ve Devlet Adamı (İletişim, Türkçe çev.) | `fetanet.sara`, `samimiyet.ikinci`, `samimiyet.kadin`, `samimiyet.kapanis`, `samimiyet.vahiy` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| W. Montgomery Watt | Muhammed Medine'de (Kuramer, Türkçe çev.) | `fetanet.hudeybiye`, `fetanet.ongoru`, `fetanet.zeka` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |
| Émile Dermenghem | Hz. Muhammed ve Risâleti (İnsan, Türkçe çev.) | `fetanet.sara`, `samimiyet.ikinci`, `samimiyet.uzlasma` | sayfa | Orijinal eserden sayfa/yer/yıl; satırdaki ifadeyi asıl metinle karşılaştır |

| Antik yazma sayıları ve 'en eski yazma' tarihleri: Herodot 8, Eflatun 7, Sezar 10, Tacitus Annals 1-6 tek yazma, İlyada 1000+, Yeni Ahit 5000+ Yunanca yazma / en eski parça 2. yy, Theophanes ≈ 810-814 | `zemin.kiyasYazma` | kitapta yok; ezberden akademik konsensüs | Bruce, *The New Testament Documents*; Metzger, *The Text of the New Testament*; Reynolds & Wilson, *Scribes and Scholars*; Mango & Scott (Theophanes) ile sayı ve sayfa doğrula, yanlış çıkanı düzelt |
| Bizans tarihçisi Prokopios için yazım→yazma aralığı eklenmedi | `zemin.kiyasYazma` | kaynağı doğrulanamadı | İsteniyorsa Prokopios *Savaşlar* yazmalarının en erken tarihi (10. yy?) teyit edilip eklenebilir |
| Zemin 'Corpus Coranicum' yanıtında ve `zemin.corpus`'ta projenin kurumsal künyesi (yürüten kurum, URL, erişim tarihi) | `zemin.corpus`, `mucize.kissa-giris` | ağ | Proje 'Hakkında' sayfasından kurum ve yıl |
| Birmingham Üniversitesi/Oxford radyokarbon raporu tam künyesi (yazma numarası, rapor/basın bülteni tarihi) | `zemin.karbon` | ağ | Üniversite basın bülteni, rapor |
| Tübingen mushafı (Tübingen Üniv. Kütüphanesi, yazma no.) ve Paris BnF yazması karbon/paleografi tarihleri | `zemin.cografya` | ağ | Kütüphane kayıtları ve Deroche eseri |
