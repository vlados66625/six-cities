import { render, screen } from '@testing-library/react';
import Gallery from '../gallery';
import { createFakeDetailedOffer } from '../../../../test-utils/mock/detailed-offer';

describe('Component: Gallery', () => {
  it('должен рендериться корректно', () => {
    const fakeDetailedOffer = createFakeDetailedOffer();
    render(<Gallery images={fakeDetailedOffer.images} />);

    const lengthGallery = screen.getAllByAltText('Photo studio');
    expect(lengthGallery.length).toBe(fakeDetailedOffer.images.length);
  });
});
