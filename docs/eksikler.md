# Eksikler — İnternet Gerektiren / Doğrulanacak İşler

> Bulut oturumunda ağ kısıtlı olduğu için yapılamayanlar. Yerel Claude oturumunda (internetli) tamamlanacak.
> Her satır: Ne | Nerede (dosya/beat) | Neden yapılamadı | Nasıl tamamlanır

## Genel
| Ne | Nerede | Neden | Nasıl |
|---|---|---|---|
| Mushaf görsellerinin lisans/kaynak doğrulaması | `docs/gorseller.md`, `public/gorseller/` | commons/gallica/islamic-awareness erişimi engelli | Her görselin kurum sayfasını aç, lisansı ve tam künyeyi yaz; mümkünse yüksek çözünürlüklü resmî görselle değiştir |
| Corpus Coranicum künyesi ve ilgili yazma kayıtları | `icerik/akis/zemin.json` (Corpus Coranicum beat'i) | corpuscoranicum.de erişilemiyor | Proje sayfası, yazma ID'leri, karbon tarihleri sayfalarının künyesini ekle |
| Birmingham radyokarbon raporu (Oxford Radiocarbon Accelerator Unit, 2015) künyesi | zemin karbon beat'i | ağ | Üniversite basın bülteni + rapor künyesi |
| Sadeghi & Goudarzi (2012) Sana palimpsesti — sayfa ve tam künye | zemin itiraz cevabı | ağ | Der Islam 87 makalesinden doğrula |
| Antik metin kıyası verileri (İlyada, Herodot, Tacitus, Platon, Julius Caesar, Bizans tarihçileri, İncil yazmaları): yazar ölümü → en eski yazma arası süre, yazma sayısı | zemin antik kıyas beat'i | ağ; kitapta yalnız bir kısmı var | Akademik kaynaklardan (ör. Bruce Metzger, F. F. Bruce; yazma katalogları) doğrula |
| Oryantalist alıntıların asıl kaynaktan (İngilizce/Fransızca orijinal) doğrulanması | tüm `alinti` diyagramları | ağ; kitabın Türkçe aktarımından alındı | Orijinal eser ve sayfadan karşılaştır |
| Eksik künye alanları (`"dogrulanacak": true` olan kaynaklar) | `icerik/akis/*.json` | bilgi bankasında yok | `grep -n dogrulanacak icerik/akis/*.json` ile listele ve tamamla |
