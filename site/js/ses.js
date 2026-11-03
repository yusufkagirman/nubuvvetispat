// ses.js — Web Audio ile prosedürel ambiyans (dosya yok). Varsayılan kapalı; kullanıcı açınca fade-in.
const ANAHTAR = 'nubuvvet.ses';
const NOTALAR = [523.25, 587.33, 659.25, 783.99, 880, 987.77, 1174.66, 1318.51];

export class Ses {
  constructor() {
    this.acik = false; this.ctx = null; this.hazir = false;
    try { this.tercih = localStorage.getItem(ANAHTAR) === '1'; } catch { this.tercih = false; }
    document.addEventListener('visibilitychange', () => {
      if (!this.ctx) return;
      if (document.hidden) this.ctx.suspend().catch(() => {});
      else if (this.acik) this.ctx.resume().catch(() => {});
    });
  }

  // İlk kullanıcı etkileşiminde çağrılır (tarayıcı ses izni).
  kilitAc() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try { this.ctx = new AC(); this.kur(); if (this.tercih) this.ac(); } catch { this.ctx = null; }
  }

  kur() {
    const c = this.ctx;
    this.master = c.createGain(); this.master.gain.value = 0;
    // yankı: gecikme + geri besleme + lowpass
    this.yanki = c.createGain(); this.yanki.gain.value = 0.55;
    const gec = c.createDelay(2); gec.delayTime.value = 0.43;
    const gb = c.createGain(); gb.gain.value = 0.38;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2200;
    this.yanki.connect(gec); gec.connect(lp); lp.connect(gb); gb.connect(gec); lp.connect(this.master);
    this.master.connect(c.destination);
    // drone
    const dron = c.createGain(); dron.gain.value = 0.5;
    const filtre = c.createBiquadFilter(); filtre.type = 'lowpass'; filtre.frequency.value = 340; filtre.Q.value = 0.6;
    [[55, 'sine', 0], [82.41, 'triangle', 5], [110.2, 'sine', -6], [164.9, 'sine', 4]].forEach(([f, t, d], i) => {
      const o = c.createOscillator(); o.type = t; o.frequency.value = f; o.detune.value = d;
      const g = c.createGain(); g.gain.value = [0.5, 0.28, 0.2, 0.05][i];
      o.connect(g); g.connect(filtre); o.start();
    });
    filtre.connect(dron); dron.connect(this.master);
    const lfo = c.createOscillator(); lfo.frequency.value = 0.045;
    const lg = c.createGain(); lg.gain.value = 110; lfo.connect(lg); lg.connect(filtre.frequency); lfo.start();
    const lfo2 = c.createOscillator(); lfo2.frequency.value = 0.031;
    const lg2 = c.createGain(); lg2.gain.value = 0.12; lfo2.connect(lg2); lg2.connect(dron.gain); lfo2.start();
    // rüzgâr: süzülmüş gürültü
    const n = c.sampleRate * 3, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 520; bp.Q.value = 0.8;
    const ng = c.createGain(); ng.gain.value = 0.018;
    const lfo3 = c.createOscillator(); lfo3.frequency.value = 0.07;
    const lg3 = c.createGain(); lg3.gain.value = 0.012; lfo3.connect(lg3); lg3.connect(ng.gain); lfo3.start();
    src.connect(bp); bp.connect(ng); ng.connect(this.master); src.start();
    this.hazir = true;
  }

  ac() {
    this.acik = true; this.tercih = true; this.sakla();
    if (!this.ctx) return;
    this.ctx.resume().catch(() => {});
    const g = this.master.gain, t = this.ctx.currentTime;
    g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(0.5, t + 3);
  }
  kapat() {
    this.acik = false; this.tercih = false; this.sakla();
    if (!this.ctx) return;
    const g = this.master.gain, t = this.ctx.currentTime;
    g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(0, t + 0.8);
  }
  degistir() { this.acik ? this.kapat() : (this.ctx ? this.ac() : (this.tercih = true, this.kilitAc(), this.ac())); return this.acik; }
  sakla() { try { localStorage.setItem(ANAHTAR, this.tercih ? '1' : '0'); } catch { /* */ } }

  nota(f, genlik, sure, atak = 0.012) {
    const c = this.ctx, t = c.currentTime;
    const g = c.createGain(); g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(genlik, t + atak); g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    const o2 = c.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 2.76;
    const g2 = c.createGain(); g2.gain.value = 0.18;
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(this.master); g.connect(this.yanki);
    o.start(t); o2.start(t); o.stop(t + sure + 0.1); o2.stop(t + sure + 0.1);
  }
  tin(vurgu) {
    if (!this.acik || !this.hazir) return;
    this.nota(NOTALAR[Math.floor(Math.random() * NOTALAR.length)], vurgu ? 0.035 : 0.02, vurgu ? 3.2 : 2.2);
  }
  soruTonu() {
    if (!this.acik || !this.hazir) return;
    this.nota(392, 0.03, 3.5, 0.5); this.nota(587.33, 0.02, 3.5, 0.9);
  }
}
