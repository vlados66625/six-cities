
import { useAppSelector } from '../../../../hooks';
import { authorizationSelectors } from '../../../../store/slices/authorization';
import { getPluralForm } from '../../../../util';

type TitleReviewsProps = {
  сountReviews: number;
}

export default function TitleReviews({ сountReviews }: TitleReviewsProps): JSX.Element {
  const isAuth = useAppSelector(authorizationSelectors.isAuth);

  return (
    <h2 className="reviews__title">
      {сountReviews === 0 && isAuth ? (
        'There are no reviews, be the first'
      ) : (
        <>
          {getPluralForm('Review', сountReviews)} · <span className="reviews__amount">{сountReviews}</span>
        </>
      )}
    </h2>
  );
}
