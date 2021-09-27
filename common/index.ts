export interface Image {
  id: string;
  uri: string;
  thumbnail?: string;
}

export interface Response {
  status: number;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
}
