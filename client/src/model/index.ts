export interface User {
  id: number;
  email: string;
  urls: URL[];
}

export interface URL {
  slug: string;
  long: string;
  visits: number;
}
