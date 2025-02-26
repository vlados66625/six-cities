import cn from 'classnames';
import { useAppSelector } from '../../../hooks';
import { offerSelectors } from '../../../store/slices/offer';
import { getPluralForm, getRoundedRatingInPercentage } from '../../../util';
import { memo } from 'react';


function MainInfo(): JSX.Element | null {
  const detailedOffer = useAppSelector(offerSelectors.detailedOffer);
  if (!detailedOffer) {
    return null;
  }

  return (
    <>
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {detailedOffer.title}
        </h1>
        <button type="button" className={cn(
          'offer__bookmark-button',
          { 'offer__bookmark-button--active': detailedOffer?.isFavorite },
          'button')}
        >
          <svg className="offer__bookmark-icon" width={31} height={33}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: `${getRoundedRatingInPercentage(detailedOffer.rating)}%` }} />
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{detailedOffer.rating}</span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {detailedOffer.type}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {detailedOffer.bedrooms} {getPluralForm('Bedroom', detailedOffer.bedrooms)}
        </li>
        <li className="offer__feature offer__feature--adults">
          Max {detailedOffer.maxAdults} {getPluralForm('adult', detailedOffer.maxAdults)}
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">€{detailedOffer.price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
    </>
  );
}

const MainInfoMemo = memo(MainInfo);

export default MainInfoMemo;
