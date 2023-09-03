'use client';

import type { ComponentProps, ReactElement } from 'react';
import { useCallback, useMemo, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { clamp } from 'lodash-es';
import { useRouter } from 'next/navigation';
import styles from './Carousel.module.scss';
import { EpisodeCard } from '@/components/EpisodeCard/EpisodeCard';
import { ArrowRight } from '@/components/icons/ArrowRight';
import { ArrowLeft } from '@/components/icons/ArrowLeft';

export function Carousel({
  items,
}: {
  items: ReadonlyArray<Omit<ComponentProps<typeof EpisodeCard>, 'marker'>>;
}): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement>>([]);

  const [scope, animate] = useAnimate<HTMLOListElement>();

  const params = useSearchParams();

  const episodeIndex = useMemo(() => {
    const episode = params.get('episode');

    const episodeNumber = Number(episode);

    return clamp(episodeNumber - 1, 0, items.length);
  }, [items.length, params]);

  const moveToIndex = useCallback(
    async (index: number) => {
      const item = itemRefs.current[index];
      const padding = Number(
        scope.current.computedStyleMap().get('padding-left')?.toString().replace('px', ''),
      );

      const offset = item.offsetLeft - (padding ?? 0);
      const maxOffset = scope.current.clientWidth - (wrapperRef.current?.clientWidth ?? 0);

      await animate(
        scope.current,
        {
          x: -Math.min(offset, maxOffset),
        },
        {
          duration: 0.4,
          ease: 'easeInOut',
        },
      );
    },
    [animate, scope],
  );

  const router = useRouter();

  const updateActiveIndex = useCallback(
    async (newIndex: number) => {
      const value = clamp(newIndex, 0, items.length - 1);

      router.replace(`/?episode=${value + 1}`);

      await moveToIndex(value);
    },
    [items.length, moveToIndex, router],
  );

  return (
    <div className={styles.carousel} ref={wrapperRef}>
      <div className={styles.wrapper}>
        <motion.ol
          className={styles.list}
          drag="x"
          dragConstraints={wrapperRef}
          dragPropagation
          onMeasureDragConstraints={(constraints) => ({
            ...constraints,
            right: 0,
          })}
          ref={scope}
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              data-active={episodeIndex === index}
              ref={(element) => {
                if (element) {
                  itemRefs.current.push(element);
                }
              }}
            >
              <EpisodeCard marker={index + 1} {...item} onClick={() => moveToIndex(index)} />
            </li>
          ))}
        </motion.ol>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={() => updateActiveIndex(episodeIndex - 1)}
          disabled={episodeIndex <= 0}
        >
          <ArrowLeft className={styles.icon} />
        </button>
        <button
          className={styles.controlButton}
          onClick={() => updateActiveIndex(episodeIndex + 1)}
          disabled={episodeIndex >= items.length - 1}
        >
          <ArrowRight className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
