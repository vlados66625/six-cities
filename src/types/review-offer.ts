import { User } from './user';

export type ReviewOffer = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
};
