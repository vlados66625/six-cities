
import { useAppSelector } from '../../../../hooks';
import { authorizationSelectors } from '../../../../store/slices/authorization';


export default function UserName(): JSX.Element {
  const email = useAppSelector(authorizationSelectors.email);

  return (
    <span className="header__user-name user__name">{email}</span>
  );
}
