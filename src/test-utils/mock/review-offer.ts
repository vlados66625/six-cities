import { faker } from '@faker-js/faker';
import { ReviewOffer } from '../../types/review-offer';

export function createFakeReviewOffer(): ReviewOffer {
  return ({
    id: faker.string.uuid(),
    comment: faker.lorem.paragraph(),
    date: faker.date.past().toISOString(),
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 0 }),
    user: {
      name: faker.person.firstName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
  });
}

export function createFakeReviewsOffer(count: number): ReviewOffer[] {
  return Array.from({ length: count }, () => createFakeReviewOffer());
}
