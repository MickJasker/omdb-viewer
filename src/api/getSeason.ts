import { requestFromOmdb } from '@/api/requestFromOmdb';

export async function getSeason(id: string, season = 1): Promise<Season> {
  return await requestFromOmdb<Season>(`i=${id}&Season=${season}`);
}

export type Season = {
  title: string;
  season: string;
  totalSeasons: string;
  episodes: ReadonlyArray<{
    title: string;
    released: string;
    episode: string;
    imdbRating: string;
    imdbId: string;
  }>;
};
