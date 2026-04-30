'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Slide = {
  src: string;
  title: string;
  section: 'Reading' | 'Listening' | 'Writing' | 'Speaking';
};

const OSS_BASE = 'https://dissidia.oss-cn-beijing.aliyuncs.com/celpip-compass/infographic';

const SLIDES: Slide[] = [
  { section: 'Reading',   title: 'Reading 提分总图',         src: `${OSS_BASE}/celpip-reading-score-overview.png` },
  { section: 'Reading',   title: 'Reading 高频题材预测',     src: `${OSS_BASE}/celpip-reading-frequent-topics.png` },
  { section: 'Listening', title: 'Listening 提分总图',       src: `${OSS_BASE}/celpip-listening-score-overview.png` },
  { section: 'Listening', title: 'Listening 不同题型答题套路', src: `${OSS_BASE}/celpip-listening-question-types-strategy.png` },
  { section: 'Listening', title: 'Listening 快速笔记法',     src: `${OSS_BASE}/celpip-listening-quick-notetaking.png` },
  { section: 'Writing',   title: 'Writing 提分总图',         src: `${OSS_BASE}/celpip-writing-score-overview.png` },
  { section: 'Writing',   title: 'Writing 高频题材预测',     src: `${OSS_BASE}/celpip-writing-frequent-topics.png` },
  { section: 'Speaking',  title: 'Speaking 看图说话答题套路', src: `${OSS_BASE}/celpip-speaking-picture-description.png` },
];

const INTERVAL_OPTIONS = [
  { label: '15 秒', value: 15000 },
  { label: '30 秒', value: 30000 },
  { label: '60 秒', value: 60000 },
  { label: '关闭', value: 0 },
];

type LoadState = 'pending' | 'loaded' | 'error';

