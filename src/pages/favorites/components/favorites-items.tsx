import { OfferPreview } from '../../../types/offer-types';
import { CityName } from '../../../const';
import PlaceCards from '../../../components/place-cards/place-cards';

type FavoritesItemsProps = {
  city: CityName;
  filteredByCityOffers: OfferPreview[];
}

export default function FavoritesItems({ city, filteredByCityOffers }: FavoritesItemsProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
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
