import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../common/logo/logo';
import UserName from './components/user-name';
import Avatar from './components/avatar';
import FavoriteCount from './components/favorite-count';
import Login from './components/login';

import { useAppSelector } from '../../../hooks';
import { authorizationSelectors } from '../../../store/slices/authorization';
import { useActionCreators } from '../../../hooks';
import { authorizationActions } from '../../../store/slices/authorization';

type HeaderProps = {
  isHiddenNav?: boolean;
  isLogoActive?: boolean;
}

export default function Header({ isHiddenNav, isLogoActive }: HeaderProps): JSX.Element {
  const { logoutAction } = useActionCreators(authorizationActions);
  const isAuth = useAppSelector(authorizationSelectors.isAuth);

  function handleNavLinkClick(evt: MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    logoutAction();
  }

  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo isActive={isLogoActive} blockName="header" width={81} height={41} />
          </div>
          {isHiddenNav ? null :
            <nav className="header__nav">
              <ul className="header__nav-list">

                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to='/favorites'>
                    <Avatar />
                    {isAuth ?
                      <>
                        <UserName />
                        <FavoriteCount />
                      </> :
                      <Login />}
                  </Link>
                </li>
                {isAuth &&
                  <li className="header__nav-item" data-testid="sign-out">
                    <a onClick={(evt) => handleNavLinkClick(evt)} className="header__nav-link" href="#">
                      <span className="header__signout">
                        Sign out
                      </span>
                    </a>
                  </li>}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}
