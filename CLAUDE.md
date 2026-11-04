# Nübüvvet İspatı — İnteraktif Sunum Projesi

> Bu dosya her oturumda okunur. Kullanıcı projenin amacını ve metodu tekrar anlatmak zorunda kalmamalı.
> Proje, "Kur'an Mucizeleri" ve "Muslim AI" projelerinin bir yan dalıdır.

## Amaç
"Peygamberliğin İspatı" kitabındaki metodu ve verileri, internette yayınlanacak **interaktif, sohbet havasında** bir sunuma dönüştürmek.
Sistem, muhatabın **seviyesine ve kabullerine** göre aklındaki şüpheleri **kitabın kronolojisine uygun**, sistematik biçimde çürütür ve doğruyu gösterir.
Kullanıcı kendini **özgür** hissetmeli: dayatma yok, akıcı ve saygılı bir diyalog.

## Kitabın Metodu (Kapalı Devre İspat)
1. **Zemin hazırlığı:** Konuşmanın yapılacağı metodlar, kullanılacak kaynakların (Kur'an vb.) güvenilirliği ispat edilir; Kur'an ayetlerinden hangi açılardan yararlanılacağı açıklanır. Her şey sıfırdan, inanmayan bir muhataba göre kurulur.
2. **Haber:** Hz. Muhammed bir haber getirdi: "Allah benimle Cebrail vasıtasıyla görüştü, Allah'tan bilgi alıyorum." Bu haberin değeri "Dün Ankara'daydım" demek gibidir — doğruluk açısından değerlendirilebilir.
3. **İhtimaller ağacı (kapalı devre):**
   - Doğru söylüyor → peygamberdir.
   - Yanlış söylüyor →
     - **Bilerek** (haşa sahtekâr) → **Samimiyet delilleri** ile çürütülür.
     - **Bilmeyerek** (haşa aklı yerinde değil / yanılıyor) → **Fetanet delilleri** ile çürütülür.
   - Tüm "yanlış" dalları kapanınca geriye yalnızca "doğru" kalır.
4. **Mucizeler:** Peygamberliği doğrudan ispat eden mucizelerle ispat ayrıca desteklenir.
5. Samimiyet ve fetanet delilleri ağırlıklı olarak **oryantalist (Batılı, gayrimüslim) kaynaklarla** desteklenir — muhatabın kabul edeceği kaynaklar.

## ⚠️ Güncel Yön (v2 — en üstte, öncekilerle çelişirse bu geçerli)
- Kitap yalnızca **metodun örneği/ilhamı**; sunum **kitaptan bağımsız** (kitabın kendisi ekranda anılmaz, alıntı yığını yok).
- **(v2.1) Kaynaklar sunumun içinde:** Oryantalist/akademik kaynaklar **isimle** ve **künyesiyle** satır altında gösterilir; tam künye ve kaynakça sunum içinde açılır, kullanıcı dışarı gönderilmez. Açılışta format ve **neden oryantalist kaynak kullandığımız** anlatılır. Zemin bölümünde diğer antik metinlerle (İlyada, Bizans tarihçileri, İncil yazmaları vb.) yazım-yazma arası süre kıyası yapılır.
- İnternetsiz ortamda eklenemeyenler `docs/eksikler.md`'de tutulur (yerel oturumda tamamlanacak).
- **Tek ekran, sinematik** (karanlık yıldızlı gece, kinetik tipografi, Ken Burns görseller, animasyonlu diyagramlar, aç/kapa hafif ambiyans sesi). Bölüm/menü/harita/ilerleme **görünmez**; şema arka planda.
- Sunum kullanıcıyla **"sen" diliyle konuşur**, profilini ve **şüphesinin türü/düzeyini** sohbetle öğrenir, **yalnız o şüpheye isabet eden** kısa-öz cevabı verir. Geçiş yalnız cevabın isabet ettiği yere.
- Sözleşme: `icerik/AKIS-SEMA.md` (beat şeması, cevap işleme, profil sözlüğü, giriş noktaları, diyagram kataloğu). İçerik: `icerik/akis/<bolge>.json`. Eski v1 içerik: `icerik/arsiv/`.

## Kurallar
- Kitabın **mimarisine ve metoduna sadık** kal (iskelet: zemin → haber → ihtimaller ağacı → samimiyet/fetanet → mucize); adım atlama. **İçerik kitapla sınırlı değil:** iskeletin üzerine konsepte uyan başka argüman/örnek eklenebilir — ama kitap dışı her ekleme kaynaklı olur, `dogrulanacak:true` işaretlenir ve **kullanıcıya onaya sunulur** (`docs/onay-bekleyen-ekler.md`).
- Kitaptaki kaynak/alıntıları (özellikle oryantalist) **uydurma**; yalnız kitapta veya doğrulanabilir kaynakta olanı kullan, atıf ver.
- Ton: saygılı, sohbet havası, muhatabı küçümsemeyen. Peygamber için olumsuz ihtimaller anılırken "haşa" edebi korunur.
- Muhatap profili (ateist, agnostik, başka din, şüpheci Müslüman vb.) ve kabulleri sunumun giriş noktasını belirler.
- Dil: Türkçe (ileride çok dilli olabilir).

## Alınan Kararlar (ayrıntı: `docs/plan-1-beyin-firtinasi.md`)
- **Omurga: A + B hibrit (B = sonraki aşama).** Ekranda ihtimaller ağacı haritası yön verir (kullanıcı dal seçer, kapanan dal ✗). İçerikte kitaba bağlı, uydurmayan bir sohbet ajanı akışı yürütür. Rehberli sahneler/kartlar/görsel modüller harita düğümlerinin içeriğidir.
- **Hedef kitle:** Müslüman olmayan herkes. (Davetçi/eğitimci sürümü ayrı bir çalışma olacak.)
- **Profil ölçme:** Başta sorularla muhatabın kabulleri ve seviyesi ölçülür (kaynaklara güven, Tanrı inancı, din geçmişi, peygamberlik algısı, bilgi seviyesi). Yol ve anlatım dili buna göre şekillenir; kronoloji korunur, derinlik/örnek seçimi değişir.
- **Görseller:** Gerçek görseller kullanılır (ör. erken dönem mushaf fotoğrafları). Yalnız açık lisanslı (kamu malı / Wikimedia Commons / müze açık erişim) görsel; her görselde kaynak + lisans + kitaptaki sayfa atfı.
- **Muslim AI ilişkisi:** henüz belirsiz.
- **Lisans:** kullanıcıya göre sorun değil; kitap metni/görselleri kullanılabilir (atıf yine verilir).
- **Dal kapanması:** Bir dal yalnızca **kullanıcı ikna olduğunu beyan edince** kapanır (sistem kendiliğinden kapatmaz).
- **Kayıt/gizlilik:** Varsayılan: ilerleme yalnız tarayıcıda (localStorage). Kullanıcı isterse hesap açar ve ilerleme sunucuda saklanır. **Anonimlik önemli:** hesap için asgari veri (e-posta zorunlu değil tercih edilir, ör. kullanıcı adı + parola / anonim kod), sohbet içeriği gereksiz saklanmaz.
- **Öncelik (güncel):** Önce **AI'sız, kendi başına yeten** rehberli interaktif sunum yapılır (harita + profil anketi + sahneler/kartlar/görseller, tamamen önceden yazılmış içerik). Sohbet ajanı **sonraki aşama**dır; sunum ona bağımlı tasarlanmaz, ileride eklenebilecek bir katman olarak bırakılır.
- **Etkileşim modeli (onaylandı, ayrıntı `docs/etkilesim-modeli.md`):** Düz "ikna oldunuz mu?" yerine kitaptaki gibi **özet + ana düşünce + ilzam sorusu** ("Senin iddian şuydu, veri şu; bu mantıken nasıl mümkün?"). Kullanıcı serbest cevap yazar; sistem niyeti sınıflandırır. Kullanıcı yalnız **kendi iddiasının dalını** görür (sahtekâr → samimiyet, deli → fetanet). İkna olmadıkça **her seferinde yeni bir örnek/hadise** gelir, argüman tekrar özetlenir, soru yeniden sorulur. Kaçarsa/konu dışına çıkarsa nazikçe konuya döndürülür ve soru tekrarlanır. Örnekler tükenince kompozisyon talebi. "Ara ver" her zaman serbest.
- **Delil çeşitlendirme:** Kitaptaki dallar temel; her düğüme ek örnekler eklenir. Kitap dışı ek → kaynak zorunlu + `dogrulanacak:true` (kullanıcı onayı).
- **İçerik şeması (v2):** `icerik/AKIS-SEMA.md`. Site: `site/` (statik, sunucusuz).
- **AI modeli (sonraki aşama):** Ucuz API'li modeller (DeepSeek, GLM, Kimi vb.) değerlendiriliyor; sağlayıcıdan bağımsız mimari kurulacak (bkz. sunum-tasarimi açık kararlar).

## Çalışma Düzeni (Claude için)
- Ana oturum **orkestra şefi**dir; context'i şişirme. Kitap okuma/özetleme, kaynak çıkarma gibi ağır işleri **Sonnet/Haiku alt agent'larına** ver; onlar sonuçları `docs/` altına yazsın.
- Kitap dosyaları: `kitap/`. Metod ve bölüm özetleri: `docs/`.
- Geliştirme dalı: `claude/eager-euler-t6usyb`. Değişiklikleri commit + push et.

## Durum
- [x] Kitap repoya eklendi (`kitap/peygamberligin-ispati.pdf`, metin: `docs/metin/`)
- [x] Bölüm analizleri (`docs/bolumler/01..07`), kaynakça (`docs/kaynakca.md`)
- [x] Metod haritası: 93 düğüm (Z/H/S/F/M/R), şüphe→düğüm indeksi, profil ipuçları (`docs/metod-haritasi.md`)
- [x] Teyit listesi (`docs/dogrulanacaklar.md`)
- [x] Kitaptan 44 mushaf görseli (`public/gorseller/mushaflar/kitaptan/`, lisans doğrulanmadı; `docs/gorseller.md`)
- [x] Kaynak envanteri: bölüm dosyalarında + `docs/kaynakca.md`
- [x] Ajan ilkeleri (`docs/ajan-ilkeleri.md`) ve sunum tasarımı taslağı (`docs/sunum-tasarimi.md`)
- [x] Beyin fırtınası 1. tur (format kararları yukarıda)
- [x] Beyin fırtınası 2. tur (lisans, dal kapanması, kayıt/anonimlik, etkileşim modeli)
- [x] İlk dilim: Z1–Z17 + H1–H16 içerik + statik motor, uçtan uca test geçti (`docs/test-raporu.md`)
- [x] v2: sinematik motor + 6 bölge (~116 beat) + 6 persona testi; yayın: https://claude.ai/artifact/WgW3kpbPsYbHXzxd9XVu2G (`site/index.html` ile aynı yoldan güncellenir)
- [ ] Sonraki: kullanıcı geri bildirimi; zemin kısaltma/"özet ve geç"; onay bekleyen ekler (`docs/onay/`); LLM sınıflandırıcı; GitHub Pages
