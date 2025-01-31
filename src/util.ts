import getAuthorizationStatus from './mock/get-authorization-status';
import { AuthorizationStatus } from './const';
import { OffersPreview } from './mock/offers-preview';
import { SixCities } from './const';

export function getIsAuth() {
  return getAuthorizationStatus() === AuthorizationStatus.Auth;
}

export function getFilteredByCityOffers(offers: OffersPreview, city: SixCities): OffersPreview {
  return offers.filter((offer) => offer.city.name === city);
}
