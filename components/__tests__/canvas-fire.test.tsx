import { render, act } from '@testing-library/react';
import { CanvasFireBackground } from '../canvas-fire';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('CanvasFireBackground', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(() => cb(performance.now()), 16);
      return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(clearTimeout);

    // Instead of Object.defineProperty on prototype, let's just make the component tolerate this
    // The issue was getContext('2d') returns our mock, but width hasn't been mocked safely.
    // Let's use vi.spyOn getContext inside tests individually, or inject an overridden createElement.

    const MockObserver = vi.fn().mockImplementation(function(this: any, callback: any) {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
        trigger: (entries: IntersectionObserverEntry[]) => callback(entries)
      };
    });
    vi.stubGlobal('IntersectionObserver', MockObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders canvas element and handles resize and animation gracefully', () => {
    const mockCtx = {
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      globalAlpha: 1,
      fillStyle: '#000',
    };
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockCtx as any);
    
    const { container, unmount } = render(<CanvasFireBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).not.toBeNull();
    
    // Trigger intersection observer to start animation
    const mockObserverInstance = (window as any).IntersectionObserver.mock.results[0].value;
    act(() => mockObserverInstance.trigger([{ isIntersecting: true }]));
    
    // Advance timers so animation frames execute (creating embers)
    // We need random numbers to allow embers creation (Math.random() > 0.85)
    // Let's mock random to always be 0.9 to create embers safely and predictably
    const randSpy = vi.spyOn(Math, 'random').mockReturnValue(0.9);
    
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Run again with random 0.1 to let them update and remove
    // We advance by 10000ms to ensure embers die out due to alpha < 0.01 or y < -20
    randSpy.mockReturnValue(0.1);
    act(() => {
      vi.advanceTimersByTime(10000);
      window.dispatchEvent(new Event('resize'));
    });
    
    // Let's trigger intersection false
    act(() => mockObserverInstance.trigger([{ isIntersecting: false }]));

    randSpy.mockRestore();
    unmount();
  });

  it('bails out gracefully if getContext returns null', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    expect(() => render(<CanvasFireBackground />)).not.toThrow();
  });

});
