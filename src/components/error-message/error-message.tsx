import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';


export default function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(offersSelectors.error);

  if (error) {
    return (
      <section className="error">
        <p className="error__text">
          {error}
        </p>
      </section>
    );
  }

  return null;
}
