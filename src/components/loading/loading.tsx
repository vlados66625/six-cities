import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';
import { offerSelectors } from '../../store/slices/offer';


export default function Loading(): JSX.Element | null {
  const isLoadingOffers = useAppSelector(offersSelectors.isLoadingOffers);
  const isLoadingOffer = useAppSelector(offerSelectors.isLoadingOffer);

  if (isLoadingOffers || isLoadingOffer) {
    return (
      <section className="loading">
        <p className="loading__text">
          Загрузка...
        </p>
      </section>
    );
  }

  return null;
}
