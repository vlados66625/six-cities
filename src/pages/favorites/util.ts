import { OffersPreview } from '../../types/offer-types';

export function getFavoritesOffers(offersPreview: OffersPreview): OffersPreview {
  return offersPreview.filter((offer) => offer.isFavorite === true);
}
