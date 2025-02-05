import { OffersPreview } from '../../../types/offer-types';
import { SixCities } from '../../../const';
import PlaceCards from '../../../components/place-cards/place-cards';
import PlaceCardFavorites from '../../../components/place-card/place-card-favorites';

type FavoritesItemsProps = {
  city: SixCities;
  filteredByCityOffers: OffersPreview;
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
        <PlaceCards placeCard={PlaceCardFavorites} offersPreview={filteredByCityOffers} />
      </div>
    </li>
  );

}
