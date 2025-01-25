export const DataMain = {
  RentalOffers: 312,
} as const;

export const SixCities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const AppRoute = {
  Root: '/',
  Favorites: 'favorites',
  Offer: 'offer',
  Login: 'login',
  ID: 'id'
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;
