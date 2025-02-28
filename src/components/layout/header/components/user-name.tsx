
import { useAppSelector } from '../../../../hooks';
import { authorizationSelectors } from '../../../../store/slices/authorization';


export default function UserName(): JSX.Element {
  const userName = useAppSelector(authorizationSelectors.userName);

  return (
    <span className="header__user-name user__name">{userName}</span>
  );
}
