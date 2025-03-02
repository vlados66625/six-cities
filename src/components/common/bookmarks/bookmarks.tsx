import cn from 'classnames';
import { useActionCreators } from '../../../hooks';
import { offerActions, offerSelectors } from '../../../store/slices/offer';
import { offersSelectors } from '../../../store/slices/offers';
import { useAppSelector } from '../../../hooks';
import { authorizationSelectors } from '../../../store/slices/authorization';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';

type LogoProps = {
  width: number;
  height: number;
  offerId: string;
  blockName: string;
}

export default function Bookmarks({ width, height, offerId, blockName }: LogoProps): JSX.Element {
  const navigate = useNavigate();
  const { setFavoriteOfferAction } = useActionCreators(offerActions);
  const favoritesOffers = useAppSelector(offersSelectors.favoritesOffers);
  const isFavoriteBtnDisabled = useAppSelector(offerSelectors.isFavoriteBtnDisabled);
  const isAuth = useAppSelector(authorizationSelectors.isAuth);
  const isFavorite = favoritesOffers.some((favoriteOffer) => favoriteOffer.id === offerId);

  function handleBookmarkClick() {
    if (!isAuth) {
      navigate(AppRoute.Login);
    } else {
      setFavoriteOfferAction({ offerId, offerIsFavorite: !isFavorite });
    }
  }

  return (
    <button
      className={cn(
        `${blockName}__bookmark-button`,
        { [`${blockName}__bookmark-button--active`]: isFavorite },
        'button')}
      onClick={handleBookmarkClick}
      type="button"
      disabled={isFavoriteBtnDisabled}
    >
      <svg className={`${blockName}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
