// anket.js — kısa profil anketi (docs/sunum-tasarimi.md §2 kısa sürüm). Hepsi atlanabilir, yargılamaz, geri alınabilir.
export const SORULAR = [
  { id: 'etkilesim', neden: 'Sana gereksiz şeyleri anlatmamak için soruyorum.', metin: 'Nasıl ilerlemeyi tercih edersin?', cipler: ['Bana anlat, dinleyeyim', 'Önce kendi aklıma göre denemek isterim', 'Karışık'] },
  { id: 'sure', neden: 'Süreni boşa harcamamak için.', metin: 'Ne kadar derine inelim?', cipler: ['Kısa bir tur (ana fikir)', 'Orta (ana deliller)', 'Hepsini görmek istiyorum'] },
  { id: 'tanri', neden: 'Doğru bir cevap yok; sadece nereden başlayacağımızı bilmek için.', metin: 'Tanrı konusunda şu an nerede duruyorsun?', cipler: ['Tanrı’ya inanmıyorum', 'Bilinemeyeceğini düşünüyorum', 'İnanıyorum ama bir dinim yok', 'İnanıyorum ve bir dine bağlıyım'] },
  { id: 'gecmis', neden: 'Örnekleri senin tanıdığın dünyadan seçebilmek için.', metin: 'Hangi inanç ya da kültür ortamında büyüdün?', cipler: ['Dinsiz/seküler', 'Hristiyan', 'Yahudi', 'Başka bir inanç', 'Müslüman bir ailede büyüdüm, şüpheliyim'] },
  { id: 'kaynak', neden: 'Yol, senin kabul edeceğin kaynaklarla kurulacak.', metin: 'Kur’an ve hadis gibi İslam’ın kendi kaynakları hakkında ilk hissiyatın nedir?', cipler: ['Güvenmem; başka kaynaklara bakarım', 'Kısmen; kanıt görürsem', 'Güvenirim', 'Hiç düşünmedim'] },
  { id: 'peygamber', neden: 'Kitap tam bu açıklamaları sırayla ele alıyor; hiçbirine “yanlış” demeden başlıyoruz. (Birden fazla seçebilirsin.)', coklu: true, metin: 'Hz. Muhammed hakkında ilk aklına gelen açıklama hangisi?', cipler: ['Çıkarcı bir lider / yalancı', 'İyi niyetli bir reformcu', 'Samimiydi ama bir rahatsızlık yaşamış olabilir', 'Çok zeki bir siyasetçi/komutan', 'Dönemin kâhinlerinden biri', 'Hiç düşünmedim'] },
  { id: 'bilgi', neden: 'Kartların ne kadar ayrıntılı olacağını ayarlamak için.', metin: 'İslam tarihi hakkında ne kadar bilgin var?', cipler: ['Neredeyse hiç', 'Genel kültür düzeyi', 'Okudum, ayrıntıya inebiliriz'] },
  { id: 'hassas', neden: 'Bazı konular (ör. tartışmalı rivayetler) hassas olabilir.', metin: 'Hassas konular nasıl gösterilsin?', cipler: ['Kapalı kutuda dursun, istersem açarım', 'Direkt göster'] },
  { id: 'serbest', neden: 'Boş bırakabilirsin; soruyu not alırız.', metin: 'Eklemek istediğin bir şey ya da en çok merak ettiğin soru var mı?', cipler: [], serbestOnly: true },
];
export const ATLA = 'Söylemek istemiyorum / emin değilim';

import { el } from './ui.js';

export function anketBaslat(kap, durum, kaydet, bitti) {
  let i = 0;
  const profil = durum.profil;
  const ciz = () => {
    const s = SORULAR[i];
    const onceki = profil[s.id] || { secim: [], serbest: '' };
    let secim = [...onceki.secim];
    const girdi = el('input', { type: 'text', class: 'serbest', placeholder: 'İstersen kendi cümlenle yaz…', value: onceki.serbest || '', 'aria-label': 'Serbest cevap' });
    const cipDiv = el('div', { class: 'cipler' });
    const cipler = [...s.cipler, ...(s.serbestOnly ? [] : [ATLA])];
    const cizCip = () => {
      cipDiv.replaceChildren(...cipler.map((c) => el('button', { type: 'button', class: 'cip' + (secim.includes(c) ? ' secili' : ''), 'aria-pressed': secim.includes(c), onclick: () => {
        if (s.coklu && c !== ATLA) secim = secim.includes(c) ? secim.filter((x) => x !== c) : [...secim.filter((x) => x !== ATLA), c];
        else secim = secim.includes(c) ? [] : [c];
        cizCip();
        if (!s.coklu) ileri();
      } }, c)));
    };
    cizCip();
    const ileri = () => { profil[s.id] = { secim, serbest: girdi.value.trim() }; kaydet(); i++; i >= SORULAR.length ? bitir() : ciz(); };
    const bitir = () => { durum.anketBitti = true; kaydet(); bitti(); };
    const geri = el('button', { type: 'button', class: 'ikincil', disabled: i === 0, onclick: () => { profil[s.id] = { secim, serbest: girdi.value.trim() }; i--; ciz(); } }, 'Geri');
    const atla = el('button', { type: 'button', class: 'ikincil', onclick: () => { secim = []; girdi.value = ''; ileri(); } }, 'Atla');
    const tamam = el('button', { type: 'button', class: 'birincil', onclick: ileri }, i === SORULAR.length - 1 ? 'Bitir' : 'Devam');
    girdi.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') ileri(); });
    kap.replaceChildren(
      el('div', { class: 'ilerleme', 'aria-label': 'Anket ilerlemesi' }, el('span', { style: `width:${Math.round((i / SORULAR.length) * 100)}%` })),
      el('p', { class: 'kucuk' }, `Soru ${i + 1} / ${SORULAR.length}`),
      el('div', { class: 'balon sistem' }, el('p', { class: 'soru' }, s.metin), el('p', { class: 'neden' }, s.neden)),
      cipDiv, girdi,
      el('div', { class: 'satir' }, geri, atla, tamam),
    );
  };
  ciz();
}
