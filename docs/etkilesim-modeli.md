# Etkileşim Modeli (onaylandı)

## Temel akış
1. **Sahne:** Düğümün anlatımı (kartlar, alıntılar, görseller; kaynak + sayfa rozetli).
2. **Özet + ana düşünce:** Kitaptaki gibi konuyu toparlayan kısa özet.
3. **İlzam sorusu:** "Bu sizi ikna etti mi?" gibi düz soru YOK. Kitabın üslubunda, muhatabı kendi iddiasıyla yüzleştiren soru:
   "Senin iddian şuydu: … Mevcut veri şu: … Bu ikisi mantıken nasıl bir arada olabilir?"
4. **Serbest cevap:** Kullanıcı istediği cevabı yazar (yanında öneri çipleri de olabilir). Sistem cevabı **niyet**e ayırır:
   `ikna` · `itiraz:<id>` · `sahtekar` · `deli` · `dogru` · `kararsiz` · `kacamak` · `konu_disi` · `ara_ver`
5. **Devam:**
   - `ikna` → dal/düğüm kapanır (✗ yalnız kullanıcı ikna olunca), sonraki düğüm.
   - `itiraz:<id>` → o itirazın hazır cevabı, sonra ilzam sorusu yeniden.
   - ikna olmadı / genel ret → **bir sonraki ek örnek/hadise** gelir; sistem argümanı tekrar özetler, ilzam sorusunu o örneğe göre yeniden sorar.
   - `kacamak` / `konu_disi` → nazik köprü cümlesi ("Buna sırası gelince döneceğiz…"), soruyu **tekrarlar**; konu dışı soru not edilir, ilgili düğüme gelince hatırlatılır.
   - `ara_ver` → her zaman serbest; ilerleme kaydedilir.
6. **Örnekler tükenirse:** Kitabın çıkışı — **kompozisyon talebi**: "Bu verilerin tamamını birlikte tutarlı biçimde nasıl açıklıyorsunuz?" Cevap kaydedilir, saygılı kapanış. Sonsuz döngü yok.

## Dal yönlendirmesi (H sonu)
Kullanıcının kendi görüşüne göre: `sahtekar` → Samimiyet; `deli` → Fetanet; `dogru` → Mucizeler; `kararsiz` → ihtimaller açılır, soru tekrar. Kullanıcı yalnız kendi iddiasının dalını görür; o dal kapandıktan sonra "peki geriye ne kalıyor?" ile ağaç ilerler (gerekirse diğer dala geçer).

## Delil çeşitlendirme
Kitabın **mimarisi** iskelettir; içerik kitapla sınırlı değildir. Kitaptaki dallar temeldir ve her biri için yeterli cevap vardır; üzerine konsepte uyan başka argüman/örnekler eklenebilir. Her düğüme **ek örnekler/hadiseler** eklenir:
- `durum: "kitap"` → kitapta geçen (sayfa zorunlu).
- `durum: "ek"` → kitap dışı ekleme; **kaynak zorunlu**, kullanıcı onayına kadar `"dogrulanacak": true`; her dilim sonunda `docs/onay-bekleyen-ekler.md` ile kullanıcıya sorulur. Uydurma yasak.

## Niyet sınıflandırma
- v1 (AI'sız): anahtar kelime/kalıp eşleştirme + öneri çipleri.
- v2: ucuz LLM (DeepSeek/GLM/Kimi, AB/ABD barındırma tercih) yalnız **sınıflandırıcı** olarak: girdi = soru + kullanıcı cevabı + düğümün niyet/itiraz listesi; çıktı = niyet etiketi. İçerik üretmez.

## İçerik şeması
`icerik/dugumler/<ID>.json` — bkz. `icerik/SEMA.md`.
