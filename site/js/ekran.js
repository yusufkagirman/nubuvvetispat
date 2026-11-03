// ekran.js — tek ekranlı sinematik arayüz: kinetik tipografi, soru anı, diyagram sahnesi.
// Motor yalnızca bu arayüzü bilir: satir, satirlar, sahneKur, beatBasla, temizle, soruSor, cevapGoster, bekleDokun, kapanis, iptalEt, acilis.
import { diyagramCiz, diyagramGorselleri } from './diyagram.js';
import { IPTAL } from './motor.js';

const h = (tag, cls, metin, ata) => { const e = document.createElement(tag); if (cls) e.className = cls; if (metin != null) e.textContent = metin; if (ata) ata.appendChild(e); return e; };
const dokunmatik = () => matchMedia('(pointer: coarse)').matches;

export class Ekran {
  constructor({ sahne, yigin, dgBeat, dgSatir, okuyucu }, { gok, ses }) {
    Object.assign(this, { sahneEl: sahne, yigin, dgBeat, dgSatir, okuyucuEl: okuyucu, gok, ses });
    this.hiz = 1; this.rejs = new Set(); this.cur = null; this.dokunBekle = null; this.ipucuEl = null;
    this.azHareket = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.dgAktif = null; this.dgBeatAktif = null;
  }

  zm(ms) { return ms * this.hiz; }

  // iptal edilebilir söz
  _vaat(fn) {
    return new Promise((res, rej) => {
      const r = () => rej(IPTAL); this.rejs.add(r);
      fn((v) => { this.rejs.delete(r); res(v); });
    });
  }
  _uyu(ms) { return this._vaat((res) => setTimeout(res, this.zm(ms))); }

  iptalEt() {
    if (this.cur) { clearTimeout(this.cur.t1); clearTimeout(this.cur.t2); this.cur = null; }
    this.dokunBekle = null;
    this.dgAktif?.iptal(); this.dgBeatAktif?.iptal();
    const r = [...this.rejs]; this.rejs.clear(); r.forEach((f) => f());
  }

  // sabit süreli bekleme + "hızlandır" desteği: tamamla() süre dolmadan çağrılırsa satırı hemen tamamlar
  _oynat(sure, reveal, tamamla) {
    return this._vaat((res) => {
      const c = { asama: 0 };
      const bitti = () => { clearTimeout(c.t1); clearTimeout(c.t2); if (this.cur === c) this.cur = null; res(); };
      c.t1 = setTimeout(() => { c.asama = 1; }, this.zm(reveal));
      c.t2 = setTimeout(bitti, this.zm(sure));
      c.hizlan = () => { if (c.asama === 0) { c.asama = 1; clearTimeout(c.t1); tamamla?.(); } else bitti(); };
      this.cur = c;
    });
  }

  // kullanıcı dokunuşu/tuşu: önce bekleyen "dokun" ipucunu, yoksa geçerli satırı hızlandırır
  dokun() {
    if (this.dokunBekle) { const f = this.dokunBekle; this.dokunBekle = null; f(); return; }
    this.cur?.hizlan();
  }

