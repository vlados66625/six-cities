import { render, screen } from '@testing-library/react';
import NoPlaces from '../no-places';
import { withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';

describe('Component: NoPlaces', () => {
  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<NoPlaces />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
