import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 150;

// Helper to format frame filename: ezgif-frame-001.png -> ezgif-frame-150.png
const getFrameUrl = (frameIndex: number): string => {
  const padded = String(frameIndex).padStart(3, '0');
  return `/frames/ezgif-frame-${padded}.png`;
};

interface ScrollCanvasBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const ScrollCanvasBackground: React.FC<ScrollCanvasBackgroundProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Storage for loaded HTMLImageElement objects
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedSetRef = useRef<Set<number>>(new Set());

  // Animation interpolation refs
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number>(0);
  const isReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
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

    // 2. High-DPI Canvas Resizing & Draw logic
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

      // Find the requested image or the closest already loaded image
      let img = imagesRef.current[frameNum];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // Fallback search: find nearest loaded frame so canvas NEVER goes blank or flickers
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

      // Reset transform
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dark luxury background fill
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

    // 3. Priority & Progressive Frame Preloader
    const preloadFrame = (index: number) => {
      if (index < 1 || index > TOTAL_FRAMES || imagesRef.current[index]) return;

      const img = new Image();
      img.src = getFrameUrl(index);
      imagesRef.current[index] = img;

      img.onload = () => {
        loadedSetRef.current.add(index);
        const currentRounded = Math.round(currentFrameRef.current);
        if (index === currentRounded || loadedSetRef.current.size === 1) {
          drawCurrentFrame(currentRounded);
        }
      };
    };

    // Preload Frame 1 immediately
    preloadFrame(1);

    // Wave 1: Immediate chunk (Frames 2-30)
    for (let i = 2; i <= 30; i++) {
      preloadFrame(i);
    }

    // Wave 2: Keyframes across the sequence (every 4th frame)
    const keyframesTimer = setTimeout(() => {
      for (let i = 32; i <= TOTAL_FRAMES; i += 4) {
        preloadFrame(i);
      }
    }, 50);

    // Wave 3: Fill in all remaining frames
    const allFramesTimer = setTimeout(() => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        preloadFrame(i);
      }
    }, 250);

    // Preload window around active scroll target dynamically
    const preloadSurroundingFrames = (centerIndex: number) => {
      const start = Math.max(1, centerIndex - 5);
      const end = Math.min(TOTAL_FRAMES, centerIndex + 20);
      for (let i = start; i <= end; i++) {
        preloadFrame(i);
      }
    };

    // 4. Scroll Progress Calculation
    // Ensure the animation completes well before the user finishes scrolling through the container
    const updateScrollTarget = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;

      if (scrollableDist <= 0) {
        targetFrameRef.current = 1;
        return;
      }

      const scrolled = -rect.top;
      
      // CRITICAL: Complete the 150 frames at 78% of the scroll track.
      // This guarantees the animation reaches Frame 150 and holds it for the remaining 22%
      // before the sticky container reaches its end or goes down!
      const ANIMATION_END_PERCENT = 0.78;
      const rawProgress = scrolled / (scrollableDist * ANIMATION_END_PERCENT);
      const progress = Math.max(0, Math.min(1, rawProgress));

      if (isReducedMotionRef.current) {
        targetFrameRef.current = 1;
      } else {
        const calculatedTarget = 1 + progress * (TOTAL_FRAMES - 1);
        targetFrameRef.current = calculatedTarget;
        preloadSurroundingFrames(Math.round(calculatedTarget));
      }
    };

    // 5. Continuous requestAnimationFrame Lerp Loop
    let lastRenderedFrame = -1;
    const BASE_LERP = 0.16;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      // Snap quickly when approaching boundaries so it doesn't linger
      if (target >= TOTAL_FRAMES && current >= TOTAL_FRAMES - 1.5) {
        currentFrameRef.current = TOTAL_FRAMES;
      } else if (target <= 1 && current <= 2.5) {
        currentFrameRef.current = 1;
      } else if (Math.abs(delta) > 0.001) {
        // Dynamic lerp: responsive when scrolling fast, silky smooth when scrolling gently
        const dynamicLerp = Math.min(0.35, BASE_LERP + Math.abs(delta) * 0.003);
        currentFrameRef.current += delta * dynamicLerp;
      } else {
        currentFrameRef.current = target;
      }

      const frameToRender = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current)));

      // Render if frame changed or canvas needs initial draw
      if (frameToRender !== lastRenderedFrame || loadedSetRef.current.size === 1) {
        drawCurrentFrame(frameToRender);
        lastRenderedFrame = frameToRender;
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    // Start persistent animation loop
    animFrameIdRef.current = requestAnimationFrame(tick);

    // Listen to scroll events passively
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', () => {
      updateScrollTarget();
      drawCurrentFrame(Math.round(currentFrameRef.current));
    }, { passive: true });

    // Initial calculation
    updateScrollTarget();

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('scroll', updateScrollTarget);
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(keyframesTimer);
      clearTimeout(allFramesTimer);
    };
  }, [containerRef]);

  return (
    <div className="scroll-canvas-container" aria-hidden="true">
      {/* Pinned full-screen HTML5 Canvas */}
      <canvas ref={canvasRef} className="scroll-canvas" />

      {/* Cinematic Dark Luxury Vignette and Edge Blending Overlay */}
      <div className="canvas-cinematic-overlay" />
    </div>
  );
};
