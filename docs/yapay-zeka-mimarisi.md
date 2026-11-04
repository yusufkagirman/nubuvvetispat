# Yapay Zekâ Katmanı — Mevcut Durum ve Öneri

## Şu an (v2) ne çalışıyor?
- "Düşünceni yaz" kutusuna yazılan metin **hiçbir yapay zekâya gitmez**. Tarayıcıdaki `site/js/niyet.js` **kural tabanlı** çalışır: metni küçük harfe çevirir, Türkçe karakterleri sadeleştirir, o anki beat'in `yollar[].anahtar` listesindeki kelimelerle eşleştirir (en uzun eşleşen kazanır; "ikna olmadım", "değil" gibi olumsuzluklar önce yakalanır). Eşleşme yoksa genel onay/ret/kaçamak kalıplarına bakar.
- **Kişiye özel metin üretilmez.** Ekrana gelen her cümle önceden yazılmıştır. Kişiselleşme yalnız (a) hangi beat'e gidildiği, (b) profil değerlerine göre `dallan` ile seçilen hazır cümleler kadardır.
- Kullanıcı **kendi sorusunu** yazarsa: anahtar kelimeyle bir itiraza denk gelirse hazır cevabı alır; gelmezse "Buna birazdan geleceğiz…" köprüsüyle soruya geri döndürülür. Yani serbest soruya doğrudan cevap **yok**.

## Öneri: iki katmanlı yapay zekâ (v3)
1. **Sınıflandırıcı (anlayan katman):** Kullanıcının cevabı + o beat'in yol listesi → model yalnız etiket döndürür (`ikna`, `itiraz:id`, `yonlendir:samimiyet`, `kacamak`, `kendi_sorusu` …). JSON çıktı, kısa istem; çok ucuz.
2. **Topraklanmış üretici (konuşan katman):** Yalnız iki durumda devreye girer: (a) kullanıcı kendi sorusunu sordu, (b) cevabı hiçbir hazır yola uymuyor. Modele **sadece** ilgili beat'lerin metni + `dayanak` + kaynak künyeleri (bilgi bankası parçası) verilir; kuralı: "yalnız bu bilgilerle 2–4 kısa cümle, sen dili, hâşâ edebi, bilmiyorsan söyle, sonunda kullanıcıyı şu soruya geri getir". Çıktı yine sinematik satırlar olarak gösterilir; ana akış (beat'ler) değişmez.
- **Güvenlik/uydurma:** üretilen cevapta kaynak adı geçiyorsa yalnız verilen künyelerden biri olmalı (istemci tarafı kontrol); aksi hâlde hazır köprüye düşülür.
- **Model:** DeepSeek / GLM / Kimi Türkçe metin üretebilir ve bu iş için yeterince ucuzdur. Anonimlik için Çin'deki resmî API yerine aynı açık modelleri AB/ABD'de barındıran sağlayıcılar (OpenRouter, Together, Fireworks vb.) tercih edilir. Claude Haiku da karşılaştırmaya alınmalı. Karar: 30–50 tipik itiraz/soru ile kıyas seti (Türkçe kalitesi, uydurma, edep, isabet).
- **Teknik zorunluluk:** API anahtarı tarayıcıda tutulamaz → küçük bir sunucusuz ara katman (Cloudflare Worker / Vercel function) gerekir: hız sınırı, kötüye kullanım koruması, kayıt tutmama (anonimlik).
- **Yedek:** model yanıt vermezse bugünkü kural tabanlı sistem çalışmaya devam eder (sunum hiçbir zaman AI'ya bağımlı kalmaz).

## Yapılacaklar (yerel/internetli oturumda)
- [ ] Sağlayıcı ve model kıyas seti (`docs/eksikler.md`'ye bağlı)
- [ ] Worker ara katmanı + istem şablonları
- [ ] `niyet.js` içindeki `siniflandiriciyiDegistir()` kancasıyla bağlama
