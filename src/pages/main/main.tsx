import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';

import NoPlaces from './components/no-places';
import PlacesSorting from './components/places-sorting';
import Locations from './components/locations';
import Header from '../../components/layout/header/header';
import PlaceCards from '../../components/place-cards/place-cards';
import Map from '../../components/map/map';

import { useActionCreators } from '../../hooks';
import { offersActions } from '../../store/slices/offers';
import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';
import { getPluralForm } from '../../util';

export default function Main(): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);

  const selectedCity = useAppSelector(offersSelectors.city);
  const offers = useAppSelector(offersSelectors.showOffers);
  const empty = offers.length === 0;

  const { fetchOffersPreviewAction } = useActionCreators(offersActions);

  useEffect(() => {
    fetchOffersPreviewAction();
  }, [fetchOffersPreviewAction]);

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <div className="page page--gray page--main">
        <Header isLogoActive />
        <main className={cn('page__main page__main--index',
          { 'page__main--index-empty': empty })}
        data-testid="main"
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
                  <b className="places__found">{offers.length} {getPluralForm('place', offers.length)} to stay in {selectedCity}</b>
                  <PlacesSorting />
                  <div className="cities__places-list places__list tabs__content">
                    <PlaceCards placeCard='city' isSupportsHover offersPreview={offers} />
                  </div>
                </section>}
              <div className="cities__right-section">
                {!empty &&
                  <section className="cities__map map" ref={mapRef} data-testid="map">
                    <Map mapRef={mapRef} offersPreview={offers} />
                  </section>}
              </div>
            </div>
          </div>
        </main >
      </div>
    </>
  );
}
