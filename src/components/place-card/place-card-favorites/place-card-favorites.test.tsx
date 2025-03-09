import { render, screen } from '@testing-library/react';
import PlaceCardFavorites from './place-card-favorites';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';
import { createFakeOfferPreview } from '../../../test-utils/mock/offers';
import { useHoverCard } from '../../../hooks/use-hover-card/use-hover-card';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('../../../hooks/use-hover-card/use-hover-card', () => ({
  useHoverCard: vi.fn(),
}));

describe('Component: Bookmarks', () => {
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useHoverCard as Mock).mockReturnValue({
      handleMouseEnter,
      handleMouseLeave
    });
  });

  it('должен рендериться корректно', () => {
    const fakeOffer = createFakeOfferPreview();
    const componentWithRouter = withRouter(<PlaceCardFavorites offerPreview={fakeOffer} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('favorites-card')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-link')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-content')).toBeInTheDocument();
  });

  it('при событии onMouseEnter должен вызвать колбэк', async () => {
    const fakeOffer = createFakeOfferPreview();
    const componentWithRouter = withRouter(<PlaceCardFavorites offerPreview={fakeOffer} isSupportsHover />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const card = screen.getByTestId('favorites-card');
    await userEvent.hover(card);

    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    expect(handleMouseLeave).not.toHaveBeenCalled();
  });

  it('при событии onMouseEnter должен вызвать колбэк', async () => {
    const fakeOffer = createFakeOfferPreview();
    const componentWithRouter = withRouter(<PlaceCardFavorites offerPreview={fakeOffer} isSupportsHover />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const card = screen.getByTestId('favorites-card');
    await userEvent.hover(card);

    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    expect(handleMouseLeave).not.toHaveBeenCalled();
  });
});
