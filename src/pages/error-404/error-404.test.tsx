import { render, screen } from '@testing-library/react';
import Error404 from './error-404';
import { withRouter } from '../../test-utils/mock-component';

describe('Component: Error404', () => {
  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<Error404 />);

    render(componentWithRouter);

    expect(screen.getByText('Error 404 this page does not exist')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
