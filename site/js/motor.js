// motor.js — AKIS-SEMA "Cevap işleme sırası"nı uygular. Arayüzden bağımsızdır: ekran (ui) arayüzünü kullanır.
import { siniflandir, globalYollariKur } from './niyet.js';
import { durum, kaydet, cevapEkle, kapat, kosulSaglanir } from './durum.js';

export const IPTAL = Symbol('iptal');
const KOPRU = ['Buna birazdan geleceğiz. Şimdi şunu soruyordum:', 'Bunu not aldım. Ama önce şuna dönelim:', 'Güzel soru; sırası gelince. Şimdilik şuna bakalım:'];
const KOPRU_YOK = ['Bu soruya bu sunumda henüz hazır bir bölüm yok; bunu not ettim.', 'İstersen önce buradaki soruyu kapatalım.']; // MTR-7: karşılığı olmayan konuya sahte söz verilmez
const VARSAYILAN_CIPLER = ['Haklısın, açıklaması zor', 'Yine de ikna olmadım'];                                                  // MTR-4: ekOrnek çipi yoksa
const GERI = ['Kaldığımız yere dönelim.', 'Şimdi kaldığımız soruya geri dönelim.'];
const DIZI = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);

export class Motor {
  constructor(ui) { this.ui = ui; this.gSeri = {}; this.geri = false; this.havuz = new Map(); this.no = 0; this.kopruSay = 0; this.kacSeri = 0; this.notSay = 0; }

  yukle(veri) {
    this.havuz.clear();
    const gy = [];
    for (const b of veri?.bolgeler || []) {
      for (const beat of b?.beats || []) if (beat?.id) this.havuz.set(beat.id, beat);
      if (Array.isArray(b?.globalYollar)) gy.push(...b.globalYollar); // herhangi bir bölge dosyasında tanımlanabilir (genel.json önerilir)
    }
    globalYollariKur(gy);
    return this.havuz.size;
  }

  // havuzdaki tüm kaynaklar (akış sırasıyla, tekilleştirilmiş)
  tumKaynaklar() {
    const out = [], gor = new Set();
    const ekle = (k) => { if (!k) return; for (const x of DIZI(k)) { if (!x || !(x.yazar || x.eser)) continue; const a = `${x.yazar || ''}|${x.eser || ''}`.toLowerCase(); if (!gor.has(a)) { gor.add(a); out.push(x); } } };
    const satir = (l) => (l || []).forEach((s) => { if (s && typeof s === 'object') { ekle(s.kaynak); ekle(s.diyagram?.veri?.kaynak); } });
    for (const b of this.havuz.values()) { satir(b.satirlar); ekle(b.sahne?.diyagram?.veri?.kaynak); (b.ekOrnekler || []).forEach((e) => satir(e.satirlar)); }
    return out;
  }

  k(no) { if (no !== this.no) throw IPTAL; }

  baslat(devam) { const no = ++this.no; return this.calis(no, devam); }
  git(id) { this.ui.iptalEt(); durum.beat = id; durum.satir = 0; durum.asama = 'satir'; durum.soru = null; durum.bitti = false; kaydet(); return this.baslat(false); }
  durdur() { this.no++; this.ui.iptalEt(); }

  async calis(no, devam) {
    try {
      let id = durum.beat || 'acilis.merhaba', devamMi = !!devam && !!durum.beat, atlama = 0;
      while (id) {
        this.k(no);
        const b0 = this.havuz.get(id);
        const r = await this.beatOynat(no, id, devamMi, atlama);
        // dal kapanış sorusu tamamlandı ama kullanıcı ikna olmadı (dal kapanmadı): not et, aynı yola tekrar sokma
        if (b0 && /\.kapanis$/.test(id) && (b0.kapat === 'samimiyet' || b0.kapat === 'fetanet') && r?.id === 'haber.kalan' && !durum.kapali.includes(b0.kapat)) { (durum.tamam ||= {})[b0.kapat] = 1; kaydet(); }
        atlama = r?.atlama ?? 0;
        devamMi = !!r?.devam; // global yoldan dönüş: kaynak beat'in sorusu satırlar tekrarlanmadan yeniden sorulur
        id = r?.id ?? null;
      }
    } catch (e) { if (e !== IPTAL) console.error(e); }
  }

