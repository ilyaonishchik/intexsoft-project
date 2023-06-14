import { Image } from '.';

export type Category = {
  id: number;
  name: string;
  ordinal: number;
  image?: Image | null;
  parent?: Category | null;
  children?: Category[];
};
