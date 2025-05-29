export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type BaseUser = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  serviceDate: string;
  reviewerName: string;
  reviewerEmail: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    googleId: string | null;
    provider: string;
    role: string;
    refreshTokenHash: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type ReviewStats = {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    [key: string]: number;
  };
};

export type UserProfile = {
  id: number;
  userId: number;
  firstName: string | null;
  lastName: string | null;
  description: string | null;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  user: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    password: string;
    googleId: string | null;
    provider: string;
    role: string;
    refreshTokenHash: string | null;
    createdAt: string;
    updatedAt: string;
  };
  foodStyles: Array<{
    id: number;
    name: string;
  }>;
  reviews?: Review[];
  reviewStats?: ReviewStats;
};
