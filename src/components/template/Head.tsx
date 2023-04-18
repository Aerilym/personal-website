import NextHead from 'next/head';
import { useRouter } from 'next/router';

import { defaults } from '@/data/head';

export interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogType?: string;
  ogLocale?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export default function Head({
  headProps,
  children,
}: {
  headProps?: HeadProps;
  children?: React.ReactNode;
}) {
  const { pathname } = useRouter();

  return (
    <NextHead>
      <title>{headProps?.title ?? defaults.headProps.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={headProps?.description ?? defaults.headProps.description} />
      <meta name="keywords" content={headProps?.keywords ?? defaults.headProps.keywords} />
      <meta
        name="canonical"
        content={enforceTrailingSlash(headProps?.ogUrl ?? `${defaults.baseUrl}${pathname}`)}
      />
      {children}
    </NextHead>
  );
}

const enforceTrailingSlash = (url: string) => {
  return url.endsWith('/') ? url : `${url}/`;
};
