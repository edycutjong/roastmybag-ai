import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import JudgePage, { metadata } from '../page';

describe('/judge page', () => {
  it('renders the claim, the click path, receipts and limitations', () => {
    render(<JudgePage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('RoastMyBag.ai');
    expect(screen.getByText(/scans your BNB Chain wallet/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the 30-second path/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /receipts/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /honest limitations/i })).toBeInTheDocument();
  });

  it('links to the live app, the repo, the demo video and CI', () => {
    render(<JudgePage />);

    expect(screen.getByRole('link', { name: /live app/i })).toHaveAttribute(
      'href',
      'https://roastmybag.edycu.dev'
    );
    expect(screen.getByRole('link', { name: /repository/i })).toHaveAttribute(
      'href',
      'https://github.com/edycutjong/roastmybag-ai'
    );
    expect(screen.getByRole('link', { name: /demo video/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CI runs/i })).toBeInTheDocument();
  });

  it('publishes the reproduce command without a kill-switch flag', () => {
    const { container } = render(<JudgePage />);
    const code = Array.from(container.querySelectorAll('pre'))
      .map((el) => el.textContent ?? '')
      .join('\n');

    // R10: the command a judge runs must not be the one that disables the product.
    expect(code).not.toMatch(/OFFLINE=1|MOCK=|MOCK_MODE|USE_MOCK|--dry-run|DEMO_MODE=1/);
    expect(code).toMatch(/npm run dev/);
  });

  it('declares judge-facing metadata', () => {
    expect(metadata.title).toMatch(/judges/i);
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });
});
