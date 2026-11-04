// ekran.js — tek ekranlı sinematik arayüz: kinetik tipografi, soru anı, diyagram sahnesi.
// Motor yalnızca bu arayüzü bilir: satir, satirlar, sahneKur, beatBasla, temizle, soruSor, cevapGoster, bekleDokun, kapanis, iptalEt, acilis.
import { diyagramCiz, diyagramGorselleri, diyagramKanca } from './diyagram.js';
import { IPTAL } from './motor.js';
import { tm, tmIptal, duraklat as zDuraklat, surdur as zSurdur } from './zaman.js';
import { durum, kaynakGor, kaynakAnahtar } from './durum.js';

const h = (tag, cls, metin, ata) => { const e = document.createElement(tag); if (cls) e.className = cls; if (metin != null) e.textContent = metin; if (ata) ata.appendChild(e); return e; };
const dokunmatik = () => matchMedia('(pointer: coarse)').matches;
const sade = (t) => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ı/g, 'i');
const BIRLESIK = { hizli: 36, normal: 70, yavas: 150 };

export class Ekran {
  constructor({ sahne, yigin, dgBeat, dgSatir, okuyucu }, { gok, ses }) {
    Object.assign(this, { sahneEl: sahne, yigin, dgBeat, dgSatir, okuyucuEl: okuyucu, gok, ses });
    this.hiz = 1; this.kHiz = 1; this.dur = 0; this.katmanlar = []; this.tmler = new Set(); this.rejs = new Set(); this.cur = null; this.dokunBekle = null; this.ipucuEl = null;
    this.azHareket = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.dgAktif = null; this.dgBeatAktif = null; this.formBekle = null; this.yazT = null;
    this.kaynakSaglayici = null;
    diyagramKanca.kaynakAc = (k, tetik) => this.kaynakAc(k, tetik);
    document.addEventListener('keydown', (e) => this._klavye(e), true);
  }

  zm(ms) { return ms * this.hiz * this.kHiz; }
  // iptal edilebilir, duraklatılabilir zamanlayıcı
  _t(fn, ms) { const h = tm(() => { this.tmler.delete(h); fn(); }, ms); this.tmler.add(h); return h; }

  // ---------- duraklat / sürdür (kaynak kartı, kaynakça) ----------
  duraklat() { if (this.dur++ === 0) { zDuraklat(); document.documentElement.classList.add('duraklat'); this.sahneEl.classList.add('kisik'); } }
  surdur() { if (this.dur > 0 && --this.dur === 0) { zSurdur(); document.documentElement.classList.remove('duraklat'); this.sahneEl.classList.remove('kisik'); } }

  // iptal edilebilir söz
  _vaat(fn) {
    return new Promise((res, rej) => {
      const r = () => rej(IPTAL); this.rejs.add(r);
      fn((v) => { this.rejs.delete(r); res(v); });
    });
  }
  _uyu(ms) { return this._vaat((res) => { tm(res, this.zm(ms)); }); }

  iptalEt() {
    if (this.cur) { tmIptal(this.cur.t1); tmIptal(this.cur.t2); this.cur = null; }
    this.dokunBekle = null; this.formBekle = null;
    this.tmler.forEach(tmIptal); this.tmler.clear();
    this.gok.hizCarpani = 1; clearTimeout(this.yazT);
    this.dgAktif?.iptal(); this.dgBeatAktif?.iptal();
    const r = [...this.rejs]; this.rejs.clear(); r.forEach((f) => f());
  }

  // sabit süreli bekleme + "hızlandır" desteği: tamamla() süre dolmadan çağrılırsa satırı hemen tamamlar
  _oynat(sure, reveal, tamamla) {
    return this._vaat((res) => {
      const c = { asama: 0 };
      const bitti = () => { tmIptal(c.t1); tmIptal(c.t2); if (this.cur === c) this.cur = null; res(); };
      c.t1 = tm(() => { c.asama = 1; }, this.zm(reveal));
      c.t2 = tm(bitti, this.zm(sure));
      c.hizlan = () => { if (c.asama === 0) { c.asama = 1; tmIptal(c.t1); tamamla?.(); } else bitti(); };
      this.cur = c;
    });
  }

