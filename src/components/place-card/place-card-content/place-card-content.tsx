import { OfferPreview } from '../../../types/offer-types';
import { Link } from 'react-router-dom';
import { getRoundedRatingInPercentage } from '../../../util';
import Bookmarks from '../../common/bookmarks/bookmarks';
import { memo } from 'react';

type PlaceCardContentProps = {
  offerPreview: OfferPreview;
};

function PlaceCardContent({ offerPreview }: PlaceCardContentProps): JSX.Element {
  return (
    <>
      <div className="place-card__price-wrapper" data-testid="place-card-content">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offerPreview.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <Bookmarks width={18} height={19} offerId={offerPreview.id} blockName='place-card' />
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${getRoundedRatingInPercentage(offerPreview.rating)}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${offerPreview.id}`}>
          {offerPreview.title}
        </Link>
      </h2>
      <p className="place-card__type">{offerPreview.type}</p>
    </>
  );
}

const PlaceCardContentMemo = memo(PlaceCardContent);

export default PlaceCardContentMemo;
