import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { withRouter, withStore } from '../../test-utils/mock-component';
import App from './app';
import { createFakeStore } from '../../test-utils/mock/store';
import { createFakeDetailedOffer } from '../../test-utils/mock/detailed-offer';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('должен отрисовать компонент, находящийся по роуту AppRoute.Root', () => {
    const componentWithRouter = withRouter(<App />, mockHistory);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('должен отрисовать компонент, находящийся по роуту AppRoute.OfferId', () => {
    const fakeDetailedOffer = createFakeDetailedOffer();
    const fakeStore = createFakeStore({
      offer: {
        detailedOffer: fakeDetailedOffer,
        reviewsOffer: [],
        offersNearby: [],
        isLoadingOffer: false,
        idFocusCard: null,
        isFavoriteBtnDisabled: false,
      }
    });
    const componentWithRouter = withRouter(<App />, mockHistory);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;
    if (!fakeStore.offer.detailedOffer) {
      throw Error('detailedOffer не может быть пустым');
    }
    const expectedText = fakeStore.offer.detailedOffer.title;


    mockHistory.push(`${AppRoute.Offer}/${fakeStore.offer.detailedOffer.id}`);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('должен отрисовать компонент, находящийся по роуту AppRoute.Error', () => {
    const componentWithRouter = withRouter(<App />, mockHistory);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;
    const unknownRoute = '/unknown-route';

    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('Error 404 this page does not exist')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

});


