import { User } from './user';
import { City } from './city';
import { Location } from './location';

type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite?: boolean;
  isPremium: boolean;
  rating: number;
};

export type DetailedOffer = Offer & {
  description: string;
  images: string[];
  goods: string[];
  host: User;
  bedrooms: number;
  maxAdults: number;
};

export type OfferPreview = Offer & {
  previewImage: string;
};
