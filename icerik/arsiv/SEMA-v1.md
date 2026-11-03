# Düğüm İçerik Şeması (`icerik/dugumler/<ID>.json`)

```jsonc
{
  "id": "H1",                      // metod-haritasi.md'deki ID
  "baslik": "Haber Tasnifi",
  "dal": "zemin|haber|samimiyet|fetanet|mucize|rum",
  "sayfa": "127-129",
  "onkosul": ["Z17"],
  "sonraki": "H2",                 // varsayılan sonraki düğüm (yönlendirme düğümlerinde null)
  "profil": { "kritik": ["ateist"], "atlanabilir": ["hristiyan"] }, // metod-haritasi §5
  "sahneler": [
    { "tip": "anlatim", "metin": "..." },
    { "tip": "alinti", "metin": "...", "kaynak": { "yazar": "W. M. Watt", "eser": "...", "sayfa": "..." }, "kitapSayfa": "160" },
    { "tip": "kart", "baslik": "...", "metin": "..." },
    { "tip": "gorsel", "dosya": "gorseller/mushaflar/kitaptan/20-birmingham-1.jpg", "altyazi": "...", "kitapSayfa": "57" }
  ],
  "ozet": "Ana düşünceyi toparlayan 2-4 cümle (kitabın üslubunda).",
  "ilzam": {
    "soru": "Senin iddian ... idi. Mevcut veri ... . Bu ikisi mantıken nasıl bir arada olabilir?",
    "cipler": ["Haklısınız, bir arada olamaz", "Bence şöyle açıklanabilir...", "Emin değilim"]
  },
  "niyetler": {
    "ikna":      { "anahtar": ["haklısın", "mantıklı", "ikna", "olamaz", "doğru"], "yanit": "..." },
    "kacamak":   { "anahtar": ["bilmem", "fark etmez", "neyse"], "yanit": ["Köprü cümlesi 1 ...", "Köprü 2 ..."] },
    "konu_disi": { "yanit": ["Güzel bir soru; sırası gelince döneceğiz. Şu an şunu konuşuyorduk: ..."] },
    "yonlendir": {                  // yalnız dal seçen düğümlerde (ör. H sonu)
      "sahtekar": { "anahtar": ["yalan", "çıkar", "kandır"], "hedef": "S1" },
      "deli":     { "anahtar": ["hasta", "hayal", "epilepsi", "halüsinasyon"], "hedef": "F1" },
      "dogru":    { "anahtar": ["doğru söylüyor", "peygamber"], "hedef": "M1" }
    }
  },
  "itirazlar": [
    { "id": "H1-i1", "ozet": "Haber ile teori aynı şey değil mi?", "anahtar": ["teori", "hipotez"],
      "yanit": "...", "kaynak": { "kitapSayfa": "133" } }
  ],
  "ekOrnekler": [                   // ikna olmayana sırayla sunulur
    { "baslik": "...", "metin": "...", "durum": "kitap", "kitapSayfa": "...",
      "ilzam": "Bu örneğe özel yeniden sorulan ilzam sorusu" },
    { "baslik": "...", "metin": "...", "durum": "ek", "kaynak": { "yazar": "...", "eser": "...", "sayfa": "..." }, "dogrulanacak": true,
      "ilzam": "..." }
  ],
  "kompozisyon": "Örnekler tükenince: Bu verilerin tamamını birlikte nasıl açıklıyorsunuz?",
  "notlar": "Editör notları / teyit gerekenler (dogrulanacaklar.md referansı)"
}
```

Kurallar: Türkçe; sohbet havası, saygılı; Peygamber için olumsuz ihtimallerde "haşa"; kaynak/sayfa uydurma yok; `durum:"ek"` olanlar kaynaklı ve `dogrulanacak:true`.
