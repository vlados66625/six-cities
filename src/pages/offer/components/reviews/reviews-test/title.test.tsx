import { render, screen } from '@testing-library/react';
import TitleReviews from '../title';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';
import { AuthorizationStatus } from '../../../../../const';

describe('Component: TitleReviews', () => {
  it('должен рендериться корректно при count !==0 и AuthorizationStatus.Auth', () => {
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
    expect(screen.queryByText('There are no reviews, be the first')).not.toBeInTheDocument();
  });

  it('должен рендерить "There are no reviews, be the first" при count ===0 и AuthorizationStatus.Auth', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '',
      }
    });
    const countReviews = 0;
    const componentWithStore = withStore(<TitleReviews countReviews={countReviews} />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText('There are no reviews, be the first')).toBeInTheDocument();
  });

  it('не должен рендерить "There are no reviews, be the first" при count ===0 и AuthorizationStatus.NoAuth', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '',
      }
    });
    const countReviews = 0;
    const componentWithStore = withStore(<TitleReviews countReviews={countReviews} />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.queryByText('There are no reviews, be the first')).not.toBeInTheDocument();
  });
});
