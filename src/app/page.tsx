import styles from './page.module.scss';
import { getSeason } from '@/api/getSeason';
import { getEpisode } from '@/api/getEpisode';
import { getShow } from '@/api/getShow';
import { Metadata } from 'next';
import { ShowTitle } from '@/components/ShowTitle/ShowTitle';
import { Carousel } from '@/components/Carousel/Carousel';
import { EpisodeDetails } from '@/components/EpisodeDetails/EpisodeDetails';
import Image from 'next/image';

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
        <Carousel items={episodes} />

        <Image
          src={'/assets/poster.jpg'}
          alt={''}
          className={styles.poster}
          fill
          sizes={'(max-width: 768px) 100vw, calc(100vw - 800px)'}
        />
      </main>
      <EpisodeDetails
        episodes={episodes.map((episode, index) => ({
          title: episode.title,
          plot: episode.plot,
          airDate: episode.released,
          rating: episode.imdbRating,
          index: index + 1,
        }))}
      />
    </div>
  );
}
