import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import ThemeModeProvider from '@/providers/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeModeProvider>
      <Component {...pageProps} />
    </ThemeModeProvider>
  );
}
