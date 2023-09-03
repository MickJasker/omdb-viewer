import { type ReactElement } from 'react';
import Image from 'next/image';
import styles from './EpisodeDetails.module.scss';

export function EpisodeDetails({
  title,
  plot,
  poster,
}: {
  title: string;
  plot: string;
  poster: string;
  index: number;
  rating: number;
  airDate: string;
}): ReactElement {
  return (
    <div className={styles.episodeDetails}>
      <div className={styles.poster}>
        <Image src={poster} alt="" fill sizes="(max-width: 768px) 100vw, 800px" />
      </div>
      <div className={styles.details}>
        <h2>{title}</h2>
        <p>{plot}</p>
      </div>
    </div>
  );
}
