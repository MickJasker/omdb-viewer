import { ReactElement, SVGAttributes } from 'react';

export function ArrowLeft(props: SVGAttributes<SVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M29.5 10.5L1.5 10.5" stroke="currentColor" />
      <path d="M10.5 19.5L1.5 10.5L10.5 1.5" stroke="currentColor" stroke-linecap="square" />
    </svg>
  );
}
