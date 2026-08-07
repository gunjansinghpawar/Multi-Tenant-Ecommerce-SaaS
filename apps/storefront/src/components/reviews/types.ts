export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface ReviewMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
}

export interface Review {
  id: string;
  productId: string;
  user: User;
  rating: number; // 1-5
  title: string;
  text: string;
  createdAt: string; // ISO Date string
  isVerifiedPurchase: boolean;
  helpfulVotes: number;
  media?: ReviewMedia[];
}

export interface ReviewSummaryData {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface Question {
  id: string;
  productId: string;
  user: User;
  text: string;
  createdAt: string;
  helpfulVotes: number;
  answers: Answer[];
}

export interface Answer {
  id: string;
  questionId: string;
  user: User;
  text: string;
  createdAt: string;
  helpfulVotes: number;
  isSeller?: boolean; // Highlight if answered by store owner/brand
}
