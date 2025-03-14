import { OfferPreview } from '../../../types/offer-types';
import { getRoundedRatingInPercentage } from '../../../util';
import Bookmarks from '../../common/bookmarks/bookmarks';
import PlaceCardLink from '../place-card-components/place-card-link/place-card-link';
import { memo } from 'react';

type PlaceCardContentProps = {
  offerPreview: OfferPreview;
};

function PlaceCardContentContent({ offerPreview }: PlaceCardContentProps): JSX.Element {
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
        <PlaceCardLink offerId={offerPreview.id}>
          {offerPreview.title}
        </PlaceCardLink>
      </h2>
      <p className="place-card__type">{offerPreview.type}</p>
    </>
  );
}


const PlaceCardContent = memo(PlaceCardContentContent);

export default PlaceCardContent;
