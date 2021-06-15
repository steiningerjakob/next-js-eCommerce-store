import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home(props) {
  const backgroundStyles = css`
    background-image: url('title photo.jpg');
    background-size: cover;
    opacity: 0.7;
  `;

  const containerStyles = css`
    display: flex;
    position: relative;
    width: 1200px;
    height: 640px;
    justify-content: center;
    align-items: center;
    opacity: 1;
  `;

  const navButtonStyles = (variant = 'main') => css`
    font-weight: 600;
    font-size: 1.1em;
    background-color: #153243;
    color: white;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    box-shadow: 1px 1px 8px 1px #dcdcdc;
    margin: 24px 0;
    width: 272px;
    height: 72px;

    :hover {
      cursor: pointer;
      transform: scale(1.1);
    }

    ${variant === 'secondary' &&
    css`
      background-color: white;
      color: #153243;
      border: 1px solid #153243;
    `}
  `;

  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Home</title>
      </Head>
      <div css={backgroundStyles}>
        <div css={containerStyles}>
          <Link href="/products">
            <a>
              <button css={navButtonStyles()}>Check out our shop</button>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
