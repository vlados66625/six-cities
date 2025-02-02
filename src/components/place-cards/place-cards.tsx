import PlaceCard from '../place-card/place-card';
import { OffersPreview } from '../../mock/offers-preview';

type PlaceCardsProps = {
  offersPreview: OffersPreview;
  handleHoverCard?: (idFocusCard: string | null) => void;
  variant?: 'favorites' | 'cities' | 'near-places';
}

export default function PlaceCards(props: PlaceCardsProps) {
  const { offersPreview } = props;
  return offersPreview.map((offerPreview) => <PlaceCard {...props} key={offerPreview.id} offerPreview={offerPreview} />);
}
