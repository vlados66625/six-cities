import { faker } from '@faker-js/faker';
import { DetailedOffer } from '../../types/offer-types';
import { sixCities } from '../../const';

export function createFakeDetailedOffer(): DetailedOffer {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 6 }),
    description: faker.lorem.paragraphs({ min: 1, max: 3 }),
    type: faker.helpers.arrayElement(['apartment', 'room', 'house', 'hotel']),
    price: faker.number.int({ min: 50, max: 999 }),
    images: faker.helpers.arrayElements(
      Array.from({ length: 20 }, () => faker.image.url()), 6,
    ),
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
    goods: faker.helpers.arrayElements([
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Fridge',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
    ], { min: 3, max: 7 },
    ),
    host: {
      name: faker.person.firstName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
    isPremium: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    bedrooms: faker.number.int({ min: 1, max: 5 }),
    maxAdults: faker.number.int({ min: 1, max: 8 }),
  };
}
