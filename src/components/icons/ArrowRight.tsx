import { ReactElement, SVGAttributes } from 'react';

export function ArrowRight(props: SVGAttributes<SVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.5 10.5H28.5" stroke="currentColor" />
      <path d="M19.5 1.5L28.5 10.5L19.5 19.5" stroke="currentColor" stroke-linecap="square" />
    </svg>
  );
}
