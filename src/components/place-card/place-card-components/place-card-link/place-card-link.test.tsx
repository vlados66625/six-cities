import { render, screen } from '@testing-library/react';
import PlaceCardLink from './place-card-link';
import { withRouter } from '../../../../test-utils/mock-component';

describe('Component: PlaceCardLink', () => {
  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<PlaceCardLink offerId='test-id'><p>test-text</p></PlaceCardLink>);

    render(componentWithRouter);

    expect(screen.getByTestId('place-card-link')).toBeInTheDocument();
    expect(screen.getByText('test-text')).toBeInTheDocument();
  });
});
