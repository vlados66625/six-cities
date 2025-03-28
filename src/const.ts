export const sixCities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export type CityName = typeof sixCities[number];

export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Offer = '/offer',
  OfferId = '/offer/:id',
  Login = '/login',
  Error = '/*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_RATING = 5;
export const MAX_PLACES_LIST_NEARBY = 3;

export enum DateFormat {
  FullMonthFullYear = 'MMMM YYYY',
  FullYearMonthDay = 'YYYY-MM-DD'
}

export const rating = [
  { value: 5, label: 'perfect' },
  { value: 4, label: 'good' },
  { value: 3, label: 'not bad' },
  { value: 2, label: 'badly' },
  { value: 1, label: 'terribly' },
] as const;

export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const MAX_GALLERY_IMAGES = 6;

export const ReviewLenght = {
  Min: 50,
  Max: 300,
} as const;