  // ---------- satır öğeleri ----------
  _satirEl(metin, sinif = '') {
    const el = h('div', `satir ${sinif}`.trim());
    el.setAttribute('aria-hidden', 'true');
    const kel = metin.split(/\s+/).filter(Boolean);
    kel.forEach((w, i) => {
      const sp = h('span', 'w', w, el); sp.style.setProperty('--i', Math.min(i, 7));
      if (i < kel.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return el;
  }
  _goster(el) { setTimeout(() => el.classList.add('goster'), 40); }
  _oku(metin) { this.okuyucuEl.textContent = metin || ''; }

  _gonder(c, rect, cr) {
    if (c.classList.contains('gidiyor')) return;
    c.style.position = 'absolute'; c.style.margin = '0';
    c.style.left = `${rect.left - cr.left}px`; c.style.top = `${rect.top - cr.top}px`; c.style.width = `${rect.width}px`;
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
    const bos = !this.yigin.children.length && !this.dgBeat.firstChild && !this.dgSatir.firstChild;
    this._hepsiniGonder();
    this.dgBeat.classList.add('cik'); this.dgSatir.classList.add('cik');
    if (!bos) await this._uyu(750);
    this.dgBeatAktif?.iptal(); this.dgBeatAktif = null;
    this.dgBeat.replaceChildren(); this.dgBeat.classList.remove('cik');
    this.dgSatir.replaceChildren(); this.dgSatir.classList.remove('cik');
    this.sahneEl.classList.remove('dg-ust', 'dg-aktif', 'altyazi');
  }

  // ---------- satırlar ----------
  async satirlar(liste) { for (const s of liste || []) await this.satir(s); }

  async satir(s) {
    if (typeof s === 'string') s = { metin: s };
    if (s.gorsel) this.gok.geciciGorsel(s.gorsel); else if (this.gok.gecici) this.gok.geciciGorsel(null);
    if (s.diyagram) { const ok = await this._dgSatir(s); if (ok) return; }
    const metin = (s.metin || '').trim();
    if (!metin) { if (s.gorsel) await this._oynat(4200, 1500); return; }
    const kel = metin.split(/\s+/).length, vurgu = !!s.vurgu;
    const el = this._satirEl(metin, vurgu ? 'vurgu' : '');
    this._ekle(el, { tut: this.sahneEl.classList.contains('dg-ust') ? 1 : 2 });
    this._oku(metin); this.ses.tin(vurgu); this._goster(el);
    await this._oynat(1400 + 320 * kel + (vurgu ? 500 : 0), 1000 + Math.min(kel - 1, 7) * 70, () => el.classList.add('tam'));
  }

  async _dgSatir(s) {
    const dg = diyagramCiz(s.diyagram);
    if (!dg) return false;
    (s.diyagram.veri?.gorseller || diyagramGorselleri(s.diyagram)).forEach((g) => this.gok.yukle(g));
    this._hepsiniGonder();
    const metin = (s.metin || '').trim(), kel = metin ? metin.split(/\s+/).length : 0;
    this.sahneEl.classList.add('dg-aktif'); this.sahneEl.classList.toggle('altyazi', !!metin);
    this.dgSatir.classList.remove('cik'); this.dgSatir.replaceChildren(dg.kok); this.dgAktif = dg;
    setTimeout(() => dg.basla(), 80);
    const v = s.diyagram.veri || {};
    this._oku(metin || (s.diyagram.tur === 'alinti' ? `${v.metin} ${v.kim || ''}` : s.diyagram.tur === 'denklem' ? (v.parcalar || []).join(' ') : s.diyagram.tur === 'sayac' ? `${v.sayi} ${v.etiket || ''}` : ''));
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
    let input = null;
    if (!q.sadeceCip) {
      const alan = h('div', 'alan', null, f);
      input = h('input', null, null, alan);
      Object.assign(input, { type: 'text', placeholder: 'Düşünceni yaz…', maxLength: 400 });
      input.setAttribute('aria-label', 'Düşünceni yaz'); input.setAttribute('enterkeyhint', 'send');
      h('span', 'cizgi', null, alan);
      const b = h('button', 'gonder', '↵', alan); b.type = 'submit'; b.setAttribute('aria-label', 'Gönder');
    }
    const cl = h('div', 'cipler', null, f);
    (q.cipler || []).slice(0, 3).forEach((c) => { const b = h('button', 'cip', c, cl); b.type = 'button'; b.dataset.metin = c; });
    return { f, input };
  }

  soruSor(q) {
    const { f, input } = this._form(q);
    const el = this._satirEl(q.metin, 'soru');
    this._ekle(el, { tut: this.sahneEl.classList.contains('dg-ust') ? 1 : 2, sonra: f });
    this._oku(q.metin); this.ses.soruTonu(); this._goster(el);
    return this._vaat((res) => {
      let gitti = false;
      const gonder = (metin) => {
        if (gitti) return;
        if (!q.sadeceCip && !metin.trim()) { f.classList.add('titre'); setTimeout(() => f.classList.remove('titre'), 400); return; }
        gitti = true; this._hepsiniGonder(); res(metin.trim());
      };
      f.addEventListener('submit', (e) => { e.preventDefault(); gonder(input?.value || ''); });
      f.querySelectorAll('.cip').forEach((b) => b.addEventListener('click', () => gonder(b.dataset.metin)));
      input?.addEventListener('input', () => f.classList.toggle('dolu', !!input.value.trim()));
      setTimeout(() => {
        f.classList.remove('gizli');
        if (input && !dokunmatik()) input.focus({ preventScroll: true });
      }, this.zm(1100 + Math.min(q.metin.split(/\s+/).length, 8) * 70));
    });
  }

  async cevapGoster(metin) {
    const el = this._satirEl(metin, 'cevap');
    this._ekle(el, { tut: 1 }); this._goster(el);
    await this._oynat(1300 + Math.min(metin.length * 45, 2100), 900, () => el.classList.add('tam'));
    this._hepsiniGonder();
    await this._uyu(650);
  }

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
      setTimeout(() => this._goster(el), this.zm(1500));
      await this._uyu(3000);
      await this.bekleDokun('dokun ya da bir tuşa bas');
      return 'baslat';
    }
    const c = await this.soruSor({ metin: 'Kaldığın yerden devam edelim mi?', cipler: ['Evet', 'Baştan'], sadeceCip: true });
    await this._uyu(700);
    return /bas|hayir|yeni/i.test(c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()) ? 'bastan' : 'devam';
  }

  async kapanis() {
    await this._uyu(1800);
    this._ipucu('baştan başlamak için sol üstteki ⋯');
  }
}
