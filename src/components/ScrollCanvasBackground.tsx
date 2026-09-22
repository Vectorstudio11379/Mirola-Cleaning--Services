import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 50;

const getFrameUrl = (frameIndex: number): string => {
  const padded = String(frameIndex).padStart(3, '0');
  return `/frames/ezgif-frame-${padded}.png`;
};

interface ScrollCanvasBackgroundProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const ScrollCanvasBackground: React.FC<ScrollCanvasBackgroundProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preloaded image element storage
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedSetRef = useRef<Set<number>>(new Set());

  // Animation interpolation refs
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number>(0);
  const isReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    // 1. Accessibility: check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // 2. High-DPI Canvas Resizing & Draw Logic
    const drawCurrentFrame = (frameNum: number) => {
      if (!canvas || !ctx) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetCanvasWidth = Math.round(width * dpr);
      const targetCanvasHeight = Math.round(height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      // Find target image or nearest loaded frame
      let img = imagesRef.current[frameNum];
      if (!img || !img.complete || img.naturalWidth === 0) {
        let bestDistance = Infinity;
        let bestFrame = 1;
        for (const loadedFrame of loadedSetRef.current) {
          const dist = Math.abs(loadedFrame - frameNum);
          if (dist < bestDistance) {
            bestDistance = dist;
            bestFrame = loadedFrame;
          }
        }
        img = imagesRef.current[bestFrame];
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      if (img && img.complete && img.naturalWidth > 0) {
        // Object-fit: cover with centered alignment
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;

        let drawW: number;
        let drawH: number;
        let offX: number;
        let offY: number;

        if (canvasRatio > imgRatio) {
          drawW = width;
          drawH = width / imgRatio;
          offX = 0;
          offY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * imgRatio;
          offX = (width - drawW) / 2;
          offY = 0;
        }

        ctx.drawImage(img, offX, offY, drawW, drawH);
      }
    };

    // 3. Progressive Preloading of Frames
    const preloadFrame = (index: number) => {
      if (index < 1 || index > TOTAL_FRAMES) return;
      if (imagesRef.current[index]) return;

      const img = new Image();
      img.src = getFrameUrl(index);
      img.decoding = 'async';
      imagesRef.current[index] = img;

      img.onload = () => {
        loadedSetRef.current.add(index);
        const currentRounded = Math.round(currentFrameRef.current);
        if (index === currentRounded || loadedSetRef.current.size === 1) {
          drawCurrentFrame(currentRounded);
        }
      };
    };

    // Initial frame 1 loaded immediately
    preloadFrame(1);

    // Wave 1: First 15 frames for immediate response
    for (let i = 2; i <= 15; i++) {
      preloadFrame(i);
    }

    // Wave 2: Keyframes across the sequence
    const t1 = setTimeout(() => {
      for (let i = 16; i <= TOTAL_FRAMES; i += 2) {
        preloadFrame(i);
      }
    }, 40);

    // Wave 3: Fill in all frames
    const t2 = setTimeout(() => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        preloadFrame(i);
      }
    }, 200);

    // 4. Scroll Target Tracking
    const updateScrollTarget = () => {
      const container = containerRef?.current || document.getElementById('hero');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;

      if (scrollableDist <= 0) {
        targetFrameRef.current = 1;
        return;
      }

      const scrolled = -rect.top;
      // Linear mapping across the exact scrollable runway: 0 = Frame 1, 100% = Frame 50
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDist));

      if (isReducedMotionRef.current) {
        targetFrameRef.current = 1;
      } else {
        targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
      }
    };

    // 5. Lerp Animation Loop
    let lastRenderedFrame = -1;
    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.001) {
        const lerpSpeed = Math.min(0.35, 0.18 + Math.abs(delta) * 0.004);
        currentFrameRef.current += delta * lerpSpeed;
      } else {
        currentFrameRef.current = target;
      }

      const frameToRender = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current)));

      if (frameToRender !== lastRenderedFrame || loadedSetRef.current.size === 1) {
        drawCurrentFrame(frameToRender);
        lastRenderedFrame = frameToRender;
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', () => {
      updateScrollTarget();
      drawCurrentFrame(Math.round(currentFrameRef.current));
    }, { passive: true });

    updateScrollTarget();

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('scroll', updateScrollTarget);
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [containerRef]);

  return (
    <div className="scroll-canvas-container" aria-hidden="true">
      {/* Scroll-Driven HTML5 Canvas */}
      <canvas ref={canvasRef} className="scroll-canvas" />

      {/* Cinematic Dark Luxury Vignette and Edge Blending Overlay */}
      <div className="canvas-cinematic-overlay" />
    </div>
  );
};
