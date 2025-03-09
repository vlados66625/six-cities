import { render, screen } from '@testing-library/react';
import FavoriteCount from '../favorite-count';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';

describe('Component: FavoriteCount', () => {
  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<FavoriteCount />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('favorite-count')).toBeInTheDocument();
  });
});
