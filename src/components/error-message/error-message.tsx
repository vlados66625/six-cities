import { useAppSelector } from '../../hooks';
import { errorSelectors } from '../../store/slices/error';


export default function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(errorSelectors.error);

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
