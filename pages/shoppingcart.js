import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import {
  addBookByBookId,
  removeBookFromShoppingCart,
  subtractBookByBookId,
} from '../util/cookies';

const containerStyles = css`
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 32px;
`;

const headingStyles = css`
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 24px;
`;

const shoppingBagContainer = css`
  width: 50%;
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
  margin-top: 52px;
  text-align: center;

  > div {
    display: flex;
    align-items: center;
    margin: 0 16px;
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
  width: 32px;
  height: 24px;

  :hover {
    cursor: pointer;
  }
`;

const buttonContainer = css`
  width: 50%;
  display: flex;
  justify-content: space-between;
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
    opacity: 0.8;
    cursor: pointer;
  }

  ${variant === 'secondary' &&
  css`
    background-color: white;
    color: #153243;
    border: 1px solid #153243;
  `}
`;

export default function ShoppingCartPage(props) {
  // retrieve book objects for books in shopping cart
  const bookIdsInShoppingCart = props.shoppingCart.map((item) => item.id);
  console.log(bookIdsInShoppingCart);

  const productsInShoppingCart = props.products.filter((product) =>
    bookIdsInShoppingCart.includes(product.id),
  );

  // helper function to calculate subtotals by book, i.e.
  // book price * book quantity in shopping cart
  function getTotalPriceByBook() {
    const p = productsInShoppingCart.map((book) => book.usedPrice);
    const q = props.shoppingCart.map((item) => item.quantity);
    const totalByBook = [];
    for (let i = 0; i < Math.min(p.length, q.length); i++) {
      totalByBook[i] = p[i] * q[i];
    }
    return totalByBook;
  }

  const totalByBookOutput = JSON.parse(JSON.stringify(getTotalPriceByBook()));

  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div css={containerStyles}>
        {props.shoppingCart.length !== 0 ? (
          <>
            <p css={headingStyles}>
              You have{' '}
              {props.shoppingCart
                .map((item) => item.quantity)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0,
                )
                .toFixed(0)}{' '}
              items in your shopping bag
            </p>
            <div css={shoppingBagContainer}>
              {productsInShoppingCart.map((b) => (
                <div key={b.id} css={shoppingBagItemStyles}>
                  <div>
                    <Link href={`/products/${b.id}`}>
                      <a>
                        <img
                          src={`/${b.img}`}
                          alt={b.titleShort}
                          css={imageStyles}
                        />
                      </a>
                    </Link>
                  </div>
                  <div>
                    <div>{b.titleShort}</div>
                    <div>by {b.author}</div>
                    <div key={b.id} css={counterStyles}>
                      <button
                        onClick={() => {
                          props.setShoppingCart(subtractBookByBookId(b.id));
                        }}
                        css={buttonStyles}
                      >
                        -
                      </button>
                      <div>
                        {
                          props.shoppingCart.find((item) => item.id === b.id)
                            ?.quantity
                        }
                      </div>
                      <button
                        onClick={() => {
                          props.setShoppingCart(addBookByBookId(b.id));
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
                        props.setShoppingCart(removeBookFromShoppingCart(b.id));
                      }}
                      css={buttonStyles}
                    >
                      <span role="img" aria-label="trash bin">
                        🗑️
                      </span>
                    </button>
                    <div key={b.id}>
                      {b.currency}{' '}
                      {(
                        Number(b.usedPrice) *
                        Number(
                          props.shoppingCart.find((item) => item.id === b.id)
                            .quantity,
                        )
                      ).toFixed(2)}
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
            <div css={buttonContainer}>
              <Link href="../../checkout">
                <a>
                  <button css={navButtonStyles()}>Proceed to checkout</button>
                </a>
              </Link>
              <Link href="../../products">
                <a>
                  <button css={navButtonStyles('secondary')}>
                    Continue shopping
                  </button>
                </a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p css={headingStyles}>
              Oh snap... there's nothing in your bag yet :(
            </p>
            <Link href="../../products">
              <a>
                <button css={navButtonStyles()}>Continue shopping</button>
              </a>
            </Link>
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getProducts } = await import('../util/database');

  const products = await getProducts();

  return {
    props: {
      products,
    },
  };
}
