import { Link } from 'react-router-dom';
import { memo, PropsWithChildren } from 'react';
import { AppRoute } from '../../../../const';

type PlaceCardLinkProps = PropsWithChildren<{
  offerId: string;
}>

function placeCardLinkContent({ offerId, children }: PlaceCardLinkProps): JSX.Element {
  return (
    <Link to={`${AppRoute.Offer}/${offerId}`} data-testid='place-card-link'>
      {children}
    </Link>
  );
}

const PlaceCardLink = memo(placeCardLinkContent);

export default PlaceCardLink;
