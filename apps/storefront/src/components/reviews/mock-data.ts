import { Review, Question, ReviewSummaryData } from './types';

export const mockSummary: ReviewSummaryData = {
  averageRating: 4.8,
  totalReviews: 124,
  ratingDistribution: {
    5: 98,
    4: 15,
    3: 7,
    2: 3,
    1: 1,
  },
};

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    user: {
      id: 'u1',
      name: 'Alex Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?u=u1',
    },
    rating: 5,
    title: 'Exceeded my expectations!',
    text: 'This product is absolutely amazing. The build quality is premium, and it fits perfectly with my setup. Highly recommend to anyone on the fence.',
    createdAt: '2026-07-28T10:00:00Z',
    isVerifiedPurchase: true,
    helpfulVotes: 42,
    media: [
      {
        id: 'm1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'r2',
    productId: 'p1',
    user: {
      id: 'u2',
      name: 'Samantha Smith',
    },
    rating: 4,
    title: 'Great, but could be slightly cheaper',
    text: 'Love the features and the modern aesthetic. It performs really well under load. Dropped one star just because the price point is a bit high compared to competitors.',
    createdAt: '2026-07-25T14:30:00Z',
    isVerifiedPurchase: true,
    helpfulVotes: 15,
  },
  {
    id: 'r3',
    productId: 'p1',
    user: {
      id: 'u3',
      name: 'David Chen',
      avatarUrl: 'https://i.pravatar.cc/150?u=u3',
    },
    rating: 5,
    title: 'Perfect for daily use',
    text: 'I have been using this every single day since I bought it. No signs of wear and tear. The customer service was also very responsive when I had a question about setup.',
    createdAt: '2026-07-20T09:15:00Z',
    isVerifiedPurchase: false,
    helpfulVotes: 8,
  },
];

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    productId: 'p1',
    user: {
      id: 'u4',
      name: 'Michael B.',
    },
    text: 'Does this come with a warranty? If so, how long?',
    createdAt: '2026-07-15T11:20:00Z',
    helpfulVotes: 12,
    answers: [
      {
        id: 'a1',
        questionId: 'q1',
        user: {
          id: 's1',
          name: 'Storefront Support',
        },
        text: 'Yes! All our products come with a standard 2-year warranty covering any manufacturing defects. You can also purchase an extended warranty at checkout.',
        createdAt: '2026-07-15T15:00:00Z',
        helpfulVotes: 24,
        isSeller: true,
      },
    ],
  },
  {
    id: 'q2',
    productId: 'p1',
    user: {
      id: 'u5',
      name: 'Emma W.',
    },
    text: 'Is the material water-resistant?',
    createdAt: '2026-07-10T16:45:00Z',
    helpfulVotes: 4,
    answers: [
      {
        id: 'a2',
        questionId: 'q2',
        user: {
          id: 'u1',
          name: 'Alex Johnson',
        },
        text: 'I spilled some water on it yesterday and it beaded right off. Seems pretty water-resistant to me!',
        createdAt: '2026-07-11T09:10:00Z',
        helpfulVotes: 7,
      },
    ],
  },
];
