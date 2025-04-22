export type User = {
  id: number;
  email: string;
  salt: string;
  password: string;
};

export type URL = {
  slug: string;
  long: string;
  visits: number;
  user: number;
};
