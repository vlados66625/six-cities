import { OffersPreview } from '../types/offer-types';

export const offersPreview: OffersPreview = [
  {
    id: 'a1ae1618-0958-4e8b-a934-3bbcaf6a9570',
    title: 'Canal View Prinsengracht',
    type: 'house',
    price: 197,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/15.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 3.9
  }, {
    id: 'e0e44835-8696-4bba-8365-7ecf9dd9c771',
    title: 'Perfectly located Castro',
    type: 'hotel',
    price: 299,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/18.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.1
  }, {
    id: 'aa4632ec-2ed2-4292-bd7d-93ce53fd0e9d',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 444,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/9.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 2.8
  }, {
    id: 'f9aa1314-79b2-4a67-8bc0-0c2e78422abe',
    title: 'Amazing and Extremely Central Flat',
    type: 'house',
    price: 716,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/20.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.2
  }
] as const;
