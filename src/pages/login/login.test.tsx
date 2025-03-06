import { render, screen } from '@testing-library/react';
import Login from './login';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';

describe('Component: Login', () => {
  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<Login />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });
});
