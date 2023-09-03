'use client';

import { ComponentProps, type ReactElement, useMemo } from 'react';
import Image from 'next/image';
import styles from './EpisodeDetails.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Star } from '@/components/icons/Star';

export function EpisodeDetails({
  episodes,
}: {
  episodes: ReadonlyArray<ComponentProps<typeof EpisodeContent>>;
}): ReactElement {
  const params = useSearchParams();
  const episode = useMemo(() => {
    return episodes[Number(params.get('episode')) - 1] ?? episodes[0];
  }, [episodes, params]);

  return (
    <aside className={styles.aside}>
      <AnimatePresence>
        <EpisodeContent key={episode.index} {...episode} />
      </AnimatePresence>
    </aside>
  );
}

function EpisodeContent({
  title,
  plot,
  index,
  airDate,
  rating,
}: {
  title: string;
  plot: string;
  index: number;
  rating: string;
  airDate: string;
}): ReactElement {
  return (
    <motion.div
      className={styles.episodeDetails}
      animate={{
        clipPath: 'inset(0 0 0 0)',
      }}
      initial={{
        clipPath: 'inset(0 100% 0 0)',
      }}
      exit={{
        clipPath: 'inset(0 0 0 100%)',
      }}
    >
      <div className={styles.poster}>
        <Image
          src={`/assets/episode-${index}.jpg`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.misc}>
          <p>
            Episode {index} – {airDate}
          </p>

          <div className={styles.rating}>
            <Star className={styles.icon} />
            <p className={styles.ratingValue}>
              <strong>{rating}</strong>/10
            </p>
          </div>
        </div>

        <div className={styles.details}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.plot}>{plot}</p>
        </div>
      </div>
    </motion.div>
  );
}
