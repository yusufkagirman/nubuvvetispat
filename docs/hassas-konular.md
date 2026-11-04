# Hassas Konular — Kitapta Var mı? Ne Eklenmeli? Kaynak Ne Olacak?

> Soru: "Bu hassas konular kitapta yer alıyor mu? Alıyorsa ekleyelim. Kaynak olarak ne kullanılacak?"
> Konular: (1) Hz. Aişe'nin evlilik yaşı, (2) Benî Kurayza olayı, (3) savaşlar / "İslam'ı kılıçla yaydı", (4) "Ayetler hep onun işine geliyordu".
>
> **Yöntem ve sınır.** Kitap metni (`docs/metin/*.txt`) Grep ile tarandı; sayfa numaraları metindeki `=== SAYFA N ===` işaretlerinden okundu (basılı sayfa numaralarıyla örtüşüyor: içindekiler "Dinî Tolerans 330", "Fetih Suresi 292"). Kitap dışı akademik eserler **ezberden** yazıldı (bu oturumda ağ yok): her biri **"doğrulanacak"** sayılır; tezler "bilinen genel tez" düzeyindedir, **hiçbir alıntı metni verilmedi**, sayfa/bölüm numarası bilinmiyorsa yazılmadı. Doğrulama satırları `docs/eksikler.md` sonuna eklendi.
>
> **Ön not.** `docs/icerik-degerlendirme.md` bu dört konuyu zaten "eksik itiraz" olarak işaretlemişti (YNI-1 Aişe, YNI-2 Kureyza, YNI-3 savaş/kılıç, YNI-5 işine gelen ayet; SMM-3, SMM-4). O taslak beat'ler yalnız iskelettir; bu belge onların **kaynak zeminini** ve **dürüstlük sınırlarını** verir. CLAUDE.md kuralı: kitap dışı her ekleme kaynaklı olur, `dogrulanacak:true` işaretlenir, kullanıcı onayına sunulur (`docs/onay/`).

## Özet tablo

