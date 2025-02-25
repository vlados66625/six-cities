import { OfferPreview } from '../../types/offer-types';
import { ComponentType } from 'react';
import { PlaceCardContainerProps } from '../place-card/type-props-place-card-container';

type PlaceCardsProps = {
  offersPreview: OfferPreview[];
  PlaceCard: ComponentType<PlaceCardContainerProps>;
  isSupportsHover?: boolean;
}

export default function PlaceCards({ offersPreview, PlaceCard, isSupportsHover }: PlaceCardsProps) {
  return offersPreview.map((offerPreview) => <PlaceCard key={offerPreview.id} isSupportsHover={isSupportsHover} offerPreview={offerPreview} />);
}
