// gok.js — tam ekran canvas: yıldız alanı + arka plan modları (gokyuzu, col, safak, isik, mushaf) + Ken Burns görseller.
const MODLAR = ['col', 'safak', 'isik'];
const TAU = Math.PI * 2;
const yumusat = (w) => w * w * (3 - 2 * w);
const rnd = (a, b) => a + Math.random() * (b - a);

export class Gok {
  constructor(canvas, { azHareket = false } = {}) {
    this.c = canvas; this.x = canvas.getContext('2d');
    this.azHareket = azHareket;
    this.ag = { col: 0, safak: 0, isik: 0 };      // mod ağırlıkları
    this.hedefMod = 'gokyuzu';
    this.katmanlar = [];                             // görsel katmanları
    this.beatGorsel = null; this.gecici = null;
    this.acilis = 0; this.safakT0 = 0;
    this.yildizlar = []; this.kayan = null; this.kayanT = 6;
    this.son = 0; this.calisiyor = false; this.kirli = true; this.onbellek = new Map();
    this.boyutla = this.boyutla.bind(this); this.kare = this.kare.bind(this);
    addEventListener('resize', this.boyutla);
    document.addEventListener('visibilitychange', () => (document.hidden ? this.durdur() : this.baslat()));
    this.boyutla();
  }

