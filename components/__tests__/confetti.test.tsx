import { renderHook, act } from '@testing-library/react';
import { useConfetti } from '../confetti';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useConfetti', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(() => cb(performance.now()), 16);
      return 1;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('provides canvasRef and fire function', () => {
    const { result } = renderHook(() => useConfetti());
    expect(result.current.canvasRef).toBeDefined();
    expect(typeof result.current.fire).toBe('function');
  });

  it('bails out early if canvas is null', () => {
    const { result } = renderHook(() => useConfetti());
    expect(() => {
      act(() => {
        result.current.fire();
      });
    }).not.toThrow();
  });

  it('runs animation logic if canvas is provided', () => {
    const { result } = renderHook(() => useConfetti());
    
    const mockCtx = {
      clearRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      globalAlpha: 1,
      fillStyle: '',
    };

    const mockCanvas = {
      getContext: vi.fn().mockReturnValue(mockCtx),
      width: 0,
      height: 0,
    } as unknown as HTMLCanvasElement;

    // Attach mock canvas
    result.current.canvasRef.current = mockCanvas;

    act(() => {
      result.current.fire();
    });

    // Advance timers so that requestAnimationFrame fires
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockCanvas.getContext).toHaveBeenCalledWith('2d');
    expect(mockCtx.clearRect).toHaveBeenCalled();
    expect(mockCtx.save).toHaveBeenCalled();
  });
  
  it('bails out if getContext returns null', () => {
    const { result } = renderHook(() => useConfetti());
    const mockCanvas = {
      getContext: vi.fn().mockReturnValue(null),
    } as unknown as HTMLCanvasElement;
    
    result.current.canvasRef.current = mockCanvas;
    
    act(() => {
      result.current.fire();
    });
    
    // getContext was called, but nothing threw
    expect(mockCanvas.getContext).toHaveBeenCalledWith('2d');
  });

  it('completes animation after maxFrames', () => {
    const { result } = renderHook(() => useConfetti());
    
    const mockCtx = {
      clearRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
    };

    const mockCanvas = {
      getContext: vi.fn().mockReturnValue(mockCtx),
      width: 100,
      height: 100,
    } as unknown as HTMLCanvasElement;

    result.current.canvasRef.current = mockCanvas;

    act(() => {
      result.current.fire();
    });

    mockCtx.clearRect.mockClear();

    // Advance beyond 120 frames (~16ms per frame = 2000ms is enough to pass 120 frames)
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // clearRect is called in the final frame to clean up
    expect(mockCtx.clearRect).toHaveBeenCalled();
  });
});
