import { render, screen } from '@testing-library/react';
import Bookmarks from './bookmarks';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';

describe('Component: Bookmarks', () => {
  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<Bookmarks width={18} height={19} offerId='12345' blockName='place-card' />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });
});
