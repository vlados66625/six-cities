import { AuthorizationStatus } from '../../../../const';
import { useAppSelector } from '../../../../hooks';
import { authorizationSelectors } from '../../../../store/slices/authorization';

export default function Login(): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationSelectors.authorizationStatus);

  return (
    <span className="header__login" data-testid="login">
      {authorizationStatus === AuthorizationStatus.Unknown ?
        'загрузка...' :
        'Sign in'}
    </span>
  );
}
