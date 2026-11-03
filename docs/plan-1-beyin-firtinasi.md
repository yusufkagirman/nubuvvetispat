# Plan: Metodu Kavrama → Beyin Fırtınası → Format Kararı

## Context
7 bölüm analizi tamamlandı (`docs/bolumler/01..07`, `docs/kaynakca.md`). Kullanıcı çıktının biçimini henüz netleştirmedi; metod kavrandıktan sonra birlikte beyin fırtınası yapılacak. Bu plan: (1) metodun özeti, (2) metodu yansıtabilecek format fikirleri, (3) onaydan sonra yapılacak somut işler.

## 1. Kavranan Metod (kısa)
Kitabın akışı = muhatabı sıfırdan alıp kapıları tek tek kapatan bir yol:
1. **Zemin (s.13–126):** Kaynakların güvenilirliği (Kur'an: hızlı yazım, sistemli tahrif imkânsızlığı, hafızlar, 45 erken mushaf + karbon testleri; hadis). **Yorum araçları:** ikincil delil, sahabenin tarihî kaynaklığı (baskıya tahammül, menfaat aramama), Mekke müşriklerinin sessizliği.
2. **Haber İnşası (s.127–156) — çekirdek:** Haber ≠ teori. İhtimaller ağacı: Doğru / Yalan → (bilerek = sahtekâr | bilmeyerek = deli). 4. ihtimal yok. Haberin **keskinliği** (orta yol yok). **Çürütme yol haritası:** mucizeleri tek tek çürüt → yalanın türünü seç → karşıt delilleri tek tek çürüt → tarihi tutarlı bir **kompozisyon**la açıkla. "Demet sopa": tek delile itiraz yetmez.
3. **Samimiyet (s.157–264):** "Sahte olsaydı ne yapardı?" karşı-olgusalları: mükellefiyetleri kendisi de yapması, toplum değerleriyle çatışma, uzlaşmayı reddetme, oğlu İbrahim/güneş tutulması, vahye tepki, uyarı-teselli ayetleri ("ikinci irade"), Kıyamet 75/16–19, mal/adanmışlık. ~21 oryantalist tanık.
4. **Fetanet (s.265–408):** Doktor deneyi (tablo = ağır psikoz). Tek delil, üç katman: başarılar (siyasi, askerî, toplum, hukuk, din, kültür). Formül: **Başarı = son durum − (toplum + birey şartları)**. Birey: ümmilik, Bahira (sened/metin tenkidi), epilepsi iddiası, Hart. ~100 kaynak.
5. **Mucize (s.409–482):** Belagat (misl meydan okuması), gayb haberleri (gelecek, kıssalar: Kitab-ı Mukaddes'le karşılaştırma ve düzeltmeler), hissi mucizeler, mütevatir.
6. **Rum Suresi (s.483–508):** Tahmin edilemez bir kehanetin 5 şartlı tahlili + zaman çizelgesi.
7. **Son Söz:** haber → kaynak → yöntem → tepkiler → fetanet → samimiyet → doğruluk.

## 2. Beyin Fırtınası — Format Fikirleri (metodun yapısından türetilmiş)
- **A. "Kapı kapı" yolculuk (ihtimaller ağacı haritası):** Ekranda canlı bir ağaç; kullanıcı istediği dalı seçer, her dal kapandıkça ✗ olur. Özgürlük hissi: sıra kullanıcıda, ama her dalın kapanması kitabın sırasıyla.
- **B. Yapay zekâ muhatap (Socratic sohbet):** Claude, kitap içeriğine (docs/bolumler) bağlı, uydurma yapmayan bir sohbet ajanı; kullanıcının profiline/kabullerine göre giriş noktası seçer, şüpheyi kitaptaki ilgili cevaba eşler, kaynak/sayfa gösterir. Muslim AI projesiyle doğal bağ.
- **C. "Sen savunucu ol" (çürütme meydan okuması):** Kitabın "çürütmek isteyen ne yapmalı" haritası oyunlaştırılır: kullanıcı bir kompozisyon (sahtekâr/deli) seçer, sistem tarihî verileri karşısına çıkarır; açıklayamadığı veri birikir (demet sopa).
- **D. Görsel delil modülleri:** Mushaf haritası + karbon zaman çizelgesi, "sahte olsaydı" kartları, Başarı formülü kaydırıcıları, kıssa karşılaştırma tabloları, Rum zaman çizelgesi, keskinlik ölçeği.
- **Önerim:** A + B hibrit omurga (harita = yön, sohbet = akış), D modülleri harita düğümlerinin içinde; C ileri seviye mod.

## Kullanıcı Kararları (beyin fırtınası 1. tur)
- **Omurga (güncel karar): A + B hibrit.** Ekranda ihtimaller ağacı haritası (A) yön verir; içerikte kitaba bağlı, uydurmayan bir sohbet ajanı (B) akışı yürütür. Rehberli sahneler/kartlar harita düğümlerinin içeriği olarak kalır (ilk tercih olan "rehberli sunum" bu yapının içeriğine dönüşür).
- **Görseller:** Sunumda gerçek görseller olacak — ör. erken dönem Kur'an mushaflarının fotoğrafları (Birmingham, Topkapı, San'a, Paris-Petropolitanus, Tübingen vb.). Lisans kontrolü şart: kamu malı / Wikimedia Commons / müze açık erişim; her görselde kaynak + lisans + kitaptaki sayfa atfı.
- **Muhatap:** Müslüman olmayan herkes (davetçi sürümü ayrı proje). Başta **profil ölçme soruları**: kaynaklara güveniyor mu, peygamberliği ne sanıyor, Tanrı'ya inanıyor mu vb. Cevaplar yolu ve anlatım dilini şekillendirir.
- **Muslim AI ilişkisi:** henüz belirsiz; prototipte konuşulacak.

## 3. Onaydan Sonra Yapılacaklar
1. `docs/bolumler/04-fetanet-1.md` kaynak tablosundaki hatalı satırları temizlet (Haiku agent), commit+push.
2. `docs/metod-haritasi.md`: tek dosyada metod ağacı + bölüm→şüphe→cevap→kaynak eşlemesi (Sonnet agent, bölüm dosyalarından).
3. `docs/dogrulanacaklar.md`: agent'ların işaretlediği teyit noktaları listesi (karbon çift sayım, 76:24, Zeyd b. Sabit/Harise, Margoliouth künyesi vb.).
4. CLAUDE.md'ye kararları kaydet (A+B hibrit, hedef kitle, profil ölçme, görsel/lisans kuralı).
4b. `docs/gorseller.md`: kitaptaki 45 mushaf için açık lisanslı görsel envanteri (Sonnet agent, web araştırması: kaynak URL, lisans, kurum). Görseller indirilip `public/gorseller/` altına konur; lisansı belirsiz olan kullanılmaz.
4c. Sohbet ajanı ilkeleri (`docs/ajan-ilkeleri.md`): yalnız `docs/bolumler` içeriğinden konuşur, her iddiada sayfa/kaynak verir, kronolojiyi korur, kullanıcı haritada istediği dala gidebilir ama dal kapatma sırası kitaba sadık.
5. `docs/sunum-tasarimi.md` taslağı (kullanıcıyla 2. tur beyin fırtınası için, kod yok):
   - **Profil anketi:** 8–12 soru → değişkenler (kaynak güveni, Tanrı inancı, din geçmişi, peygamberlik algısı, bilgi seviyesi, ilgi alanı).
   - **Yol motoru mantığı:** her değişken hangi sahneyi açar/atlar/derinleştirir (ör. kaynaklara güvenmeyen → Kur'an güvenilirliği tam; Hristiyan → kıssa karşılaştırmaları öne). Kronoloji korunur; yalnız derinlik ve örnek seçimi değişir.
   - **Sahne kataloğu:** kitabın her alt başlığı = bir sahne (soru, kısa anlatım, delil kartı, kaynak/sayfa, "ikna olmadım" çıkışları → ilgili itiraz cevabı).
   - **Özgürlük mekanizmaları:** her an "itirazım var", "atla", "derinleş", ağaç haritasında konum.
   - Ardından kullanıcıyla ekran/görsel dil ve teknoloji seçimi (2. tur).

## Doğrulama
- Her yeni doküman bölüm dosyalarıyla çapraz kontrol (sayfa numarası, kaynak adı); kullanıcı onayı olmadan kod yazılmaz.
