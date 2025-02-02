import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { OfferDetailed } from '../../mock/offer-detailed';
import { OffersPreview } from '../../mock/offers-preview';
import { ReviewsOffer } from '../../mock/reviews-offer';
import { MAX_RATING } from '../../const';
import PlaceCards from '../../components/place-cards/place-cards';
import Review from './components/review';
import Gallery from './components/gallery';
import PremiumMark from './components/premium-mark';
import Advantages from './components/advantages';
import ReviewsForm from './components/reviews-form';
import Header from '../../components/layout/header/header';
import { MAX_PLACES_LIST_NEARBY } from '../../const';

type OfferProps = {
  offerDetailed: OfferDetailed;
  offersPreview: OffersPreview;
  reviewsOffer: ReviewsOffer;
}

export default function Offer({ offerDetailed, offersPreview, reviewsOffer }: OfferProps): JSX.Element {
  const [comment, setComment] = useState('');
  function handleReviewsTextOnChange(value: string): void {
    setComment(value);
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
            <Gallery images={offerDetailed.images} />
            <div className="offer__container container">
              <div className="offer__wrapper">
                <PremiumMark isPremium={offerDetailed.isPremium} />
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offerDetailed.title}
                  </h1>
                  <button className={`offer__bookmark-button ${offerDetailed.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${offerDetailed.rating / MAX_RATING * 100}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offerDetailed.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offerDetailed.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offerDetailed.bedrooms} Bedroom{offerDetailed.bedrooms === 1 ? '' : 's'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offerDetailed.maxAdults} adult{offerDetailed.maxAdults === 1 ? '' : 's'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offerDetailed.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <Advantages advantages={offerDetailed.goods} />
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper${offerDetailed.host.isPro ? ' offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={offerDetailed.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {offerDetailed.host.name}
                    </span>
                    {offerDetailed.host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offerDetailed.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Review{reviewsOffer.length > 1 ? 's' : ''} · <span className="reviews__amount">{reviewsOffer.length}</span></h2>
                  <ul className="reviews__list">
                    {reviewsOffer.map((reviewOffer) => (
                      <Review reviewOffer={reviewOffer} key={reviewOffer.id} />
                    ))}
                  </ul>
                  <ReviewsForm comment={comment} handleReviewsTextOnChange={handleReviewsTextOnChange} />
                </section>
              </div>
            </div>
            <section className="offer__map map" />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <PlaceCards offersPreview={offersPreview.slice(0, MAX_PLACES_LIST_NEARBY)} variant='near-places' />
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
