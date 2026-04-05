import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import RootLayout from '../layout';

// Mock Next.js fonts to avoid issues during testing
vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({ variable: 'mock-space-grotesk' }),
  JetBrains_Mono: () => ({ variable: 'mock-jetbrains-mono' }),
}));

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child Content</div>
      </RootLayout>
    );

    expect(getByText('Test Child Content')).toBeInTheDocument();
  });
});
