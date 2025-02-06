import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { OffersPreview } from '../../types/offer-types';
import { getFavoritesOffers } from './util';
import FavoritesList from './components/favorites-list';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import NoFavorites from './components/no-favorites';

type FavoritesProps = {
  offersPreview: OffersPreview;
}

export default function Favorites({ offersPreview }: FavoritesProps): JSX.Element {
  const favoritesOffers = getFavoritesOffers(offersPreview);
  const isEmpty = favoritesOffers.length === 0;

  return (
    <>
      <Helmet>
        <title>`6 cities: favorites${isEmpty ? ' empty' : ''}`</title>
      </Helmet>

      <div className={cn('page',
        { 'page--favorites-empty': isEmpty })}
      >
        <Header />
        <main className={cn('page__main page__main--favorites',
          { 'page__main--favorites-empty': isEmpty })}
        >
          <div className="page__favorites-container container">
            {isEmpty ?
              <NoFavorites />
              :
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <FavoritesList favoritesOffers={favoritesOffers} />
              </section>}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
