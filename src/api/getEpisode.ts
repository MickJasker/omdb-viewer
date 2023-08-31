import { requestFromOmdb } from '@/api/requestFromOmdb';

export async function getEpisode(id: string): Promise<Episode> {
  return await requestFromOmdb<Episode>(`i=${id}&Type=episode`);
}

export type Episode = {
  title: string;
  year: string;
  rated: string;
  released: string;
  season: string;
  episode: string;
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
  seriesId: string;
  type: string;
  response: string;
};
