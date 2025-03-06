import { faker } from '@faker-js/faker';
import { ResponseAuth } from '../../types/response-auth';

export function createFakeResponseAuth(): ResponseAuth {
  return ({
    name: faker.person.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
    email: faker.internet.email(),
    token: faker.string.alphanumeric(16),
  });
}
