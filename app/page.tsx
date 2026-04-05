'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WalletStats, RoastResult, RoastBeat } from '@/lib/types';
import { LOADING_MESSAGES, JEET_TIERS } from '@/lib/constants';

// ─── Type helpers ──────────────────────────────────────────
type Phase = 'landing' | 'scanning' | 'roasting' | 'results';

// ─── Web Audio SFX Engine ──────────────────────────────────
class SFX {
  private ctx: AudioContext | null = null;

  private getCtx() {
    if (!this.ctx) this.ctx = new AudioContext();
    return this.ctx;
  }

  // Fire whoosh — sweep filter on white noise
  whoosh() {
    try {
      const ctx = this.getCtx();
      const duration = 0.6;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.3);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + duration);
      filter.Q.value = 2;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start();
      src.stop(ctx.currentTime + duration);
    } catch { /* audio not available */ }
  }

  // Impact hit — short bass thud
  impact() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch { /* audio not available */ }
  }

  // Score reveal — ascending chime
  chime() {
    try {
      const ctx = this.getCtx();
      const freqs = [523, 659, 784, 1047]; // C5 E5 G5 C6
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + i * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.4);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.5);
      });
    } catch { /* audio not available */ }
  }
}

const sfx = new SFX();

// ─── Confetti Explosion ────────────────────────────────────
function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fire = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff4500', '#ff6b35', '#ffd700', '#ff3333', '#ff8c00', '#ffffff'];
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; alpha: number; rotation: number; spin: number;
      shape: 'rect' | 'circle';
    }[] = [];

    for (let i = 0; i < 150; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = 4 + Math.random() * 12;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    let frame = 0;
    const maxFrames = 120;

    const animate = () => {
      if (frame >= maxFrames) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.99;
        p.alpha *= 0.98;
        p.rotation += p.spin;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return { canvasRef, fire };
}

// ─── Canvas Fire Background (client-only) ──────────────────
function CanvasFireBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const embers: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#ff4500', '#ff6b35', '#ffd700', '#ff8c00'];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (embers.length < 40 && Math.random() > 0.85) {
        embers.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(0.5 + Math.random() * 1.5),
          size: 1.5 + Math.random() * 3,
          alpha: 0.2 + Math.random() * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx + Math.sin(e.y * 0.01) * 0.3;
        e.y += e.vy;
        e.alpha *= 0.997;
        e.size *= 0.999;

        if (e.alpha < 0.01 || e.y < -20) {
          embers.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.globalAlpha = e.alpha;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.globalAlpha = e.alpha * 0.15;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}

// ─── Animated Counter ──────────────────────────────────────
function AnimatedCounter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span>{prefix}{display.toLocaleString()}</span>;
}

// ─── Score Ring SVG ────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="score-ring score-ring-glow mx-auto">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <defs>
          <linearGradient id="fire-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4500" />
            <stop offset="50%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
        </defs>
        <circle className="score-ring-bg" cx="90" cy="90" r="70" />
        <motion.circle
          className="score-ring-fill"
          cx="90" cy="90" r="70"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold fire-text"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-[var(--text-muted)] mt-1">/ 100</span>
      </div>
    </div>
  );
}

// ─── Loading Screen (enhanced) ─────────────────────────────
function LoadingScreen({ phase }: { phase: 'scanning' | 'roasting' }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const baseRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Continuous progress: scanning = 0→50%, roasting = 50→95%
  useEffect(() => {
    const rangeStart = phase === 'scanning' ? 0 : 50;
    const rangeEnd = phase === 'scanning' ? 50 : 95;
    const duration = phase === 'scanning' ? 3000 : 5000;
    baseRef.current = rangeStart;

    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const value = Math.round(rangeStart + p * (rangeEnd - rangeStart));
      setProgress(value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated fire icon with orbiting embers */}
      <div className="relative">
        <motion.div
          className="text-8xl"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          🔥
        </motion.div>
        {/* Orbiting sparks */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i === 0 ? '#ff4500' : i === 1 ? '#ffd700' : '#ff6b35',
              top: '50%', left: '50%',
            }}
            animate={{
              x: [0, 40, 0, -40, 0],
              y: [-40, 0, 40, 0, -40],
              opacity: [0.8, 0.4, 0.8],
              scale: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.66,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Progress bar with percentage */}
      <div className="w-72 space-y-2">
        <div className="flex justify-between text-xs text-[var(--text-muted)]">
          <span>{phase === 'scanning' ? 'Scanning' : 'Roasting'}...</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #ff4500, #ffd700)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Rotating messages */}
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          className="text-lg text-[var(--text-secondary)] font-medium text-center"
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.4 }}
        >
          {LOADING_MESSAGES[msgIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Typewriter Text ───────────────────────────────────────
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let i = 0;

    timeout = setTimeout(() => {
      const type = () => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, 18 + Math.random() * 25);
        } else {
          setDone(true);
        }
      };
      type();
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor" />}
    </span>
  );
}

