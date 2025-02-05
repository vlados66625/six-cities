import { OffersPreview } from '../../types/offer-types';
import { ElementType } from 'react';

type PlaceCardsProps = {
  offersPreview: OffersPreview;
  handleHoverCard?: (idFocusCard: string | null) => void;
  placeCard: ElementType;
}

export default function PlaceCards({ offersPreview, handleHoverCard, placeCard }: PlaceCardsProps) {
  const PlaceCard = placeCard;
  return offersPreview.map((offerPreview) => <PlaceCard key={offerPreview.id} handleHoverCard={handleHoverCard} offerPreview={offerPreview} />);
}
