// motor.js — AKIS-SEMA "Cevap işleme sırası"nı uygular. Arayüzden bağımsızdır: ekran (ui) arayüzünü kullanır.
import { siniflandir } from './niyet.js';
import { durum, kaydet, cevapEkle, kapat, kosulSaglanir } from './durum.js';

export const IPTAL = Symbol('iptal');
const KOPRU = ['Buna birazdan geleceğiz. Şimdi şunu soruyordum:', 'Bunu not aldım. Ama önce şuna dönelim:', 'Güzel soru; sırası gelince. Şimdilik şuna bakalım:'];
const DIZI = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);

export class Motor {
  constructor(ui) { this.ui = ui; this.havuz = new Map(); this.no = 0; this.kopruSay = 0; }

  yukle(veri) {
    this.havuz.clear();
    for (const b of veri?.bolgeler || []) for (const beat of b.beats || []) this.havuz.set(beat.id, beat);
    return this.havuz.size;
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
        const r = await this.beatOynat(no, id, devamMi, atlama);
        atlama = r?.atlama ?? 0;
        devamMi = false;
        id = r?.id ?? null;
      }
    } catch (e) { if (e !== IPTAL) console.error(e); }
  }

  // Dönüş: {id, atlama} sıradaki beat veya null (bitiş/duraklama)
  async beatOynat(no, id, devam, atlama) {
    const beat = this.havuz.get(id);
    if (!beat) { durum.beat = id; kaydet(); await this.yokKapanis(no); return null; }
    if (!devam) {
      const dal = (beat.dallan || []).find((d) => kosulSaglanir(d.kosul) && d.git !== id);
      if (dal) {
        if (atlama > 20) { await this.yokKapanis(no); return null; }
        return { id: dal.git, atlama: atlama + 1 };
      }
      Object.assign(durum, { beat: id, satir: 0, asama: 'satir', soru: null, bitti: false });
      durum.ek[id] = 0;
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
    if (!beat.soru) return this.sonrasi(no, beat.sonraki);
    return this.soruDongusu(no, beat);
  }

  sonrasi(no, id) { return id ? { id, atlama: 0 } : this.son(no); }

  async son(no) {
    durum.bitti = true; kaydet();
    await this.ui.kapanis(); this.k(no);
    return null;
  }

  async yokKapanis(no) {
    await this.ui.satirlar(['Bu kısmı hazırlıyoruz.', 'Şimdilik buraya kadar.']); this.k(no);
    await this.ui.kapanis(); this.k(no);
  }

  kopru(beat) {
    const l = DIZI(beat.kopru).length ? DIZI(beat.kopru) : KOPRU;
    return l[this.kopruSay++ % l.length];
  }

  profilYaz(p) { if (p) { Object.assign(durum.profil, p); kaydet(); } }

  async soruDongusu(no, beat) {
    const id = beat.id, ekler = beat.ekOrnekler || [];
    const s0 = beat.soru;
    const ana = typeof s0 === 'string' ? { metin: s0 } : s0;
    let { mod, idx } = durum.asama === 'soru' && durum.soru ? durum.soru : { mod: 'ana', idx: 0 };
    const kur = () => {
      if (mod === 'ek') { const e = ekler[idx]; return { metin: e.soru, cipler: e.cipler || ana.cipler || [], serbest: false }; }
      if (mod === 'komp') return { metin: beat.kompozisyon, cipler: [], serbest: true };
      return { metin: ana.metin, cipler: ana.cipler || [], serbest: !!ana.serbest };
    };
    const sonraki = () => this.sonrasi(no, beat.sonraki);
    const varsayilan = () => this.sonrasi(no, beat.varsayilan || beat.sonraki);
    for (;;) {
      const q = kur();
      Object.assign(durum, { asama: 'soru', soru: { mod, idx } }); kaydet();
      const cevap = await this.ui.soruSor(q); this.k(no);
      cevapEkle(id, cevap);
      const s = await siniflandir({ cevap, beat, soru: q, mod }); this.k(no);
      if (s.tur === 'ara') { this.araVer(); throw IPTAL; }
      await this.ui.cevapGoster(cevap); this.k(no);
      if (mod === 'komp') {
        if (s.tur === 'kacamak') { await this.ui.satir(this.kopru(beat)); this.k(no); continue; }
        durum.kompozisyon[id] = cevap; kaydet();
        await this.ui.satir('Bunu not ettim. Bununla birlikte devam edelim.'); this.k(no);
        return sonraki();
      }
      if (s.tur === 'yol') {
        const y = s.yol; this.profilYaz(y.profil);
        if (y.tur === 'itiraz') {
          await this.ui.satirlar(DIZI(y.yanit)); this.k(no);
          continue;
        }
        if (y.yanit) { await this.ui.satirlar(DIZI(y.yanit)); this.k(no); }
        if (y.tur === 'ikna' || y.tur === 'yonlendir') kapat(beat.kapat || y.kapat);
        if (y.git) return { id: y.git, atlama: 0 };
        return y.tur === 'profil' ? varsayilan() : sonraki();
      }
      if (s.tur === 'serbest') { this.profilYaz({ [id]: cevap }); return varsayilan(); }
      if (s.tur === 'onay') { kapat(beat.kapat); return sonraki(); }
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
        await this.ui.satir('Bunu not ettim. Bununla birlikte devam edelim.'); this.k(no);
        return sonraki();
      }
      // kaçamak / konu dışı: köprü + aynı soru
      if (s.tur === 'konu_disi') { durum.konuDisi.push({ id, metin: cevap, t: Date.now() }); kaydet(); }
      await this.ui.satir(this.kopru(beat)); this.k(no);
    }
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
