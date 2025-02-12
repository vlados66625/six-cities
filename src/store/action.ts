import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../const';
import { OfferPreview } from '../types/offer-types';

export const changeCity = createAction<CityName>('changeCity');

export const fillingOffers = createAction<OfferPreview[]>('fillingOffers');
