import { OfferPreview } from '../../../types/offer-types';
import { CityName } from '../../../const';
import PlaceCards from '../../../components/place-cards/place-cards';

import { useCityLinkClick } from '../../../hooks/use-city-link-click';

type FavoritesItemsProps = {
  city: CityName;
  filteredByCityOffers: OfferPreview[];
}

export default function FavoritesItems({ city, filteredByCityOffers }: FavoritesItemsProps): JSX.Element {
  const handleCityLinkClick = useCityLinkClick(city);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a onClick={handleCityLinkClick} className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <PlaceCards placeCard='favorite' offersPreview={filteredByCityOffers} />
      </div>
    </li>
  );

}
