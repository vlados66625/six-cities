import { useNavigate } from 'react-router-dom';
import { useActionCreators } from '.';
import { offersActions } from '../store/slices/offers';
import { AppRoute, CityName } from '../const';
import { MouseEvent } from 'react';

export function useCityLinkClick(city: CityName) {
  const navigate = useNavigate();
  const { setCity } = useActionCreators(offersActions);

  function handleCityLinkClick(evt: MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    navigate(AppRoute.Root);
    setCity(city);
  }

  return handleCityLinkClick;
}
