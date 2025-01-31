import PlaceCard from '../place-card/place-card';
import { OffersPreview } from '../../mock/offers-preview';

type PlaceCardsProps = {
  offersPreview: OffersPreview;
  handleHoverCard?: (idFocusCard: string | null) => void;
  isFavoritesBlock?: boolean;
  isCitiesBlock?: boolean;
  isNearPlacesBlock?: boolean;
}

export default function PlaceCards(props: PlaceCardsProps) {
  const { offersPreview } = props;
  return offersPreview.map((offerPreview) => <PlaceCard {...props} key={offerPreview.id} offerPreview={offerPreview} />);
}
