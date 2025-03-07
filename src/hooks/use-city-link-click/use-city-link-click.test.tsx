import { renderHook } from '@testing-library/react';
import { AppRoute, sixCities } from '../../const';
import { useCityLinkClick } from './use-city-link-click';
import { useActionCreators } from '..';
import { useNavigate } from 'react-router-dom';
import { Mock } from 'vitest';
import { MouseEvent } from 'react';


vi.mock('..', () => ({
  useActionCreators: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));


describe('hook: : useCityLinkClick', () => {
  const mockSetidFocusCard = vi.fn();
  const navigate = vi.fn();
  const evt = {
    preventDefault: vi.fn(),
  } as unknown as MouseEvent<HTMLAnchorElement>;

  beforeEach(() => {
    vi.clearAllMocks();
    (useActionCreators as Mock).mockReturnValue({
      setCity: mockSetidFocusCard,
    });
    (useNavigate as Mock).mockReturnValue(navigate);
  });

  it('должен вернуть функцию', () => {
    const city = sixCities[0];
    const { result } = renderHook(() => useCityLinkClick(city));
    const handleCityLinkClick = result.current;

    expect(typeof handleCityLinkClick).toBe('function');
  });

  it('должен вызвать функции evt.preventDefault() navigate(AppRoute.Root) и setCity(city) при вызове handleCityLinkClick', () => {
    const city = sixCities[2];
    const { result } = renderHook(() => useCityLinkClick(city));
    const handleCityLinkClick = result.current;

    handleCityLinkClick(evt);

    expect(evt.preventDefault).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(AppRoute.Root);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(mockSetidFocusCard).toHaveBeenCalledWith(city);
    expect(mockSetidFocusCard).toHaveBeenCalledTimes(1);
  });

});

