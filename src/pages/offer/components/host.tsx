import { useAppSelector } from '../../../hooks';
import { offersSelectors } from '../../../store/slices/offers';

export default function Host(): JSX.Element | null {
  const detailedOffer = useAppSelector(offersSelectors.detailedOffer);
  if (!detailedOffer) {
    return null;
  }
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className={`offer__avatar-wrapper${detailedOffer.host.isPro ? ' offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
          <img className="offer__avatar user__avatar" src={detailedOffer.host.avatarUrl} width={74} height={74} alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {detailedOffer.host.name}
        </span>
        {detailedOffer.host.isPro &&
          <span className="offer__user-status">
            Pro
          </span>}
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {detailedOffer.description}
        </p>
      </div>
    </div>
  );
}
