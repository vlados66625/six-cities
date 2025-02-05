import { OfferPreview } from '../../types/offer-types';
import { Link } from 'react-router-dom';
import PlaceCardContent from './place-card-content/place-card-content';

type PlaceCardCitiesProps = {
  offerPreview: OfferPreview;
  handleHoverCard?: (idFocusCard: string | null) => void;
};

export default function PlaceCardCities({ offerPreview, handleHoverCard }: PlaceCardCitiesProps): JSX.Element {

  return (
    <article
      {...(handleHoverCard && {
        onMouseEnter: () => handleHoverCard(offerPreview.id),
        onMouseLeave: () => handleHoverCard(null),
      })}
      className="cities__card place-card"
    >
      {offerPreview.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offerPreview.id}`}>
          <img className="place-card__image" src={offerPreview.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <PlaceCardContent offerPreview={offerPreview} />
      </div>
    </article>
  );
}
