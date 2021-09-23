export interface Image {
  id: string;
  uri: string;
}

export interface Response {
  status: number;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
}
