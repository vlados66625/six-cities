import { render, screen } from '@testing-library/react';
import Advantages from '../advantages';
import { createFakeDetailedOffer } from '../../../../test-utils/mock/detailed-offer';

describe('Component: Advantages', () => {
  it('должен рендериться корректно', () => {
    const fakeDetailedOffer = createFakeDetailedOffer();
    render(<Advantages advantages={fakeDetailedOffer.goods} />);

    expect(screen.getByText(/What's inside/)).toBeInTheDocument();
  });
});