  boyutla() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = innerWidth; this.H = innerHeight; this.dpr = dpr;
    this.c.width = Math.round(this.W * dpr); this.c.height = Math.round(this.H * dpr);
    this.x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(900, Math.round((this.W * this.H) / 2600));
    this.yildizlar = Array.from({ length: n }, () => {
      const z = [0.25, 0.55, 1][Math.floor(Math.random() * 3)];
      const sicak = Math.random();
      return { x: rnd(0, this.W), y: rnd(0, this.H), z, r: rnd(0.35, 1.1) * (0.6 + z * 0.7), a: rnd(0.35, 1) * (0.45 + z * 0.55),
        f: rnd(0.4, 1.8), p: rnd(0, TAU), renk: sicak > 0.85 ? '255,226,190' : sicak > 0.6 ? '190,210,255' : '235,240,255' };
    });
    this.nebula();
    this.kirli = true;
  }

  // Samanyolu bandı + soluk bulutsular (bir kez çizilir)
  nebula() {
    const { W, H } = this, o = document.createElement('canvas');
    o.width = W; o.height = H; const g = o.getContext('2d');
    g.translate(W / 2, H / 2); g.rotate(-0.55); g.translate(-W / 2, -H / 2);
    const blob = (x, y, r, rgb, a) => {
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
    };
    const L = Math.hypot(W, H);
    for (let i = 0; i < 9; i++) blob(W / 2 + (i - 4) * L * 0.13, H / 2 + rnd(-30, 30), L * 0.2, i % 2 ? '70,90,160' : '110,80,150', 0.07);
    for (let i = 0; i < 1100; i++) {
      const u = rnd(-0.7, 0.7) * L, v = (Math.random() + Math.random() + Math.random() - 1.5) * H * 0.13;
      g.fillStyle = `rgba(210,220,255,${rnd(0.05, 0.3)})`; g.fillRect(W / 2 + u, H / 2 + v, 1, 1);
    }
    this.neb = o;
  }

  baslat() { if (this.calisiyor) return; this.calisiyor = true; this.son = performance.now(); requestAnimationFrame(this.kare); }
  durdur() { this.calisiyor = false; }

  // ---- sahne ayarı ----
  kur({ arkaplan = 'gokyuzu', gorsel = null } = {}) {
    const mod = ['col', 'safak', 'isik', 'mushaf', 'gokyuzu'].includes(arkaplan) ? arkaplan : 'gokyuzu';
    if (mod === 'safak' && this.hedefMod !== 'safak') this.safakT0 = performance.now();
    this.hedefMod = mod;
    this.beatGorsel = mod === 'mushaf' ? gorsel : null;
    this.uygula();
  }
  geciciGorsel(src) { this.gecici = src || null; this.uygula(); }
  uygula() {
    const istenen = this.gecici || this.beatGorsel;
    const ust = this.katmanlar.find((k) => k.hedef === 1);
    if (istenen && (!ust || ust.src !== istenen)) {
      this.katmanlar.forEach((k) => (k.hedef = 0));
      const img = this.yukle(istenen);
      const yon = [[1, 1], [-1, 1], [1, -1], [-1, -1]][Math.floor(Math.random() * 4)];
      this.katmanlar.push({ src: istenen, img, w: 0, hedef: 1, t0: performance.now(), yon });
    } else if (!istenen) this.katmanlar.forEach((k) => (k.hedef = 0));
    this.kirli = true;
    if (!this.calisiyor && !document.hidden) this.baslat();
  }
  yukle(src) {
    let i = this.onbellek.get(src);
    if (!i) { i = new Image(); i.onload = () => { this.kirli = true; if (!this.calisiyor && !document.hidden) this.baslat(); }; i.src = src; this.onbellek.set(src, i); }
    return i;
  }
  onYukle(listesi) { (listesi || []).forEach((s) => this.yukle(s)); }

  // ---- çizim ----
  kare(now) {
    if (!this.calisiyor) return;
    const dt = Math.min((now - this.son) / 1000, 0.1); this.son = now;
    this.guncelle(dt, now);
    this.ciz(now);
    const hareketli = !this.azHareket || this.kirli;
    this.kirli = false;
    if (hareketli) requestAnimationFrame(this.kare); else this.calisiyor = false;
  }

  guncelle(dt, now) {
    this.acilis = Math.min(1, this.acilis + dt / 3);
    for (const m of MODLAR) {
      const h = this.hedefMod === m ? 1 : 0, d = dt / 1.8;
      const eski = this.ag[m]; this.ag[m] += Math.sign(h - eski) * Math.min(Math.abs(h - eski), d);
      if (this.ag[m] !== h) this.kirli = true;
    }
    for (const k of this.katmanlar) {
      const eski = k.w; k.w += Math.sign(k.hedef - k.w) * Math.min(Math.abs(k.hedef - k.w), dt / 1.8);
      if (k.w !== eski) this.kirli = true;
    }
    this.katmanlar = this.katmanlar.filter((k) => k.hedef === 1 || k.w > 0.001);
    if (this.azHareket) return;
    const hiz = dt;
    for (const s of this.yildizlar) { s.x -= 4.5 * s.z * hiz; if (s.x < -2) { s.x = this.W + 2; s.y = rnd(0, this.H); } }
    this.kayanT -= dt;
    if (!this.kayan && this.kayanT < 0) {
      const a = rnd(0.35, 0.7);
      this.kayan = { x: rnd(this.W * 0.3, this.W), y: rnd(0, this.H * 0.4), vx: -Math.cos(a) * 620, vy: Math.sin(a) * 620, t: 0, s: rnd(0.7, 1.1) };
      this.kayanT = rnd(9, 20);
    }
    if (this.kayan) { this.kayan.t += dt; this.kayan.x += this.kayan.vx * dt; this.kayan.y += this.kayan.vy * dt; if (this.kayan.t > this.kayan.s) this.kayan = null; }
  }

  ciz(now) {
    const { x, W, H } = this, t = now / 1000;
    const imgW = this.katmanlar.reduce((b, k) => Math.max(b, yumusat(k.w)), 0);
    // taban gökyüzü
    const g = x.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#02030a'); g.addColorStop(0.6, '#050813'); g.addColorStop(1, '#0a1022');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    if (this.neb) { x.globalAlpha = 0.9 * this.acilis * (1 - this.ag.safak * 0.6); x.drawImage(this.neb, 0, 0, W, H); x.globalAlpha = 1; }
    this.safak(t, now); this.isik(t); this.colUfuk(t);
    // yıldızlar
    const sonuk = (1 - 0.88 * yumusat(this.ag.safak) - 0.55 * yumusat(this.ag.isik)) * (1 - 0.95 * imgW) * this.acilis;
    if (sonuk > 0.01) this.yildiz(t, sonuk);
    this.col(t);
    this.gorseller(now);
  }

  yildiz(t, sonuk) {
    const x = this.x;
    for (const s of this.yildizlar) {
      const a = s.a * (0.72 + 0.28 * Math.sin(t * s.f + s.p)) * sonuk;
      x.fillStyle = `rgba(${s.renk},${a.toFixed(3)})`;
      x.beginPath(); x.arc(s.x, s.y, s.r, 0, TAU); x.fill();
      if (s.r > 1.2) { x.fillStyle = `rgba(${s.renk},${(a * 0.12).toFixed(3)})`; x.beginPath(); x.arc(s.x, s.y, s.r * 4, 0, TAU); x.fill(); }
    }
    const k = this.kayan;
    if (k) {
      const p = k.t / k.s, a = Math.sin(Math.PI * p) * 0.8 * sonuk, L = 140;
      const n = Math.hypot(k.vx, k.vy), tx = k.x - (k.vx / n) * L, ty = k.y - (k.vy / n) * L;
      const gr = x.createLinearGradient(k.x, k.y, tx, ty);
      gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
      x.strokeStyle = gr; x.lineWidth = 1.4; x.beginPath(); x.moveTo(k.x, k.y); x.lineTo(tx, ty); x.stroke();
    }
  }

  safak(t, now) {
    const w = yumusat(this.ag.safak); if (w < 0.003) return;
    const { x, W, H } = this;
    const p = Math.min(1, (now - this.safakT0) / 16000), e = 1 - (1 - p) * (1 - p);
    const g = x.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#060a22'); g.addColorStop(0.35, '#121a4a');
    g.addColorStop(Math.max(0.5, 0.92 - 0.3 * e), '#6d3a64');
    g.addColorStop(Math.min(1, 1.04 - 0.1 * e), '#f08a3c');
    x.globalAlpha = w * (0.8 + 0.2 * e); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.globalAlpha = w * (0.3 + 0.5 * e);
    const r = Math.max(W, H) * 0.7, gy = H * (1.02 - 0.06 * e);
    const gr = x.createRadialGradient(W / 2, gy, 0, W / 2, gy, r);
    gr.addColorStop(0, 'rgba(255,190,110,.75)'); gr.addColorStop(0.35, 'rgba(240,120,60,.25)'); gr.addColorStop(1, 'rgba(240,120,60,0)');
    x.fillStyle = gr; x.fillRect(0, 0, W, H); x.globalAlpha = 1;
  }

  isik(t) {
    const w = yumusat(this.ag.isik); if (w < 0.003) return;
    const { x, W, H } = this;
    const cx = W / 2, cy = H * 0.42, R = Math.max(W, H) * (0.62 + 0.03 * Math.sin(t * 0.35));
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = w;
    const gr = x.createRadialGradient(cx, cy, 0, cx, cy, R);
    gr.addColorStop(0, 'rgba(255,238,200,.42)'); gr.addColorStop(0.3, 'rgba(240,200,140,.16)'); gr.addColorStop(1, 'rgba(240,200,140,0)');
    x.fillStyle = gr; x.fillRect(0, 0, W, H);
    // huzmeler
    x.translate(cx, cy);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * TAU + t * 0.02, wd = 0.05 + 0.025 * Math.sin(t * 0.3 + i * 2);
      const gg = x.createLinearGradient(0, 0, Math.cos(a) * R * 1.3, Math.sin(a) * R * 1.3);
      gg.addColorStop(0, 'rgba(255,236,190,.09)'); gg.addColorStop(1, 'rgba(255,236,190,0)');
      x.fillStyle = gg; x.beginPath(); x.moveTo(0, 0);
      x.lineTo(Math.cos(a - wd) * R * 1.4, Math.sin(a - wd) * R * 1.4); x.lineTo(Math.cos(a + wd) * R * 1.4, Math.sin(a + wd) * R * 1.4);
      x.closePath(); x.fill();
    }
    x.restore();
  }

  colUfuk(t) {
    const w = yumusat(this.ag.col); if (w < 0.003) return;
    const { x, W, H } = this;
    const gy = H * 0.8, r = Math.max(W, H) * 0.75;
    x.save(); x.globalAlpha = w; x.translate(W / 2, gy); x.scale(1, 0.55);
    const gr = x.createRadialGradient(0, 0, 0, 0, 0, r);
    gr.addColorStop(0, 'rgba(235,140,60,.50)'); gr.addColorStop(0.3, 'rgba(180,90,40,.22)'); gr.addColorStop(1, 'rgba(120,60,30,0)');
    x.fillStyle = gr; x.fillRect(-r, -r * 1.5, r * 2, r * 3); x.restore();
  }

  col(t) {
    const w = yumusat(this.ag.col); if (w < 0.003) return;
    const { x, W, H } = this;
    const katman = [
      { taban: 0.80, genlik: 0.040, f: 0.0042, ph: 1.3, hiz: 0.5, ust: '#5a3320', alt: '#1a0f0a' },
      { taban: 0.86, genlik: 0.050, f: 0.0031, ph: 4.1, hiz: 0.9, ust: '#2f1a10', alt: '#0e0806' },
      { taban: 0.93, genlik: 0.045, f: 0.0024, ph: 2.2, hiz: 1.5, ust: '#150b07', alt: '#050303' },
    ];
    x.globalAlpha = w;
    katman.forEach((k, i) => {
      const off = t * k.hiz * 1.2, y0 = H * k.taban, A = H * k.genlik;
      x.beginPath(); x.moveTo(0, H);
      for (let px = 0; px <= W + 8; px += 8) {
        const u = (px + off) * k.f * TAU;
        const s = 0.55 * Math.sin(u + k.ph) + 0.25 * Math.sin(u * 2.3 + k.ph * 1.7) - 0.22 * Math.abs(Math.sin(u * 0.6 + k.ph)) ;
        x.lineTo(px, y0 - A * s);
      }
      x.lineTo(W + 8, H); x.closePath();
      const g = x.createLinearGradient(0, y0 - A, 0, H); g.addColorStop(0, k.ust); g.addColorStop(0.6, k.alt); g.addColorStop(1, k.alt);
      x.fillStyle = g; x.fill();
    });
    x.globalAlpha = 1;
  }

  gorseller(now) {
    const { x, W, H } = this;
    for (const k of this.katmanlar) {
      const a = yumusat(k.w); if (a < 0.002) continue;
      const img = k.img; if (!img.complete || !img.naturalWidth) continue;
      const T = 26, ts = (now - k.t0) / 1000;
      const p = this.azHareket ? 0.35 : (1 - Math.cos((TAU * ts) / (2 * T))) / 2;
      const sc = Math.max(W / img.naturalWidth, H / img.naturalHeight) * (1.08 + 0.2 * p);
      const iw = img.naturalWidth * sc, ih = img.naturalHeight * sc;
      const ex = Math.max(0, iw - W), ey = Math.max(0, ih - H);
      const px = 0.5 + k.yon[0] * (p - 0.5) * 0.7, py = 0.5 + k.yon[1] * (p - 0.5) * 0.7;
      x.globalAlpha = a; x.drawImage(img, -ex * px, -ey * py, iw, ih);
      // koyulaştırma + vinyet + alt gradyan (yazıya karışsın)
      x.fillStyle = 'rgba(4,6,12,.55)'; x.fillRect(0, 0, W, H);
      const v = x.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.hypot(W, H) * 0.6);
      v.addColorStop(0, 'rgba(2,3,8,0)'); v.addColorStop(1, 'rgba(2,3,8,.85)');
      x.fillStyle = v; x.fillRect(0, 0, W, H);
      const b = x.createLinearGradient(0, H * 0.45, 0, H);
      b.addColorStop(0, 'rgba(2,3,8,0)'); b.addColorStop(1, 'rgba(2,3,8,.88)');
      x.fillStyle = b; x.fillRect(0, 0, W, H);
    }
    x.globalAlpha = 1;
  }
}
