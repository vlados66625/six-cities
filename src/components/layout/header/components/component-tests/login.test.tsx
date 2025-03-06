import { render, screen } from '@testing-library/react';
import Login from '../login';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';

describe('Component: Login', () => {
  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<Login />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(/загрузка/)).toBeInTheDocument();
  });
});
