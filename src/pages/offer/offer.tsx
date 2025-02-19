import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { ChangeEvent, useState, useRef } from 'react';
import PlaceCards from '../../components/place-cards/place-cards';
import Review from './components/review';
import Gallery from './components/gallery';
import PremiumMark from './components/premium-mark';
import Advantages from './components/advantages';
import ReviewsForm from './components/reviews-form';
import Header from '../../components/layout/header/header';
import { MAX_PLACES_LIST_NEARBY } from '../../const';
import { getIsAuth, getPluralForm } from '../../util';
import PlaceCardNearPlaces from '../../components/place-card/place-card-near-places';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { getRoundedRatingInPercentage } from '../../util';
import { offersSelectors } from '../../store/slices/offers';

export default function Offer(): JSX.Element {
  const isAuth = getIsAuth();
  const [review, setReview] = useState({ rating: 0, review: '' });
  const mapRef = useRef<HTMLElement | null>(null);
  const [idFocusCard, setIdFocusCard] = useState<string | null>(null);

  const offersPreview = useAppSelector(offersSelectors.offersPreview);
  const reviewsOffer = useAppSelector(offersSelectors.reviewsOffer);
  const detailedOffer = useAppSelector(offersSelectors.detailedOffer);

  function handleChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = evt.currentTarget;
    setReview({ ...review, [name]: value });
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
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {detailedOffer.title}
                  </h1>
                  <button type="button" className={cn(
                    'offer__bookmark-button',
                    { 'offer__bookmark-button--active': detailedOffer.isFavorite },
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
                    <span style={{ width: `${getRoundedRatingInPercentage(detailedOffer.rating)}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{detailedOffer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {detailedOffer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {detailedOffer.bedrooms} {getPluralForm('Bedroom', detailedOffer.bedrooms)}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {detailedOffer.maxAdults} {getPluralForm('adult', detailedOffer.maxAdults)}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{detailedOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <Advantages advantages={detailedOffer.goods} />
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper${detailedOffer.host.isPro ? ' offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={detailedOffer.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {detailedOffer.host.name}
                    </span>
                    {detailedOffer.host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {detailedOffer.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">{getPluralForm('Review', reviewsOffer.length)} · <span className="reviews__amount">{reviewsOffer.length}</span></h2>
                  <ul className="reviews__list">
                    {reviewsOffer.map((reviewOffer) => (
                      <Review reviewOffer={reviewOffer} key={reviewOffer.id} />
                    ))}
                  </ul>
                  {isAuth && <ReviewsForm review={review} handleChange={handleChange} />}
                </section>
              </div>
            </div>
            <section ref={mapRef} className="offer__map map" >
              <Map mapRef={mapRef} idFocusCard={idFocusCard || detailedOffer.id} currentOffer={detailedOffer} offersPreview={offersPreview.slice(0, MAX_PLACES_LIST_NEARBY)} />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <PlaceCards
                  PlaceCard={PlaceCardNearPlaces}
                  offersPreview={offersPreview.slice(0, MAX_PLACES_LIST_NEARBY)}
                  handleHoverCard={setIdFocusCard}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
