import { Outlet, Link } from 'react-router-dom';
import Logo from '../common/logo/logo';
import { useLayoutState } from './util';

export default function Layout(): JSX.Element {
  const { pageBlockClassName, shouldRenderNav, shouldRenderFooter, isAuth, isLogoActive } = useLayoutState();

  return (
    <div className={`page${pageBlockClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isActive={isLogoActive} blockName="header" width={81} height={41} />
            </div>
            {shouldRenderNav &&
              <nav className="header__nav">
                <ul className="header__nav-list">

                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to='/favorites'>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      {isAuth ?
                        <>
                          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                          <span className="header__favorite-count">3</span>
                        </> :
                        <span className="header__login">Sign in</span>}
                    </Link>
                  </li>
                  {isAuth &&
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>}
                </ul>
              </nav>}
          </div>
        </div>
      </header>

      <Outlet />

      {shouldRenderFooter &&
        <footer className="footer">
          <Logo blockName="footer" width={64} height={33} />
        </footer>}
    </div>
  );
}
