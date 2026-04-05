import { sfx } from '../sfx-engine';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('sfx-engine', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (sfx as any).ctx = null;
  });

  afterEach(() => {
    (sfx as any).ctx = null;
    vi.restoreAllMocks();
  });

  it('fails gracefully when run safely', () => {
    expect(() => sfx.whoosh()).not.toThrow();
    expect(() => sfx.impact()).not.toThrow();
    expect(() => sfx.chime()).not.toThrow();
  });

  it('bails out when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    
    expect(() => sfx.whoosh()).not.toThrow();
    expect(() => sfx.impact()).not.toThrow();
    expect(() => sfx.chime()).not.toThrow();
    
    vi.unstubAllGlobals();
  });

  it('uses AudioContext when available and executes all methods', () => {
    const createOscillator = vi.fn().mockReturnValue({
      type: '',
      frequency: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn().mockReturnThis(),
      start: vi.fn(),
      stop: vi.fn()
    });

    const createGain = vi.fn().mockReturnValue({
      gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
      connect: vi.fn().mockReturnThis()
    });

    const createBuffer = vi.fn().mockReturnValue({
      getChannelData: vi.fn().mockReturnValue(new Float32Array(44100))
    });

    const createBufferSource = vi.fn().mockReturnValue({
      buffer: null,
      connect: vi.fn().mockReturnThis(),
      start: vi.fn(),
      stop: vi.fn(),
    });

    const createBiquadFilter = vi.fn().mockReturnValue({
      type: '',
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      Q: { value: 0 },
      connect: vi.fn().mockReturnThis()
    });

    // Define as a normal class so `new` works predictably
    class MockAudioContextClass {
      sampleRate = 44100;
      currentTime = 0;
      destination = {};
      createBuffer = createBuffer;
      createBufferSource = createBufferSource;
      createBiquadFilter = createBiquadFilter;
      createGain = createGain;
      createOscillator = createOscillator;
    }

    // @ts-ignore
    global.window = { AudioContext: MockAudioContextClass };
    // @ts-ignore
    global.AudioContext = MockAudioContextClass;
    
    // reset ctx inside so it calls new again
    (sfx as any).ctx = null;
    
    expect(() => sfx.whoosh()).not.toThrow();
    expect(() => sfx.impact()).not.toThrow();
    expect(() => sfx.chime()).not.toThrow();
    expect(createOscillator).toHaveBeenCalled();
    expect(createGain).toHaveBeenCalled();
    expect(createBuffer).toHaveBeenCalled();
    expect(createBufferSource).toHaveBeenCalled();
    expect(createBiquadFilter).toHaveBeenCalled();
  });

  it('catches exceptions when AudioContext methods throw', () => {
    class MockAudioContextClass {
      createBuffer() { throw new Error('Mock error'); }
      createOscillator() { throw new Error('Mock error'); }
    }
    // @ts-ignore
    global.window = { AudioContext: MockAudioContextClass };
    // @ts-ignore
    global.AudioContext = MockAudioContextClass;

    expect(() => sfx.whoosh()).not.toThrow();
    expect(() => sfx.impact()).not.toThrow();
    expect(() => sfx.chime()).not.toThrow();
  });
});
