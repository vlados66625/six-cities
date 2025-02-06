import { OfferPreview } from '../../types/offer-types';

export type PlaceCardContainerProps = {
  offerPreview: OfferPreview;
  handleHoverCard?: (idFocusCard: string | null) => void;
};
