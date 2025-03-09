import { render, screen } from '@testing-library/react';
import NoFavorites from '../no-favorites';


describe('Component: NoFavorites', () => {
  it('должен рендериться корректно', () => {

    render(<NoFavorites />);

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
  });
});