  // Dönüş: {id, atlama} sıradaki beat veya null (bitiş/duraklama)
  async beatOynat(no, id, devam, atlama) {
    const beat = this.havuz.get(id);
    if (!beat) { durum.beat = id; kaydet(); await this.yokKapanis(no); return null; }
    if (!devam) {
      const gd = /^(samimiyet|fetanet)\.giris$/.exec(id);
      if (gd && durum.tamam?.[gd[1]] && !durum.kapali.includes(gd[1]) && atlama < 20) {
        // aynı dalı baştan sona gezdik, kullanıcı ikna olmadı: tekrar etmek yerine doğrudan delil yoluna geç
        await this.ui.satirlar(['Bu yolu baştan sona birlikte gezdik.', 'İkna olmadığını saygıyla not ediyorum; zorlamam.', 'Şimdi yolun başka bir kapısına bakalım.']); this.k(no);
        return { id: 'mucize.giris', atlama: atlama + 1 };
      }
      const dal = (beat.dallan || []).find((d) => kosulSaglanir(d.kosul) && d.git !== id);
      if (dal) {
        if (atlama > 20) { await this.yokKapanis(no); return null; }
        return { id: dal.git, atlama: atlama + 1 };
      }
      Object.assign(durum, { beat: id, satir: 0, asama: 'satir', soru: null, bitti: false });
      durum.ek[id] = 0;
      if (!(durum.gezilen ||= []).includes(id)) durum.gezilen.push(id); // MTR-11/U48: ziyaret listesi
      if (!beat.donus) durum.donus = []; // dönüş yığınından çıkıldı: bayat kayıt kalmasın
      kaydet();
      await this.ui.beatBasla(false);
      this.k(no);
    } else {
      await this.ui.beatBasla(true);
    }
    const mod0 = durum.asama === 'soru' && durum.soru ? durum.soru : null;
    const ekSahne = mod0?.mod === 'ek' ? beat.ekOrnekler?.[mod0.idx]?.sahne : null;
    if (beat.sahne || ekSahne) this.ui.sahneKur({ ...(beat.sahne || {}), ...(ekSahne || {}) });
    const satirlar = beat.satirlar || [];
    if (durum.asama !== 'soru') {
      for (let i = durum.satir; i < satirlar.length; i++) {
        durum.satir = i; kaydet();
        await this.ui.satir(satirlar[i]); this.k(no);
      }
      durum.satir = satirlar.length;
    }
    if (!beat.soru) return this.sonrasi(no, beat.sonraki, beat);
    return this.soruDongusu(no, beat);
  }

  // Sıradaki beat. `donus: true` bir beat'in `git`siz bitişi (id yok) yığındaki kaynak soruya geri döner; yığın boşsa varsayılan/son.
  sonrasi(no, id, beat) {
    if (id) return { id, atlama: 0 };
    if (beat?.donus && durum.donus?.length) {
      const e = durum.donus.pop();
      if (this.havuz.has(e.beat)) {
        Object.assign(durum, { beat: e.beat, asama: 'soru', soru: { mod: e.mod, idx: e.idx }, bitti: false });
        this.geri = true; kaydet();
        return { id: e.beat, atlama: 0, devam: true };
      }
    }
    return this.son(no);
  }

  async son(no) {
    durum.bitti = true; kaydet();
    await this.ui.kapanis(); this.k(no);
    return null;
  }

  async yokKapanis(no) {
    await this.ui.satirlar(['Bu kısmı hazırlıyoruz.', 'Şimdilik buraya kadar.']); this.k(no);
    await this.ui.kapanis(); this.k(no);
  }

  notEttim() { const l = ['Bunu not ettim. Bununla birlikte devam edelim.', 'Not aldım. Şimdi yola devam edelim.', 'Anladım, bunu da kaydettim. İlerleyelim.']; return l[this.notSay++ % l.length]; }

  kopru(beat) {
    const l = DIZI(beat.kopru).length ? DIZI(beat.kopru) : KOPRU;
    return l[this.kopruSay++ % l.length];
  }

  dalKapat(dal) { if (kapat(dal)) this.ui.dalKapandi?.(dal); }

  profilYaz(p) { if (p) { Object.assign(durum.profil, p); kaydet(); } }

