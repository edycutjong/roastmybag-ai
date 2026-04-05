'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WalletStats, RoastResult } from '@/lib/types';
import { LOADING_MESSAGES } from '@/lib/constants';

import { sfx } from '@/components/sfx-engine';
import { useConfetti } from '@/components/confetti';
import { CanvasFireBackground } from '@/components/canvas-fire';
import ResultsView from '@/components/results-view';

type Phase = 'landing' | 'scanning' | 'roasting' | 'results';

// ─── Loading Screen ─────────────────────────────────────────
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

      <div className="w-72 space-y-2">
        <div className="flex justify-between text-xs text-(--text-muted)">
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

      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          className="text-lg text-(--text-secondary) font-medium text-center"
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

// ─── Footer Component ──────────────────────────────────────
function Footer({ className = '' }: { className?: string }) {
  return (
    <footer className={`relative z-10 text-center py-8 text-sm text-(--text-muted) border-t border-white/5 ${className}`}>
      <p>
        RoastMyBag.ai — Not financial advice. Just emotional damage. 💀
      </p>
      <p className="mt-1">
        Powered by{' '}
        <a
          href="https://four.meme/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--accent-fire) hover:underline"
        >
          Four.Meme
        </a>{' '}
        ×{' '}
        <a
          href="https://www.bnbchain.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--accent-gold) hover:underline"
        >
          BNB Chain
        </a>
      </p>
    </footer>
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
  const cacheRef = useRef<Record<string, { stats: WalletStats; roast: RoastResult }>>({});

  const handleSubmit = useCallback(async () => {
    const trimmed = address.trim();
    sfx.whoosh();

    const isDemoKeyword = trimmed.toLowerCase() === 'demo';
    const targetAddress = isDemoKeyword ? '0x0000000000000000000000000000000000000001' : trimmed;

    if (!isDemoKeyword && !/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
      setError('Invalid BSC wallet address. Try pasting a 0x... address or type "demo".');
      return;
    }

    setError('');

    if (cacheRef.current[targetAddress]) {
      const cached = cacheRef.current[targetAddress];
      setStats(cached.stats);
      setRoast(cached.roast);
      
      sfx.impact();
      setShowFlash(true);
      setShake(true);
      setTimeout(() => setShowFlash(false), 400);
      setTimeout(() => setShake(false), 500);
      fireConfetti();
      
      setPhase('results');
      return;
    }

    setPhase('scanning');

    try {
      if (isDemoKeyword) {
        await new Promise((r) => setTimeout(r, 3000));
      }

      const scanRes = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: targetAddress }),
      });
      const scanData = await scanRes.json();

      if (!scanData.success) {
        setError(scanData.error || 'Failed to scan wallet');
        setPhase('landing');
        return;
      }

      setStats(scanData.data);
      setPhase('roasting');

      if (isDemoKeyword) {
        await new Promise((r) => setTimeout(r, 2000));
      }

      const roastRes = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats: scanData.data }),
      });
      const roastData = await roastRes.json();

      if (!roastData.success) {
        setError(roastData.error || 'Failed to generate AI roast');
        setPhase('landing');
        return;
      }

      setRoast(roastData.data);
      cacheRef.current[targetAddress] = { stats: scanData.data, roast: roastData.data };

      sfx.impact();
      setShowFlash(true);
      setShake(true);
      setTimeout(() => setShowFlash(false), 400);
      setTimeout(() => setShake(false), 500);
      fireConfetti();

      setPhase('results');
    } catch (err) {
      console.error(err);
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

      {showFlash && <div className="flash-overlay" />}

      <canvas ref={canvasRef} className="confetti-canvas" />

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
            <span className="text-(--text-muted)">.ai</span>
          </span>
        </motion.div>
        <div className="flex items-center gap-4">
          <a
            href="https://four.meme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--text-muted) hover:text-white transition-colors"
          >
            Built on Four.Meme
          </a>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {phase === 'landing' && (
            <motion.div
              key="landing"
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center space-y-6 pt-8 md:pt-16 relative">
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
                  className="text-lg md:text-xl text-(--text-secondary) max-w-xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Paste your BSC wallet. See exactly how much money you left on the table.
                  Get a{' '}
                  <span className="text-(--accent-fire) font-semibold">
                    savage, data-driven AI roast
                  </span>{' '}
                  of every token you paper-handed.
                </motion.p>
              </div>

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
                    className="input-dark w-full px-6 py-5 text-lg font-mono"
                    id="wallet-input"
                    autoComplete="off"
                    spellCheck={false}
                    suppressHydrationWarning
                  />
                </div>

                {error && (
                  <motion.p
                    className="text-(--accent-red) text-sm text-center"
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

                <p className="text-center text-sm text-(--text-muted)">
                  Free • No wallet connection • View-only scan
                </p>
              </motion.div>

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
                    <p className="text-sm text-(--text-secondary)">{step.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <p className="text-sm text-(--text-muted)">
                  Built for the{' '}
                  <span className="text-(--accent-fire)">Four.Meme AI Sprint</span> on BNB
                  Chain
                </p>
              </motion.div>
              
              <Footer className="mt-auto pt-16 border-t-0" />
            </motion.div>
          )}

          {(phase === 'scanning' || phase === 'roasting') && (
            <motion.div
              key="loading"
              className="flex-1 flex flex-col items-center justify-center h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex-1 flex flex-col justify-center">
                <LoadingScreen phase={phase} />
              </div>
              <Footer className="w-full mt-auto" />
            </motion.div>
          )}

          {phase === 'results' && stats && roast && (
            <motion.div
              key="results"
              className="flex-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ResultsView stats={stats} roast={roast} onReset={handleReset} />
              <Footer className="w-full mt-auto" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
