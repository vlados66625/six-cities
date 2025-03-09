import { render, screen } from '@testing-library/react';
import Header from './header';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';
import { AuthorizationStatus } from '../../../const';
import { useActionCreators } from '../../../hooks';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('../../../hooks', async () => {
  const original = await vi.importActual('../../../hooks');
  return {
    ...original,
    useActionCreators: vi.fn(),
  };
});

describe('Component: Header', () => {
  const logoutAction = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useActionCreators as Mock).mockReturnValue({
      logoutAction,
    });
  });

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

  it('должен вызвать logoutAction при клике на кнопку sign out, пользватель авторизован', async () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithRouter = withRouter(<Header />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    const signOutLink = screen.getByTestId('sign-out-link');
    await userEvent.click(signOutLink);

    expect(logoutAction).toHaveBeenCalledTimes(1);
  });
});