  async soruDongusu(no, beat) {
    const id = beat.id, ekler = beat.ekOrnekler || [];
    const s0 = beat.soru;
    const ana = typeof s0 === 'string' ? { metin: s0 } : s0;
    let { mod, idx } = durum.asama === 'soru' && durum.soru ? durum.soru : { mod: 'ana', idx: 0 };
    const kur = () => {
      if (mod === 'ek') { const e = ekler[idx]; return { metin: e.soru, cipler: e.cipler || (ana.serbest ? [] : VARSAYILAN_CIPLER), serbest: false, ipucu: e.ipucu }; }
      if (mod === 'komp') return { metin: beat.kompozisyon, cipler: [], serbest: true };
      return { metin: ana.metin, cipler: ana.cipler || [], serbest: !!ana.serbest, ipucu: ana.ipucu, buyuk: !!ana.buyuk };
    };
    const sonraki = () => this.sonrasi(no, beat.sonraki, beat);
    const varsayilan = () => this.sonrasi(no, beat.varsayilan || beat.sonraki, beat);
    const gorulen = new Set(); let kacan = 0, itiraz = 0; // art arda kaçamak / aynı beat'te tekrarlanan itiraz sayacı (döngü kırıcı)
    if (this.geri) { this.geri = false; await this.ui.satir(GERI[this.kopruSay++ % GERI.length]); this.k(no); }
    for (;;) {
      const q = kur();
      Object.assign(durum, { asama: 'soru', soru: { mod, idx } }); kaydet();
      const cevap = await this.ui.soruSor(q); this.k(no);
      cevapEkle(id, cevap);
      let s = await siniflandir({ cevap, beat, soru: q, mod }); this.k(no);
      if (s.tur === 'ara') { this.araVer(); throw IPTAL; }
      await this.ui.cevapGoster(cevap); this.k(no);
      if (s.tur === 'yol' && s.yol.tur === 'itiraz') {
        // aynı itiraz tekrar gelirse ya da üçüncü itiraz olursa aynı cevabı tekrarlamak yerine yeni örneğe geç
        if (gorulen.has(s.yol) || ++itiraz > 3) s = { tur: 'ret' }; else gorulen.add(s.yol);
      }
      if (s.tur !== 'global' && !beat.donus) this.gSeri = {}; // yumuşak çıkıştaki cevaplar art arda sayacını sıfırlamaz
      if (s.tur === 'global') {
        const r = await this.globalIsle(no, beat, s.g, cevap, { mod, idx }); this.k(no);
        if (r === 'devam') continue;
        return r;
      }
      if (s.tur !== 'kacamak' && s.tur !== 'konu_disi') { kacan = 0; this.kacSeri = 0; }
      if (mod === 'komp') {
        if (s.tur === 'kacamak' && ++kacan < 3) { await this.ui.satir(this.kopru(beat)); this.k(no); continue; }
        if (s.tur === 'kacamak') return this.kacisCik(no, beat, sonraki);
        durum.kompozisyon[id] = cevap; kaydet();
        await this.ui.satir(this.notEttim()); this.k(no);
        return sonraki();
      }
      if (s.tur === 'yol') {
        const y = s.yol; this.profilYaz(y.profil);
        if (y.tur === 'itiraz') {
          await this.ui.satirlar(DIZI(y.yanit)); this.k(no);
          continue;
        }
        if (y.yanit) { await this.ui.satirlar(DIZI(y.yanit)); this.k(no); }
        if (y.tur === 'ikna' || y.tur === 'yonlendir') this.dalKapat(beat.kapat || y.kapat);
        if (y.git) return { id: y.git, atlama: 0 };
        return y.tur === 'profil' ? varsayilan() : sonraki();
      }
      if (s.tur === 'serbest') { this.profilYaz({ [id]: cevap }); if (beat.donus) this.itirazYaz(cevap); return varsayilan(); }
      if (s.tur === 'onay') { this.dalKapat(beat.kapat); return sonraki(); }
      if (s.tur === 'ret') {
        const ni = mod === 'ana' ? 0 : idx + 1;
        if (ni < ekler.length) {
          mod = 'ek'; idx = ni; durum.ek[id] = ni;
          const e = ekler[ni];
          if (e.sahne) this.ui.sahneKur({ ...(beat.sahne || {}), ...e.sahne });
          Object.assign(durum, { soru: { mod, idx } }); kaydet();
          await this.ui.satirlar(e.satirlar || []); this.k(no);
          continue;
        }
        if (beat.kompozisyon) { mod = 'komp'; idx = 0; continue; }
        await this.ui.satir(this.notEttim()); this.k(no);
        return sonraki();
      }
      // kaçamak / konu dışı: köprü + aynı soru
      if (s.tur === 'konu_disi') { durum.konuDisi.push({ id, metin: cevap, t: Date.now() }); kaydet(); }
      if (++kacan >= 3) return this.kacisCik(no, beat, sonraki); // üç kez kaçamak/konu dışı: zorlamadan nazikçe ilerle
      // MTR-7: konu dışı soruyu karşılayan beat/anahtar olmadığı için "geleceğiz" denmez; dürüstçe not edilir
      if (s.tur === 'konu_disi') await this.ui.satirlar(KOPRU_YOK); else await this.ui.satir(this.kopru(beat));
      this.k(no);
    }
  }

