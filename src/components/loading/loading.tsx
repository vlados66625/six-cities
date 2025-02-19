import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';


export default function Loading(): JSX.Element | null {
  const isLoading = useAppSelector(offersSelectors.isLoading);

  if (isLoading) {
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
