import { render, screen } from '@testing-library/react';
import Main from './main';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';

describe('Component: Main', () => {
  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<Main />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
