import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useState, useRef, useEffect } from 'react';
import Review from './components/review';
import Gallery from './components/gallery';
import PremiumMark from './components/premium-mark';
import Advantages from './components/advantages';
import ReviewsForm from './components/reviews-form';
import Header from '../../components/layout/header/header';
import { MAX_PLACES_LIST_NEARBY } from '../../const';
import { getPluralForm } from '../../util';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { getRoundedRatingInPercentage } from '../../util';
import { offersSelectors } from '../../store/slices/offers';
import { authorizationSelectors } from '../../store/slices/authorization';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import { store } from '../../store';
import { fetchDetailedOfferAction, fetchOffersNearbyAction, fetchReviewsOfferAction } from '../../store/api-actions';
import OffersNearby from './components/offers-nearby';

export default function Offer(): JSX.Element | null {
  const { id } = useParams();
  const mapRef = useRef<HTMLElement | null>(null);
  const [idFocusCard, setIdFocusCard] = useState<string | null>(null);

  const isAuth = useAppSelector(authorizationSelectors.isAuth);
  const reviewsOffer = useAppSelector(offersSelectors.reviewsOffer);
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
            <Gallery images={detailedOffer?.images} />
            <div className="offer__container container">
              <div className="offer__wrapper">
                <PremiumMark isPremium={detailedOffer?.isPremium} />
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {detailedOffer?.title}
                  </h1>
                  <button type="button" className={cn(
                    'offer__bookmark-button',
                    { 'offer__bookmark-button--active': detailedOffer?.isFavorite },
                    'button')}
                  >
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${getRoundedRatingInPercentage(detailedOffer?.rating)}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{detailedOffer?.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {detailedOffer?.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {detailedOffer?.bedrooms} {getPluralForm('Bedroom', detailedOffer?.bedrooms)}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {detailedOffer?.maxAdults} {getPluralForm('adult', detailedOffer?.maxAdults)}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{detailedOffer?.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <Advantages advantages={detailedOffer?.goods} />
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper${detailedOffer?.host.isPro ? ' offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={detailedOffer?.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {detailedOffer?.host.name}
                    </span>
                    {detailedOffer?.host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {detailedOffer?.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  {reviewsOffer.length === 0 ?
                    <h2 className="reviews__title">There are no reviews, be the first</h2>
                    :
                    <h2 className="reviews__title">{getPluralForm('Review', reviewsOffer.length)} · <span className="reviews__amount">{reviewsOffer.length}</span></h2>}

                  <ul className="reviews__list">
                    {reviewsOffer.map((reviewOffer) => (
                      <Review reviewOffer={reviewOffer} key={reviewOffer.id} />
                    ))}
                  </ul>
                  {isAuth && <ReviewsForm offerId={detailedOffer?.id} />}
                </section>
              </div>
            </div>
            <section ref={mapRef} className="offer__map map" >
              <Map mapRef={mapRef} idFocusCard={idFocusCard || detailedOffer?.id} currentOffer={detailedOffer} offersPreview={offersNearby.slice(0, MAX_PLACES_LIST_NEARBY)} />
            </section>
          </section>
          <OffersNearby setIdFocusCard={setIdFocusCard} />
        </main>
      </div>
    </>
  );
}
