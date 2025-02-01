export const RENTAL_OFFER = 312;

export const SixCities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

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
