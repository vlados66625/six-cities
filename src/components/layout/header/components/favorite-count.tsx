import { useAppSelector } from '../../../../hooks';
import { offersSelectors } from '../../../../store/slices/offers';

export default function FavoriteCount(): JSX.Element {
  const favoritesOffersCount = useAppSelector(offersSelectors.favoritesOffersCount);

  return (
    <span className="header__favorite-count" data-testid="favorite-count">{favoritesOffersCount}</span>
  );
}
