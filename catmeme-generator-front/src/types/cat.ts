export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export type CatApiResponse = Cat[];