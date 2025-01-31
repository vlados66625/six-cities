import { Helmet } from 'react-helmet-async';
import { Offers } from '../../mock/offers';
import { getFavoritesOffers } from './util';
import FavoritesList from './components/favorites-list';

type FavoritesProps = {
  offers: Offers;
}

export default function Favorites({ offers }: FavoritesProps): JSX.Element {
  const favoritesOffers = getFavoritesOffers(offers);

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList favoritesOffers={favoritesOffers} />
          </section>
        </div>
      </main>
    </>
  );
}