export default function InfographicPage() {
  const [index, setIndex] = useState(0);
  const [intervalMs, setIntervalMs] = useState<number>(15000);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChrome, setShowChrome] = useState(true);
  const [loadStates, setLoadStates] = useState<LoadState[]>(() =>
    SLIDES.map(() => 'pending')
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // autoplay: timer resets every time `index` changes (manual or auto),
  // so a manual click gives the user a full intervalMs before the next auto-advance.
  useEffect(() => {
    if (intervalMs <= 0) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, intervalMs);
    return () => clearTimeout(t);
  }, [intervalMs, index]);

  // Preload all images on mount (~14MB total, OSS cached after first hit).
  useEffect(() => {
    SLIDES.forEach((slide, i) => {
      const img = new Image();
      img.onload = () => {
        setLoadStates((prev) => {
          if (prev[i] === 'loaded') return prev;
          const copy = [...prev];
          copy[i] = 'loaded';
          return copy;
        });
      };
      img.onerror = () => {
        setLoadStates((prev) => {
          if (prev[i] === 'error') return prev;
          const copy = [...prev];
          copy[i] = 'error';
          return copy;
        });
      };
      img.src = slide.src;
    });
  }, []);

  const retryLoad = useCallback((i: number) => {
    setLoadStates((prev) => {
      const copy = [...prev];
      copy[i] = 'pending';
      return copy;
    });
    const img = new Image();
    img.onload = () =>
      setLoadStates((prev) => {
        const copy = [...prev];
        copy[i] = 'loaded';
        return copy;
      });
    img.onerror = () =>
      setLoadStates((prev) => {
        const copy = [...prev];
        copy[i] = 'error';
        return copy;
      });
    // cache-bust to force re-fetch
    img.src = `${SLIDES[i].src}?retry=${Date.now()}`;
  }, []);

  // URL hash sync: /infographic#3 deeplinks to slide 3 (1-indexed).
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#(\d+)$/);
      if (m) {
        const i = parseInt(m[1], 10) - 1;
        if (i >= 0 && i < SLIDES.length) setIndex(i);
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const newHash = `#${index + 1}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  }, [index]);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, toggleFullscreen]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const bumpChrome = useCallback(() => {
    setShowChrome(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowChrome(false), 3000);
  }, []);

  useEffect(() => {
    bumpChrome();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [bumpChrome, index]);

  const current = SLIDES[index];
  const currentState = loadStates[index];

  // Build dot groups by section for visual grouping.
  const dotGroups: { section: Slide['section']; indices: number[] }[] = [];
  SLIDES.forEach((slide, i) => {
    const last = dotGroups[dotGroups.length - 1];
    if (last && last.section === slide.section) {
      last.indices.push(i);
    } else {
      dotGroups.push({ section: slide.section, indices: [i] });
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen min-h-dvh bg-black overflow-hidden select-none"
      style={{ height: '100dvh' }}
      onMouseMove={bumpChrome}
      onTouchStart={bumpChrome}
    >
      {/* main image with loading / error states */}
      {currentState === 'loaded' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current.src}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
          style={{ touchAction: 'pinch-zoom' }}
        />
      )}

      {currentState === 'pending' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 gap-4">
          <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <div className="text-sm opacity-70">加载中… {current.title}</div>
        </div>
      )}

      {currentState === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4 px-6 text-center">
          <div className="text-2xl">⚠️</div>
          <div className="text-base">图片加载失败</div>
          <div className="text-xs opacity-60 break-all max-w-md">{current.src}</div>
          <button
            onClick={() => retryLoad(index)}
            className="px-4 py-2 rounded bg-white/20 hover:bg-white/30 text-sm"
          >
            点击重试
          </button>
        </div>
      )}

      {/* screen reader announcer */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`${current.section} ${current.title}, 第 ${index + 1} 张，共 ${SLIDES.length} 张`}
      </div>

      {/* top bar */}
      <div
        className={`absolute top-0 left-0 right-0 px-4 sm:px-6 py-3 flex items-center justify-between gap-2 bg-gradient-to-b from-black/85 via-black/50 to-transparent text-white transition-opacity duration-300 ${showChrome ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Link
          href="/"
          className="text-sm sm:text-base px-3 py-1.5 rounded bg-white/15 hover:bg-white/25 backdrop-blur shrink-0"
        >
          ← 返回首页
        </Link>
        <div className="text-sm sm:text-base font-medium tracking-wide truncate min-w-0 flex-1 text-center">
          <span className="opacity-70 mr-2">{current.section}</span>
          {current.title}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={intervalMs}
            onChange={(e) => setIntervalMs(Number(e.target.value))}
            className="text-xs sm:text-sm bg-white/15 hover:bg-white/25 backdrop-blur rounded px-2 py-1.5 outline-none cursor-pointer"
            aria-label="自动切换间隔"
          >
            {INTERVAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-black">
                自动: {opt.label}
              </option>
            ))}
          </select>
          <button
            onClick={toggleFullscreen}
            className="text-xs sm:text-sm px-3 py-1.5 rounded bg-white/15 hover:bg-white/25 backdrop-blur"
            aria-label="切换全屏"
          >
            {isFullscreen ? '退出全屏' : '全屏 (F)'}
          </button>
        </div>
      </div>

      {/* prev / next */}
      <button
        onClick={prev}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur text-white text-2xl flex items-center justify-center transition-opacity duration-300 ${showChrome ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="上一张"
      >
        ‹
      </button>
      <button
        onClick={next}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur text-white text-2xl flex items-center justify-center transition-opacity duration-300 ${showChrome ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="下一张"
      >
        ›
      </button>

      {/* bottom indicator */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-4 sm:px-6 py-2 flex items-center justify-between gap-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white transition-opacity duration-300 ${showChrome ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="text-xs sm:text-sm tabular-nums shrink-0">
          {index + 1} / {SLIDES.length}
        </div>
        <div className="flex-1 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {dotGroups.map((group, gi) => (
            <div key={gi} className="flex items-center gap-1.5 sm:gap-2" aria-label={group.section}>
              {group.indices.map((i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="py-3 px-1 group"
                  aria-label={`跳到第 ${i + 1} 张：${SLIDES[i].section} ${SLIDES[i].title}`}
                  aria-current={i === index}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      i === index
                        ? 'bg-white w-8'
                        : 'bg-white/40 group-hover:bg-white/70 w-3'
                    }`}
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="text-xs sm:text-sm opacity-70 hidden sm:block shrink-0">
          ← / → 切换 · F 全屏
        </div>
      </div>
    </div>
  );
}