  itirazYaz(metin) { const l = (durum.profil.itirazlar ||= []); l.push(String(metin).slice(0, 300)); kaydet(); }

  // Global yol (AKIS-SEMA "Global yollar"): beat yolu eşleşmedi. Hedef beat `donus: true` ise kaynak soru yığına yazılır, hedef bitince dönülür.
  // Hedef beat içerikte yoksa tanımdaki sabit `yanit` gösterilir ve aynı soru yeniden sorulur. Dönüş: {id,atlama} | 'devam'
  async globalIsle(no, beat, g, cevap, st) {
    const say = (this.gSeri = { [g.ad]: (this.gSeri[g.ad] || 0) + 1 })[g.ad]; // art arda aynı global yol sayacı
    let git = g.git;
    if (g.tekrar && say >= (g.tekrar.say || 2)) { git = g.tekrar.git; this.gSeri = {}; }
    if (g.itiraz) this.itirazYaz(cevap);
    const hedef = git && this.havuz.get(git);
    if (!hedef) {
      const y = DIZI(git === g.git ? g.yanit : (g.tekrar?.yanit || g.yanit));
      await this.ui.satirlar(y.length ? y : ['Bunu not ettim.']);
      return 'devam';
    }
    if (hedef.donus && !beat.donus) { // donus beat'inden başka donus beat'ine geçerken orijinal kaynak korunur
      durum.donus = [...(durum.donus || []), { beat: beat.id, mod: st.mod, idx: st.idx }].slice(-5);
      kaydet();
    }
    return { id: git, atlama: 0 };
  }

  // Döngü kırıcı: dal kapatılmaz. Art arda iki beat'te kaçamaksa "ara verelim mi" önerisi; dal kapanış sorusundaysa doğrudan delil yoluna.
  async kacisCik(no, beat, sonraki) {
    this.kacSeri++;
    if (this.kacSeri >= 2) {
      this.kacSeri = 0;
      await this.ui.satirlar(['Sanırım bu konu şu an seni pek çekmiyor.', 'Sorun değil; istersen biraz ara verelim.']); this.k(no);
      this.araVer(); throw IPTAL;
    }
    await this.ui.satirlar(['Anlıyorum, bu soru seni şimdilik çekmedi.', 'Önemli değil; devam edelim.']); this.k(no);
    if (beat.kapat === 'samimiyet' || beat.kapat === 'fetanet') return { id: 'mucize.giris', atlama: 0 };
    return sonraki();
  }

  // Global "ara ver": kaydı koru, veda, dokununca kaldığı yerden devam.
  async araVer() {
    const no = ++this.no; this.ui.iptalEt(); kaydet();
    try {
      await this.ui.temizle(); this.k(no);
      await this.ui.satirlar(['Tamam, burada duralım.', 'Hazır olduğunda kaldığımız yerden devam ederiz.']); this.k(no);
      await this.ui.bekleDokun('devam etmek için dokun ya da bir tuşa bas'); this.k(no);
    } catch (e) { if (e !== IPTAL) console.error(e); return; }
    this.calis(++this.no, true);
  }
}
