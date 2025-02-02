export const RENTAL_OFFER = 312;

export const sixCities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export type SixCities = typeof sixCities[number];

export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Login = '/login'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_RATING = 5;

export const formatFullMonthFullYear = 'MMMM YYYY';

export const formatFullYearMonthDay = 'YYYY-MM-DD';
