import styles from './page.module.scss';
import { getSeason } from '@/api/getSeason';
import { getEpisode } from '@/api/getEpisode';
import { getShow } from '@/api/getShow';
import { Metadata } from 'next';
import { ShowTitle } from '@/components/ShowTitle/ShowTitle';

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
    <div className={styles.home}>
      <main className={styles.main}>
        <ShowTitle heading={show.title} season={season.season} plot={show.plot} />
      </main>
      <aside>
        <h2>Episodes</h2>
        <ul>
          {episodes.map((episode) => (
            <li key={episode.imdbId}>
              {episode.title} ({episode.year})
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
