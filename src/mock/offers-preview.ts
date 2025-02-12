import { OffersPreview } from '../types/offer-types';

export const offersPreview: OffersPreview = [
  {
    id: 'b439ca13-75db-4bc3-9766-8529b9d070bc',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'room',
    price: 155,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/6.jpg',
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
    isFavorite: false,
    isPremium: false,
    rating: 1.3
  }, {
    id: '5a9ad157-a297-468a-9e66-225b57192f6e',
    title: 'The Joshua Tree House',
    type: 'apartment',
    price: 256,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 2
  }, {
    id: 'd6fb5bc5-690b-4b34-b418-2fd221efd5a0',
    title: 'The Joshua Tree House',
    type: 'house',
    price: 263,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/1.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.7
  }, {
    id: '85f66718-f4be-4884-8691-f564faeeacdd',
    title: 'Wood and stone place',
    type: 'apartment',
    price: 144,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.9
  },
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
