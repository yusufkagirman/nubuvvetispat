# Fetanet bölgesi: onay bekleyen kitap dışı ekler

Dosya: `icerik/akis/fetanet.json`. Kitap dışı her ekleme `"ek": true` ile işaretlenir ve burada listelenir.

## 1. "Deli dediler" (mecnun) itirazına yanıt
- **Beat:** `fetanet.sara`, itiraz yolu (anahtar: "deli dediler", "mecnun" vb.).
- **İçerik:** Düşmanları ona "deli" dedi; ama kayıtlarda bu söz bir hakaret olarak geçiyor, nöbet ya da hastalık tarifiyle birlikte gelmiyor.
- **Kaynak:** Kur'an'ın kendi kaydı: Hicr 15/6, Duhân 44/14, Kalem 68/2. Bu bir "sessizlikten delil" yorumudur.
- **Durum:** `dogrulanacak: true`. Kitabın Hazleton atfıyla ("muhalifler sara nöbetinden yararlanırdı", s. 394) gerilim oluşturabilir. Kullanıcı onayı ve ayetlerin tefsir kaynağıyla teyidi gerekir.

## Kitap içi ama dikkat isteyen noktalar (ek değil)
- **Bahira sened hükmü:** Kitabın hadis ilmi değerlendirmesi; hadis uzmanı teyidi önerilir (`docs/dogrulanacaklar.md`, 05 s. 381-385). Ekranda "Bilal doğmamıştı" iddiası kullanılmadı.
- **Hart, Bodley, Hitti kimlikleri:** Kitapta açılmıyor; ekranda "Batılı bir yazar" denildi. "Lübnan asıllı tarihçi" (Hitti) kitabın kimlik tablosundan, teyide muhtaç.
- **Cizye gelirlerinin düşmesi (`fetanet.tolerans`):** Kitabın argümanı (s. 337); ifade kapalı, basılı teyit önerilir.
- **0-10 puan benzetmesi (`fetanet.cengiz`):** Kitaptaki benzetme; ekranda "gerçek ölçüm değil" etiketi var.
- **Zaman çizelgesi tarihleri (610, 622, 628, 630, 632):** Genel kabul gören tarihler; kitaptan değil genel bilgiden.
- **Kadı Abdülcebbar görüşleri:** Ekranda "eski bir İslam âlimi" diye geçer; Kadı'nın görüşü yazarın görüşü değildir.

## Eklenenler (içerik ajanı)
- `fetanet.vizyoner` (yeni; K1): sağlıklı ama yanılmış vizyoner itirazı (Jeanne d'Arc, Swedenborg, Joseph Smith: genel tarih bilgisi, doğrulanacak; içtenlik/sağlık hükmü verilmiyor). Ölçüt: "yanılan zihin bilmediği şeyleri doğru söyleyemez" -> sınanabilir varsayım, kanıt olarak sunulmuyor. Teşhis yollarına bağlı: `fetanet.ogrenme`, `fetanet.formul`, `mucize.giris`. Dal kapanmaz.
- `fetanet.giris`, `fetanet.teshis`, `fetanet.formul`, `fetanet.kapanis`: "bilmeden yanılma = yalnız hastalık" eşitlemesi gevşetildi ("hastalık ya da sağlıklı yanılgı").

## Kılıç / savaşlar beat'leri (kitap + ek; kullanıcı onayı: "argüman + eksik katman")
Yeni beat'ler (fetanet.json, `fetanet.cengiz`'den sonra, `fetanet.ongoru`'dan önce): `fetanet.kilic` → `fetanet.kilic-medine` → `fetanet.kilic-ayet` → `fetanet.kilic-yayilis` → `fetanet.ongoru`. YNI-3 taslağı (`fetanet.savas`) bunların yerine geçer. Hepsi `"ek": true`, `dogrulanacak: true`. Aişe ve Kurayza bilerek YOK.
Girişler: `fetanet.teshis`, `fetanet.toplum`, `fetanet.siyasi` (+ yeni "Kılıçla yayıldı" çipi), `fetanet.cengiz`, `haber.dorduncu`, `haber.ihtimaller` (anahtarlar: kılıç, zorla, savaş, cihat/cihad, fetih ve çekimleri). `fetanet.tolerans`/`ahlak` mevcut itiraz cevaplarında kaldı (çıkış `ongoru` olduğundan geriye döngü yaratmamak için bağlanmadı).

**Kitaptan (ek değil):** Mekke'de 13 yıl ikna (s. 277, 330-331); Mekke fethi Muir/Hitti (s. 321); Bedir esirleri-okuma yazma, Dermenghem (s. 367); cizye muafiyetleri Hitti (s. 323); Ömer'in Ilya emannâmesi Arnold (s. 333-334); Bodley (s. 323); Arnold, Armstrong, Hodgson, Rodinson, Lewis yargıları (s. 342-344).
**Ek (kitapta yok, onay bekliyor):**
1. Watt, *Muhammad at Medina* (1956): Medine'yi baskın/güç mücadelesi çerçevesinde anlatması; "savunma ağırlıklı ama yalnız savunma değil" hedge'i; Bedir'in kervan yolunda başlaması.
2. Hac 22/39-40 (savaş izni, gerekçe haksızlık; "ilk izin ayeti" sayılması klasik kaynaklarda çoğunlukta ama tartışmalı).
3. Bakara 2/256 + nüzul rivayeti (rivayet olarak, kesin olgu değil; Rippin uyarısı), Mümtehine 60/8, Yûnus 10/99.
4. Tevbe 9/5 ve 9/29 tam metin, yumuşatılmadan; bağlam ifadesi "geleneksel okuma" diye çerçevelendi (9/4, 9/6 Kur'an metninden). Klasik hukukta saldırı cihadı kuramı var (Peters; Cook, Bonner); bağlamsal okuma (Afsaruddin). Nesh tartışması "kimi klasik âlimler" diye anıldı. Ridde: siyasi/dinî iki okuma.
5. Bulliet (1979): din değiştirme yüzyıllara yayıldı, uzun süre azınlık; Ricklefs (Endonezya, ticaret/tarikat); Horton & Middleton (Doğu Afrika Swahili kıyısı); Cohen (1994): zimmî statüsü eşitlik değil, "hoşgörü cenneti" değil.
Hassas notlar: ahlakî hüküm verilmiyor; "hiç baskı olmadı" denmiyor; Bodley "popüler biyografi" notuyla; Bodley'in "ülkelerin ekseriyeti Müslüman oldu" cümlesi Bulliet ile gerilim yaratacağı için kullanılmadı.