  // kullanıcı dokunuşu/tuşu: önce bekleyen "dokun" ipucunu, yoksa geçerli satırı hızlandırır
  dokun() {
    if (this.dur) return;
    if (this.formBekle) { const f = this.formBekle; this.formBekle = null; f(); return; }
    if (this.dokunBekle) { const f = this.dokunBekle; this.dokunBekle = null; f(); return; }
    this.cur?.hizlan();
  }

  // ---------- satır öğeleri ----------
  // metin: "*anahtar*" işaretli sözcükler altın vurgu alır. opts: {tempo, kaynak}
  // Dönüş: satır öğesi; el._bitis = son sözcüğün görünme gecikmesi (ms)
  _satirEl(metin, sinif = '', opts = {}) {
    const el = h('div', `satir ${sinif} ${opts.tempo ? `t-${opts.tempo}` : ''}`.replace(/\s+/g, ' ').trim());
    el.setAttribute('aria-hidden', 'true');
    // parçala: *...* aralıkları vurgu; boşlukla ayrılmış sözcük = [{t, k}] parçaları
    const sozler = []; let onceki = true; // önceki parça boşlukla mı bitti
    String(metin).split(/(\*[^*]+\*)/).forEach((par) => {
      if (!par) return;
      const k = par.length > 2 && par.startsWith('*') && par.endsWith('*');
      const t = k ? par.slice(1, -1) : par.replace(/\*/g, '');
      t.split(/(\s+)/).forEach((tok) => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { onceki = true; return; }
        if (onceki || !sozler.length) sozler.push([{ t: tok, k }]); else sozler[sozler.length - 1].push({ t: tok, k });
        onceki = false;
      });
    });
    const adim = BIRLESIK[opts.tempo] || BIRLESIK.normal;
    const virgullu = sozler.filter((r) => /[,;:]$/.test(r[r.length - 1].t)).length >= 2; // üçleme: a, b, c.
    const isim = this._isimSozleri(opts.kaynak);
    let ekstra = 0, bitis = 0;
    sozler.forEach((runs, i) => {
      const sp = h('span', 'w', null, el);
      runs.forEach((r) => { if (r.k) h('em', 'k', r.t, sp); else sp.appendChild(document.createTextNode(r.t)); });
      const duz = runs.map((r) => r.t).join('');
      if (isim.size && [...isim].some((n) => sade(duz).replace(/[^a-z0-9]/g, '').startsWith(n))) {
        sp.classList.add('isim'); sp.setAttribute('role', 'button'); sp.tabIndex = -1; sp.title = 'Kaynak bilgisi';
        sp.addEventListener('click', () => this.kaynakAc(opts.kaynak, sp));
      }
      const son = i === sozler.length - 1 && sozler.length > 2 ? 120 : 0;
      const dl = Math.min(i, 7) * adim + ekstra + son; bitis = dl;
      sp.style.setProperty('--dl', `${dl}ms`); sp.style.setProperty('--i', Math.min(i, 7));
      if (virgullu && /[,;:]$/.test(runs[runs.length - 1].t)) ekstra += 260;
      if (i < sozler.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el._bitis = bitis; el._kelime = sozler.length;
    return el;
  }
  _goster(el) { setTimeout(() => el.classList.add('goster'), 40); }
  _oku(metin) { this.okuyucuEl.textContent = metin || ''; }

  _gonder(c, rect, cr) {
    if (c.classList.contains('gidiyor')) return;
    c.style.position = 'absolute'; c.style.margin = '0';
    c.style.left = `${rect.left - cr.left}px`; c.style.top = `${rect.top - cr.top}px`; c.style.width = `${rect.width}px`;
    c.style.setProperty('--yuk', `-${Math.round(rect.height + 40)}px`);
    void c.offsetWidth;
    c.classList.add('gidiyor');
    setTimeout(() => c.remove(), this.zm(1100));
  }
  _hepsiniGonder() {
    const cr = this.yigin.getBoundingClientRect();
    const kids = [...this.yigin.children].filter((c) => !c.classList.contains('gidiyor'));
    const r = kids.map((c) => c.getBoundingClientRect());
    kids.forEach((c, i) => this._gonder(c, r[i], cr));
  }

  // yeni öğe ekle; yığında en çok `tut` satır kalsın (eskiler söner, kalanlar silikleşir), kalanlar FLIP ile akıcı kayar
  _ekle(el, { tut = 2, sonra = null } = {}) {
    const cr = this.yigin.getBoundingClientRect();
    const kids = [...this.yigin.children].filter((c) => !c.classList.contains('gidiyor'));
    const eski = new Map(kids.map((c) => [c, c.getBoundingClientRect()]));
    const satirlar = kids.filter((c) => c.classList.contains('satir'));
    const at = Math.max(0, satirlar.length - (tut - 1));
    satirlar.slice(0, at).forEach((c) => this._gonder(c, eski.get(c), cr));
    kids.filter((c) => !c.classList.contains('satir')).forEach((c) => this._gonder(c, eski.get(c), cr));
    satirlar.slice(at).forEach((c) => c.classList.add('eski'));
    this.yigin.appendChild(el); if (sonra) this.yigin.appendChild(sonra);
    if (this.azHareket) return;
    satirlar.slice(at).forEach((c) => {
      const dy = eski.get(c).top - c.getBoundingClientRect().top;
      if (Math.abs(dy) < 1) return;
      c.style.transition = 'none'; c.style.transform = `translateY(${dy}px)`; void c.offsetWidth;
      c.style.transition = ''; c.style.transform = '';
    });
  }

  // ---------- sahne ----------
  sahneKur(sahne) {
    if (!sahne) return;
    this.gok.kur(sahne);
    this.dgBeatAktif?.iptal(); this.dgBeatAktif = null; this.dgBeat.replaceChildren(); this.dgBeat.classList.remove('cik');
    this.sahneEl.classList.remove('dg-ust');
    const dg = sahne.diyagram ? diyagramCiz(sahne.diyagram) : null;
    if (dg) {
      this.dgBeatAktif = dg; this.dgBeat.appendChild(dg.kok);
      this.sahneEl.classList.add('dg-ust');
      setTimeout(() => dg.basla(), 60);
    }
  }

  async beatBasla(devam) {
    this.gok.geciciGorsel(null); this._ipucuKaldir();
    await this.temizle();
    if (devam) { this.dgBeat.replaceChildren(); this.sahneEl.classList.remove('dg-ust'); }
  }

  async temizle() {
    this._ipucuKaldir();
    const bos = !this.yigin.children.length && !this.dgBeat.firstChild && !this.dgSatir.firstChild;
    this._hepsiniGonder();
    this.dgBeat.classList.add('cik'); this.dgSatir.classList.add('cik');
    if (!bos) await this._uyu(750);
    this.dgBeatAktif?.iptal(); this.dgBeatAktif = null;
    this.dgBeat.replaceChildren(); this.dgBeat.classList.remove('cik');
    this.dgSatir.replaceChildren(); this.dgSatir.classList.remove('cik');
    this.sahneEl.classList.remove('dg-ust', 'dg-aktif', 'altyazi', 'soru-an', 'acilis-an');
  }

  // ---------- satırlar ----------
  async satirlar(liste) { for (const s of liste || []) await this.satir(s); }

  async satir(s) {
    if (typeof s === 'string') s = { metin: s };
    // sessizlik: satır yok; yıldızlar ve (açıksa) sessiz bir ses
    if (s.sessiz) {
      const ms = s.duraklama || 2500;
      this._hepsiniGonder(); this.ses.sessizlik(ms);
      await this._oynat(ms, 0);
      return;
    }
    if (s.gorsel) this.gok.geciciGorsel(s.gorsel); else if (this.gok.gecici) this.gok.geciciGorsel(null);
    if (s.ayet && !s.diyagram) s = { ...s, diyagram: { tur: 'ayet', veri: s.ayet } };
    if (s.diyagram) { const ok = await this._dgSatir(s); if (ok) return; }
    const metin = (s.metin || '').trim();
    if (!metin) { if (s.gorsel) await this._oynat(4200, 1500); return; }
    if (this.gok.revealAl()) await this._uyu(2400); // görsel önce net görünsün
    const an = s.vurgu === 'an', vurgu = !!s.vurgu && !an, tempo = s.tempo === 'hizli' || s.tempo === 'yavas' ? s.tempo : null;
    const kay = this._kaynakNesne(s.kaynak);
    if (an) { // aha anı: sahne boşalır, yıldızlar bir an söner
      this._hepsiniGonder();
      if (!this.azHareket) this.gok.soluk(700);
      this.ses.an();
      await this._uyu(750);
    }
    const el = this._satirEl(metin, an ? 'an' : vurgu ? 'vurgu' : '', { tempo, kaynak: kay });
    const kel = el._kelime, duz = metin.replace(/\*/g, '');
    this._ekle(el, { tut: an ? 1 : this.sahneEl.classList.contains('dg-ust') ? 1 : 2 });
    this._oku(duz); if (!an) this.ses.tin(vurgu); this._goster(el);
    const taban = tempo === 'hizli' ? 700 + 190 * kel : tempo === 'yavas' ? 2200 + 430 * kel : 1400 + 320 * kel;
    const sure = taban + (vurgu ? 500 : 0) + (an ? 1800 : 0) + (tempo === 'yavas' ? 0 : el._bitis * 0.5);
    const reveal = (tempo === 'hizli' ? 550 : tempo === 'yavas' ? 1300 : 1000) + el._bitis + (an ? 1600 : 0);
    if (kay) { kaynakGor(kay); this._kunyeZamanla(el, kay, Math.min(reveal + 700, sure - 500)); }
    await this._oynat(sure, reveal, () => { el.classList.add('tam'); });
    if (s.duraklama) await this._oynat(s.duraklama, 0);
  }

  // ---------- kaynak künyesi ----------
  _kaynakNesne(k) { const o = Array.isArray(k) ? k[0] : k; return o && typeof o === 'object' && (o.yazar || o.eser) ? o : null; }
  _isimSozleri(k) {
    const set = new Set();
    if (!k?.yazar) return set;
    String(k.yazar).split(/[\s,]+/).forEach((w) => { const n = sade(w).replace(/[^a-z0-9]/g, ''); if (n.length > 3 && !/^(universitesi|kutuphanesi|raporu|ve|and)$/.test(n)) set.add(n); });
    return set;
  }
  _kunyeMetin(k, kisa) {
    const yerYil = [k.yer, k.yil].filter(Boolean).join(', ');
    const parca = kisa ? [k.yazar, [k.eser, k.yil].filter(Boolean).join(', ')] : [k.yazar, k.eser, yerYil, k.sayfa ? `s. ${k.sayfa}` : ''];
    return parca.filter(Boolean).join(' · ');
  }
  _kunyeZamanla(satirEl, k, ms) {
    this._t(() => {
      if (!satirEl.isConnected || satirEl.classList.contains('gidiyor')) return;
      const cr = this.yigin.getBoundingClientRect(), r = satirEl.getBoundingClientRect();
      const b = h('button', 'kunye', this._kunyeMetin(k, innerWidth < 560)); b.type = 'button';
      b.setAttribute('aria-label', `Kaynak: ${this._kunyeMetin(k)}`);
      b.style.top = `${Math.round(r.bottom - cr.top + 10)}px`;
      b.addEventListener('click', () => this.kaynakAc(k, b));
      this.yigin.appendChild(b); setTimeout(() => b.classList.add('goster'), 40);
    }, this.zm(ms));
  }

  async _dgSatir(s) {
    const dg = diyagramCiz(s.diyagram);
    if (!dg) return false;
    kaynakGor(this._kaynakNesne(s.diyagram.veri?.kaynak) || this._kaynakNesne(s.kaynak));
    (s.diyagram.veri?.gorseller || diyagramGorselleri(s.diyagram)).forEach((g) => this.gok.yukle(g));
    this._hepsiniGonder();
    const metin = (s.metin || '').trim(), kel = metin ? metin.split(/\s+/).length : 0;
    this.sahneEl.classList.add('dg-aktif'); this.sahneEl.classList.toggle('altyazi', !!metin);
    this.dgSatir.classList.remove('cik'); this.dgSatir.replaceChildren(dg.kok); this.dgAktif = dg;
    setTimeout(() => dg.basla(), 80);
    const v = s.diyagram.veri || {};
    this._oku(metin || (s.diyagram.tur === 'alinti' ? `${v.metin} ${v.kim || ''}` : s.diyagram.tur === 'denklem' ? (v.parcalar || []).join(' ') : s.diyagram.tur === 'sayac' ? `${v.sayi} ${v.etiket || ''}` : s.diyagram.tur === 'ayet' ? `${v.meal || ''} ${v.sure ? v.sure + ' Sûresi ' : ''}${v.no || ''}` : ''));
    if (metin) {
      const el = this._satirEl(metin, 'altyazi-satir'); this._ekle(el, { tut: 1 }); this.ses.tin(!!s.vurgu); this._goster(el);
    } else this.ses.tin(false);
    const sure = Math.max(dg.sure + 1900, metin ? 1400 + 320 * kel + 400 : 0);
    await this._oynat(sure, dg.sure, () => dg.bitir());
    dg.iptal(); this.dgAktif = null;
    this.dgSatir.classList.add('cik'); this._hepsiniGonder();
    await this._uyu(800);
    this.dgSatir.replaceChildren(); this.dgSatir.classList.remove('cik');
    this.sahneEl.classList.remove('dg-aktif', 'altyazi');
    return true;
  }

  // ---------- soru anı ----------
  _form(q) {
    const f = h('form', 'soru-form gizli'); f.autocomplete = 'off';
    f.setAttribute('role', 'group'); f.setAttribute('aria-label', 'Soru ve cevap');
    let input = null, yildiz = null;
    const ipucu = q.ipucu || 'Aklından geçeni yaz…';
    if (!q.sadeceCip) {
      const alan = h('div', 'alan', null, f);
      input = h('input', null, null, alan);
      Object.assign(input, { type: 'text', placeholder: ipucu, maxLength: 400 });
      input.setAttribute('aria-label', ipucu.replace(/…$/, '')); input.setAttribute('enterkeyhint', 'send');
      h('span', 'cizgi', null, alan);
      yildiz = h('span', 'yildiz-nabiz', '✦', alan); yildiz.setAttribute('aria-hidden', 'true');
      const b = h('button', 'gonder', '→', alan); b.type = 'submit'; b.setAttribute('aria-label', 'Gönder');
    }
    const cl = h('div', 'cipler', null, f);
    (q.cipler || []).slice(0, 3).forEach((c) => { const b = h('button', 'cip', c, cl); b.type = 'button'; b.dataset.metin = c; });
    return { f, input, yildiz };
  }

  // imleç yanındaki yıldızı yazının ucuna taşı
  _yildizKonum(input, yildiz) {
    if (!yildiz || !input.isConnected) return;
    const cs = getComputedStyle(input);
    this._olc ||= document.createElement('canvas').getContext('2d');
    this._olc.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const w = this._olc.measureText(input.value || input.placeholder || '').width;
    const orta = input.clientWidth / 2, x = Math.min(orta + w / 2 + 12, input.clientWidth - 8);
    yildiz.style.left = `${Math.round(x)}px`;
  }

  soruSor(q) {
    this.sahneEl.classList.add('soru-an');
    const { f, input, yildiz } = this._form(q);
    const el = this._satirEl(q.metin, 'soru');
    this._ekle(el, { tut: this.sahneEl.classList.contains('dg-ust') ? 1 : 2, sonra: f });
    this._oku(q.metin); this.ses.soruTonu(); this._goster(el);
    return this._vaat((res) => {
      let gitti = false;
      const gonder = (metin) => {
        if (gitti) return;
        if (!q.sadeceCip && !metin.trim()) { f.classList.add('titre'); setTimeout(() => f.classList.remove('titre'), 400); return; }
        gitti = true; this.gok.hizCarpani = 1; clearTimeout(this.yazT); this._hepsiniGonder(); res(metin.trim());
      };
      f.addEventListener('submit', (e) => { e.preventDefault(); gonder(input?.value || ''); });
      f.querySelectorAll('.cip').forEach((b) => b.addEventListener('click', () => gonder(b.dataset.metin)));
      input?.addEventListener('input', () => {
        f.classList.toggle('dolu', !!input.value.trim()); this._yildizKonum(input, yildiz);
        this.gok.hizCarpani = 0.8; clearTimeout(this.yazT); this.yazT = setTimeout(() => { this.gok.hizCarpani = 1; }, 1800); // yazarken gökyüzü "dinler"
      });
      // soru önce tek başına nefes alır; sonra form. Dokunma bekleyişi atlatır.
      const kel = el._kelime, bekle = q.buyuk ? 3000 : Math.min(1800 + 70 * kel, 2600);
      const goster = () => {
        tmIptal(zt); this.formBekle = null;
        f.classList.remove('gizli'); this._yildizKonum(input, yildiz);
        if (input && !dokunmatik()) input.focus({ preventScroll: true });
      };
      const zt = this._t(goster, this.zm(bekle));
      this.formBekle = goster;
    });
  }

  async cevapGoster(metin) {
    const el = this._satirEl(metin, 'cevap');
    this.sahneEl.classList.remove('soru-an');
    this._ekle(el, { tut: 1 }); this._goster(el);
    await this._oynat(1500 + Math.min(metin.length * 30, 1300), 900, () => el.classList.add('tam'));
    this._hepsiniGonder(); // cevap küçülerek yıldızlara karışır (CSS: .cevap.gidiyor)
    await this._uyu(750);
  }

  // dal kapandı: sessiz bir "kapı"; diyagram sönmeyi kendisi çizer
  dalKapandi() { this.ses.dalKapandi(); }

  // ---------- açılış / bekleme / kapanış ----------
  _ipucu(metin) {
    this._ipucuKaldir();
    const e = h('div', 'ipucu', metin); this.sahneEl.appendChild(e); this.ipucuEl = e;
    setTimeout(() => e.classList.add('goster'), 40);
  }
  _ipucuKaldir() { this.ipucuEl?.remove(); this.ipucuEl = null; }

  async bekleDokun(ipucu) {
    this._ipucu(ipucu);
    await this._vaat((res) => { this.dokunBekle = res; });
    this._ipucuKaldir(); this._hepsiniGonder(); await this._uyu(700);
  }

  // dönüş: 'baslat' | 'devam' | 'bastan'
  async acilis(devamVar) {
    if (!devamVar) {
      const el = this._satirEl('Biraz konuşalım mı?', 'acilis'); this._ekle(el); this._oku('Biraz konuşalım mı?');
      setTimeout(() => { this._goster(el); this.sahneEl.classList.add('acilis-an'); }, this.zm(1500));
      await this._uyu(3000);
      await this.bekleDokun('dokun ya da bir tuşa bas');
      return 'baslat';
    }
    const c = await this.soruSor({ metin: 'Kaldığın yerden devam edelim mi?', cipler: ['Evet', 'Baştan'], sadeceCip: true });
    await this._uyu(700);
    return /bas|hayir|yeni/i.test(c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()) ? 'bastan' : 'devam';
  }

  // oturum sonu: sakin bitiş; yıldızlar kalır, küçük "Kaynakça" ve "Baştan başla" bağlantıları belirir
  async kapanis() {
    await this._uyu(1800);
    this._ipucuKaldir();
    const e = h('div', 'ipucu bitis');
    const k = h('button', 'baglanti', 'Kaynakça', e); k.type = 'button'; k.addEventListener('click', () => this.kaynakcaAc(k));
    const b = h('button', 'baglanti', 'Baştan başla', e); b.type = 'button';
    b.addEventListener('click', () => this.onBastan?.());
    this.sahneEl.appendChild(e); this.ipucuEl = e; setTimeout(() => e.classList.add('goster'), 40);
  }

  // ---------- katmanlar: kaynak kartı + kaynakça ----------
  _klavye(e) {
    const ust = this.katmanlar[this.katmanlar.length - 1];
    if (!ust) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); ust.kapat(); return; }
    if (e.key !== 'Tab') return;
    const od = [...ust.kok.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')].filter((x) => !x.disabled && x.offsetParent !== null);
    if (!od.length) return;
    const ilk = od[0], son = od[od.length - 1];
    if (e.shiftKey && (document.activeElement === ilk || !ust.kok.contains(document.activeElement))) { e.preventDefault(); son.focus(); }
    else if (!e.shiftKey && document.activeElement === son) { e.preventDefault(); ilk.focus(); }
  }

  _katmanAc(kok, { tetik, ilkOdak }) {
    const onceki = tetik || document.activeElement;
    this.duraklat();
    document.body.appendChild(kok);
    const katman = { kok, kapat: null };
    let kapandi = false;
    katman.kapat = () => {
      if (kapandi) return; kapandi = true;
      kok.classList.remove('acik'); this.katmanlar = this.katmanlar.filter((x) => x !== katman);
      setTimeout(() => kok.remove(), 520);
      this.surdur();
      try { if (onceki?.isConnected) onceki.focus({ preventScroll: true }); } catch { /* */ }
    };
    this.katmanlar.push(katman);
    requestAnimationFrame(() => requestAnimationFrame(() => { kok.classList.add('acik'); (ilkOdak?.() || kok).focus?.({ preventScroll: true }); }));
    return katman;
  }

  kaynakAc(k, tetik) {
    k = this._kaynakNesne(k); if (!k) return;
    if (this.katmanlar.some((x) => x.kok.dataset.tur === 'kart')) return;
    kaynakGor(k);
    const kok = h('div', 'kart-kok'); kok.setAttribute('role', 'dialog'); kok.setAttribute('aria-modal', 'true'); kok.setAttribute('aria-labelledby', 'kart-baslik');
    const perde = h('div', 'kart-perde', null, kok);
    const kart = h('div', 'kart', null, kok); kart.tabIndex = -1;
    h('div', 'kart-tut', null, kart);
    const bas = h('h2', 'kart-yazar', k.yazar || k.eser, kart); bas.id = 'kart-baslik';
    const kimlik = k.kimlik || k.not;
    if (kimlik) h('p', 'kart-kimlik', String(kimlik).replace(/^Kimlik:\s*/i, ''), kart);
    if (k.yazar && k.eser) {
      const sat = [h('span', 'eser', k.eser)];
      const yy = [k.yer, k.yil].filter(Boolean).join(', '); if (yy) sat.push(h('span', null, yy));
      if (k.sayfa) sat.push(h('span', null, `s. ${k.sayfa}`));
      const p = h('p', 'kart-eser', null, kart); sat.forEach((x, i) => { if (i) p.appendChild(document.createTextNode(' · ')); p.appendChild(x); });
    } else {
      const yy = [k.yer, k.yil, k.sayfa ? `s. ${k.sayfa}` : ''].filter(Boolean).join(' · '); if (yy) h('p', 'kart-eser', yy, kart);
    }
    if (k.alinti) { const q = h('blockquote', 'kart-alinti', null, kart); q.textContent = `“${String(k.alinti).replace(/^[“"]|[”"]$/g, '')}”`; }
    if (k.dogrulanacak) { const d = h('p', 'kart-dogrulaniyor', null, kart); h('span', 'nokta', '', d); d.appendChild(document.createTextNode('doğrulanıyor')); d.title = 'Bu künyenin bazı alanları henüz teyit edilmedi.'; }
    const alt = h('div', 'kart-alt', null, kart);
    if (!this.katmanlar.some((x) => x.kok.classList.contains('kaynakca'))) { const g = h('button', 'kart-dugme', 'Kaynakça’da gör', alt); g.type = 'button'; g.addEventListener('click', () => { katman.kapat(); setTimeout(() => this.kaynakcaAc(), 120); }); }
    const kp = h('button', 'kart-dugme birincil', 'Kapat', alt); kp.type = 'button';
    const katman = this._katmanAc(kok, { tetik, ilkOdak: () => kart });
    kok.dataset.tur = 'kart';
    perde.addEventListener('click', () => katman.kapat());
    kp.addEventListener('click', () => katman.kapat());
    // aşağı kaydır: kapat
    let y0 = null;
    kart.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; y0 = e.clientY; });
    kart.addEventListener('pointerup', (e) => { if (y0 != null && e.clientY - y0 > 70) katman.kapat(); y0 = null; });
    return katman;
  }

  kaynakcaAc(tetik) {
    if (this.katmanlar.some((x) => x.kok.classList.contains('kaynakca'))) return;
    const gorulen = durum.gorulenKaynaklar || [], tum = this.kaynakSaglayici?.() || [];
    const gor = new Set(gorulen.map(kaynakAnahtar));
    const liste = [...gorulen.map((k) => [k, true]), ...tum.filter((k) => !gor.has(kaynakAnahtar(k))).map((k) => [k, false])];
    const kok = h('div', 'kaynakca'); kok.setAttribute('role', 'dialog'); kok.setAttribute('aria-modal', 'true'); kok.setAttribute('aria-labelledby', 'kk-baslik');
    const ic = h('div', 'kk-ic', null, kok);
    const bas = h('h2', 'kk-baslik', 'Bugün konuşurken yaslandıklarımız', ic); bas.id = 'kk-baslik';
    h('p', 'kk-alt', liste.length ? 'Parlak olanlar yolda karşılaştıkların; soluklar henüz yolun ilerisinde.' : 'Henüz bir kaynağa yaslanmadık.', ic);
    const ol = h('ol', 'kk-liste', null, ic);
    liste.forEach(([k, g], i) => {
      const li = h('li', null, null, ol), b = h('button', `kk-oge ${g ? 'goruldu' : 'soluk'}`, null, li); b.type = 'button';
      li.style.setProperty('--i', Math.min(i, 14));
      h('span', 'kk-yildiz', '✦', b).setAttribute('aria-hidden', 'true');
      const m = h('span', 'kk-metin', null, b);
      h('span', 'kk-ad', k.yazar || k.eser, m);
      const alt = [k.yazar ? k.eser : '', k.yil].filter(Boolean).join(' · '); if (alt) h('span', 'kk-eser', alt, m);
      if (k.dogrulanacak) h('span', 'kk-dogr', 'doğrulanıyor', m);
      b.addEventListener('click', () => this.kaynakAc(k, b));
    });
    const kp = h('button', 'kk-kapat', 'Geri dön', kok); kp.type = 'button';
    kok.tabIndex = -1;
    const katman = this._katmanAc(kok, { tetik, ilkOdak: () => kok });
    kp.addEventListener('click', () => katman.kapat());
    return katman;
  }
}
