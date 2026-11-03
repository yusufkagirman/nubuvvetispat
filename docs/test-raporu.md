# Uçtan uca test raporu

Araç: Playwright (chromium), `scripts/hazirla.sh` + `python3 -m http.server 8123`. Test betikleri oturum scratchpad'indeydi (repoda yok).

## Test edilenler
- Statik tarama (33 düğüm, tüm itirazlar): her itirazın her anahtar kelimesi gerçek sınıflandırıcıdan geçirildi (doğru `itirazId` bekleniyor); eksik alan, ek örnek kaynak/doğrulanacak, görsel 404, itiraz anahtar çakışması, sahne tipi; ilzam çipleri, "ikna olmadım", "bilmem", "ara ver" sınıflaması.
- Anket (9 soru, çoklu seçim, serbest metin) -> Z1.
- Z1: "bilmem" (köprü + soru tekrarı), konu dışı soru (not kaydı), "ikna olmadım" -> ek örnek 1, 2 -> kompozisyon sorusu -> cevap kaydı + kapanış.
- İtiraz anahtarı -> doğru yanıt + ilzam tekrarı.
- "ara ver" -> kayıt; sayfa yenileyince "Kaldığım yerden devam et" -> aynı düğüm.
- Z11: 5 görselin hepsi yüklendi (naturalWidth>0), yer tutucu yok.
- Z1..Z17, H1..H16 sırayla "haklısınız bir arada olamaz" ile kapatıldı: sıra doğru, her düğümde ilzam var, "undefined/[object" yok, kırık görsel yok, 33/33 kapandı, harita 17/17 ve 16/16.
- H16: "bence çıkarı için yalan söylüyordu" -> S1, "bence hayal görüyordu, hastaydı" -> F1, "doğru söylüyor olabilir" -> M1 ("hazırlanıyor"); "kararsızım" -> ilzam yeniden.
- Konsol: JS hatası yok. Tek 404'ler S1/F1/M1 içeriği henüz olmadığı için (beklenen; `icerik/` sonra `ornek/` denenir).
- 360px mobilde yatay taşma yok.

## Bulunan hatalar ve düzeltmeler
1. `niyet.js`: "yeter" alt dizgi eşleşmesi "yeterli/yetersiz/yeterince" ve "…yeter" çip cevaplarını `ara_ver` sayıyordu. Ara-ver kalıpları tam sözcük oldu; çıplak "yeter" kaldırıldı ("yeter bu kadar", "ara verelim" eklendi).
2. `niyet.js`: "%60" gibi kısa anahtarlı itirazlar uzunluk kontrolüyle `kacamak` oluyordu. Kontrol itiraz/yönlendirmeden sonraya alındı.
3. `niyet.js`: itirazlar arası ve itiraz/yönlendirme arası çakışmada ilk eşleşen kazanıyordu (Z7-i3, Z8-i2, H14-i2, H15-i2/i3, H16-i1/i2/i4 ulaşılamıyordu). En uzun anahtar kazanır, eşitlikte yönlendirme.
4. `niyet.js`: "Haklısınız, … değil" gibi onay çipleri (H3, H9, H15) itiraza/ret'e düşüyordu. "haklısınız/katılıyorum/kabul ediyorum" ile başlayan ve ret ifadesi ("değil" hariç) içermeyen cevap ikna sayılır.
5. `niyet.js`: ≤4 harfli anahtarlar ("geç", "sara", "deli", "ikna") "geçmiş", "saray" gibi sözcüklere takılıyordu; artık tam sözcük eşleşir.
6. İçerik: H düğümlerinde "Emin değilim" çipi kaçamak anahtarı değildi (ek örneğe düşüyordu; H16'da "kararsızım" bozulurdu). Tüm düğümlerin `kacamak.anahtar` listesine "emin değilim", "kararsızım" eklendi.
7. İçerik H16: `yonlendir.sahtekar`'dan "reformcu", "toplum önderi"; H16-i2'den "epilepsi", "halüsinasyon" çıkarıldı (itirazların ulaşılamaz kalmasına yol açan çakışma).
8. UI: harita düğümlerinde "Peygamberin haberi · 15/16" kutu kenarına taşıyordu. Kutu 110->118, alt yazı 10.5->9px (`harita.js`, `stil.css`).

## Kalan sorunlar / notlar
- "Kaldığım yerden devam" düğümü baştan (sahne 0) başlatır; sahne/faz kaydı yok.
- S1/F1/M1 içeriği yok: "hazırlanıyor" ekranı çıkar, konsolda 404 görülür (`ornek/` yedeği yüzünden iki kez).
- Bazı itiraz çipleri ("Bence yine de teori sayılabilir" vb.) bilinçli olarak itiraz yanıtına gider.
- Kural tabanlı sınıflandırıcı serbest cümlelerde sınırlı; LLM sınıflandırıcı v2'de beklenir.
- Ekran görüntüleri `docs/ekran/` (6 adet); eski 3 görüntü silindi.
