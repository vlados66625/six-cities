import { sixCities } from '../../../../const';
import { createFakeOffersPreview, createFakeFavoritesOffers, createFakeFavoriteOffer } from '../../../../test-utils/factories/offers';
import { OfferPreview } from '../../../../types/offer-types';
import { State } from '../../../../types/state';
import { SortingOptions } from '../../../../util';
import { logoutAction } from '../../api-actions/authorization';
import { setFavoriteOfferAction } from '../../api-actions/offer';
import { offersSlice } from '../../offers';
import { offersActions } from '../../offers';

describe('offers reducers', () => {
  let fakeOffersPreview: OfferPreview[];
  let fakeFavoritesOffers: OfferPreview[];
  let initialState: State['offers'];

  beforeEach(() => {
    fakeOffersPreview = createFakeOffersPreview(6);
    fakeFavoritesOffers = createFakeFavoritesOffers(3);

    initialState = {
      city: sixCities[0],
      offersPreview: [],
      favoritesOffers: [],
      isLoadingOffers: false,
      sortingName: SortingOptions[0].name,
    };
  });

  it('должен вернуть initial state с пустым action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен вернуть initial state с "undefiend" state и пустым action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен вернуть state с заданным "city" при action "setCity"', () => {
    const expectedState = {
      city: sixCities[3],
      offersPreview: [],
      favoritesOffers: [],
      isLoadingOffers: false,
      sortingName: SortingOptions[0].name,
    };

    const result = offersSlice.reducer(initialState, offersActions.setCity(sixCities[3]));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с заданным "sortingName" при action "setSorting"', () => {
    const expectedState = {
      city: sixCities[0],
      offersPreview: [],
      favoritesOffers: [],
      isLoadingOffers: false,
      sortingName: SortingOptions[3].name,
    };

    const result = offersSlice.reducer(initialState, offersActions.setSorting(SortingOptions[3].name));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с установлненным значением "isLoadingOffers = true" при action "fetchOffersPreviewAction.pending"', () => {
    const expectedState = {
      city: sixCities[0],
      offersPreview: [],
      favoritesOffers: [],
      isLoadingOffers: true,
      sortingName: SortingOptions[0].name,
    };

    const result = offersSlice.reducer(initialState, offersActions.fetchOffersPreviewAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с установлненным значением "isLoadingOffers = false" и с переданным "offersPreview" при action "fetchOffersPreviewAction.fulfilled"', () => {
    const prevState = {
      ...initialState,
      isLoadingOffers: true
    };

    const expectedState = {
      city: sixCities[0],
      offersPreview: fakeOffersPreview,
      favoritesOffers: [],
      isLoadingOffers: false,
      sortingName: SortingOptions[0].name,
    };

    const result = offersSlice.reducer(prevState, offersActions.fetchOffersPreviewAction.fulfilled(fakeOffersPreview, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с установлненным значением "isLoadingOffers = true" при action "fetchFavoriteOffersAction.pending"', () => {
    const expectedState = {
      city: sixCities[0],
      offersPreview: [],
      favoritesOffers: [],
      isLoadingOffers: true,
      sortingName: SortingOptions[0].name,
    };

    const result = offersSlice.reducer(initialState, offersActions.fetchFavoriteOffersAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с установлненным значением "isLoadingOffers = false" и с переданным "favoritesOffers" при action "fetchFavoriteOffersAction.fulfilled"', () => {
    const prevState = {
      ...initialState,
      isLoadingOffers: true
    };

    const expectedState = {
      ...prevState,
      favoritesOffers: fakeFavoritesOffers,
      isLoadingOffers: false,

    };

    const result = offersSlice.reducer(prevState, offersActions.fetchFavoriteOffersAction.fulfilled(fakeFavoritesOffers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('при "offerIsFavorite = true" должен вернуть state с добавлением переданного "offer" в "favoritesOffers" при action "setFavoriteOfferAction.fulfilled"', () => {
    const fakeFavoriteOffer = createFakeFavoriteOffer();

    const prevState = {
      ...initialState,
      favoritesOffers: fakeFavoritesOffers,
    };

    const expectedState = {
      ...prevState,
      favoritesOffers: [...fakeFavoritesOffers, fakeFavoriteOffer],
    };

    const result = offersSlice.reducer(prevState, setFavoriteOfferAction.fulfilled({ offerIsFavorite: true, offer: fakeFavoriteOffer }, '', { offerId: fakeFavoriteOffer.id, offerIsFavorite: true }));

    expect(result).toEqual(expectedState);
  });

  it('при "offerIsFavorite = false" должен вернуть state с удаленным из "favoritesOffers" переданного "offer"  при action "setFavoriteOfferAction.fulfilled"', () => {
    const fakeFavoriteOffer = createFakeFavoriteOffer();
    const expectedFavoritesOffers = fakeFavoritesOffers.filter((favoritesOffer) => favoritesOffer.id !== fakeFavoriteOffer.id);

    const prevState = {
      ...initialState,
      favoritesOffers: fakeFavoritesOffers,
    };

    const expectedState = {
      ...prevState,
      favoritesOffers: expectedFavoritesOffers,
    };

    const result = offersSlice.reducer(prevState, setFavoriteOfferAction.fulfilled({ offerIsFavorite: false, offer: fakeFavoriteOffer }, '', { offerId: fakeFavoriteOffer.id, offerIsFavorite: true }));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с очищенным "favoritesOffers" при action "logoutAction.fulfilled"', () => {
    const prevState = {
      ...initialState,
      favoritesOffers: fakeFavoritesOffers,
    };

    const expectedState = {
      ...prevState,
      favoritesOffers: [],
    };

    const result = offersSlice.reducer(prevState, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
