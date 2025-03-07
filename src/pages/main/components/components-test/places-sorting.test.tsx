import { render, screen } from '@testing-library/react';
import PlacesSorting from '../places-sorting';
import { withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';

describe('Component: PlacesSorting', () => {
  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<PlacesSorting />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('sorting-form')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });
});