| # | Konu | Kitapta var mı? | Doğrudan cevaplıyor mu? | Kitabın ana kaynakları | Karar |
|---|---|---|---|---|---|
| 1 | Aişe'nin yaşı | **Yok.** Aişe yalnız hadis ravisi / İfk olayı bağlamında (s. 110, 171, 225–226, 249, 251) | Hayır; ne yaş ne evlilik geçiyor | — | **Eklenmeli** (kitap dışı, onaylı, `dogrulanacak`) |
| 2 | Benî Kurayza | **Yalnızca anılıyor** (s. 152 Cebrail–Kurayza sahnesi, Dozy; s. 291 Hendek'te Kurayza, Watt) | Hayır; idam/sayı/hüküm hiç anlatılmıyor | Dozy, Watt | **Eklenmeli** (kitap dışı, onaylı, `dogrulanacak`) |
| 3 | Savaşlar / kılıç | **Evet, güçlü** ama "fetih sonrası" odaklı (s. 305–344, ayrıca s. 321, 367, 108) | **Kısmen**: Hz. Muhammed dönemi savaşlarını (Bedir–Hunayn, Hayber, Tebük, kılıç ayeti, Tevbe 9/5, 9/29) tek tek ele almıyor | Arnold, Lewis, Bauer, Hitti, Bodley, Armstrong, Hodgson, Rodinson, Dermenghem | **Mevcut içerik güçlü; Medine dönemi savaşları ve "dürüstlük" katmanı eklenmeli** |
| 4 | "Ayetler işine geliyordu" | **Evet**, ama itiraz adıyla değil **tersinden**: "uyarı ve teselli ayetleri / ikinci irade" (s. 231–243, 248–249) | **Dolaylı ama doğrudan işe yarar** (Zeyd–Zeyneb 33/37 dahil); itirazın en güçlü iç-gelenek biçimini (Buhârî'deki Aişe rivayeti) anmıyor | Caetani, Dozy, Watt, Dermenghem, Armstrong, Hazleton; Meriç (video) | **Mevcut içerik güçlü; itirazın adı ve güçlü biçimi eklenmeli** |

---

## 1) Hz. Aişe'nin evlilik yaşı

### Kitapta ne var?
- **Evlilik/yaş geçmiyor.** Taranan anahtar kelimeler: Aişe/Âişe/Ayşe, dokuz/altı yaş, nikâh, çocuk gelin, evlilik, çok eşli — sonuç sıfır.
- Aişe yalnız şu bağlamlarda geçer:
  - **İfk (zina iftirası) olayı**, Hz. Ebubekir–Mistah bağlamında (s. 110, Bölüm 1; tam hadis nakledilmiyor).
  - **Ravi olarak**: vısâl orucu (s. 171), rüzgâr/bulut hadisi (s. 225–226), Hz. Peygamber'in geçim sadeliği (s. 249, 251).
- İlgili **genel çerçeve** kitapta var:
  - Haber bölümünde (s. 141–143) yazar, "evlatlığının kızı ile evlenmesi" (Zeyneb bint Cahş) itirazını gayrimüslimlerin tutarsız biçimde öne sürdüğü örneklerden biri olarak anar; cevabı `docs/dogrulanacaklar.md` s. 59'da "03'e yönlendir" diye işaretli.
  - Samimiyet bölümü açılışı (s. 157) ve "Kişisel Menfaat ve Adanmışlık" (s. 243–248, 260–262): "kadın düşkünü / şehvetperest sahte peygamber" anlatısı Batı Orta Çağ'ında yaygındı; Carlyle'den sonra terk edildi; Watt ("temelsiz iddialardan biri… İslâm'ın gelişimini anlaşılmaz kılar", s. 260), Caetani, Dozy, Lewis (s. 260–262) alıntılanır.
- **Sonuç:** Kitap "şehvetperest" iddiasının genel mantığını çürütür ama **Aişe'nin yaşını hiç ele almaz**. Sunumda bu soru gelirse mevcut `samimiyet.kadin` yalnız "evlendi/çok eş" için hazırlıklıdır (mikro-testte "Aişe kaç yaşındaydı?" → "birazdan geleceğiz" ve söz tutulmuyor, bkz. `docs/icerik-degerlendirme.md` SMM-3).

### Kitabın kaynakları bu konuda
Yok. Kullanılabilir olan yalnızca dolaylı: Watt s. 260 ve Caetani/Dozy'nin samimiyet hükümleri ("şehvet için bile bile yalan" tezi). Bunlar yaş sorusunu **cevaplamaz**, yalnız "bu evlilik 'bile bile yalan' tezini kanıtlar mı?" sorusuna zemin olur.

### Önerilen kaynaklar (hepsi **doğrulanacak**)
Oryantalist/gayrimüslim akademik önce, sonra Müslüman akademik:

| Eser | Bilinen tezi / ne işe yarar |
|---|---|
| **Kecia Ali**, *The Lives of Muhammad* (Harvard Univ. Press, 2014) | Muhammed biyografilerinin tarihyazımı; Aişe'nin yaşı ve evlilikleri modern polemik ve savunma literatüründe nasıl kuruldu; kaynakların çağdaş okumaları. Tarihyazımı çerçevesi için en iyi tarafsız zemin (yazar Müslüman akademik; eser akademik, savunmacı değil). |
| **Kecia Ali**, *Sexual Ethics and Islam* (Oneworld, 2006; genişletilmiş baskılar) | Klasik fıkıhta evlilik/rıza/velayet; "küçük yaşta evlilik" meselesinin fıkıhtaki yeri. |
| **Jonathan A. C. Brown**, *Misquoting Muhammad* (Oneworld, 2014) | Aişe'nin yaşı rivayetinin ve genel olarak "rahatsız edici" hadislerin nasıl ele alınacağı; rivayetin güçlü bir tarafı ve yaş hesabına itirazların zayıflığı ile günümüz ölçüleriyle yargılamanın anakronizm riski üzerine. İlgili bölüm numarası **doğrulanacak**. Brown Müslüman akademisyendir; tez savunuculuğa kayabilir, bu yüzden Ali ile birlikte okunmalı. |
| **Denise A. Spellberg**, *Politics, Gender, and the Islamic Past: The Legacy of ʿĀʾisha bint Abī Bakr* (Columbia Univ. Press, 1994) | Aişe'nin gençliği/bekâreti vurgusunun sonraki Sünnî–Şiî tartışmalarında oynadığı rol; Aişe hafızasının siyasi inşası. Rivayetin **kaynak ve işlev** katmanları için. |
| **W. Montgomery Watt**, *Muhammad at Medina* (Oxford, 1956) ve *Muhammed: Peygamber ve Devlet Adamı* (İletişim, kitapta kullanılan Türkçe çeviri) | Evliliklerin önemli kısmının **siyasi ittifak** işlevi (Ebubekir ve Ömer ile akrabalık). Aişe nişanı/evliliği için bölüm ve sayfa **doğrulanacak**. |
| **Karen Armstrong**, *İslam Peygamberinin Biyografisi Hazreti Muhammed* (Koridor, kitabın kullandığı çeviri) | Evliliklere siyasi ve toplumsal okuma. Aişe için hangi sayfada ne dediği **doğrulanacak**. |
| **Maxime Rodinson**, *Muhammed* (Doruk, kitabın kullandığı çeviri) | Evliliklere dair biyografik çözümleme. Aişe pasajı ve sayfa **doğrulanacak**. |
| **Birincil kaynak**: Buhârî (Menâkıbü'l-Ensâr'da "Nebi'nin Aişe ile evlenmesi" babı; Nikâh bölümünde ilgili bablar), Müslim (Nikâh), İbn Sa'd *Tabakât* | Rivayetin kendisi; hadis ve senet numaraları **doğrulanacak** (verilmedi). Rivayetin Hişâm b. Urve kanalı ve Irak dönemi eleştirisi literatürde tartışılır (Brown ilgilenir); ayrıntı **doğrulanacak**. |
| Geç Roma/Bizans hukukunda evlenme yaşı (kızlar için 12): Justinianus *Institutiones* / *Digesta* | Yedinci yüzyıl çevresindeki hukuki eşik. **Dikkat:** bağlam vermek içindir, aklama için değil (aşağıya bak). Madde numarası **doğrulanacak**. |

Müslüman akademik içinde "yaş farklı hesaplanıyor (örn. 16–19)" tezini savunan çağdaş yazarlar vardır; hiçbirini kesin bir künyeyle yazmıyorum (**doğrulanacak**). Akademik ana akım bu revizyonu **kabul etmiyor**; sunum bunu ana savunma yapmamalı.

### Sunum için öneri
- **Yer:** `samimiyet` bölgesi, `samimiyet.kadin`'ın hemen **öncesi** veya itiraz kolu olarak (taslak `samimiyet.aise` = YNI-1, `docs/icerik-degerlendirme.md`). Giriş noktası kullanıcı kendisi sorduğunda ve "şehvet/kadın" yolundan gelen şüphede; ayrıca `itiraz` anahtarları: aişe, ayşe, kaç yaşında, çocuk gelin, dokuz yaş, altı yaş.
- **Ton:** Kaçmayan, savunmacı olmayan, kısa. "Bu soruyu atlamayacağım. Haklı bir soru." Tarihsel ifade **rivayet** olarak verilir ("rivayetlere göre… birlikte yaşamaya yaklaşık dokuz yaşında"). Sonra tek soru: "Bir davranışı bugünün ölçüsüyle yargılamak ile onun arkasında 'bile bile yalan' olduğunu söylemek aynı şey mi?" Kullanıcı rahatsızlığını beyan ederse bu **meşru** karşılanır, ikna zorlanmaz.
- **Dürüst olunması gereken zor noktalar:**
  1. Kaynakların (Buhârî, Müslim) **dokuz yaşı** söylediğini gizleme; "yaş tartışmalı" demek tek başına kaçamaktır. Yaş revizyonu tezlerini ana savunma yapma.
  2. "O dönemde normaldi" argümanı **bugünkü ahlaki rahatsızlığı gidermez**. Bunu açıkça söyle (taslakta zaten var). Batı'daki geç-ortaçağ/modern yaş eşikleriyle karşılaştırma (whataboutism) kullanma; yalnız kısa bağlam ver.
  3. "Düşmanları bu evliliği saldırı konusu yapmadı" ifadesi bir **sessizlikten delil**dir; zayıftır (norm olduğu için de sessiz kalınmış olabilir). Kaynak taraması yapılmadan ("Watt/İbn İshak") kesin cümleye çevrilmemeli, `dogrulanacak` kalmalı.
  4. Bu konu **peygamberlik ispatının** hükmünü değil, "samimiyet" dalındaki **şehvet iddiasını** hedefler. Sunum yalnız bu mantıksal çerçevede cevap verir, geri kalan ahlaki tartışmayı kullanıcıya açık bırakır ("sunumdan sonra konuşabiliriz").
- **Onay:** Evet, hassas; yayından önce kullanıcı onayı (`docs/onay/samimiyet.md`).

---

## 2) Benî Kurayza olayı

### Kitapta ne var?
- **Anlatılmıyor.** İdam, sayı, Sa'd b. Muaz'ın hükmü, kuşatma, kadın-çocukların esir alınması: hiçbiri yok. Anahtar kelime taramasında (Kurayza, Kureyza, Nadir, Kaynuka, Medine Vesikası/Sahife, Sa'd b. Muaz) bu olaylar için sonuç çıkmadı (Kaynuka/Nadir/Sahife zaten yok).
- İki yerde **geçerken** anılır:
  1. **s. 152** (Bölüm 2, "farkında olmadan yalan" dalının tartışması): Cebrail'in Hendek sonrası zırhını çıkarmayıp Benî Kurayza'ya yürümesini söylediği hadisler. Dozy: "Cebrail, daha elbiselerinin tozu henüz silkelenmiş olduğu hâlde Muhammed'e, Benî Kurayza üzerine yürüme emrini getirdi." Burada olay **konu değil**, vahiy iddiasının nasıl bir halüsinasyon/yalan gerektireceğini göstermek için bir örnek. Kitap "sayısız örneği getirebilirdik" diye geçer.
  2. **s. 291** (Fetanet: Hendek): Watt'tan: Kurayza'nın "ikinci cephe" olarak açılmasının engellendiği (gizli ajan ve şüphe tohumu). Yani olay yalnızca Hendek stratejisi bağlamında, Kurayza **tehdit** olarak çerçevelenir; sonrası yok.
- **Sonuç:** Kitap bu itirazı **doğrudan cevaplamıyor, hatta ele almıyor**. Kitabın savaş etiği bölümü (s. 305–324) "fetih sonrası" odaklıdır; Medine dönemi iç hesaplaşmaları yok. Bu, sunumda en büyük açık: Yahudi ve ateist muhatap için en güçlü "ahlaki itiraz"lardan biri.
- Not: s. 321'deki "Ondan öncesi, savunma savaşları şeklindeydi" cümlesi, Kurayza'ya uygulanırsa **tartışmalı** bir genelleme olur (Kurayza'da hüküm "savaş hukuku/ihanet cezası" çerçevesiyle savunuluyor, "savunma savaşı" değil). Bu cümle Kurayza bağlamında **alıntılanmamalı**.

### Önerilen kaynaklar (hepsi **doğrulanacak**)

| Eser | Bilinen tezi / ne işe yarar |
|---|---|
| **W. N. Arafat**, "New Light on the Story of Banū Qurayẓa and the Jews of Medina", *Journal of the Royal Asiatic Society* (1976) | Anlatının ana kaynağı İbn İshak'ın rivayetinin güvenilirliğini sorgular; hikâyenin Yahudi kaynaklı/sonradan şekillenmiş unsurlar taşıdığını, ayrıntıların (sayı, uygulama) şüpheli olduğunu savunur. Şüpheci uç. |
| **Barakat Ahmad**, *Muhammad and the Jews: A Re-Examination* (Vikas, New Delhi, 1979) | Kurayza'da idamın çok daha sınırlı olduğunu (asıl suçluların) ve kaynakların abartılı olduğunu savunan revizyonist okuma. Müslüman akademik; **şüpheci/savunmacı uç** olarak etiketle. |
| **M. J. Kister**, "The Massacre of the Banū Qurayẓa: A Re-Examination of a Tradition", *Jerusalem Studies in Arabic and Islam* 8 (1986) | Rivayet katmanlarının ayrıntılı filolojik incelemesi (kitapta Kister'in başka eseri zaten kullanılıyor, `docs/kaynakca.md` #41); olayın tarihselliğini ve rivayetlerin çeşitliliğini göstermek için en güçlü akademik zemin. İsrailli akademisyen (**oryantalist öncelik** kuralına uyar). |
| **W. Montgomery Watt**, *Muhammad at Medina* (Oxford, 1956); ayrıca *Encyclopaedia of Islam* (2. baskı) "Ḳurayẓa, Banū" maddesi | Olayın siyasi bağlamı (Hendek'te ihanet, Evs'in müttefiklik ilişkisi, Sa'd'ın hakemliği); kitabın zaten kullandığı Watt. Sayfa/madde **doğrulanacak**. |
| **Michael Lecker**, *Muslims, Jews and Pagans: Studies on Early Islamic Medina* (Brill, 1995) ve Medine Vesikası üzerine çalışmaları | Medine'nin Yahudi kabileleri, kabile ilişkileri ve Sahife bağlamı. **Doğrulanacak** (kesin makale bilgisi verilmedi). |
| **Gordon D. Newby**, *A History of the Jews of Arabia* (Univ. of South Carolina Press, 1988) | Arabistan Yahudileri tarihi; Kurayza için tarafsız genel çerçeve. |
| **R. B. Serjeant**, "The Sunnah Jāmiʿah, Pacts with the Yathrib Jews, and the Taḥrīm of Yathrib…", *BSOAS* 41 (1978); **Uri Rubin**, "The 'Constitution of Medina': Some Notes", *Studia Islamica* 62 (1985) | Medine Sözleşmesi (Sahife) metni ve yorumu; Yahudi kabilelerin hukuki statüsü. **Doğrulanacak.** |
| **Birincil kaynaklar**: İbn İshak–İbn Hişâm *Sîre* (Guillaume çevirisi *The Life of Muhammad*, Oxford, 1955); Vâkıdî *Kitâbü'l-Meğâzî*; Taberî *Tarih* (SUNY çevirisi, Hendek–Kurayza cildi: Fishbein, *The Victory of Islam*); Buhârî/Müslim "Sa'd b. Muaz'ın hükmü" rivayeti | Olayın kendisi. Cilt/sayfa/hadis numaraları **doğrulanacak** (verilmedi). |
| **Karen Armstrong**, *Hazreti Muhammed* (kitabın kullandığı Koridor çevirisi) | Olayı ahlaki bakımdan dürüst biçimde ele alan popüler ama akademik arka planlı okuma; **hangi sayfada** olduğu **doğrulanacak**. |
| Tesniye (Deut.) 20:10–14 | Kuşatılan şehir için Tevrat'taki savaş hukuku; Sa'd'ın hükmünün Tevrat'taki hükme benzerliği literatürde (örn. Arafat) tartışılır. İlişkilendirmenin gücü **doğrulanacak**; Yahudi muhataba karşı "kendi kitabınız da…" diye silah olarak **kullanılmamalı**. |

### Sunum için öneri
- **Yer:** `samimiyet` bölgesinde (taslak `samimiyet.kureyza` = YNI-2) **veya** `fetanet` bölgesinde `fetanet.siyasi`/`fetanet.savas` yanında bir itiraz kolu olarak. Çünkü itiraz iki dala da gider: "ahlaksız, dolayısıyla sahtekâr" (samimiyet) ve "zalim bir savaşçı, ilahi misyon yok" (ahlak itirazı). Yahudi ve ateist profiline açılan **giriş noktası** da olmalı (`AKIS-SEMA.md` giriş noktaları).
- **Ton:** Olayı **küçültmeden** aktar: rivayetlere göre erkekler öldürüldü, kadın ve çocuklar esir alındı; sayı kaynaklarda farklı (yaklaşık 600–900 aralığı İbn İshak rivayetinde geçer, **doğrulanacak**) ve şüpheci bilginler sayıyı kabul etmez. Önce **ne olduğu**, sonra **neden o hükmün verildiği** (Hendek'te ittifak ihlali iddiası, Evs'in hakem seçmesi, Sa'd'ın hükmü) ve **tek bir mantık sorusu**: "Bu olay, 'çıkar için bile bile yalan'a mı yoksa 'yanılan zihin'e mi işaret eder?"
- **Dürüst olunması gereken zor noktalar:**
  1. Hükmü **Hz. Peygamber vermedi, Sa'd b. Muaz verdi** (taraflar onu hakem seçti); ama Peygamber hükmü onayladı ve uygulandı. Bu ayrımı vurgulayıp meseleyi "bu onun suçu değil" diye kapatmak kaçamak olur.
  2. **Kaynak sorunu açık söylenmeli**: Ana anlatı İbn İshak, Vâkıdî, Taberî gibi olaydan bir–iki yüzyıl sonra yazılmış eserlerde; ayrıntılar (sayı, usul) tartışmalı. Hem "kesin böyle oldu" hem "hiç olmadı" demek yanlış olur. Arafat/Ahmad (şüpheci) ile Kister (rivayetlerin tarihselliği) arasındaki **gerçek akademik ayrılığı** göster.
  3. "O çağın savaş hukuku" argümanı ahlaki rahatsızlığı gidermez; ve Yahudi muhataba Tesniye karşılaştırması **onu savunma silahı** gibi kullanmak gereksiz sertlik yaratır. Hakem Sa'd'ın hükmünü Tevrat'a göre vermesi rivayeti varsa bile, bunu bilgi olarak ver, savunma olarak değil.
  4. Kitabın "savunma savaşları" genellemesi (s. 321) burada **kullanılmamalı**.
  5. Kullanıcı olay hakkında "Yahudi düşmanlığı" yönünde itiraz ederse: Hayber ve diğer Yahudi kabileler (Kaynuka, Nadir) kronolojisini eklemek gerekecek; bu ayrı bir çalışma, **kitapta yok**, onay gerekir.
- **Onay:** Evet, hassas; taslak `docs/onay/` altında. Hiçbir tarihî ayrıntı doğrulanmadan yayına alınmasın.

---

## 3) Savaşlar / "İslam'ı kılıçla yaydı"

### Kitapta ne var? (en kapsamlı konu)
- **Fetanet bölümü, "Fetihlerin Ruhu" (s. 305–312)**: Arnold ("fetih lokomotifi", askerî disiplin, ölüm korkusunu zül sayma), Lewis (şerir/taht, yatay güç algısı), Armstrong (Ebubekir'in ilk hutbesi), Irving (Ebubekir–Ömer).
- **"Fetihlerde Hukuk ve Ahlak" (s. 312–330)**: Cahiliye savaş ahlakı (Watt: düşmanın hakkı yoktur, s. 320), Hubeyb–Zeyd işkencesi (Caetani, s. 320), sonra Mekke fethi (Muir "tek taraflı hoşgörü ve cömertlik", Hitti; Hevazin esirlerinin serbest bırakılması: Dermenghem, s. 321), Suriye/Filistin fetihleri (Bauer: "barbar Arap çeteleri imajı tamamen uydurmadır", Hitti, Michael Rabo, Lewis, s. 322–323), cizyenin muafiyetleri (Hitti, s. 323), Bodley (s. 323).
- **"Dinî Tolerans" (s. 330–344)**: Kudüs'ün teslimi ve Ömer'in emannâmesi (Arnold, Dermenghem, Hitti, Bodley, s. 333–334); Bauer (s. 335); Nasturi patriği III. İshoyahb'ın mektubu (Arnold, s. 336–341); cizyenin iadesi; Arnold: zorla din değiştirme ve sistematik mezalim kaydı yok (Arnold, İslam'ın Tebliğ Tarihi s. 114, kitapta s. 343); Armstrong ("Batı'da Muhammed'i… kılıcını çeken savaş lideri olarak görme eğilimindeyiz. Oysa gerçek, bundan çok uzaktır." s. 343; "dinini kılıç gücüne değil… dayandırmıştır" s. 344); Hodgson, Rodinson, Dermenghem, Lewis (s. 344); Bodley (s. 344).
- Diğer ilgili yerler: Bedir esirleri (okuma yazma öğretme karşılığı fidye, Dermenghem, s. 367); Ridde ve Ebubekir (Dozy, s. 108); Mekke dönemi şiddet görmesi (s. 330–331, 100–102); savaş yılları ve savaş stratejisi: Bedir, Uhud, Hendek (Hitti, Watt, s. 288–291); Arnold'un İslam'ın yayılmasında kardeşlik/eşitliğin payı (s. 207).
- Kitabın kendi sınırı (s. 331 ve 332 dn. 777): Yazar Arnold'u "bazı eksik ve hatalı yönleri olsa da" diye niteler ve bölgeye sınırlı (Şam–Kudüs) bir örnek seçtiğini söyler: **"tüm coğrafyaları incelemek eserin konusunu aşar"**.
- **Doğrudan cevaplamayan yönler:**
  1. **Hz. Peygamber döneminin savaşları** tek tek (Kaynuka, Nadir, Kurayza, Hayber, Mute, Hunayn, Tebük) anlatılmıyor; "ondan öncesi savunma savaşları" tek cümlesi (s. 321) genel kalıyor.
  2. **Tevbe 9/5 ("kılıç ayeti") ve 9/29 (cizye)** ayetleri ele alınmıyor; **Bakara 2/256** ("dinde zorlama yoktur") taramada çıkmadı.
  3. Klasik fıkhın **saldırı cihadı/dârülharb** kuramı yok; yalnız ahlak ve tolerans örnekleri var.
  4. Kitap ağırlıklı **Şam–Kudüs** örneğine dayanır; Endülüs, İran, Mısır, Anadolu, Hindistan'da dönüşüm süreci (yüzyıllara yayılan) ayrı anlatılmıyor.
  5. Zayıf nokta: Bauer ve Lewis alıntıları iyi; ancak "zimmî statüsü eşitlik değildir" itirazı (Mark Cohen'in tartıştığı "hoşgörü masalı") ele alınmıyor.

### Önerilen kaynaklar (hepsi **doğrulanacak**; kitaptakilere ek)

| Eser | Bilinen tezi / ne işe yarar |
|---|---|
| **T. W. Arnold**, *The Preaching of Islam* (London: Constable, 1896; genişletilmiş 2. baskı 1913) (Türkçe: *İslam'ın Tebliğ Tarihi*, İnkılab; kitabın kullandığı) | Hristiyan, Zerdüşt, Budist ve Hindu çevrelerde İslam'ın yayılmasında ikna, ticaret, misyonerlik ve kardeşlik kurumlarının rolü; sistematik zorla din değiştirmeye dair kayıt bulunmadığı. **Eser 1896'dan; sonraki araştırmalar ayrıntıları düzeltmiştir.** Sayfa **doğrulanacak.** |
| **Richard W. Bulliet**, *Conversion to Islam in the Medieval Period: An Essay in Quantitative History* (Harvard Univ. Press, 1979) | İran/Irak/Mısır/Endülüs'te din değiştirmenin **yüzyıllara yayılan** (isim analizine dayalı eğri) bir süreç olduğu; fetihten hemen sonra toplu geçiş yok. Kılıç tezine karşı en güçlü nicel zemin. |
| **Fred M. Donner**, *The Early Islamic Conquests* (Princeton, 1981) ve *Muhammad and the Believers: At the Origins of Islam* (Harvard, 2010) | Fetihlerin siyasi–dinî dinamiği; erken "müminler hareketi" ve fetih sonrası idarede Yahudi/Hristiyanların yeri; fetihlerin sonuçta toplu dönüşüm istememesi. İlkinin tezi kitabın savına yakın, ikincisi tartışmalı bir yeniden okuma; **hangisi hangi iddia için** kullanılır **doğrulanacak.** |
| **Hugh Kennedy**, *The Great Arab Conquests* (Weidenfeld & Nicolson, 2007) | Fetihlerin pragmatik, vergi ve kabile ittifakı temelli yürütüldüğü; dinî zorlamanın merkezde olmadığı. |
| **Jonathan Berkey**, *The Formation of Islam: Religion and Society in the Near East, 600–1800* (Cambridge, 2003) | Kademeli İslamlaşma; "kılıç mı ikna mı" ikilisinin basit olmadığı. |
| **Michael G. Morony**, *Iraq After the Muslim Conquest* (Princeton, 1984) | Irak'ta fetih sonrası toplumsal dönüşüm, vergi ve din geçişi. |
| **Milka Levy-Rubin**, *Non-Muslims in the Early Islamic Empire: From Surrender to Coexistence* (Cambridge, 2011) | Zimmî statüsünün (Ömer sözleşmeleri) gelişimi ve gerçek koşulları; "eşitlik değil, düzenlenmiş eşitsizlik" okuması için. |
| **Mark R. Cohen**, *Under Crescent and Cross: The Jews in the Middle Ages* (Princeton, 1994) | Yahudilerin İslam dünyasında Hristiyan Avrupa'dan çoğunlukla daha iyi durumda olduğu; fakat "hoşgörü cenneti" olmadığı. **Dürüstlük dengesi** için çok değerli. |
| **Bernard Lewis**, *The Jews of Islam* (Princeton, 1984) | Aynı konuda; kitap Lewis'in *Tarihte Araplar*'ını kullanıyor, bu eser daha spesifik. |
| **David Cook**, *Understanding Jihad* (Univ. of California Press, 2005); **Michael Bonner**, *Jihad in Islamic History* (Princeton, 2006); **Rudolph Peters**, *Jihad in Classical and Modern Islam* (Markus Wiener, 1996) | Klasik cihad doktrininin gerçekte ne dediği; **saldırı cihadı kuramının klasik hukukta var olduğu** dahil. "Yalnız savunma" iddiasını hatalı kılmamak için zorunlu okuma. |
| **Asma Afsaruddin**, *Striving in the Path of God: Jihad and Martyrdom in Islamic Thought* (Oxford, 2013); **Khaled Abou El Fadl**, *Rebellion and Violence in Islamic Law* (Cambridge, 2001) | Müslüman akademik; cihadın tarihsel ve normatif okumaları, savaş etiği, ayetlerin bağlamsal tefsiri. |
| **W. Montgomery Watt**, *Muhammad at Medina* (1956) | Medine dönemi baskınlar (gazve/seriyye) ve ekonomik–siyasi çerçeve; "savunma savaşı" iddiasının ne kadar kesin olduğunu ölçmek için. |
| Birincil: Taberî *Tarih*, Belâzürî *Fütûhu'l-Büldân*, Ebû Yûsuf *Kitâbü'l-Harâc*, III. İshoyahb mektupları (kitaptakiler: Arnold üzerinden) | Fetih antlaşmaları ve vergi uygulamaları. **Doğrulanacak.** |

### Sunum için öneri
- **Yer:** Mevcut `fetanet.siyasi` (kılıç soru çipleri var: "Cengiz Han da yaptı", "Kılıçla yayıldı") ve `fetanet.tolerans` zaten iyi. **Eklenecek:** taslak `fetanet.savas` (YNI-3, `docs/icerik-degerlendirme.md`); `itiraz` anahtarları: kılıç, zorla, savaş, cihad, kan, fetih, katliam, cizye.
- **İki ayrı soru olarak ayır:** (a) *Peygamberin hayatında* savaşlar var mı, ne tür? (b) *Peygamberden sonra* fetihler ve din değiştirme. Kitap (b)'yi güçlü anlatır; (a) boş. İtiraz çoğu zaman ikisini karıştırır; sunum karışmayı fark ettirmeli.
- **Ton:** "Haklı bir yerden geliyor" ile başla: savaşlar var, Hz. Peygamber komutan oldu. Sonra ölçü: *zorla dönüştürme politikası var mıydı?* (Arnold, Bulliet, Armstrong). Sonra Mekke fethi ve Hevazin esirlerinin serbest bırakılması (kitap s. 321) ve Kudüs emannâmesi (s. 333–334) birer **ek örnek** olarak sırayla.
- **Dürüst olunması gereken zor noktalar:**
  1. Peygamberin Medine döneminde **baskınlar, kuşatmalar, idamlar** oldu (Kurayza dahil); "yalnız savunma" genellemesi (kitapta s. 321) akademik literatürde **tam kabul görmez**; sunum "savunma ağırlıklı, ama yalnız savunma değil" gibi hedge ile yazılmalı.
  2. **Tevbe 9/5 ve 9/29** ayetleri kullanıcı tarafından anılırsa kaçınılmamalı; bağlam (müşrik Arapların antlaşma ihlali, Ehl-i kitaba cizye) ve klasik tefsir/fıkıh okumasının **saldırı cihadını** içerdiği dürüstçe söylenmeli (Cook, Bonner, Peters). Bakara 2/256'ya bağlayıp kapatmak yetmez.
  3. Zimmî statüsü bugünün **eşitlik** ölçüsüne göre eşitsizdir; "tolerans" ifadesi **dönemine göre** tolerans demektir (Levy-Rubin, Cohen). Kitaptaki "Bauer: Yahudiler… çoğunluğu oluşturuyorlardı" gibi güçlü cümleler **hedge'lenmeli** (`docs/icerik-degerlendirme.md` FTN-12).
  4. Ridde savaşları (Ebubekir, kitap s. 108) "dinden dönenlere savaş" olarak okunduğu için "dinde zorlama" itirazını **güçlendirebilir**; ele alınacaksa siyasi isyan–zekât boyutuyla ve dürüstçe.
  5. Din değiştirmeye baskının **örnekleri** vardır (belirli hükümdarlar, dönemler); Arnold bunları da kaydeder. "Hiç yok" demek yerine "sistematik politika yoktu" doğru olandır.
  6. "Cengiz da fethetti" karşılaştırması (Fetanet s. 279–280) kitapta güçlü; ama dönüşüm sorusu için çağdaş (Bulliet) veri eklenirse "ikna mı kılıç mı" sorusu daha somut.

---

## 4) "Ayetler hep onun işine geliyordu"

### Kitapta ne var?
- **İtiraz adıyla yok**; ama kitabın bu itirazı çürüten **tam bir delil ailesi** var: **"Uyarı ve Teselli Ayetleri"** (s. 231–243) ve ardından geçim/azarlama ayetleri (s. 248–249). Mantık: "Kitap kendi lehine yazılmışsa neden Peygamberi azarlıyor, uyarıyor, kendi tercihini düzeltiyor?" Yazar buna **"ikinci irade"** der (s. 231, 235–236, 241).
- Sayfa sayfa dayanaklar:
  - **Abese 80/1–12** (İbn Ümmi Mektum): s. 231–232; Caetani'ye atıf (dn. 517, İslam Tarihi c. 1 ss. 484–485); "ilk dönemlerde ayet samimiyet delili olarak kullanılmamış", yani sonradan kurgulanmadığına ikincil delil (s. 232).
  - **Ahzâb 33/37 (Zeyd–Zeyneb)**: s. 232–233; "Allah'ın açığa vuracağı şeyi, insanlardan çekinerek içinde gizliyordun… Oysa asıl korkmana layık olan Allah'tır." Yazar: "Siz -hâşâ- yalan söyleyen… bir toplum önderi olsaydınız, bu üslubu tercih eder miydiniz?" ve dn. 519: ismet inancı korunur, ayet "ikinci iradenin" delili olarak kullanılıyor. Açılışta (s. 157, dn. 316–317) "Zeyd ve Zeyneb" kıssasının internet forumlarında İslam aleyhine kullanıldığı **açıkça anılır**; yazarın kendi video cevabına (Meriç, YouTube) atıf (dn. 317 ve 295).
  - **İsrâ 17/73–75** (ayartılmaya yaklaşma uyarısı): s. 233.
  - **En'âm 6/33–35, 6/52; Kehf 18/6, 18/28; Tevbe 9/43 ("Allah seni affetsin! Niye onlara izin verdin ki?")**: s. 234–235 (dn. 521–524) ve s. 240 (dn. 538–540, sayfa yaklaşık).
  - **Ahzâb 33/28–29** (eşlerin geçim talebi ve muhayyerlik), Armstrong, Tirmizi 2471, Buhârî Et'ime: s. 248–249.
  - Watt (s. 241): kusursuz samimiyet; Dermenghem (s. 241): vahyi kişisel görüşlerinden "büyük bir dikkatle ayırdığı"; kitabın genel iddiası: Kur'an'ın Nebi'ye yönelik **hâkim üslubu** emir–teselli–uyarıdır (s. 241).
  - Ayrıca Hz. Peygamberin lehine kullanılmayan **güneş tutulması** (İbrahim'in ölümü, Dermenghem/Watt, s. 220–221), 
    vahyin gecikmesi, İfk olayında bekleyiş vb. dolaylı örnekler (`samimiyet.tutulma`, `samimiyet.ikinci` beat'leri).
- **Eksik:** Kitap itirazın **en güçlü biçimini** anmıyor: ayetlerin **Peygambere tanınan ayrıcalık veya iç sorun çözüm** niteliğindeki örnekleri:
  - **Ahzâb 33/50–52** (Peygambere özgü nikâh hükümleri, eşlerle ilişki düzeni) ve Aişe'nin rivayeti ("Rabbinin arzularına çabuk yetiştiğini görüyorum", Buhârî Tefsir, Ahzâb 33/51 — **doğrulanacak**), 
  - **Tahrîm 66/1–5** (Hz. Peygamber ve eşleri arasındaki bir sır/bal olayı ve yemin),
  - **Ömer'in görüşüne uyan ayetler** ("muvafakat-ı Ömer": Bedir esirleri Enfâl 8/67–68, hicab, Makâm-ı İbrâhîm; Buhârî) — **doğrulanacak**.
  Bu örnekler kitapta **taranınca çıkmadı**; itiraz bilgili muhatap tarafından bunlarla gelebilir.
- **Kitabın dışı ama aynı konu:** Zeyd–Zeyneb evliliğinin tarihsel kaynak katmanı (Taberî, İbn Sa'd, Vâkıdî'nin rivayetleri; klasik tefsirlerde "gizlenen şey"in ne olduğu üzerine ihtilaf) kitapta işlenmiyor; yalnız ayetin tonu üzerine kuruluyor.

### Önerilen kaynaklar (hepsi **doğrulanacak**)

| Eser | Bilinen tezi / ne işe yarar |
|---|---|
| **W. Montgomery Watt**, *Muhammad at Medina* (1956) ve *Muhammed: Peygamber ve Devlet Adamı* (kitapta kullanılan çeviri) | Zeyneb bint Cahş evliliğinin siyasi–toplumsal bağlamı (evlatlık hükmünün kaldırılması, Medine toplumu); Watt "şehvet için sahtekâr" tezini reddeder (s. 260) ama evlilik dönemi için ayrıntı verir. Sayfa **doğrulanacak.** |
| **Maxime Rodinson**, *Muhammed* (Doruk çevirisi) | Zeyneb evliliğine klasik "batılı" biyografik okuma. İfade ve sayfa **doğrulanacak.** |
| **Richard Bell**, *Introduction to the Qur'ân* (Edinburgh, 1953; Watt revizyonu 1970) ve *The Qur'ân: Translated, With a Critical Re-Arrangement of the Surahs* (1937–39) | Kur'an'ın Muhammed'e yönelik uyarı ve teselli üslubuna dair Batılı sureleri yeniden düzenleyen okumalar; Bell, Kur'an'ın büyük ölçüde Muhammed'in ürünü olduğunu varsayar ama metin içi düzeltme–azarlama unsurlarını ayrıntılı kaydeder. Bell'in bu varsayımı **itirazın karşı görüşü**dür; kullanılırken dikkat. Kitaptan zaten `mucize.rum-ayet`'te anılıyor (`docs/eksikler.md`). |
| **Theodor Nöldeke–Friedrich Schwally**, *Geschichte des Qorāns* (Leipzig, 1909–1938) | Sûre kronolojisi ve ayetlerin nüzul sırası. Ayetlerin "olay sonrası mı önce mi" olduğunu tartışmak için zemin. **Doğrulanacak** (sayfa verilmedi). |
| **Angelika Neuwirth**, *Der Koran als Text der Spätantike* (Berlin: Verlag der Weltreligionen, 2010) | Kur'an'ın tedrici, topluluğa seslenen yapısı; Mekke–Medine ayetlerinin bağlamı ve "diyalojik" üslup. **Doğrulanacak.** |
| **Fred Donner**, *Narratives of Islamic Origins* (Darwin, 1998) | Rivayetlerin şekillenmesi ve "sebeb-i nüzul" anlatılarının yapısı. **Doğrulanacak.** |
| **Andrew Rippin**, "The Function of Asbāb al-Nuzūl in Qurʾānic Exegesis", *BSOAS* 51 (1988) | Nüzul sebebi rivayetlerinin tefsirdeki işlevi; "ayet olaya bağlı" itirazını değerlendirmek için: nüzul sebebi anlatılarının **sonradan açıklama işlevi** gördüğü yönündeki akademik yaklaşım. Hem itirazı hem karşı argümanı besleyebilir; **dikkatli kullan**. |
| **Jonathan A. C. Brown**, *Misquoting Muhammad* (2014) | Hassas rivayetleri (Aişe'nin "çabuk yetiştiğini görüyorum" sözü gibi) ele alış biçimi için okuma örneği; ilgili bölüm **doğrulanacak.** |
| **Birincil**: Buhârî Tefsir (Ahzâb, Tahrîm bölümleri), Müslim Radâ'/Fedâil; Taberî *Câmiʿu'l-beyân* (Ahzâb 33/37 tefsiri); Vâhidî *Esbâbü'n-nüzûl* | Ayetlerin nüzul rivayetlerinin kendisi. **Doğrulanacak** (numara verilmedi). |

### Sunum için öneri
- **Yer:** `samimiyet` bölgesinde `samimiyet.sohret` (içinde 9/43, Abese uyarıları) ve `samimiyet.ikinci` beat'leri **zaten** bu cevabı taşıyor. **Eklenecek:** adıyla itirazı karşılayan taslak `samimiyet.isine-gelen` (YNI-5, `docs/icerik-degerlendirme.md`); `itiraz` anahtarları: zeynep, zeyneb, evlatlık, zeyd, işine geldi, tam zamanında ayet, işine gelen, uydurdu.
- **Yapı (tek soru):** "Her ayeti işine gelen bir metin, kendisini azarlayan ayetlere neden yer verir?" → kullanıcıya **iki listeyi ayrı say** diye öneri (işine gelen / gelmeyen; hangisi ağır basıyor?). Bu, "ikna" dayatması değil davet.
- **Ton:** İtirazı gerçek ve eski diye karşıla ("tam zamanında gelen vahiy" klasik bir itirazdır; kaynağı Müslüman geleneğin içinden, Aişe rivayetine kadar gider). Sonra **kitabın yöntemiyle**: Zeyd–Zeyneb ayetinin **dilini** göster (33/37: "içinde gizliyordun… insanlardan çekiniyordun" tonu), ve İsrâ 17/73–75 ve Tevbe 9/43 yanında.
- **Dürüst olunması gereken zor noktalar:**
  1. İtiraz tek bir ayetle yanıtlanmaz; bazı ayetler **gerçekten** Peygambere özgü hükümler ve pratik sorun çözümü içerir (Ahzâb 33/50–52, Tahrîm). "Hepsi onu azarlıyor" demek **doğru olmaz**; doğru ifade "ayetler arasında hem lehe hem aleyhe olanlar var" (kitabın kendi cümlesi: "Bu ayetlerin hepsi O'nun zedeleri sonrası nazil olmuş değildir", s. 235).
  2. Aişe'nin "Rabbinin arzularına çabuk yetiştiğini görüyorum" rivayeti (Buhârî, **doğrulanacak**) itirazın **kendi geleneğin içinden** gelen biçimidir. Bilgili muhatap bunu bilir. Sunum bunu **kaçmadan** anıp kaynağı göstermeli; kitap anmıyor, **kitap dışı ek**, onay gerekli.
  3. Kitabın "ikinci irade" argümanı, vahyin **dışarıdan** geldiğini varsayarak okuyan (inançlı) okuma ile **"Muhammed kendini eleştirdi"** diyen (laik/Batılı) okuma arasında ayrılır: Laik bir okuyucu bu azarlamaları Muhammed'in kendini disipline etmesi veya sonradan eklenmiş bir üslup tercihi olarak da yorumlayabilir (Bell'in genel yaklaşımı bu yöndedir; ayrıntı doğrulanacak). Kitap bunu cevaplamak için Samimiyet argümanını ("neden böyle yazsın?") kullanır; ancak bu argüman *yalan* dalını kapatır, *yanılma* dalını kapatmaz. Mantık sınırı: bu beat yalnız **samimiyet** dalı için; fetanet dalına geçiş kullanıcıdan gelir.
  4. `dn. 519` (ismet sıfatı) inanç beyanıdır; ateist muhataba **tez olarak** değil, yazarın çerçevesi olarak sunulmalı. Sunumda "hâşâ" edebi korunur.
  5. Sebeb-i nüzul rivayetleri (Rippin) sonradan eklenmiş açıklama olabilir; "tam o olay üzerine indi" cümlesi kesin tarihsel olgu gibi sunulmamalı.
- **Onay:** Evet, hassas (`docs/onay/samimiyet.md` içinde bu ek bekliyor).

---

## Genel öneriler (dört konu için)

1. **Önce itiraz yolları.** Dört konunun hiçbiri mevcut `yollar` anahtarlarında özel olarak karşılanmıyor (bkz. `docs/icerik-degerlendirme.md` YNI-1/2/3/5 ve SMM-3: "Aişe 6 yaşındaydı, açıkla" → alakasız `ekOrnek`). En azından anahtar kelime → "hassas konu" hızlı yönlendirmesi ve **dürüst bir bekleme cümlesi** gerekir ("Bu soruyu atlamayacağım…"). "Birazdan geleceğiz" deyip söz tutmamak güven kaybettirir.
2. **Kaynak görünürlüğü (v2.1).** Sunumda satır altında kaynak künyesi: Aişe için Kecia Ali + Brown (Müslüman akademik) denge; Kurayza için Kister (İsrailli oryantalist) + Arafat/Ahmad (şüpheci) + Watt; kılıç için Arnold + Bulliet + Donner + Cook (denge); işine gelme için kitabın zaten kullandığı Watt/Caetani/Dozy + Bell (karşı okuma). **Müslüman olmayan akademisyen öncelikli** kuralı korunur; ama bu dört konuda Müslüman akademik kaynaklar (Ali, Brown, Afsaruddin, Abou El Fadl, B. Ahmad) birincil rivayetlerin okunuşu için dengelidir.
3. **Her kaynaklı satır `dogrulanacak:true`.** Hiçbir sayfa, hadis numarası, tarih aralığı ezberden "kesin" yazılmasın; `docs/eksikler.md`'ye satırlar eklendi.
4. **Zor noktalara dürüst tavır.** Dört konuda ortak: (a) rivayet olduğunu söyle; (b) bugünkü ölçü ile yargı arasındaki ayrımı açıkça yap; (c) kaynakların geç ve tartışmalı olduğunu gizleme; (d) ikna zorlama, kullanıcıya "ayrıca konuşabiliriz" kapısını açık bırak (CLAUDE.md: kullanıcı özgür hissetmeli, dal yalnız kullanıcı ikna olunca kapanır).
5. **Kapsam sınırı.** Bu konular peygamberliğin **ispatını** değil, **ahlaki/tarihsel itirazları** karşılar; ispat zinciri (samimiyet/fetanet) içinde "kapatma" iddiası taşımamalı: ilgili beat'ler `kapatir` taşımaz, `sonraki`'ne ana akışa döner.

## Sayfa atıfları (kolay doğrulama için)

| Konu | Kitap sayfaları (metin dosyası) |
|---|---|
| Aişe (ravi, İfk) | 110 (`01`), 171, 225–226, 249, 251 (`03`) |
| "Evlatlığının kızı ile evlenme" itirazı (genel) | 141–143 (`02`), 157 (`03`) |
| Şehvetperest iddiası / Watt, Caetani, Dozy, Lewis | 157, 243–248, 260–262 (`03`) |
| Kurayza | 152 (`02`), 291 (`04`) |
| Fetihlerin ruhu / hukuk ve ahlak | 305–330 (`04`) |
| Dinî tolerans / "kılıç" | 330–344 (`04`) |
| Savaş stratejisi (Bedir, Uhud, Hendek) | 288–291 (`04`) |
| Bedir esirleri | 367 (`04`) |
| Ridde | 108 (`01`) |
| Uyarı ve teselli ayetleri | 231–243 (`03`), 248–249 |
