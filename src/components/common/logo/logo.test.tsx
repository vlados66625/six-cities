import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withRouter } from '../../../test-utils/mock-component';

describe('Component: Logo', () => {
  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<Logo blockName="footer" width={64} height={33} />);

    render(componentWithRouter);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
