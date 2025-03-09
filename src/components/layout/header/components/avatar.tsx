
import { useAppSelector } from '../../../../hooks';
import { authorizationSelectors } from '../../../../store/slices/authorization';

export default function Avatar(): JSX.Element {
  const avatarUrl = useAppSelector(authorizationSelectors.avatarUrl);
  const isAuth = useAppSelector(authorizationSelectors.isAuth);

  return (
    <div className="header__avatar-wrapper user__avatar-wrapper" data-testid="avatar-container">
      {avatarUrl !== '' && isAuth && <img className="header__avatar user__avatar" src={avatarUrl} width={20} height={20} alt='photo user'></img>}
    </div>
  );
}
