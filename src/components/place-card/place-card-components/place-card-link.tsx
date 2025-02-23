import { Link } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { AppRoute } from '../../../const';

type PlaceCardLinkProps = PropsWithChildren<{
  offerId: string;
}>

export default function placeCardLink({ offerId, children }: PlaceCardLinkProps): JSX.Element {
  return (
    <Link to={`${AppRoute.Offer}/${offerId}`}>
      {children}
    </Link>
  );
}
