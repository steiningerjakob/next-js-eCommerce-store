import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

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
  margin-bottom: 24px;
`;

const h2Styles = css`
  font-size: 1.5em;
  font-weight: 500;
  margin-bottom: 80px;
`;

const navButtonStyles = css`
  font-weight: 600;
  font-size: 1.1em;
  background-color: #153243;
  color: white;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  margin: 24px 0;
  width: 320px;
  height: 72px;

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const imgStyles = css`
  width: 40%;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div css={containerStyles}>
        <img src="cover body.png" alt="" css={imgStyles} />
        <h1 css={h1Styles}>“There is no friend as loyal as a book.”</h1>
        <h2 css={h2Styles}>― Ernest Hemingway</h2>
        <Link href="/products">
          <a>
            <button css={navButtonStyles}>Check out our used book store</button>
          </a>
        </Link>
      </div>
    </>
  );
}
