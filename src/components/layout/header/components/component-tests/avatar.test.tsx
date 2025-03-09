import { render, screen } from '@testing-library/react';
import Avatar from '../avatar';
import { withRouter, withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';
import { AuthorizationStatus } from '../../../../../const';

describe('Component: Avatar', () => {
  it('должен рендериться корректно при AuthorizationStatus.Auth и с avatarUrl', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '2f32dfsdfds3g34',
      }
    });
    const componentWithRouter = withRouter(<Avatar />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.getByAltText('photo user')).toBeInTheDocument();
  });

  it('должен рендериться корректно при AuthorizationStatus.NoAuth и с avatarUrl', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '2f32dfsdfds3g34',
      }
    });
    const componentWithRouter = withRouter(<Avatar />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.queryByAltText('photo user')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при AuthorizationStatus.NoAuth и без avatarUrl', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithRouter = withRouter(<Avatar />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.queryByAltText('photo user')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при AuthorizationStatus.Unknown и без avatarUrl', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithRouter = withRouter(<Avatar />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.queryByAltText('photo user')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при AuthorizationStatus.Unknown и с avatarUrl', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userName: '',
        avatarUrl: '2f32dfsdfds3g34',
      }
    });
    const componentWithRouter = withRouter(<Avatar />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.queryByAltText('photo user')).not.toBeInTheDocument();
  });
});
