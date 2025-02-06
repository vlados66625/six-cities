import { User } from './user';

type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

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

export type OffersPreview = readonly OfferPreview[];
