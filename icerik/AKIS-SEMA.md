# Akış Sözleşmesi (v2) — Sinematik "Konuşan Sunum"

Bu dosya içerik yazarları ile motor arasındaki **tek sözleşmedir**. İki taraf da buna birebir uyar.

## Deneyim özeti
- Tek ekran. Karanlık, yıldızlı gece. Sunum, büyük ve zarif tipografiyle **tek tek beliren cümlelerle** kullanıcıyla konuşur.
- Bölüm, menü, harita, ilerleme çubuğu **yok**. Metodun şeması arka planda çalışır.
- Kullanıcı yalnız sorulara cevap verir (serbest yazı + 2–3 silik öneri çipi). Nereye gidileceğini **cevabın isabet ettiği yer** belirler.
- Sunum önce **kullanıcının şüphesini ve düzeyini** öğrenir, sonra **yalnız o şüpheye isabet eden** kısa ve öz cevabı verir. Tatmin olmazsa her seferinde yeni, daha güçlü bir örnek gelir.
- Hitap: **"sen"** (sıcak, saygılı, samimi). Peygamber için olumsuz ihtimal anılırken "hâşâ" edebi korunur. Hz. Muhammed adı ilk geçişte "Hz. Muhammed", sonra "o" / "Peygamber" olabilir; (s.a.v.) yazılmaz (ekranda sade), dayanak alanında serbest.
- Ekranda **yazar adı, kitap adı, sayfa numarası yok.** Gerekirse doğal dille: "Batılı bir tarihçi şöyle der…", "Bugün Birmingham Üniversitesi'nde duran bir sayfa…". Kurum/yer adı serbest; kişi adı yalnız herkesin bildiği tarihî figürse (ör. Herakleios, Ebu Süfyan).
- **Uydurma yok.** Her olgu `dayanak` alanında (gizli) kaynağıyla durur. Bilgi bankası: `docs/bolumler/*.md`, `docs/metod-haritasi.md`. Kitap dışı ekleme → `"ek": true` ve bölgenin `docs/onay/<bolge>.md` listesine eklenir (kullanıcı onayı).

