import { Helmet } from 'react-helmet-async';
import { OffersPreview } from '../../mock/offers-preview';
import { getFavoritesOffers } from './util';
import FavoritesList from './components/favorites-list';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

type FavoritesProps = {
  offersPreview: OffersPreview;
}

export default function Favorites({ offersPreview }: FavoritesProps): JSX.Element {
  const favoritesOffers = getFavoritesOffers(offersPreview);

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>

      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList favoritesOffers={favoritesOffers} />
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
