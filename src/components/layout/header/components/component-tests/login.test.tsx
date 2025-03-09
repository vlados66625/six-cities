import { render, screen } from '@testing-library/react';
import Login from '../login';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';
import { AuthorizationStatus } from '../../../../../const';

describe('Component: Login', () => {
  it('должен рендериться корректно при AuthorizationStatus.Unknown', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithStore = withStore(<Login />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(/загрузка/)).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при AuthorizationStatus.Unknown', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithStore = withStore(<Login />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText(/загрузка/)).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при AuthorizationStatus.NoAuth', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithStore = withStore(<Login />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText(/загрузка/)).not.toBeInTheDocument();
  });
});
