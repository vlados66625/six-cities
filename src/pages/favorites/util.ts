import { OfferPreview } from '../../types/offer-types';

export function getFavoritesOffers(offersPreview: OfferPreview[]): OfferPreview[] {
  return offersPreview.filter((offer) => offer.isFavorite === true);
}
