import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../const';
import { OfferPreview } from '../types/offer-types';
import { DetailedOffer } from '../types/offer-types';
import { ReviewOffer } from '../types/review-offer';

export const changeCity = createAction<CityName>('changeCity');

export const fillingOfferPreview = createAction<OfferPreview[]>('fillingOffers');

export const fillingReviewOffer = createAction<ReviewOffer[]>('fillingReviewOffer');

export const fillingDetailedOffer = createAction<DetailedOffer>('fillingDetailedOffer');
