import styles from './page.module.scss';
import { getSeason } from '@/api/getSeason';
import { getEpisode } from '@/api/getEpisode';
import { getShow } from '@/api/getShow';
import { Metadata } from 'next';
import Link from 'next/link';

const imdbId = 'tt0804484';

export async function generateMetadata(): Promise<Metadata> {
  const show = await getShow(imdbId);

  return {
    title: show.title,
    description: show.plot,
  };
}

export default async function Home() {
  const [show, season] = await Promise.all([getShow(imdbId), getSeason(imdbId)]);
  const episodes = await Promise.all(season.episodes.map((episode) => getEpisode(episode.imdbId)));

  return (
    <main className={styles.main}>
      <h1>
        {show.title} ({show.year})
      </h1>

      <p>{show.plot}</p>

      <pre>{JSON.stringify(show, null, 2)}</pre>

      <pre>{JSON.stringify(season, null, 2)}</pre>

      {episodes.length > 0 && (
        <ul>
          {episodes.map((episode, index) => (
            <li key={episode.imdbId}>
              <h2>{episode.title}</h2>
              <p>{episode.plot}</p>
              <p>id{episode.plot}</p>
              <pre>{JSON.stringify(episode, null, 2)}</pre>
              <small>
                {episode.released} | {episode.runtime} | {episode.imdbRating}
              </small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
