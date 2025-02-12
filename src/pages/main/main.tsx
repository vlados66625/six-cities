import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { OffersPreview } from '../../types/offer-types';
import PlaceCards from '../../components/place-cards/place-cards';
import NoPlaces from './components/no-places';
import PlacesSorting from './components/places-sorting';
import Header from '../../components/layout/header/header';
import PlaceCardCities from '../../components/place-card/place-card-cities';
import Map from '../../components/map/map';
import Locations from './components/locations';
import { getFilteredByCityOffers } from '../../util';
import { useAppSelector } from '../../hooks';
import { getPluralForm } from '../../util';

type MainProps = {
  offersPreview: OffersPreview;
}

export default function Main({ offersPreview }: MainProps): JSX.Element {
  const [idFocusCard, setIdFocusCard] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const selectedCity = useAppSelector((state) => state.city);
  const filteredByCityOffers = getFilteredByCityOffers(offersPreview, selectedCity);
  const isEmpty = filteredByCityOffers.length === 0;

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
            <Locations selectedCity={selectedCity} />
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
                  <b className="places__found">{filteredByCityOffers.length} {getPluralForm('place', filteredByCityOffers.length)} to stay in Amsterdam</b>
                  <PlacesSorting />
                  <div className="cities__places-list places__list tabs__content">
                    <PlaceCards PlaceCard={PlaceCardCities} handleHoverCard={setIdFocusCard} offersPreview={filteredByCityOffers} />
                  </div>
                </section>}
              <div className="cities__right-section">
                {!isEmpty &&
                  <section className="cities__map map" ref={mapRef} >
                    <Map mapRef={mapRef} idFocusCard={idFocusCard} offersPreview={filteredByCityOffers} />
                  </section>}
              </div>
            </div>
          </div>
        </main >
      </div>
    </>
  );
}
