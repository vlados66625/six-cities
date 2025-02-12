import cn from 'classnames';
import { MouseEvent } from 'react';
import { sixCities } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { changeCity } from '../../../store/action';
import { CityName } from '../../../const';

type LocationsProps = {
  selectedCity: CityName;
}

export default function Locations({ selectedCity }: LocationsProps): JSX.Element {
  const dispatch = useAppDispatch();
  function handleLocationLinkClick(evt: MouseEvent<HTMLAnchorElement>, city: CityName): void {
    evt.preventDefault();
    dispatch(changeCity(city));
  }

  return (
    <section className="locations container">
      <ul className="locations__list tabuls__list">
        {sixCities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={cn(
                'locations__item-link tabs__item',
                { 'tabs__item--active': city === selectedCity }
              )}
              onClick={(evt: MouseEvent<HTMLAnchorElement>) => handleLocationLinkClick(evt, city)}
              href="#"
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
