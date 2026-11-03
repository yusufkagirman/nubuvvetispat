# Nübüvvet İspatı — İnteraktif Sunum

Statik, sunucusuz, derleme gerektirmeyen prototip (vanilla HTML/CSS/ES modules).

## Çalıştırma
```bash
scripts/hazirla.sh              # icerik/dugumler -> site/icerik, public/gorseller -> site/gorseller (isteğe bağlı)
cd site && python3 -m http.server 8123
# http://localhost:8123
```
`hazirla.sh` çalıştırılmazsa motor `site/ornek/` altındaki örnek düğümleri (Z1, H1, H16) kullanır.
İçerik yolu `icerik/`'dir; bir dosya bulunamazsa `ornek/`'e düşer. Düğüm yoksa "Bu bölüm hazırlanıyor" gösterilir.

## Yapı
- `site/js/motor.js` düğüm akışı (docs/etkilesim-modeli.md), `niyet.js` kural tabanlı sınıflandırıcı (async, değiştirilebilir; LLM takılabilir), `durum.js` localStorage durumu (hesap yok), `harita.js` SVG ihtimaller ağacı, `anket.js` profil anketi, `ui.js` arayüz.
- Menü: "Cevaplarımı değiştir", "Dışa aktar (JSON)", "Baştan başla".
- Ekran görüntüleri: `docs/ekran/`.
