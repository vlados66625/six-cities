import { render, screen } from '@testing-library/react';
import Header from './header';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';
import { AuthorizationStatus } from '../../../const';

describe('Component: Header', () => {
  it('должен рендериться корректно при isHiddenNav === false и с AuthorizationStatus.Unknown', () => {
    const componentWithRouter = withRouter(<Header />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorite-count')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-out')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при isHiddenNav === true и с AuthorizationStatus.Unknown', () => {
    const componentWithRouter = withRouter(<Header isHiddenNav />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByTestId('avatar-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorite-count')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-out')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при isHiddenNav === false и с AuthorizationStatus.Auth', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: 'test user',
        avatarUrl: 'test url',
      }
    });
    const componentWithRouter = withRouter(<Header />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.getByTestId('user-name')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-count')).toBeInTheDocument();
    expect(screen.getByTestId('sign-out')).toBeInTheDocument();
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при isHiddenNav === true и с AuthorizationStatus.Auth', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: 'test user',
        avatarUrl: 'test url',
      }
    });
    const componentWithRouter = withRouter(<Header isHiddenNav />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByTestId('avatar-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorite-count')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-out')).not.toBeInTheDocument();
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
  });
  it('должен рендериться корректно при isHiddenNav === true и с AuthorizationStatus.NoAuth', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithRouter = withRouter(<Header isHiddenNav />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByTestId('avatar-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorite-count')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-out')).not.toBeInTheDocument();
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при isHiddenNav === false и с AuthorizationStatus.NoAuth', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithRouter = withRouter(<Header />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorite-count')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-out')).not.toBeInTheDocument();
  });
});
