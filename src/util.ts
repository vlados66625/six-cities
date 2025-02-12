import getAuthorizationStatus from './mock/get-authorization-status';
import { AuthorizationStatus } from './const';
import { OffersPreview } from './types/offer-types';
import { CityName } from './const';
import dayjs from 'dayjs';

export function getIsAuth() {
  return getAuthorizationStatus() === AuthorizationStatus.Auth;
}

export function getFilteredByCityOffers(offers: OffersPreview, city: CityName): OffersPreview {
  return offers.filter((offer) => offer.city.name === city);
}

export function getFormatedDate(date: string, format: string): string {
  return dayjs(date).format(format);
}

export function getPluralForm(word: string, count: number): string {
  if (count === 1) {
    return word;
  }
  return `${word}s`;
}
