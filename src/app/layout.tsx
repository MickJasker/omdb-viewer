import './globals.scss';
import type { ReactNode } from 'react';
import { helveticaNeue } from '@/fonts/fonts';
import classNames from 'classnames';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={classNames(helveticaNeue.className, helveticaNeue.variable)}>
        {children}
      </body>
    </html>
  );
}
