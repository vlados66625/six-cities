import { MAX_PLACES_LIST_NEARBY } from '../../../const';
import PlaceCards from '../../../components/place-cards/place-cards';
import { OfferPreview } from '../../../types/offer-types';

type OffersNearbyProps = {
  offersNearby: OfferPreview[];
}

export default function OffersNearby({ offersNearby }: OffersNearbyProps): JSX.Element | null {

  if (offersNearby.length !== 0) {
    return (
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <PlaceCards
              placeCard='near'
              offersPreview={offersNearby.slice(0, MAX_PLACES_LIST_NEARBY)}
              isSupportsHover
            />
          </div>
        </section>
      </div>
    );
  }

  return null;
}
