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
};
