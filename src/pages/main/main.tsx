import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import PlaceCards from '../../components/place-cards/place-cards';
import NoPlaces from './components/no-places';
import PlacesSorting from './components/places-sorting';
import Header from '../../components/layout/header/header';
import PlaceCardCities from '../../components/place-card/place-card-cities';
import Map from '../../components/map/map';
import Locations from './components/locations';
import { getPluralForm } from '../../util';
import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';

export default function Main(): JSX.Element {
  const [idFocusCard, setIdFocusCard] = useState<string | null>(null);
  const mapRef = useRef<HTMLElement | null>(null);

  const selectedCity = useAppSelector(offersSelectors.city);
  const offers = useAppSelector(offersSelectors.showOffers);
  const empty = offers.length === 0;

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <div className="page page--gray page--main">
        <Header isLogoActive />
        <main className={cn('page__main page__main--index',
          { 'page__main--index-empty': empty })}
        >
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <Locations selectedCity={selectedCity} />
          </div>
          <div className="cities">
            <div className={cn(
              'cities__places-container',
              { 'cities__places-container--empty': empty, },
              'container')}
            >
              {empty ?
                <NoPlaces />
                :
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} {getPluralForm('place', offers.length)} to stay in Amsterdam</b>
                  <PlacesSorting />
                  <div className="cities__places-list places__list tabs__content">
                    <PlaceCards PlaceCard={PlaceCardCities} handleHoverCard={setIdFocusCard} offersPreview={offers} />
                  </div>
                </section>}
              <div className="cities__right-section">
                {!empty &&
                  <section className="cities__map map" ref={mapRef} >
                    <Map mapRef={mapRef} idFocusCard={idFocusCard} offersPreview={offers} />
                  </section>}
              </div>
            </div>
          </div>
        </main >
      </div>
    </>
  );
}
