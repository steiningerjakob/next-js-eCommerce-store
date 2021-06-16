import { css } from '@emotion/react';
import Head from 'next/head';

export default function Home() {
  const containerStyles = css`
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 85vh;
    margin-bottom: 32px;
  `;

  const h1Styles = css`
    font-size: 2em;
    font-weight: 600;
    margin-bottom: 80px;
  `;

  const h2Styles = css`
    font-size: 1.3em;
    font-weight: 400;
    margin-bottom: 16px;
    text-align: center;
    width: 50%;
  `;

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div css={containerStyles}>
        <h1 css={h1Styles}>
          <span role="img" aria-label="waving hand">
            👋
          </span>{' '}
          Welcome to Sappho, my eCom store for used books
        </h1>
        <h2 css={h2Styles}>
          My name is Jakob and this is my Next.js-based eCommerce store
          developed for educational purposes. You cannot actually purchase books
          here. Prices, delivery date, etc. are purely fictional.
        </h2>
        <h2 css={h2Styles}>
          The name of my used book store, Sappho, is a reference to one of my
          favourite places which combines great coffee, a relaxed courtyard
          atmosphere, and of course the smell of actual books made from paper.
          Check our their website here:{' '}
          <a href="https://www.sapphobooks.com.au/">Sappho Books, Cafe & Bar</a>
        </h2>
      </div>
    </>
  );
}
