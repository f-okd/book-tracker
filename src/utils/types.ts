export interface IBook {
  id: string;
  authors: string[];
  title: string;
  publishedDate: string | null;
  description: string | null;
  smallThumbnail: string | null;
  thumbnail: string | null;
}
