import { requestFromOmdb } from '@/api/requestFromOmdb';

export async function getShow(id: string): Promise<Show> {
  return await requestFromOmdb<Show>(`i=${id}&Type=series`);
}

export type Show = {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: ReadonlyArray<unknown>;
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbId: string;
  type: string;
  totalSeasons: string;
};
