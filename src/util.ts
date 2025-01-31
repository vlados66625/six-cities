import getAuthorizationStatus from './mock/get-authorization-status';
import { AuthorizationStatus } from './const';
import { Offers } from './mock/offers';
import { SixCities } from './const';

export function getIsAuth() {
  return getAuthorizationStatus() === AuthorizationStatus.Auth;
}

export function getFilteredByCityOffers(offers: Offers, city: SixCities): Offers {
  return offers.filter((offer) => offer.city.name === city);
}
