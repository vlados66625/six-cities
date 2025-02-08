import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { OffersPreview } from '../../types/offer-types';
import PlaceCards from '../../components/place-cards/place-cards';
import NoPlaces from './components/no-places';
import PlacesSorting from './components/places-sorting';
import Header from '../../components/layout/header/header';
import { sixCities } from '../../const';
import PlaceCardCities from '../../components/place-card/place-card-cities';
import Map from '../../components/map/map';

type MainProps = {
  offersPreview: OffersPreview;
  rentalOffer: number;
}

export default function Main({ offersPreview, rentalOffer }: MainProps): JSX.Element {
  const [idFocusCard, setIdFocusCard] = useState<string | null>(null);
  const isEmpty = offersPreview.length === 0;
  const mapRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <div className="page page--gray page--main">
        <Header isLogoActive />
        <main className={cn('page__main page__main--index',
          { 'page__main--index-empty': isEmpty })}
        >
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabuls__list">
                {sixCities.map((city) => (
                  <li className="locations__item" key={city}>
                    <a className="locations__item-link tabs__item" href="#">
                      <span>{city}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className={cn(
              'cities__places-container',
              { 'cities__places-container--empty': isEmpty, },
              'container')}
            >
              {isEmpty ?
                <NoPlaces />
                :
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{rentalOffer} places to stay in Amsterdam</b>
                  <PlacesSorting />
                  <div className="cities__places-list places__list tabs__content">
                    <PlaceCards PlaceCard={PlaceCardCities} handleHoverCard={setIdFocusCard} offersPreview={offersPreview} />
                  </div>
                </section>}
              <div className="cities__right-section">
                {!isEmpty &&
                  <section className="cities__map map" ref={mapRef} >
                    <Map mapRef={mapRef} idFocusCard={idFocusCard} offersPreview={offersPreview} />
                  </section>}
              </div>
            </div>
          </div>
        </main >
      </div>
    </>
  );
}
