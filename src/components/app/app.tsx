import Routing from '../../routing';
import { OffersPreview } from '../../mock/offers-preview';
import { OfferDetailed } from '../../mock/offer-detailed';
import { ReviewsOffer } from '../../mock/reviews-offer';

type AppProps = {
  offersPreview: OffersPreview;
  offerDetailed: OfferDetailed;
  reviewsOffer: ReviewsOffer;
  rentalOffer: number;
}

export default function App(props: AppProps): JSX.Element {
  return (
    <Routing {...props} />
  );
}
