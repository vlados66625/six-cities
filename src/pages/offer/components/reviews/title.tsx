
import { useAppSelector } from '../../../../hooks';
import { authorizationSelectors } from '../../../../store/slices/authorization';
import { getPluralForm } from '../../../../util';

type TitleReviewsProps = {
  countReviews: number;
}

export default function TitleReviews({ countReviews }: TitleReviewsProps): JSX.Element {
  const isAuth = useAppSelector(authorizationSelectors.isAuth);

  return (
    <h2 className="reviews__title" data-testid="reviews-title">
      {countReviews === 0 && isAuth ? (
        'There are no reviews, be the first'
      ) : (
        <>
          {getPluralForm('Review', countReviews)} · <span className="reviews__amount">{countReviews}</span>
        </>
      )}
    </h2>
  );
}
