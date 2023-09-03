import type { HTMLAttributes, ReactElement } from 'react';
import Image from 'next/image';
import { useId } from 'react';
import Link from 'next/link';
import styles from './EpisodeCard.module.scss';

export function EpisodeCard({
  title,
  plot,
  marker,
  onClick,
}: {
  title: string;
  plot: string;
  marker: string | number;
  onClick?(): void;
} & HTMLAttributes<HTMLDivElement>): ReactElement {
  const id = useId();

  return (
    <article className={styles.episodeCard} aria-labelledby={`heading${id}`}>
      <Link href={`/?episode=${marker}`} className={styles.link} onClick={onClick}>
        <h2 id={`heading${id}`} className={styles.title}>
          {title}
        </h2>

        <div className={styles.poster}>
          <Image
            src={`/assets/episode-${marker}.jpg`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 200px"
          />
          <span className={styles.marker}>{marker}</span>
        </div>

        <p className={styles.plot}>{plot}</p>
      </Link>
    </article>
  );
}
