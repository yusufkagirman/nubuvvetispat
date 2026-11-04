# Onay bekleyen kitap dışı ekler — mucize bölgesi

Kaynak dosya: `icerik/akis/mucize.json`. Aşağıdakiler kitapta bulunmayan eklerdir; `"ek": true`, kaynaklı, `dogrulanacak` durumundadır.

| Beat | Ek | Kaynak (doğrulanacak) | Not |
|---|---|---|---|
| `mucize.belagat-siir` (3. ekOrnek) | Mekke'nin tanınmış bir şiir bilgini (Velid b. Muğîre) dinlediği ayetleri "şiire de kâhin sözüne de benzemiyor" diye niteler, sonra kavmi için "sihir" der. | Sîre geleneği (İbn İshak / İbn Hişâm), Hâkim *Müstedrek* rivayeti; ilgili ayetler Müddessir 74/18–25 | Rivayet metni ve ravi zinciri teyit edilmeli. Ekranda isim verilmedi, sözler serbest ve kısaltılmış. Onaylanmazsa ekOrnek silinir (beat'in `ek` bayrağı da kalkar). |

## Bilinçli olarak alınmayanlar (docs/dogrulanacaklar.md'deki şüpheler)
- Yaratılış sırası tablosunun ağaç–yıldız satırı (gün numarası kayması).
- Kutsal kitap atıf numaraları ekranda yok (kitabın bozuk atıf biçimi); yalnızca `dayanak` alanında.
- Kudüs'ün alınışı: yalnız 614 yazıldı (615 görüşü `dayanak`ta).
- Ninova: yalnız 627 yazıldı; 627/628 tutarsızlığı `dayanak`ta.
- Bedir yorumu (yazarın kendi ihtimali), Moğol/Türk hadisi, "Ares" etimolojisi, Rodinson'un "silik" ifadesi.
- Müzisyen anısı (Hamidullah aktarımı) ve Firavun ağıtı "bir okuma" diye etiketli verildi.

## Eklenenler (içerik ajanı, U/K uygulaması)
| Beat | Ek | Kaynak (doğrulanacak) | Not |
|---|---|---|---|
| `mucize.hume` (yeni; `mucize.giris` dallan: tanri hayır/emin değilim ya da deizm; `mucize.haber-felsefesi` "hume" yolu) | "Olağanüstü iddia sağlam delil ister" ölçütünün kabulü; kontrol edilebilir delillere yönelme | David Hume, *An Enquiry Concerning Human Understanding*, X. Bölüm (1748) | Dolaylı anlatım, alıntı yok. K9. |
| `mucize.kissa-giris` (ek örnek), `mucize.kissa-sonuc` (apokrif itirazı) | Çerçeve "kopya değil" -> "paralellik var, açıklaması ne?"; Meryem-hurma/Pseudo-Matta örneği | Reynolds, *The Qur'an and Its Biblical Subtext* (2010); Griffith; Corpus Coranicum "Texts from the Environment"; Kur'an 19/23-26, Pseudo-Matta 20 | K3. Silinenler: Corpus Coranicum 24 sayfa, Nag Hammadi 1945, Kenan Evren, Firavun ağıtı, Bucaille. |
| `kapanis.muslumanOlmak`, `kapanis.ozet-cikis` | Global yol beat'leri | — | `docs/onay/global-yollar.md`; K6, K7. |
| `mucize.belagat-siir` EK0 | Müzisyen anısı "Hamidullah'ın aktardığına göre" olarak etiketlendi | Hamidullah (eser/sayfa doğrulanacak) | Silinen: Çanakkale şiir testi. |
