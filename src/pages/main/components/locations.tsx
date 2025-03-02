import cn from 'classnames';
import { memo, MouseEvent } from 'react';
import { sixCities } from '../../../const';
import { useActionCreators } from '../../../hooks';
import { offersActions } from '../../../store/slices/offers';
import { CityName } from '../../../const';

type LocationsProps = {
  selectedCity: CityName;
}

function Locations({ selectedCity }: LocationsProps): JSX.Element {
  const { setCity } = useActionCreators(offersActions);
  function handleLocationLinkClick(evt: MouseEvent<HTMLAnchorElement>, city: CityName): void {
    evt.preventDefault();
    setCity(city);
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

const LocationsMemo = memo(Locations);

export default LocationsMemo;
