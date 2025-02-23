import { MAX_PLACES_LIST_NEARBY } from '../../../const';
import PlaceCards from '../../../components/place-cards/place-cards';
import PlaceCardNearPlaces from '../../../components/place-card/place-card-near-places';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { store } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { offersSelectors } from '../../../store/slices/offers';
import { fetchOffersNearbyAction } from '../../../store/api-actions';

type OffersNearbyProps = {
  setIdFocusCard: (idFocusCard: string | null) => void;
}

export default function OffersNearby({ setIdFocusCard }: OffersNearbyProps): JSX.Element | null {
  const offersNearby = useAppSelector(offersSelectors.offersNearby);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      store.dispatch(fetchOffersNearbyAction(id));
    }
  }, [id]);

  if (offersNearby.length !== 0) {
    return (
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <PlaceCards
              PlaceCard={PlaceCardNearPlaces}
              offersPreview={offersNearby.slice(0, MAX_PLACES_LIST_NEARBY)}
              handleHoverCard={setIdFocusCard}
            />
          </div>
        </section>
      </div>
    );
  }

  return null;

}
