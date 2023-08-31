import { type ReactElement } from 'react';
import styles from './ShowTitle.module.scss';

export function ShowTitle({
  heading,
  season,
  plot,
}: {
  heading: string;
  season: string;
  plot: string;
}): ReactElement {
  return (
    <div className={styles.showTitle}>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.season}>Season {season}</p>
      <p className={styles.plot}>{plot}</p>
    </div>
  );
}
