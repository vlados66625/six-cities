import Loading from '../../../components/loading/loading';
import { useAppSelector } from '../../../hooks';
import { offersSelectors } from '../../../store/slices/offers';

export default function NoPlaces(): JSX.Element {
  const isLoading = useAppSelector(offersSelectors.isLoading);

  return (
    <section className="cities__no-places">

      {isLoading ?
        <Loading />
        :
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
        </div>}

    </section>
  );
}
