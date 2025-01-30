import PlaceCard from '../place-card/place-card';
import { Offers } from '../../mock/offers';

type PlaceCardsProps = {
  offers: Offers;
  isFavoritesBlock?: boolean;
  isCitiesBlock?: boolean;
  isNearPlacesBlock?: boolean;
}

export default function PlaceCards(props: PlaceCardsProps) {
  const { offers } = props;
  return offers.map((offer) => <PlaceCard {...props} key={offer.id} offer={offer} />);
}
