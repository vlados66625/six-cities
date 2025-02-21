import { Link } from 'react-router-dom';
import { PropsWithChildren } from 'react';

type PlaceCardLinkProps = PropsWithChildren<{
  offerId: string;
}>

export default function placeCardLink({ offerId, children }: PlaceCardLinkProps): JSX.Element {
  return (
    <Link to={`/offer/${offerId}`}>
      {children}
    </Link>
  );
}
