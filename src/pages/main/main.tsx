import { sixCities } from '../../const';
import { Helmet } from 'react-helmet-async';
import { Offers } from '../../mock/offers';
import PlaceCards from '../../components/place-cards/place-cards';
import { useState } from 'react';

type MainProps = {
  offers: Offers;
  rentalOffer: number;
}

export default function Main({ offers, rentalOffer }: MainProps): JSX.Element {
  const [idFocusCard, setIdFocusCard] = useState<string | null>(null);
  const focusCard = idFocusCard;
  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <main className="page__main page__main--index" key={focusCard}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.values(sixCities).map((city) => (
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
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{rentalOffer} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opene-d">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <PlaceCards handleHoverCard={setIdFocusCard} isCitiesBlock offers={offers} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main >
    </>
  );
}
