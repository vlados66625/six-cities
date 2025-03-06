import { render, screen } from '@testing-library/react';
import Avatar from '../avatar';
import { withRouter, withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';
import { AuthorizationStatus } from '../../../../../const';

describe('Component: Avatar', () => {
  it('должен рендериться корректно', () => {
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

    expect(screen.getByAltText('photo user')).toBeInTheDocument();
  });
});
