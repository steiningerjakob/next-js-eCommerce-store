import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  addBookByBookId,
  getShoppingCartCookieValue,
  parseCookieValue,
  removeBookFromShoppingCart,
  subtractBookByBookId,
} from '../util/cookies';
import { getBookById } from '../util/database';

const containerStyles = css`
  margin: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const shoppingBagContainer = css`
  width: 512px;
  background-color: #f5f5f5;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  border-radius: 8px;
  padding: 16px;
`;

const shoppingBagItemStyles = css`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 8px 0;
  margin-bottom: 4px;
  border-bottom: 1px solid #dcdcdc;
`;

const imageStyles = css`
  max-width: 72px;
`;

const counterStyles = css`
  display: flex;
  flex-direction: row;
  margin-top: 56px;
  text-align: center;

  > div {
    display: flex;
    align-items: center;
  }
`;

const rightItemColumnStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  > div {
    margin-right: 12px;
    margin-bottom: 16px;
  }

  > button {
    margin-top: 4px;
  }
`;

const totalStyles = css`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5em;
  margin-top: 16px;

  div + div {
    margin-right: 12px;
  }
`;

const buttonStyles = css`
  font-weight: 500;
  background-color: white;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  margin: 0 12px;
  width: 32px;
  height: 24px;

  :hover {
    cursor: pointer;
  }
`;

export default function ShoppingCartPage() {
  const [shoppingCart, setShoppingCart] = useState(
    getShoppingCartCookieValue(),
  );

  useEffect(() => {
    setShoppingCart(getShoppingCartCookieValue('shoppingcart'));
  }, [shoppingCart]);

  // retrieve book objects for books in shopping cart
  const bookIdsInShoppingCart = shoppingCart.map((item) => item.id);
  const booksInShoppingCart = bookIdsInShoppingCart.map((id) =>
    getBookById(id),
  );

  // helper function to calculate subtotals by book, i.e.
  // book price * book quantity in shopping cart
  function getTotalPriceByBook() {
    const p = booksInShoppingCart.map((b) => parseFloat(b.used_price));
    const q = shoppingCart.map((i) => parseFloat(i.quantity));
    const totalByBook = [];
    for (let x = 0; x < Math.min(p.length, q.length); x++) {
      totalByBook[x] = p[x] * q[x];
    }
    return totalByBook;
  }

  const totalByBookOutput = JSON.parse(JSON.stringify(getTotalPriceByBook()));

  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div css={containerStyles}>
        <h1>Your shopping bag</h1>
        <div css={shoppingBagContainer}>
          {booksInShoppingCart.map((b) => (
            <div key={b.id} css={shoppingBagItemStyles}>
              <div>
                <img
                  src={`/${b.image}`}
                  alt={b.title_short}
                  css={imageStyles}
                />
              </div>
              <div>
                <div>{b.title_short}</div>
                <div>by {b.author}</div>
                <div key={b.id} css={counterStyles}>
                  <button
                    onClick={() => {
                      setShoppingCart(subtractBookByBookId(b.id));
                    }}
                    css={buttonStyles}
                  >
                    -
                  </button>
                  <div>
                    {shoppingCart.find((item) => item.id === b.id)?.quantity}
                  </div>
                  <button
                    onClick={() => {
                      setShoppingCart(addBookByBookId(b.id));
                    }}
                    css={buttonStyles}
                  >
                    +
                  </button>
                </div>
              </div>
              <div css={rightItemColumnStyles}>
                <button
                  onClick={() => {
                    setShoppingCart(removeBookFromShoppingCart(b.id));
                  }}
                  css={buttonStyles}
                >
                  <span role="img" aria-label="trash bin">
                    🗑️
                  </span>
                </button>
                <div key={b.id}>
                  {b.currency}{' '}
                  {Number(b.used_price) *
                    Number(
                      shoppingCart.find((item) => item.id === b.id).quantity,
                    )}
                </div>
              </div>
            </div>
          ))}
          <div css={totalStyles}>
            <div>Total:</div>
            <div>
              €{' '}
              {totalByBookOutput
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0,
                )
                .toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { books } = await import('../util/database');
  return {
    props: {
      books,
      quantity: parseCookieValue(context.req.cookies.quantity, []),
    },
  };
}
