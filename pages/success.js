import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const containerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const messageContainer = css`
  background-color: white;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  border-radius: 4px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 64px;

  > span {
    margin: 8px;
    font-size: 1.2rem;
  }
`;

export default function Success(props) {
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Thank you!</title>
      </Head>
      <div css={containerStyles}>
        <div css={messageContainer} data-cy="success-page-message-container">
          <span role="img" aria-label="raising hands">
            🙌{' '}
          </span>
          <span>Thank you for your order!</span>
          <span>We will send you a confirmation email shortly.</span>{' '}
          <span>We hope to see you again in our shop soon! </span>
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </div>
      </div>
    </Layout>
  );
}
