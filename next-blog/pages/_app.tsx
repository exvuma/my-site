import '../css/bootstrap.min.css';

import '../css/small-business.css';
import '../css/mystyles.css';
import type { AppProps /*, AppContext */ } from 'next/app';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  console.log('pageProps', pageProps);

  return <Component {...pageProps} />;
}
