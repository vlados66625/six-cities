import { OfferPreview } from '../../types/offer-types';
import PlaceCardFavorites from '../place-card/place-card-favorites';
import PlaceCardNearPlaces from '../place-card/place-card-near-places';
import PlaceCardCities from '../place-card/place-card-cities';
import { memo } from 'react';


type PlaceCardsProps = {
  offersPreview: OfferPreview[];
  PlaceCardType: 'PlaceCardFavorites' | 'PlaceCardNearPlaces' | 'PlaceCardCities';
  isSupportsHover?: boolean;
}

function PlaceCards({ offersPreview, PlaceCardType, isSupportsHover }: PlaceCardsProps) {
  function getPlaceCardByType() {
    switch (PlaceCardType) {
      case 'PlaceCardFavorites':
        return PlaceCardFavorites;
      case 'PlaceCardNearPlaces':
        return PlaceCardNearPlaces;
      case 'PlaceCardCities':
        return PlaceCardCities;
    }
  }
  const PlaceCard = getPlaceCardByType();

  return offersPreview.map((offerPreview) => <PlaceCard key={offerPreview.id} isSupportsHover={isSupportsHover} offerPreview={offerPreview} />);
}

const PlaceCardsMemo = memo(PlaceCards);

export default PlaceCardsMemo;
