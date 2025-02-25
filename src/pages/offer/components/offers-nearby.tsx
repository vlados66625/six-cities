import { MAX_PLACES_LIST_NEARBY } from '../../../const';
import PlaceCards from '../../../components/place-cards/place-cards';
import PlaceCardNearPlaces from '../../../components/place-card/place-card-near-places';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { offerSelectors } from '../../../store/slices/offer';
import { offerActions } from '../../../store/slices/offer';
import { useActionCreators } from '../../../hooks';


export default function OffersNearby(): JSX.Element | null {
  const offersNearby = useAppSelector(offerSelectors.offersNearby);
  const { fetchOffersNearbyAction } = useActionCreators(offerActions);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchOffersNearbyAction(id);
    }
  }, [fetchOffersNearbyAction, id]);

  if (offersNearby.length !== 0) {
    return (
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <PlaceCards
              PlaceCard={PlaceCardNearPlaces}
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
