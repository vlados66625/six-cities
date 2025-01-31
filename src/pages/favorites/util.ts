import { OffersPreview } from '../../mock/offers-preview';

export function getFavoritesOffers(offersPreview: OffersPreview): OffersPreview {
  return offersPreview.filter((offer) => offer.isFavorite === true);
}
