import { render, screen } from '@testing-library/react';
import PremiumMark from '../premium-mark';

describe('Component: PremiumMark', () => {
  it('должен рендериться корректно, когда isPremium = true', () => {
    render(<PremiumMark isPremium />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('не должен рендериться, когда isPremium = false', () => {
    render(<PremiumMark isPremium={false} />);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
    expect(screen.queryByTestId('premium-mark-container')).toBeNull();
  });
});
