import { SITE_CONTENT } from '../data/siteContent';

class AmbientAudioEngine {
  private audioEl: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private surfNode: AudioNode | null = null;
  private padTimer: number | null = null;
  private usingCustomFile = false;
  private isPlaying = false;
  private volume = 0.35;
  private listeners: Set<() => void> = new Set();

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      volume: this.volume,
      trackTitle: this.usingCustomFile
        ? SITE_CONTENT.backgroundMusic.trackTitle
        : 'Golden Hour Shore (Ambient Soundscape)',
    };
  }

  async start(): Promise<void> {
    if (this.isPlaying) return;

    // First try custom uploaded ambient track if present
    try {
      const res = await fetch(SITE_CONTENT.backgroundMusic.audioPath, {
        method: 'HEAD',
      });
      if (res.ok) {
        if (!this.audioEl) {
          this.audioEl = new Audio(SITE_CONTENT.backgroundMusic.audioPath);
          this.audioEl.loop = true;
        }
        this.audioEl.volume = this.volume;
        await this.audioEl.play();
        this.usingCustomFile = true;
        this.isPlaying = true;
        this.notify();
        return;
      }
    } catch {
      // Fall back to synthesized gentle coastal waves
    }

    this.startSynthesizedCoastalAmbiance();
  }

  private startSynthesizedCoastalAmbiance() {
    if (typeof window === 'undefined') return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    const ctx = this.ctx;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(
      Math.max(0.02, this.volume * 0.45),
      ctx.currentTime + 2.2
    );
    master.connect(ctx.destination);
    this.masterGain = master;

    // Soft filtered coastal wave noise
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 1.8;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(340, ctx.currentTime);

    const waveLfo = ctx.createOscillator();
    waveLfo.frequency.setValueAtTime(0.11, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(190, ctx.currentTime);
    waveLfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);

    const surfGain = ctx.createGain();
    surfGain.gain.setValueAtTime(0.28, ctx.currentTime);

    noise.connect(lowpass);
    lowpass.connect(surfGain);
    surfGain.connect(master);

    noise.start();
    waveLfo.start();
    this.surfNode = noise;

    // Gentle warm harmonic chords (Dmaj9 -> Gmaj7)
    const chords = [
      [146.83, 220.0, 277.18, 329.63],
      [196.0, 246.94, 293.66, 369.99],
    ];
    let chordIndex = 0;

    const playSoftChord = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freqs = chords[chordIndex % chords.length];
      chordIndex += 1;

      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.032 / (idx + 1), now + 1.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 6.5);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 6.7);
      });
    };

    this.isPlaying = true;
    playSoftChord();
    this.padTimer = window.setInterval(playSoftChord, 6800);
    this.notify();
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.padTimer !== null) {
      window.clearInterval(this.padTimer);
      this.padTimer = null;
    }
    if (this.surfNode && 'stop' in this.surfNode) {
      try {
        (this.surfNode as AudioBufferSourceNode).stop();
      } catch {
        // ignore if already stopped
      }
      this.surfNode = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      void this.ctx.suspend();
    }
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      void this.start();
    }
  }

  setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioEl) {
      this.audioEl.volume = this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        Math.max(0.001, this.volume * 0.45),
        this.ctx.currentTime,
        0.15
      );
    }
    this.notify();
  }
}

export const ambientAudio = new AmbientAudioEngine();
