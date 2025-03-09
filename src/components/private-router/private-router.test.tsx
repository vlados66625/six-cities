import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-router';
import { createFakeStore } from '../../test-utils/mock/store';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;
  let notExpectedText: string;
  let expectedText: string;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
    notExpectedText = 'компонент не приватного роута';
    expectedText = 'компонент приватного роута';
  });

  it('должен отрендерить компонент приватного роута, если пользователь авторизован и requireAuth = true', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '',
      }
    });

    const componentWithRouter = withRouter(
      <Routes>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute requireAuth >
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes >,
      mockHistory
    );
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('должен отрендерить компонент приватного роута, если пользователь не авторизован и requireAuth = false', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '',
      }
    });

    const componentWithRouter = withRouter(
      <Routes>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute requireAuth={false} >
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes >,
      mockHistory
    );
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('должен перенаправить пользователя на страницу AppRoute.Login, если пользователь не авторизован и requireAuth === true', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '',
      }
    });

    const componentWithRouter = withRouter(
      <Routes>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute requireAuth >
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('должен перенаправить пользователя на страницу AppRoute.Root, если пользователь авторизован и requireAuth === false', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '',
      }
    });

    const componentWithRouter = withRouter(
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<span>{expectedText}</span>} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute requireAuth={false} >
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
          />
        </Route>
      </Routes>,
      mockHistory
    );
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});

