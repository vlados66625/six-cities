import { DetailedOffer } from '../types/offer-types';

export const detailedOffer: DetailedOffer = {
  id: '76ce36df-c6a5-46a4-b423-16c5f151de02',
  title: 'The Joshua Tree House',
  description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
  type: 'apartment',
  price: 292,
  images: ['https://15.design.htmlacademy.pro/static/hotel/15.jpg', 'https://15.design.htmlacademy.pro/static/hotel/16.jpg', 'https://15.design.htmlacademy.pro/static/hotel/3.jpg', 'https://15.design.htmlacademy.pro/static/hotel/2.jpg', 'https://15.design.htmlacademy.pro/static/hotel/11.jpg', 'https://15.design.htmlacademy.pro/static/hotel/4.jpg'],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16
  },
  goods: ['Baby seat', 'Wi-Fi', 'Fridge'],
  host: {
    isPro: true,
    name: 'Angelina',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
  },
  isPremium: true,
  isFavorite: false,
  rating: 1.3,
  bedrooms: 4,
  maxAdults: 10
};
