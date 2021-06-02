import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getShoppingCartCookieValue } from '../util/cookies';

function MyApp({ Component, pageProps }) {
  // declare globally accessible state variable
  const [shoppingCart, setShoppingCart] = useState([]);

  // update state variable on page reload to sync up server with
  // front-end
  useEffect(() => {
    setShoppingCart(getShoppingCartCookieValue());
  }, []);

  return (
    <>
      <Global
        styles={css`
          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background-color: #eef0eb;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
              Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
          }
        `}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* pass props for state variable shopping cart */}
      <Component
        {...pageProps}
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
      />
    </>
  );
}

export default MyApp;
