import { useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Gallery from './components/gallery';
import PremiumMark from './components/premium-mark';
import Advantages from './components/advantages';
import Host from './components/host';
import MainInfo from './components/main-info';
import Reviews from './components/reviews';
import OffersNearby from './components/offers-nearby';
import Header from '../../components/layout/header/header';
import Loading from '../../components/loading/loading';
import Map from '../../components/map/map';

import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';
import { store } from '../../store';
import { fetchDetailedOfferAction, fetchOffersNearbyAction, fetchReviewsOfferAction } from '../../store/api-actions';
import { MAX_PLACES_LIST_NEARBY } from '../../const';


export default function Offer(): JSX.Element | null {
  const { id } = useParams();
  const mapRef = useRef<HTMLElement | null>(null);

  const detailedOffer = useAppSelector(offersSelectors.detailedOffer);
  const offersNearby = useAppSelector(offersSelectors.offersNearby);
  const isLoading = useAppSelector(offersSelectors.isLoading);

  useEffect(() => {
    if (id) {
      store.dispatch(fetchDetailedOfferAction(id));
      store.dispatch(fetchOffersNearbyAction(id));
      store.dispatch(fetchReviewsOfferAction(id));
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!detailedOffer) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>

      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <section className="offer">
            <Gallery images={detailedOffer.images} />
            <div className="offer__container container">
              <div className="offer__wrapper">
                <PremiumMark isPremium={detailedOffer.isPremium} />
                <MainInfo />
                <Advantages advantages={detailedOffer.goods} />
                <Host />
                <Reviews idDetailedOffer={detailedOffer.id} />
              </div>
            </div>
            <section ref={mapRef} className="offer__map map" >
              <Map mapRef={mapRef} currentOffer={detailedOffer} offersPreview={offersNearby.slice(0, MAX_PLACES_LIST_NEARBY)} />
            </section>
          </section>
          <OffersNearby />
        </main>
      </div>
    </>
  );
}
