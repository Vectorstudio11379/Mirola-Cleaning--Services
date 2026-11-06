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
  const lastDrawnFrameRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // High-DPI Canvas Resizing & Draw Logic
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
        lastDrawnFrameRef.current = frameNum;
      }
    };

    // Priority & Progressive Frame Preloader
    const preloadFrame = (index: number) => {
      if (index < 1 || index > TOTAL_FRAMES) return;
      if (imagesRef.current[index]) return;

      const img = new Image();
      img.src = getFrameUrl(index);
      imagesRef.current[index] = img;

      img.onload = () => {
        loadedSetRef.current.add(index);
        const currentRounded = Math.round(currentFrameRef.current);
        // If this image is the active frame, or if we haven't rendered yet, redraw immediately
        if (index === currentRounded || lastDrawnFrameRef.current !== currentRounded) {
          drawCurrentFrame(currentRounded);
        }
      };

      img.onerror = () => {
        // Fallback retry
        console.warn(`[ScrollCanvas] Failed to load frame ${index}`);
      };
    };

    // Preload surrounding frames dynamically as user scrolls
    const preloadSurroundingFrames = (centerIndex: number) => {
      const start = Math.max(1, centerIndex - 4);
      const end = Math.min(TOTAL_FRAMES, centerIndex + 12);
      for (let i = start; i <= end; i++) {
        preloadFrame(i);
      }
    };

    // Preload initial critical waves
    preloadFrame(1);
    for (let i = 2; i <= 15; i++) {
      preloadFrame(i);
    }

    const t1 = setTimeout(() => {
      for (let i = 16; i <= TOTAL_FRAMES; i += 2) {
        preloadFrame(i);
      }
    }, 40);

    const t2 = setTimeout(() => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        preloadFrame(i);
      }
    }, 180);

    // Scroll Target Tracking with 82% completion runway
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
      // Complete all 50 frames across 84% of runway so user enjoys holding the finished state
      const ANIMATION_END_PERCENT = 0.84;
      const rawProgress = scrolled / (scrollableDist * ANIMATION_END_PERCENT);
      const progress = Math.max(0, Math.min(1, rawProgress));

      const calculatedTarget = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = calculatedTarget;
      preloadSurroundingFrames(Math.round(calculatedTarget));
    };

    // Responsive Lerp Loop
    const BASE_LERP = 0.22;
    const tick = () => {
      // Re-evaluate scroll target on each frame to guarantee 100% responsiveness
      updateScrollTarget();

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.001) {
        const dynamicLerp = Math.min(0.4, BASE_LERP + Math.abs(delta) * 0.005);
        currentFrameRef.current += delta * dynamicLerp;
      } else {
        currentFrameRef.current = target;
      }

      const frameToRender = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current)));

      // Render if frame changed or if we need to paint the loaded frame
      if (frameToRender !== lastDrawnFrameRef.current || loadedSetRef.current.size === 1) {
        drawCurrentFrame(frameToRender);
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
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [containerRef]);

  return (
    <div className="scroll-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="scroll-canvas" />
      <div className="canvas-cinematic-overlay" />
    </div>
  );
};
