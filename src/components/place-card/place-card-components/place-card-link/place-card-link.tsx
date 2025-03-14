import { Link } from 'react-router-dom';
import { memo, PropsWithChildren } from 'react';
import { AppRoute } from '../../../../const';
import { useActionCreators } from '../../../../hooks';
import { offerActions } from '../../../../store/slices/offer';

type PlaceCardLinkProps = PropsWithChildren<{
  offerId: string;
}>

function PlaceCardLinkContent({ offerId, children }: PlaceCardLinkProps): JSX.Element {
  const { setidFocusCard } = useActionCreators(offerActions);

  return (
    <Link to={`${AppRoute.Offer}/${offerId}`} onClick={() => setidFocusCard(null)} data-testid='place-card-link'>
      {children}
    </Link>
  );
}

const PlaceCardLink = memo(PlaceCardLinkContent);

export default PlaceCardLink;
