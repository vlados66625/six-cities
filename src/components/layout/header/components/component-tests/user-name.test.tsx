import { render, screen } from '@testing-library/react';
import UserName from '../user-name';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';

describe('Component: UserName', () => {
  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<UserName />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('user-name')).toBeInTheDocument();
  });
});
