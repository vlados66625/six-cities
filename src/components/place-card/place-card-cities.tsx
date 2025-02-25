import { PlaceCardContainerProps } from './type-props-place-card-container';
import PlaceCardContent from './place-card-content/place-card-content';
import PlaceCardLink from './place-card-components/place-card-link';
import { useActionCreators } from '../../hooks';
import { offerActions } from '../../store/slices/offer';

export default function PlaceCardCities({ offerPreview, isSupportsHover }: PlaceCardContainerProps): JSX.Element {
  const { setidFocusCard } = useActionCreators(offerActions);

  return (
    <article
      {...(isSupportsHover && {
        onMouseEnter: () => setidFocusCard(offerPreview.id),
        onMouseLeave: () => setidFocusCard(null),
      })}
      className="cities__card place-card"
    >
      {offerPreview.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <PlaceCardLink offerId={offerPreview.id}>
          <img className="place-card__image" src={offerPreview.previewImage} width="260" height="200" alt="Place image" />
        </PlaceCardLink>
      </div>
      <div className="place-card__info">
        <PlaceCardContent offerPreview={offerPreview} />
      </div>
    </article>
  );
}
