# Global yollar — istenen davranış (builder için)

Şema bugün yalnız "ara ver / çık" global yolunu biliyor. Aşağıdakiler her beat'e anahtar eklemek yerine **bir kez tanımlanan** `globalYollar` olarak önerilir (AKIS-SEMA'ya öneri eklendi). İçerik beat'leri hazır: `genel.bilim`, `genel.yumusak` (`icerik/akis/genel.json`), `kapanis.muslumanOlmak`, `kapanis.ozet-cikis` (`icerik/akis/mucize.json`).

## Sıra (motor)
1. "ara ver / çık" (mevcut global).
2. Beat'in kendi `yollar`ı (en uzun eşleşen anahtar kazanır). **Beat yolu eşleştiyse global yola bakılmaz.**
3. `globalYollar` (aşağıda) — yalnız beat yolu eşleşmediyse; ilk eşleşen kazanır (sırayla: muslumanOlmak, sert, bilim, kisalt).
4. Genel onay / ret, kaçamak.

## Tablo
| ad | anahtar (normalize edilmiş eşleşme) | git | Davranış |
|---|---|---|---|
| `muslumanOlmak` | müslüman olmak, müslüman olmak istiyorum, nasıl müslüman olunur, islam'a girmek, şehadet, kelime-i şehadet, ihtida | `kapanis.muslumanOlmak` | Her beat'ten gidilir. `donus` yok; beat veda ya da `kapanis.soru`ya çıkar. Baskı yok, kuruma bağlantı yok. |
| `sert` | hakaret/alay: siktir, salak, aptal, gerizekalı, bot musun, boş laf, saçma sapan, defol | `genel.yumusak` | Tek seferlik yumuşak çıkış. Art arda **2** `sert` → `kapanis.ozet-cikis`. Savunma/ders yok. |
| `bilim` | bilim, bilimsel, evrim, embriyo, düz dünya, güneş çamurlu, çamurlu göze, dağlar çivi, big bang, yaratılış günleri, bilimle çelişiyor | `genel.bilim` | "Bu sunumun konusu değil; not ettim" + soruya dönüş. Kullanıcı cümlesi `profil.itirazlar[]`'a yazılır. |
| `kisalt` | sıkıldım, çok uzun, uzun oldu, kısa olsun, özet, umrumda değil, masal, saçma | `kapanis.ozet-cikis` | 1 dakikalık özet; "devam" ile kaynak beat'e dönülür, "bırakalım" ile veda. |

Not: "saçma" / "bilim" gibi tek sözcükler yanlış tetiklenebilir; bu yüzden beat yolu **önce** bakılır ve global yol yalnız cevap kısa (≤ 12 sözcük) ya da anahtar cümlenin başındaysa tetiklenmelidir (builder kararı).

## Yeni beat alanı: `donus`
`"donus": true` olan beat, global bir yoldan girilmişse bittiğinde (satırlar bitince ya da `git`siz bir yol eşleşince) **kaynak beat'e döner ve onun ilzam sorusunu yeniden sorar**. `sonraki` yazılmaz (hazirla.sh bozuk bağlantı uyarısı vermesin diye özel `@donus` belirteci kullanılmadı). `git`i olan yollar normal gider. Kaynak beat yoksa (oturum başı) `varsayilan`a gider.

## Önerilen şema
```json
"globalYollar": [
  { "ad": "muslumanOlmak", "anahtar": ["müslüman olmak", "kelime-i şehadet", "ihtida"], "git": "kapanis.muslumanOlmak" },
  { "ad": "sert", "anahtar": ["siktir", "salak", "aptal"], "git": "genel.yumusak", "tekrar": { "say": 2, "git": "kapanis.ozet-cikis" } },
  { "ad": "bilim", "anahtar": ["evrim", "embriyo", "düz dünya", "çamurlu göze"], "git": "genel.bilim" },
  { "ad": "kisalt", "anahtar": ["sıkıldım", "çok uzun", "özet"], "git": "kapanis.ozet-cikis" }
]
```
Önerilen konum: `icerik/akis/genel.json` kök nesnesi (`"bolge": "genel"` ile birlikte). Motor henüz okumuyor.

## Beat'ler
- `genel.bilim` (donus): konu dışı, dürüst; bilimsel cevap içermez.
- `genel.yumusak` (donus): özür, 3 seçenek (kısa özet / devam / bırak). Serbest metin itiraz olarak kaydedilir, sonra dönüş.
- `kapanis.ozet-cikis` (donus): ihtimaller diyagramı + 3 cümle + "devam / bırak".
- `kapanis.muslumanOlmak`: şehadet **düz Türkçe anlam** (Arapça/meal biçimi yok), acele yok, güvendiğin bir camiye/kişiye danış.

## Onay gerektirir
K6 (yumuşak çıkış/özet tonu), K7 (müslüman olmak kapanışı: davet dili), K8 (bilim kapsamı).
