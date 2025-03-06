import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withRouter } from '../../../test-utils/mock-component';

describe('Component: Footer', () => {
  it('should render correct', () => {
    const componentWithRouter = withRouter(<Footer />);

    render(componentWithRouter);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
