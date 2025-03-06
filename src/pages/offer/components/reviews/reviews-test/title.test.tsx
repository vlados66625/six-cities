import { render, screen } from '@testing-library/react';
import TitleReviews from '../title';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';
import { AuthorizationStatus } from '../../../../../const';

describe('Component: TitleReviews', () => {
  it('должен рендериться корректно', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '',
      }
    });
    const countReviews = 3;
    const componentWithStore = withStore(<TitleReviews countReviews={countReviews} />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(/review/i)).toBeInTheDocument();
  });
});
