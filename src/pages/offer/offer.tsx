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
import { offerSelectors } from '../../store/slices/offer';
import { useActionCreators } from '../../hooks';
import { offerActions } from '../../store/slices/offer';
import { MAX_PLACES_LIST_NEARBY } from '../../const';


export default function Offer(): JSX.Element | null {
  const { id } = useParams();
  const mapRef = useRef<HTMLElement | null>(null);

  const detailedOffer = useAppSelector(offerSelectors.detailedOffer);
  const offersNearby = useAppSelector(offerSelectors.offersNearby);
  const isLoadingOffer = useAppSelector(offerSelectors.isLoadingOffer);

  const { fetchDetailedOfferAction, fetchReviewsOfferAction, fetchOffersNearbyAction } = useActionCreators(offerActions);
  useEffect(() => {
    if (id) {
      fetchDetailedOfferAction(id);
      fetchReviewsOfferAction(id);
      fetchOffersNearbyAction(id);
    }
  }, [fetchDetailedOfferAction, fetchReviewsOfferAction, fetchOffersNearbyAction, id]);

  if (isLoadingOffer) {
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
          <OffersNearby offersNearby={offersNearby} />
        </main>
      </div>
    </>
  );
}
