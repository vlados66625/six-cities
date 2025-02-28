import { OfferPreview } from '../../types/offer-types';
import PlaceCardFavorites from '../place-card/place-card-favorites';
import PlaceCardNearPlaces from '../place-card/place-card-near-places';
import PlaceCardCities from '../place-card/place-card-cities';
import { memo, useMemo } from 'react';


type PlaceCardsProps = {
  offersPreview: OfferPreview[];
  placeCard: 'city' | 'favorite' | 'near';
  isSupportsHover?: boolean;
}

function PlaceCards({ offersPreview, placeCard, isSupportsHover }: PlaceCardsProps) {
  const PlaceCard = useMemo(() => {
    switch (placeCard) {
      case 'favorite':
        return PlaceCardFavorites;
      case 'near':
        return PlaceCardNearPlaces;
      case 'city':
        return PlaceCardCities;
    }
  }, [placeCard]);

  const PlaceCardmemo = useMemo(() => offersPreview.map((offerPreview) => <PlaceCard key={offerPreview.id} isSupportsHover={isSupportsHover} offerPreview={offerPreview} />),
    [offersPreview, isSupportsHover, PlaceCard]);

  return PlaceCardmemo;
}

const PlaceCardsMemo = memo(PlaceCards);

export default PlaceCardsMemo;
