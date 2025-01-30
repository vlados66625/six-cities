export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
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

export type Offers = Offer[]

export const offers: Offers = [{
  id: 'a1ae1618-0958-4e8b-a934-3bbcaf6a9570',
  title: 'Canal View Prinsengracht',
  type: 'house',
  price: 197,
  previewImage: 'https://15.design.htmlacademy.pro/static/hotel/15.jpg',
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
  isPremium: false,
  rating: 3.1
}, {
  id: 'aa4632ec-2ed2-4292-bd7d-93ce53fd0e9d',
  title: 'Canal View Prinsengracht',
  type: 'apartment',
  price: 444,
  previewImage: 'https://15.design.htmlacademy.pro/static/hotel/9.jpg',
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
  isPremium: true,
  rating: 2.8
}, {
  id: 'f9aa1314-79b2-4a67-8bc0-0c2e78422abe',
  title: 'Amazing and Extremely Central Flat',
  type: 'house',
  price: 716,
  previewImage: 'https://15.design.htmlacademy.pro/static/hotel/20.jpg',
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
  isPremium: true,
  rating: 1.2
}] as const;
