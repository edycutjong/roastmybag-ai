import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Page from '../page';
import * as sfxEngine from '@/components/sfx-engine';

// Mock child components to isolate tests
vi.mock('@/components/canvas-fire', () => ({
  CanvasFireBackground: () => <div data-testid="canvas-fire" />
}));

vi.mock('@/components/confetti', () => ({
  useConfetti: () => ({
    canvasRef: { current: null },
    fire: vi.fn()
  })
}));

vi.mock('@/components/results-view', () => ({
  default: ({ onReset }: any) => (
    <div data-testid="results-view">
      <button onClick={onReset} data-testid="reset-button">Reset</button>
    </div>
  )
}));

// Mock framer-motion to avoid animation stalls in jsdom
vi.mock('framer-motion', async () => {
  const React = await import('react');
  const Component = React.forwardRef(({ children, initial, animate, exit, transition, whileHover, whileTap, ...props }: any, ref: any) => {
    return React.createElement('div', { ref, ...props }, children);
  });
  return {
    motion: {
      div: Component,
      span: Component,
      p: Component,
      button: Component,
    },
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
  };
});

// Mock Audio to prevent test errors
global.Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  currentTime: 0,
})) as any;

describe('Home Page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    // Mock the SFX engine methods
    vi.spyOn(sfxEngine.sfx, 'whoosh').mockImplementation(() => {});
    vi.spyOn(sfxEngine.sfx, 'impact').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('renders landing phase initially', () => {
    render(<Page />);
    expect(screen.getByText('Get Your Bags')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Paste BSC wallet address/i)).toBeInTheDocument();
  });

  it('shows error for invalid BSC address', async () => {
    render(<Page />);
    
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    const btn = screen.getByText('🔥 Roast My Bag');

    fireEvent.change(input, { target: { value: 'invalid address' } });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText(/Invalid BSC wallet address/i)).toBeInTheDocument();
    });
    
    // SFX whoosh triggers on click
    expect(sfxEngine.sfx.whoosh).toHaveBeenCalled();
  });

  it('handles full submission flow successfully (mocked data)', async () => {
    const mockScanData = { success: true, data: { jeetScore: 80 } };
    const mockRoastData = { success: true, data: { script: 'You got roasted' } };

    // Mock fetch twice: once for scan, once for roast
    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockScanData
      })
      .mockResolvedValueOnce({
        json: async () => mockRoastData
      });

    render(<Page />);
    
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    const btn = screen.getByText('🔥 Roast My Bag');

    fireEvent.change(input, { target: { value: '0x1234567890123456789012345678901234567890' } });
    fireEvent.click(btn);

    // Initial click plays sound and fires off fetch
    expect(sfxEngine.sfx.whoosh).toHaveBeenCalled();
    
    // We expect it to eventually reach the ResultsView phase
    await waitFor(() => {
      expect(screen.getByTestId('results-view')).toBeInTheDocument();
    });

    // Check that we hit the endpoints
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(sfxEngine.sfx.impact).toHaveBeenCalled();
  });

  it('handles scan error fallback', async () => {
    const mockScanData = { success: false, error: 'Scan Failed' };
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => mockScanData
    });

    render(<Page />);
    
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    const btn = screen.getByText('🔥 Roast My Bag');

    fireEvent.change(input, { target: { value: '0x1234567890123456789012345678901234567890' } });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText('Scan Failed')).toBeInTheDocument();
    });
  });

  it('handles roast error fallback', async () => {
    const mockScanData = { success: true, data: { jeetScore: 80 } };
    const mockRoastData = { success: false, error: 'Roast Failed' };

    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockScanData
      })
      .mockResolvedValueOnce({
        json: async () => mockRoastData
      });

    render(<Page />);
    
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    const btn = screen.getByText('🔥 Roast My Bag');

    fireEvent.change(input, { target: { value: '0x1234567890123456789012345678901234567890' } });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText('Roast Failed')).toBeInTheDocument();
    });
  });

  it('handles hitting Enter key to submit', async () => {
    render(<Page />);
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    fireEvent.change(input, { target: { value: 'invalid-address' } });
    
    // Press enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/Invalid BSC wallet address/i)).toBeInTheDocument();
    });
  });

  it('supports caching by restoring cached stats rather than refetching', async () => {
    const mockScanData = { success: true, data: { jeetScore: 80 } };
    const mockRoastData = { success: true, data: { script: 'You got roasted' } };

    (global.fetch as any)
      .mockResolvedValueOnce({ json: async () => mockScanData })
      .mockResolvedValueOnce({ json: async () => mockRoastData });

    render(<Page />);
    
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    const btn = screen.getByText('🔥 Roast My Bag');

    fireEvent.change(input, { target: { value: '0x1234567890123456789012345678901234567890' } });
    fireEvent.click(btn);

    // Wait to reach results
    await waitFor(() => {
      expect(screen.getByTestId('results-view')).toBeInTheDocument();
    });
    
    // 2 fetches done
    expect(fetch).toHaveBeenCalledTimes(2);

    // Reset via header logo (or results view reset)
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);

    // Back at landing
    expect(screen.getByPlaceholderText(/Paste BSC wallet address/i)).toBeInTheDocument();

    // Now submit same address again!
    act(() => {
      const inputAgain = screen.getByPlaceholderText(/Paste BSC wallet address/i);
      fireEvent.change(inputAgain, { target: { value: '0x1234567890123456789012345678901234567890' } });
      const btnAgain = screen.getByText('🔥 Roast My Bag');
      fireEvent.click(btnAgain);
    });

    // Directly transitions to results view without new fetches!
    await waitFor(() => {
      expect(screen.getByTestId('results-view')).toBeInTheDocument();
    });

    // Still exactly 2 fetches!
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('goes to demo flow immediately if text is "demo"', async () => {
    const mockScanData = { success: true, data: { jeetScore: 80 } };
    const mockRoastData = { success: true, data: { script: 'You got roasted' } };

    (global.fetch as any)
      .mockResolvedValueOnce({ json: async () => mockScanData })
      .mockResolvedValueOnce({ json: async () => mockRoastData });

    render(<Page />);
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    const btn = screen.getByText('🔥 Roast My Bag');

    fireEvent.change(input, { target: { value: 'demo' } });
    fireEvent.click(btn);

    // Should clear error, meaning validation passed
    expect(screen.queryByText(/Invalid BSC wallet address/i)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    }, { timeout: 4000 });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(screen.getByTestId('results-view')).toBeInTheDocument();
    }, { timeout: 3000 });
  }, 10000);

  it('resets when clicking header logo', async () => {
    // Just a quick check to see if header logo resets to landing page
    render(<Page />);
    const logo = screen.getByText('RoastMyBag');
    fireEvent.click(logo);
    // Landing page relies on Get Your Bags
    expect(screen.getByText('Get Your Bags')).toBeInTheDocument();
  });

  it('runs interval for Loading screen messages updates', async () => {
    vi.useFakeTimers();
    render(<Page />);
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    fireEvent.change(input, { target: { value: '0x1234567890123456789012345678901234567890' } });
    
    // Mock fetch to never resolve immediately so it stays in loading mode
    (global.fetch as any).mockImplementation(() => new Promise(() => {}));
    
    fireEvent.click(screen.getByText('🔥 Roast My Bag'));
    
    // We are now in "scanning" phase
    expect(screen.getByText('Scanning...')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2500); // The interval is 2200
    });

    // Just testing it doesn't crash
    expect(screen.getByText('Scanning...')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('handles general fetch networking error bounds', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));
    
    render(<Page />);
    
    const input = screen.getByPlaceholderText(/Paste BSC wallet address/i);
    const btn = screen.getByText('🔥 Roast My Bag');

    fireEvent.change(input, { target: { value: '0x1234567890123456789012345678901234567890' } });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Try again.')).toBeInTheDocument();
    });
  });
});
