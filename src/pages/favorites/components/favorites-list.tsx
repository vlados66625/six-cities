import FavoritesItems from './favorites-items';
import { sixCities } from '../../../const';
import { getFilteredByCityOffers } from '../../../util';
import { Offers } from '../../../mock/offers';

type FavoritesListProps = {
  favoritesOffers: Offers;
}

export default function FavoritesList({ favoritesOffers }: FavoritesListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {sixCities.map((city) => {
        const filteredByCityOffers = getFilteredByCityOffers(favoritesOffers, city);
        if (filteredByCityOffers.length > 0) {
          return (
            <FavoritesItems key={city} city={city} filteredByCityOffers={filteredByCityOffers} />
          );
        }
        return null;
      })}
    </ul>
  );
}
