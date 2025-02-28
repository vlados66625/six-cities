import { Link } from 'react-router-dom';
import { memo, PropsWithChildren } from 'react';
import { AppRoute } from '../../../const';

type PlaceCardLinkProps = PropsWithChildren<{
  offerId: string;
}>

function placeCardLink({ offerId, children }: PlaceCardLinkProps): JSX.Element {
  return (
    <Link to={`${AppRoute.Offer}/${offerId}`}>
      {children}
    </Link>
  );
}

const PlaceCardLinkMemo = memo(placeCardLink);

export default PlaceCardLinkMemo;