## Dosyalar
- `icerik/akis/<bolge>.json` — bölgeler: `acilis`, `zemin`, `haber`, `samimiyet`, `fetanet`, `mucize` (mucize dosyası `kapanis` beat'lerini de içerir).
- Motor tüm bölgeleri tek havuzda birleştirir. Beat id'leri **global ve benzersiz**: `"<bolge>.<ad>"` (ör. `zemin.mushaflar`).

```json
{ "bolge": "zemin", "giris": "zemin.giris", "beats": [ /* Beat */ ] }
```

## Beat
```jsonc
{
  "id": "zemin.mushaflar",
  "gizliDugum": "Z11",                 // metod-haritasi düğümü (yalnız iz için)
  "dallan": [                          // GİRİŞTE değerlendirilir; ilk uyan koşul varsa hemen oraya gidilir
    { "kosul": { "profil.kaynakGuveni": "yuksek" }, "git": "haber.giris" },
    { "kosul": { "kapali": "samimiyet" }, "git": "fetanet.giris" }
  ],
  "sahne": {                           // isteğe bağlı; beat boyunca arka plan
    "arkaplan": "gokyuzu",             // gokyuzu | col | safak | isik | mushaf
    "gorsel": "gorseller/mushaflar/kitaptan/20-birmingham-1.jpg",   // arkaplan "mushaf" ise
    "diyagram": null                   // aşağıdaki katalogdan biri + "veri"
  },
  "satirlar": [                        // 2–7 satır; her satır ≤ 18 kelime
    { "metin": "Bir yazmayı düşün." },
    { "metin": "Bugün Birmingham'da duran iki yaprak.", "gorsel": "gorseller/mushaflar/kitaptan/20-birmingham-1.jpg" },
    { "metin": "Karbon testi: Peygamber'in hayatıyla örtüşen yıllar.", "vurgu": true },
    { "metin": "", "diyagram": { "tur": "sayac", "veri": { "sayi": 45, "etiket": "erken dönem yazma" } } }
  ],
  "soru": {                            // yoksa satırlar bitince "sonraki"ye geçilir
    "metin": "Peki metin sonradan değiştirilseydi, bu yapraklar neyi gösterirdi?",
    "cipler": ["Değişmemiş demek ki", "Yine de emin değilim"],
    "serbest": false                   // true: her cevap kabul edilir (profil soruları), eşleşmezse "varsayilan"
  },
  "yollar": [                          // cevap eşleştirme; EN UZUN eşleşen anahtar kazanır
    { "tur": "ikna",     "anahtar": ["değişmemiş", "haklısın", "mantıklı"], "git": "haber.giris" },
    { "tur": "itiraz",   "anahtar": ["karbon", "yanılabilir", "test"], "yanit": ["Karbon testi tek başına değil…", "…"] },
    { "tur": "yonlendir","anahtar": ["uydurdu", "yalan"], "git": "samimiyet.giris", "profil": { "iddia": "sahtekar" } },
    { "tur": "profil",   "anahtar": ["evet", "inanıyorum"], "profil": { "tanri": "evet" } }
  ],
  "varsayilan": "acilis.sonraki",      // serbest sorularda hiçbir yol eşleşmezse
  "ekOrnekler": [                      // "ikna olmadım"/ret → sırayla; her biri yeni kısa sahne + kendi ilzam sorusu
    { "satirlar": [ { "metin": "…" } ], "soru": "Bu durumda …?", "sahne": { } }
  ],
  "kompozisyon": "Peki tüm bu verileri birlikte nasıl açıklıyorsun?",  // ekOrnekler tükenince
  "kopru": ["Buna birazdan geleceğiz. Şimdi şunu soruyordum:"],          // kaçamak/konu dışı
  "kapat": "samimiyet",                // isteğe bağlı: bu beat'te "ikna" gelirse bu dal kapalı sayılır
  "sonraki": "zemin.hafizlar",
  "dayanak": "Gizli editör notu: kitap s. 57; Birmingham 568–645 karbon aralığı… (ekranda görünmez)"
}
```

## Cevap işleme sırası (motor)
1. **Global:** "ara ver / sonra devam / şimdilik yeter / çık" → kaydet, veda satırı. Dönüşte kaldığı beat'ten devam.
2. **yollar** (normalize: küçük harf, Türkçe aksan sadeleştirme; kelime sınırı; en uzun anahtar kazanır; olumsuzluk "ikna olmadım", "değil" vb. önce yakalanır):
   - `profil` → değerleri yaz; `git` varsa git, yoksa `varsayilan`/`sonraki`.
   - `itiraz` → `yanit` satırlarını göster → ilzam sorusunu tekrar sor.
   - `yonlendir` / `ikna` → profil yaz, `kapat` varsa dalı kapat, `git` (yoksa `sonraki`).
3. **Genel onay** (yolda tanımlı değilse): "evet, haklısın, mantıklı, katılıyorum, ikna oldum" → `ikna` gibi: `kapat`, `sonraki`.
4. **Genel ret:** "hayır, ikna olmadım, katılmıyorum, emin değilim, yine de" → sıradaki `ekOrnek` (satırlar + soru). Bitti ise `kompozisyon` sorusu → her cevap kaydedilir → saygılı bir köprü ("Bunu not ettim. Bununla birlikte devam edelim.") → `sonraki`.
5. **Kaçamak / boş / konu dışı:** `kopru` satırlarından biri + **aynı soru** tekrar. Konu dışı soru not edilir.
6. `serbest: true` ve eşleşme yok → cevabı `profil.<beat id>` olarak kaydet → `varsayilan` ya da `sonraki`.
7. Var olmayan beat'e gidilirse: zarif bir "Bu kısmı hazırlıyoruz; şimdilik buraya kadar" kapanışı.

## Profil değişkenleri (ortak sözlük)
- `tanri`: evet | hayir | emin-degil
- `din`: yok | hristiyan | yahudi | diger | musluman-degil
- `kaynakGuveni`: yuksek | orta | dusuk
- `bilgi`: az | orta | cok
- `supheTuru`: kuran-degisti | kaynak-guvensiz | uydurdu | hasta-yanildi | ogrendi | mucize-yok | genel
- `iddia`: sahtekar | deli | dogru | kararsiz
- `kapali`: motor tarafından tutulan kapalı dallar listesi (`samimiyet`, `fetanet`, `zemin`…); `"kosul": {"kapali": "x"}` = x kapalıysa.
- Koşul eşleşmesi: değer string ise eşitlik, dizi ise "içinden biri".

## Bölge giriş noktaları (sabit — bölgeler birbirine bunlarla bağlanır)
| id | anlam |
|---|---|
| `acilis.merhaba` | başlangıç |
| `zemin.giris` | kaynaklara güven (Kur'an'ın korunmuşluğu, tarihî kaynaklar). Girişte `supheTuru`/`kaynakGuveni`'ne göre dallanır |
| `haber.giris` | haberin kendisi, ihtimaller |
| `haber.ihtimaller` | kullanıcıya "sence hangisi?" sorulan dal seçimi (samimiyet/fetanet/mucize'ye yönlendirir) |
| `samimiyet.giris` | "bilerek yalan" ihtimali |
| `fetanet.giris` | "bilmeden yanılma / hastalık / çevresinden öğrenme" ihtimali |
| `mucize.giris` | doğrudan doğruluk delilleri |
| `kapanis.giris` | (mucize.json içinde) toparlama, saygılı veda, "istersen kaldığın yerden devam" |

Dal kapanınca ("ikna" + `kapat`) yazar `haber.kalan` beat'ine gider (haber.json yazar): "Bir ihtimal kapandı. Geriye ne kaldı?" — `dallan` ile kapalı dallara göre bir sonraki dala ya da mucizeye yönlendirir.

## Diyagram kataloğu (motor bunları animasyonlu çizer)
| tur | veri | anlam |
|---|---|---|
| `ihtimaller` | `{ "vurgu": "yalan" \| "bilerek" \| "bilmeyerek" \| "dogru" \| null, "kapali": ["bilerek"] }` | Haber → Doğru / Yalan → Bilerek / Bilmeyerek, ışık çizgileriyle |
| `demet` | `{ "cubuklar": ["…","…","…"] }` | tek tek kırılan çubuklar, demet kırılmaz |
| `zaman` | `{ "noktalar": [{ "yil": "610", "etiket": "…" }] }` | yatay zaman çizgisi |
| `sayac` | `{ "sayi": 45, "etiket": "…", "onek": "", "sonek": "" }` | büyük sayı sayarak belirir |
| `karsilastirma` | `{ "sol": {"baslik","maddeler":[]}, "sag": {…} }` | iki sütun |
| `denklem` | `{ "parcalar": ["Başarı", "=", "Son durum", "−", "(Toplum + Birey)"] }` | parça parça beliren denklem |
| `alinti` | `{ "metin": "…", "kim": "Batılı bir tarihçi" }` | büyük, ince yazıyla alıntı |
| `galeri` | `{ "gorseller": ["gorseller/…jpg", …], "etiketler": ["…"] }` | yavaş geçişli görsel dizisi |

## Görseller
Yalnız `gorseller/mushaflar/kitaptan/*.jpg` (repo: `public/gorseller/mushaflar/kitaptan/`) mevcut. Başka görsel yolu yazma; atmosfer (çöl, şafak, ışık, yıldız) motor tarafından prosedürel üretilir.
