import { PlaceCardContainerProps } from './type-props-place-card-container';
import PlaceCardLink from './place-card-components/place-card-link';
import PlaceCardContent from './place-card-content/place-card-content';
import { useActionCreators } from '../../hooks';
import { offersActions } from '../../store/slices/offers';

export default function PlaceCardFavorites({ offerPreview, isSupportsHover }: PlaceCardContainerProps): JSX.Element {
  const { setidFocusCard } = useActionCreators(offersActions);

  return (
    <article
      {...(isSupportsHover && {
        onMouseEnter: () => setidFocusCard(offerPreview.id),
        onMouseLeave: () => setidFocusCard(null),
      })}
      className="favorites__card place-card"
    >
      {offerPreview.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <PlaceCardLink offerId={offerPreview.id}>
          <img className="place-card__image" src={offerPreview.previewImage} width="150" height="110" alt="Place image" />
        </PlaceCardLink>
      </div>
      <div className="favorites__card-info place-card__info">
        <PlaceCardContent offerPreview={offerPreview} />
      </div>
    </article>
  );
}
