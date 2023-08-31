import localFont from 'next/font/local';

export const helveticaNeue = localFont({
  src: [
    {
      path: './helveticaNeue/HelveticaNeueLTStd-Bd.otf',
      weight: '700',
    },
    {
      path: './helveticaNeue/HelveticaNeueLTStd-Lt.otf',
      weight: '300',
    },
    {
      path: './helveticaNeue/HelveticaNeueLTStd-Md.otf',
      weight: '500',
    },
    {
      path: './helveticaNeue/HelveticaNeueLTStd-Roman.otf',
      weight: '400',
    },
  ],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  variable: '--font-helvetica-neue',
});
