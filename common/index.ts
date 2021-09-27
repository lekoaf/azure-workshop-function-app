export interface Image {
  id: string;
  uri: string;
  thumbnail?: string;
  metadata?: {
    width?: number;
    height?: number;
    size?: number;
    format?: string;
  };
}

export interface Response {
  status: number;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
}