// ─── Roast Beat Display (with typewriter) ──────────────────
function RoastBeats({ beats }: { beats: RoastBeat[] }) {
  return (
    <div className="space-y-6">
      {beats.map((beat, i) => (
        <motion.div
          key={i}
          className="glass-card p-6 border-glow-pulse"
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: i * 1.2 + 0.5, duration: 0.6, type: 'spring', stiffness: 120 }}
        >
          <div className="flex items-start gap-4">
            <motion.span
              className="text-2xl mt-1"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 1.2 + 0.7, type: 'spring' }}
            >
              {beat.type === 'opening' && '🎯'}
              {beat.type === 'data' && '📊'}
              {beat.type === 'comparison' && '💸'}
              {beat.type === 'closing' && '🔥'}
            </motion.span>
            <div>
              <p className="roast-text text-white/90">
                <TypewriterText text={beat.text} delay={i * 1200 + 800} />
              </p>
              {beat.highlight && (
                <motion.p
                  className="mt-3 text-2xl font-bold fire-text number-pop"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 1.2 + 2, type: 'spring', stiffness: 300 }}
                >
                  {beat.highlight}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Results View ──────────────────────────────────────────
function ResultsView({
  stats,
  roast,
  onReset,
}: {
  stats: WalletStats;
  roast: RoastResult;
  onReset: () => void;
}) {
  const tier = JEET_TIERS.find((t) => roast.jeetScore >= t.min && roast.jeetScore <= t.max);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  // Play chime SFX when results mount
  useEffect(() => {
    sfx.chime();
  }, []);

  const handlePlayAudio = useCallback(async () => {
    if (audioUrl) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
      return;
    }

    setAudioLoading(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: roast.script }),
      });

      if (!res.ok) {
        setAudioLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    } catch {
      // TTS not available
    }
    setAudioLoading(false);
  }, [audioUrl, isPlaying, roast.script]);

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          className="text-7xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.2 }}
        >
          {tier?.emoji || '🔥'}
        </motion.div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold fire-text-animated text-shadow-fire"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {roast.title}
        </motion.h2>
      </div>

      {/* Score + Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Jeet Score */}
        <motion.div
          className="glass-card p-8 flex flex-col items-center border-glow-pulse"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <p className="text-sm text-[var(--text-muted)] mb-4 uppercase tracking-wider">
            Jeet Score
          </p>
          <ScoreRing score={roast.jeetScore} />
        </motion.div>

        {/* Stats */}
        <motion.div
          className="glass-card p-8 flex flex-col justify-center gap-6 border-glow-pulse"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          <div>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
              Total Left on Table
            </p>
            <p className="text-3xl font-bold text-[var(--accent-gold)] mt-1">
              $<AnimatedCounter value={stats.totalMissedUsd} />
            </p>
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
              Tokens Jeeted
            </p>
            <p className="text-3xl font-bold text-[var(--accent-red)] mt-1">
              <AnimatedCounter value={stats.tokensJeeted} />
            </p>
          </div>
        </motion.div>

        {/* Worst Sell */}
        <motion.div
          className="glass-card p-8 flex flex-col justify-center border-glow-pulse"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
            Worst Paper-Hand
          </p>
          {stats.worstSell ? (
            <div className="mt-3">
              <p className="text-2xl font-bold text-white">
                ${stats.worstSell.tokenSymbol}
              </p>
              <p className="text-lg text-[var(--accent-red)] mt-1">
                Missed $<AnimatedCounter value={stats.worstSell.missedGains} />
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                Sold {stats.worstSell.sellDate}
              </p>
            </div>
          ) : (
            <p className="text-lg text-[var(--text-secondary)] mt-3">
              No sells found (sus 🤔)
            </p>
          )}
        </motion.div>
      </div>

      {/* AI Roast */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🎤 Your AI Roast
          </h3>
          <button
            onClick={handlePlayAudio}
            disabled={audioLoading}
            className="btn-fire px-5 py-2.5 text-sm flex items-center gap-2"
          >
            {audioLoading ? (
              <span className="animate-spin">⏳</span>
            ) : isPlaying ? (
              '⏸️ Pause'
            ) : (
              '🔊 Hear It'
            )}
          </button>
        </div>
        <RoastBeats beats={roast.beats} />
      </motion.div>

      {/* Trade Breakdown */}
      {stats.trades.length > 0 && (
        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">📋 Full Damage Report</h3>
          <div className="space-y-3">
            {stats.trades.map((trade, i) => (
              <motion.div
                key={i}
                className="damage-row flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.15 }}
                whileHover={{ x: 4, backgroundColor: 'rgba(255,69,0,0.05)' }}
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    className="text-xl"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  >
                    💀
                  </motion.span>
                  <div>
                    <p className="font-semibold text-white">${trade.tokenSymbol}</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Sold {trade.sellDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[var(--accent-red)]">
                    -${trade.missedGains.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {trade.amountSold.toLocaleString()} tokens
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={onReset}
          className="btn-fire px-8 py-4 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔥 Roast Another Wallet
        </motion.button>
        <motion.button
          onClick={() => {
            const text = `I just got roasted by @RoastMyBag_ai 🔥\n\nJeet Score: ${roast.jeetScore}/100 — ${roast.title}\nLeft $${stats.totalMissedUsd.toLocaleString()} on the table 💀\n\nPaste your wallet and get exposed 👇\nhttps://roastmybag.ai`;
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
              '_blank'
            );
          }}
          className="glass-card px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-colors text-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🐦 Share on X
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function Home() {
  const [phase, setPhase] = useState<Phase>('landing');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<WalletStats | null>(null);
  const [roast, setRoast] = useState<RoastResult | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const { canvasRef, fire: fireConfetti } = useConfetti();

  const handleSubmit = useCallback(async () => {
    const trimmed = address.trim();

    // Play whoosh SFX on submit
    sfx.whoosh();

    // Allow "demo" keyword
    if (trimmed.toLowerCase() === 'demo') {
      setPhase('scanning');
      setError('');
      // Simulate scan
      await new Promise((r) => setTimeout(r, 3000));

      const scanRes = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: '0x0000000000000000000000000000000000000001' }),
      });
      const scanData = await scanRes.json();
      setStats(scanData.data);

      // Generate roast
      setPhase('roasting');
      await new Promise((r) => setTimeout(r, 2000));

      const roastRes = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats: scanData.data }),
      });
      const roastData = await roastRes.json();
      setRoast(roastData.data);

      // IMPACT! Screen shake + flash + confetti
      sfx.impact();
      setShowFlash(true);
      setShake(true);
      setTimeout(() => setShowFlash(false), 400);
      setTimeout(() => setShake(false), 500);
      fireConfetti();

      setPhase('results');
      return;
    }

    // Validate address
    if (!/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
      setError('Invalid BSC wallet address. Try pasting a 0x... address or type "demo".');
      return;
    }

    setError('');
    setPhase('scanning');

    try {
      // Scan wallet
      const scanRes = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: trimmed }),
      });
      const scanData = await scanRes.json();

      if (!scanData.success) {
        setError(scanData.error || 'Failed to scan wallet');
        setPhase('landing');
        return;
      }

      setStats(scanData.data);
      setPhase('roasting');

      // Generate roast
      const roastRes = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats: scanData.data }),
      });
      const roastData = await roastRes.json();
      setRoast(roastData.data);

      // IMPACT!
      sfx.impact();
      setShowFlash(true);
      setShake(true);
      setTimeout(() => setShowFlash(false), 400);
      setTimeout(() => setShake(false), 500);
      fireConfetti();

      setPhase('results');
    } catch {
      setError('Something went wrong. Try again.');
      setPhase('landing');
    }
  }, [address, fireConfetti]);

  const handleReset = useCallback(() => {
    setPhase('landing');
    setAddress('');
    setStats(null);
    setRoast(null);
    setError('');
  }, []);

  return (
    <div className={`relative min-h-screen bg-grid overflow-x-hidden${shake ? ' screen-shake' : ''}`}>
      <CanvasFireBackground />
      <div className="scanline" />

      {/* Flash overlay */}
      {showFlash && <div className="flash-overlay" />}

      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="confetti-canvas" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🔥
          </motion.span>
          <span className="text-lg font-bold">
            <span className="fire-text">RoastMyBag</span>
            <span className="text-[var(--text-muted)]">.ai</span>
          </span>
        </motion.div>
        <div className="flex items-center gap-4">
          <a
            href="https://fourmeme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
          >
            Built on Four.Meme
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {/* ── Landing ── */}
          {phase === 'landing' && (
            <motion.div
              key="landing"
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero */}
              <div className="text-center space-y-6 pt-8 md:pt-16 relative">
                {/* Radial glow */}
                <div className="hero-glow" />

                <motion.div
                  className="text-7xl md:text-9xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🔥
                  </motion.span>
                </motion.div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="fire-text-animated text-shadow-fire">Get Your Bags</span>
                  <br />
                  <motion.span
                    className="text-white inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Roasted by AI
                  </motion.span>
                </h1>
                <motion.p
                  className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Paste your BSC wallet. See exactly how much money you left on the table.
                  Get a{' '}
                  <span className="text-[var(--accent-fire)] font-semibold">
                    savage, data-driven AI roast
                  </span>{' '}
                  of every token you paper-handed.
                </motion.p>
              </div>

              {/* Input */}
              <motion.div
                className="max-w-xl mx-auto space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder='Paste BSC wallet address or type "demo"'
                    className="input-dark w-full px-6 py-5 text-lg font-[family-name:var(--font-mono)]"
                    id="wallet-input"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>

                {error && (
                  <motion.p
                    className="text-[var(--accent-red)] text-sm text-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: [0, -4, 4, -3, 3, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  onClick={handleSubmit}
                  className="btn-fire w-full py-5 text-xl pulse-glow"
                  id="roast-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  🔥 Roast My Bag
                </motion.button>

                <p className="text-center text-sm text-[var(--text-muted)]">
                  Free • No wallet connection • View-only scan
                </p>
              </motion.div>

              {/* How it works */}
              <div className="grid md:grid-cols-3 gap-6 pt-8">
                {[
                  {
                    emoji: '📡',
                    title: 'Scan',
                    desc: 'We pull your BEP-20 token transfers from BSCScan',
                  },
                  {
                    emoji: '🧮',
                    title: 'Calculate',
                    desc: "Compare sell prices with today's value to find missed gains",
                  },
                  {
                    emoji: '🎤',
                    title: 'Roast',
                    desc: 'GPT-4o crafts a data-driven roast of your worst decisions',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.title}
                    className="stat-card text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.15, type: 'spring' }}
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="text-4xl mb-3"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    >
                      {step.emoji}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Social proof */}
              <motion.div
                className="text-center pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <p className="text-sm text-[var(--text-muted)]">
                  Built for the{' '}
                  <span className="text-[var(--accent-fire)]">Four.Meme AI Sprint</span> on BNB
                  Chain
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* ── Scanning / Roasting ── */}
          {(phase === 'scanning' || phase === 'roasting') && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScreen phase={phase} />
            </motion.div>
          )}

          {/* ── Results ── */}
          {phase === 'results' && stats && roast && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ResultsView stats={stats} roast={roast} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm text-[var(--text-muted)] border-t border-white/5">
        <p>
          RoastMyBag.ai — Not financial advice. Just emotional damage. 💀
        </p>
        <p className="mt-1">
          Powered by{' '}
          <a
            href="https://fourmeme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-fire)] hover:underline"
          >
            Four.Meme
          </a>{' '}
          ×{' '}
          <a
            href="https://www.bnbchain.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-gold)] hover:underline"
          >
            BNB Chain
          </a>
        </p>
      </footer>
    </div>
  );
}
