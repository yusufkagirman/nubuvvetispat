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
| Sesli anlatıcı (sonraki aşama) | tüm akış | Şimdilik yok (kullanıcı kararı); hafız tilaveti + Türkçe meal dinletisi de bu aşamaya ait | Sonraki aşamada TTS/kayıtlı anlatım; ayet sahnelerinde hafız tilaveti (lisanslı kayıt) |
| Ayet sahneleri: Arapça metin ve Türkçe meal doğrulaması (32 ayet satırı; `grep -n '"ayet"' icerik/akis/*.json`) | `icerik/akis/*.json` satır `ayet` alanı | Arapça metin `quran-json@3.1.2` paketinden kopyalandı (elle yazılmadı); meal Diyanet'ten uyarlandı, `dogrulanacak:true` | Arapça: Tanzil/Kur'an Kerim mushafıyla karşılaştır (waqf işaretleri ve harekeler dahil). Meal: Diyanet meali ile satır satır karşılaştır; birebir alıntı mı uyarlama mı kararı ver. Lisans: paketin LICENSE dosyası CC-BY-SA 4.0 (package.json CC-BY-4.0 yazıyor); sunumun Kaynakça sahnesine atıf eklenmeli (builder) |

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

## Hassas konular için kaynak doğrulamaları (bkz. `docs/hassas-konular.md`)

> Aşağıdaki satırlar bu oturumda **ezberden** yazıldı; eser varlığı, yıl, yayıncı, sayfa ve tez özeti internetle doğrulanmadan sunuma `kaynak` olarak girmez. Hepsi `dogrulanacak:true` + kullanıcı onayı.

