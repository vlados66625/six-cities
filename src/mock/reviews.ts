export type ReviewOffer = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type ReviewsOffer = ReviewOffer[];

export const reviewsOffer: ReviewsOffer = [{
  id: 'c9050790-fb89-48f9-9a07-1148040d9359',
  comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
  date: '2025-01-06T21:00:00.745Z',
  rating: 5,
  user: {
    name: 'Christina',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/6.jpg',
    isPro: true
  }
}, {
  id: '053d3e2f-b7fe-49bf-a821-a425ec502292',
  comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
  date: '2025-01-04T21:00:00.745Z',
  rating: 5,
  user: {
    name: 'Emely',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/2.jpg',
    isPro: true
  }
}, {
  id: '7c8bfeb1-47ea-44e4-be2a-dd9f25bd0292',
  comment: 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
  date: '2025-01-02T21:00:00.745Z',
  rating: 1,
  user: {
    name: 'Kendall',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg',
    isPro: false
  }
}] as const;
