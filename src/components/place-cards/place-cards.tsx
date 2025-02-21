import { OfferPreview } from '../../types/offer-types';
import { ComponentType } from 'react';
import { PlaceCardContainerProps } from '../place-card/type-props-place-card-container';

type PlaceCardsProps = {
  offersPreview: OfferPreview[];
  handleHoverCard?: (idFocusCard: string | null) => void;
  PlaceCard: ComponentType<PlaceCardContainerProps>;
}

export default function PlaceCards({ offersPreview, handleHoverCard, PlaceCard }: PlaceCardsProps) {
  return offersPreview.map((offerPreview) => <PlaceCard key={offerPreview.id} handleHoverCard={handleHoverCard} offerPreview={offerPreview} />);
}