| Ne | Nerede | Neden | Nasıl |
|---|---|---|---|
| Kecia Ali, *The Lives of Muhammad* (Harvard UP, 2014); *Sexual Ethics and Islam* (Oneworld, 2006): Aişe yaşı/evliliği ilgili bölüm ve sayfa | `samimiyet.aise` (taslak YNI-1) | ağ | Yayıncı sayfası/kütüphane kaydı; bölüm başlığı ve sayfa aralığı |
| Jonathan A. C. Brown, *Misquoting Muhammad* (Oneworld, 2014): Aişe yaşı rivayeti bölümü; Hişâm b. Urve eleştirisi tartışması | `samimiyet.aise`, `samimiyet.isine-gelen` | ağ | Bölüm numarası, sayfa; tez özeti doğrula |
| Denise Spellberg, *Politics, Gender, and the Islamic Past* (Columbia UP, 1994): Aişe'nin yaşı/bekâreti vurgusunun işlevi | `samimiyet.aise` | ağ | Bölüm ve sayfa |
| Watt (*Muhammad at Medina*, 1956; kitaptaki Türkçe çev.), Armstrong, Rodinson: Aişe nişan/evlilik ve evliliklerin siyasi işlevi pasajları | `samimiyet.aise`, `samimiyet.kadin` | ağ | Orijinal ve Türkçe çeviride sayfa; ifade doğrula |
| Buhârî (Menâkıbü'l-Ensâr "Nebi'nin Aişe ile evlenmesi"; Nikâh), Müslim (Nikâh), İbn Sa'd *Tabakât*: Aişe evlilik yaşı rivayeti; hadis numaraları | `samimiyet.aise` dayanak | ağ | Mevsûa/Sünnet.com benzeri kaynaktan numara ve metin |
| Justinianus *Institutiones/Digesta* (kız çocukları için asgari evlenme yaşı 12): madde numarası; "Bağlam" cümlesinin gerekip gerekmediğine karar | `samimiyet.aise` dayanak | ağ; kitapta yok | Roma hukuku kaynak çevirisi |
| W. N. Arafat, "New Light on the Story of Banū Qurayẓa and the Jews of Medina", *JRAS* (1976): sayfa aralığı ve tez | `samimiyet.kureyza` (YNI-2) | ağ | JSTOR/Cambridge künyesi |
| Barakat Ahmad, *Muhammad and the Jews: A Re-Examination* (Vikas, 1979): bölüm, sayfa | `samimiyet.kureyza` | ağ | Kütüphane kaydı |
| M. J. Kister, "The Massacre of the Banū Qurayẓa: A Re-Examination of a Tradition", *JSAI* 8 (1986): sayfa aralığı, tez | `samimiyet.kureyza` | ağ | JSAI sayfası/kaynakça |
| Watt, *Muhammad at Medina* (Kurayza bölümü) ve *EI²* "Ḳurayẓa, Banū" maddesi; Lecker, *Muslims, Jews and Pagans* (Brill, 1995); Newby, *A History of the Jews of Arabia* (1988); Serjeant (BSOAS 41, 1978), Rubin (*Studia Islamica* 62, 1985) Medine Sözleşmesi | `samimiyet.kureyza` | ağ | Künye ve sayfa |
| İbn İshak–İbn Hişâm *Sîre* (Guillaume çev., 1955) Kurayza bölümü sayfaları; Vâkıdî *Meğâzî*; Taberî *Tarih* (SUNY, Fishbein çev., Hendek–Kurayza cildi); Buhârî/Müslim Sa'd b. Muaz hükmü rivayeti; olaya dair "600–900" sayı aralığı | `samimiyet.kureyza` dayanak | ağ | Sayfa, cilt, hadis numarası; sayı aralığı kaynaklarda kontrol |
| Tesniye 20:10–14 ile Sa'd'ın hükmü ilişkisi (Arafat vb.): ilişkinin gerçekten öne sürülüp sürülmediği | `samimiyet.kureyza` | ağ | Arafat makalesi; ilişki kullanılmayacaksa satır sil |
| T. W. Arnold, *The Preaching of Islam* (1896/1913) orijinalinden: kitaptaki Türkçe alıntıların (s. 31, 34, 67, 69, 70, 76, 83–86, 91–92, 102, 114, 117–119, 529, 534) orijinal sayfa karşılığı | `fetanet.tolerans`, `fetanet.savas` | ağ; kitap Türkçe çeviriye atıf veriyor | Orijinal baskıda eşleştir |
| Richard Bulliet, *Conversion to Islam in the Medieval Period* (Harvard UP, 1979): eğrinin tarihleri ve bölgeler | `fetanet.savas` | ağ | Bölüm ve sayfa |
| Fred Donner, *The Early Islamic Conquests* (Princeton, 1981); *Muhammad and the Believers* (Harvard, 2010): hangi iddia için hangi eser | `fetanet.savas` | ağ | Bölüm ve sayfa |
| Hugh Kennedy, *The Great Arab Conquests* (2007); Berkey, *The Formation of Islam* (2003); Morony, *Iraq After the Muslim Conquest* (1984); Levy-Rubin (2011); Mark R. Cohen, *Under Crescent and Cross* (1994); Lewis, *The Jews of Islam* (1984) | `fetanet.savas`, `fetanet.tolerans` (zimmî statüsü hedge) | ağ | Künye ve sayfa |
| David Cook, *Understanding Jihad* (2005); Bonner, *Jihad in Islamic History* (2006); Peters, *Jihad in Classical and Modern Islam* (1996); Afsaruddin (Oxford, 2013); Abou El Fadl (Cambridge, 2001): saldırı cihadı kuramının klasik hukukta yeri | `fetanet.savas` | ağ | Bölüm ve sayfa |
| Tevbe 9/5 ve 9/29 klasik tefsirlerde yorumu (Taberî, Râzî); Bakara 2/256 nüzul sebebi | `fetanet.savas` | ağ; kitapta bu ayetler yok | Tefsir kaynaklarından özet |
| Zeyd–Zeyneb (Ahzâb 33/37), Ahzâb 33/50–52, Tahrîm 66/1–5: Buhârî Tefsir bölümleri; Aişe'nin "Rabbinin arzularına çabuk yetiştiğini görüyorum" rivayeti (Buhârî, Tefsir Ahzâb); Ömer'e muvafakat ayetleri (Buhârî) | `samimiyet.isine-gelen` (YNI-5) | ağ | Hadis numarası ve metin |
| Bell, *Introduction to the Qur'ân* (Edinburgh, 1953; Watt revizyonu 1970); Nöldeke–Schwally, *Geschichte des Qorāns* (1909–38); Neuwirth, *Der Koran als Text der Spätantike* (2010); Rippin, "The Function of Asbāb al-Nuzūl…" (*BSOAS* 51, 1988); Donner, *Narratives of Islamic Origins* (1998) | `samimiyet.isine-gelen` | ağ | Künye ve tez doğrulaması; kullanılmayacak olan çıkarılsın |
