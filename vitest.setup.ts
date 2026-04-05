import '@testing-library/jest-dom/vitest';
import { vi, beforeAll, afterAll } from 'vitest';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});
