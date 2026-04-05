'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { WalletStats, RoastResult, RoastBeat } from '@/lib/types';
import { JEET_TIERS } from '@/lib/constants';
import { sfx } from './sfx-engine';

export function AnimatedCounter({ value, prefix = '' }: { value: number; prefix?: string }) {
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

export function ScoreRing({ score }: { score: number }) {
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
        <span className="text-xs text-(--text-muted) mt-1">/ 100</span>
      </div>
    </div>
  );
}

export function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
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

export function RoastBeats({ beats, isPlaying, activeIndex }: { beats: RoastBeat[]; isPlaying: boolean; activeIndex: number }) {
  return (
    <div className="space-y-6">
      {beats.map((beat, i) => {
        const isTalking = isPlaying && activeIndex === i;
        const isDimmed = isPlaying && !isTalking;

        return (
        <motion.div
          key={i}
          className={`glass-card p-6 transition-all duration-500 ${isTalking ? 'border-glow-playing z-10 relative' : isDimmed ? 'opacity-40 scale-[0.98]' : 'hover:border-white/20'}`}
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ 
            opacity: isDimmed ? 0.4 : 1, 
            x: 0, 
            scale: isTalking ? 1.02 : isDimmed ? 0.98 : 1 
          }}
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
        );
      })}
    </div>
  );
}

export default function ResultsView({
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
  const [activeBeatIndex, setActiveBeatIndex] = useState<number>(-1);

  // Approximate TTS playback tracking for MP3 audio
  useEffect(() => {
    if (!isPlaying) {
      setActiveBeatIndex(-1);
      return;
    }

    let rafId: number;
    const trackProgress = () => {
      if (audioRef.current && !audioRef.current.paused && audioRef.current.duration > 0) {
        const audio = audioRef.current;
        const progress = audio.currentTime / audio.duration;
        
        // Approximate the length of each beat with some padding
        const lengths = roast.beats.map((b) => b.text.length + (b.highlight?.length || 0) + 15);
        const total = lengths.reduce((a, b) => a + b, 0);
        const target = progress * total;
        
        let accum = 0;
        let activeIdx = -1;
        for (let i = 0; i < lengths.length; i++) {
          accum += lengths[i];
          if (target <= accum) {
            activeIdx = i;
            break;
          }
        }
        
        if (activeIdx !== activeBeatIndex) {
            setActiveBeatIndex(activeIdx);
        }
      }
      
      rafId = requestAnimationFrame(trackProgress);
    };

    rafId = requestAnimationFrame(trackProgress);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, roast.beats, activeBeatIndex]);

  useEffect(() => {
    sfx.chime();
  }, []);

  const speakFallback = useCallback(() => {
    /* istanbul ignore if */
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(roast.script);
    utterance.rate = 1.1;
    utterance.pitch = 0.9;
    utterance.onend = () => {
      setIsPlaying(false);
      setActiveBeatIndex(-1);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setActiveBeatIndex(-1);
    };
    utterance.onboundary = (e) => {
      if (e.name === 'word') {
         const progress = e.charIndex / roast.script.length;
         const lengths = roast.beats.map((b) => b.text.length + (b.highlight?.length || 0) + 15);
         const total = lengths.reduce((a,b) => a+b, 0);
         const target = progress * total;
         
         let accum = 0;
         let activeIdx = -1;
         for (let i = 0; i < lengths.length; i++) {
           accum += lengths[i];
           if (target <= accum) {
             activeIdx = i;
             break;
           }
         }
         setActiveBeatIndex(activeIdx);
      }
    };
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [roast.script, roast.beats]);

  const handlePlayAudio = useCallback(async () => {
    if (isPlaying) {
      if (audioRef.current && audioUrl) {
        audioRef.current.pause();
      } else if (/* istanbul ignore next */ typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setAudioLoading(true);
    try {
      const abortController = new AbortController();
      const timeout = setTimeout(/* istanbul ignore next */ () => abortController.abort(), 15000);

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: roast.script }),
        signal: abortController.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        setAudioLoading(false);
        speakFallback();
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        speakFallback();
      };
      
      audio.play();
      setIsPlaying(true);
    } catch {
      setAudioLoading(false);
      speakFallback();
    }
    setAudioLoading(false);
  }, [audioUrl, isPlaying, roast.script, speakFallback]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          className="glass-card p-8 flex flex-col items-center border-glow-pulse"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <p className="text-sm text-(--text-muted) mb-4 uppercase tracking-wider">
            Jeet Score
          </p>
          <ScoreRing score={roast.jeetScore} />
        </motion.div>

        <motion.div
          className="glass-card p-8 flex flex-col justify-center gap-6 border-glow-pulse"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          <div>
            <p className="text-sm text-(--text-muted) uppercase tracking-wider">
              Total Left on Table
            </p>
            <p className="text-3xl font-bold text-(--accent-gold) mt-1">
              $<AnimatedCounter value={stats.totalMissedUsd} />
            </p>
          </div>
          <div>
            <p className="text-sm text-(--text-muted) uppercase tracking-wider">
              Tokens Jeeted
            </p>
            <p className="text-3xl font-bold text-(--accent-red) mt-1">
              <AnimatedCounter value={stats.tokensJeeted} />
            </p>
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-8 flex flex-col justify-center border-glow-pulse"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <p className="text-sm text-(--text-muted) uppercase tracking-wider">
            Worst Paper-Hand
          </p>
          {stats.worstSell ? (
            <div className="mt-3">
              <p className="text-2xl font-bold text-white">
                ${stats.worstSell.tokenSymbol}
              </p>
              <p className="text-lg text-(--accent-red) mt-1">
                Missed $<AnimatedCounter value={stats.worstSell.missedGains} />
              </p>
              <p className="text-sm text-(--text-muted) mt-2">
                Sold {stats.worstSell.sellDate}
              </p>
            </div>
          ) : (
            <p className="text-lg text-(--text-secondary) mt-3">
              No sells found (sus 🤔)
            </p>
          )}
        </motion.div>
      </div>

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
        <RoastBeats beats={roast.beats} isPlaying={isPlaying} activeIndex={activeBeatIndex} />
      </motion.div>

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
                className="damage-row flex items-center justify-between p-4 rounded-xl bg-white/2 hover:bg-white/4 transition-all duration-300 cursor-default"
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
                    <p className="text-sm text-(--text-muted)">
                      Sold {trade.sellDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-(--accent-red)">
                    -${trade.missedGains.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-(--text-muted)">
                    {trade.amountSold.toLocaleString()} tokens
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onReset();
          }}
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
