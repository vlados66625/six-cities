import { Offers } from '../../mock/offers';

export function getFavoritesOffers(offers: Offers): Offers {
  return offers.filter((offer) => offer.isFavorite === true);
}
