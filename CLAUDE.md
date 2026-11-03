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

## Kurallar
- Kitabın **kronolojisine ve metoduna sadık** kal; adım atlama, sonraki adımı öncekinin üstüne kur.
- Kitaptaki kaynak/alıntıları (özellikle oryantalist) **uydurma**; yalnız kitapta veya doğrulanabilir kaynakta olanı kullan, atıf ver.
- Ton: saygılı, sohbet havası, muhatabı küçümsemeyen. Peygamber için olumsuz ihtimaller anılırken "haşa" edebi korunur.
- Muhatap profili (ateist, agnostik, başka din, şüpheci Müslüman vb.) ve kabulleri sunumun giriş noktasını belirler.
- Dil: Türkçe (ileride çok dilli olabilir).

## Çalışma Düzeni (Claude için)
- Ana oturum **orkestra şefi**dir; context'i şişirme. Kitap okuma/özetleme, kaynak çıkarma gibi ağır işleri **Sonnet/Haiku alt agent'larına** ver; onlar sonuçları `docs/` altına yazsın.
- Kitap dosyaları: `kitap/`. Metod ve bölüm özetleri: `docs/`.
- Geliştirme dalı: `claude/eager-euler-t6usyb`. Değişiklikleri commit + push et.

## Durum
- [x] Kitap repoya eklendi (`kitap/peygamberligin-ispati.pdf`, metin: `docs/metin/`)
- [ ] Bölüm analizleri (`docs/bolumler/`)
- [ ] Kitabın bölüm bölüm metod haritası çıkarılacak (`docs/metod-haritasi.md`)
- [ ] Oryantalist kaynak envanteri (`docs/kaynaklar.md`)
- [ ] **Beyin fırtınası:** Çıktının formatı henüz netleşmedi. Metod tam kavrandıktan sonra kullanıcıyla birlikte "metodu en iyi nasıl yansıtırız" planı yapılacak. Format kararını kullanıcı vermeden kod/tasarım yazma.
- [ ] Sunum mimarisi tasarımı
