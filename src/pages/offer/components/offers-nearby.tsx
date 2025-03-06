import PlaceCards from '../../../components/place-cards/place-cards';
import { OfferPreview } from '../../../types/offer-types';

type OffersNearbyProps = {
  offersNearby: OfferPreview[];
}

export default function OffersNearby({ offersNearby }: OffersNearbyProps): JSX.Element | null {

  if (offersNearby.length !== 0) {
    return (
      <div className="container" data-testid="offers-nearby-container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <PlaceCards
              placeCard='near'
              offersPreview={offersNearby}
              isSupportsHover
            />
          </div>
        </section>
      </div>
    );
  }

  return null;
}
