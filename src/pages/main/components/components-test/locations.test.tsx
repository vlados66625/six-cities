import { render, screen } from '@testing-library/react';
import Locations from '../locations';
import { withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { sixCities } from '../../../../const';

describe('Component: Locations', () => {
  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<Locations selectedCity={sixCities[0]} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(sixCities[0])).toBeInTheDocument();
  });
});
