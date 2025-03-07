import { render, screen } from '@testing-library/react';
import Reviews from '../reviews';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';
import { AuthorizationStatus } from '../../../../../const';

describe('Component: Reviews', () => {
  it('должен рендериться корректно когда пользватель не авторизован', () => {
    const componentWithStore = withStore(<Reviews idDetailedOffer='test-id' />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('reviews-section')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-title')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.queryByTestId('reviews-form')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно когда пользватель авторизован', () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '',
      }
    });
    const componentWithStore = withStore(<Reviews idDetailedOffer='test-id' />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('reviews-section')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-title')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-form')).toBeInTheDocument();
  });
});
