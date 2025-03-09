import { AuthorizationStatus, sixCities } from '../../const';
import { State } from '../../types/state';
import { SortingOptions } from '../../util';

export const createFakeStore = (initialState?: Partial<State>): State => ({
  offers: {
    city: sixCities[0],
    offersPreview: [],
    favoritesOffers: [],
    isLoadingOffers: false,
    sortingName: SortingOptions[0].name,
  },
  offer: {
    reviewsOffer: [],
    detailedOffer: null,
    offersNearby: [],
    isLoadingOffer: false,
    idFocusCard: null,
    isFavoriteBtnDisabled: false,
  },
  authorization: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userName: '',
    avatarUrl: '',
  },
  ...initialState ?? {},
});
