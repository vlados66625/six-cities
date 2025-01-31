import PlaceCard from '../../components/place-card/place-card';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

export default function Offer(): JSX.Element {
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
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <PlaceCard variant='favorites' />
                    <PlaceCard variant='favorites' />
                  </div>
                </li>
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <PlaceCard variant='favorites' />
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
