import { render, screen } from '@testing-library/react';
import Header from './header';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';

describe('Component: Header', () => {
  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<Header />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
