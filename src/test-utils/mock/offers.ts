import { faker } from '@faker-js/faker';
import { OfferPreview } from '../../types/offer-types';
import { sixCities } from '../../const';

export function createFakeOfferPreview(): OfferPreview {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 6 }),
    type: faker.helpers.arrayElement(['apartment', 'room', 'house', 'hotel']),
    price: faker.number.int({ min: 50, max: 999 }),
    city: {
      name: faker.helpers.arrayElement(sixCities),
      location: {
        latitude: faker.location.latitude({ precision: 6 }),
        longitude: faker.location.longitude({ precision: 6 }),
        zoom: faker.number.int({ min: 10, max: 16 }),
      },
    },
    location: {
      latitude: faker.location.latitude({ precision: 6 }),
      longitude: faker.location.longitude({ precision: 6 }),
      zoom: faker.number.int({ min: 10, max: 16 }),
    },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    previewImage: faker.image.url(),
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  };
}

export function createFakeOffersPreview(count: number): OfferPreview[] {
  return Array.from({ length: count }, () => createFakeOfferPreview());
}

export function createFakeFavoriteOffer(): OfferPreview {
  const fakeOfferPreview = createFakeOfferPreview();
  return {
    ...fakeOfferPreview,
    isFavorite: true,
  };
}

export function createFakeFavoritesOffers(count: number): OfferPreview[] {
  return Array.from({ length: count }, () => createFakeFavoriteOffer());
}
