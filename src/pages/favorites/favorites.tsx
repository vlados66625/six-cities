import { Helmet } from 'react-helmet-async';
import cn from 'classnames';

import FavoritesList from './components/favorites-list';
import NoFavorites from './components/no-favorites';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';

import { getFavoritesOffers } from './util';


export default function Favorites(): JSX.Element {
  const offersPreview = useAppSelector(offersSelectors.offersPreview);
  const favoritesOffers = getFavoritesOffers(offersPreview);
  const isEmpty = favoritesOffers.length === 0;

  return (
    <>
      <Helmet>
        <title>6 cities: favorites{isEmpty ? ' empty' : ''}</title>
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
