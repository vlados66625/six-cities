import Routing from '../../routing';
import { Offers } from '../../mock/offers';
import { ReviewsOffer } from '../../mock/reviews';

type AppProps = {
  offers: Offers;
  reviewsOffer: ReviewsOffer;
  rentalOffer: number;
}

export default function App(props: AppProps): JSX.Element {
  return (
    <Routing {...props} />
  );
}
