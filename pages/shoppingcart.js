import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaTrash } from 'react-icons/fa';
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
  padding-top: 2px;

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
  // state variable to trigger re-render on cookie value change
  const [productsInShoppingBag, setProductsInShoppingBag] = useState(
    props.productsInShoppingBag,
  );

  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div css={containerStyles}>
        {productsInShoppingBag.length !== 0 ? (
          <div>
            <p css={headingStyles}>
              You have{' '}
              {productsInShoppingBag
                .map((b) => b.quantity)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0,
                )
                .toFixed(0)}{' '}
              items in your shopping bag
            </p>
            <div css={shoppingBagContainer}>
              {productsInShoppingBag.map((b) => (
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
                    <div css={counterStyles}>
                      <button
                        data-cy="shopping-cart-item-quantity-subtract"
                        onClick={() => {
                          if (b.quantity === 1) {
                            if (
                              window.confirm(
                                'Are you sure you want to delete this item from the shopping bag?',
                              )
                            ) {
                              props.setShoppingCart(
                                removeBookFromShoppingCart(b.id),
                              );
                              setProductsInShoppingBag(
                                productsInShoppingBag.filter(
                                  (item) => item.id !== b.id,
                                ),
                              );
                            } else {
                            }
                          } else {
                            props.setShoppingCart(subtractBookByBookId(b.id));
                            setProductsInShoppingBag(
                              productsInShoppingBag.map((prod) => {
                                if (prod.id === b.id) {
                                  return {
                                    ...prod,
                                    quantity: prod.quantity - 1,
                                  };
                                } else {
                                  return prod;
                                }
                              }),
                            );
                          }
                        }}
                        css={buttonStyles}
                      >
                        -
                      </button>
                      <div data-cy="shopping-cart-item-quantity-counter">
                        {
                          props.shoppingCart.find((item) => item.id === b.id)
                            ?.quantity
                        }
                      </div>
                      <button
                        data-cy="shopping-cart-item-quantity-add"
                        onClick={() => {
                          props.setShoppingCart(addBookByBookId(b.id));
                          setProductsInShoppingBag(
                            productsInShoppingBag.map((item) => {
                              if (item.id === b.id) {
                                return { ...item, quantity: item.quantity + 1 };
                              } else {
                                return item;
                              }
                            }),
                          );
                        }}
                        css={buttonStyles}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div css={rightItemColumnStyles}>
                    <button
                      data-cy="shopping-cart-item-quantity-remove"
                      onClick={() => {
                        props.setShoppingCart(removeBookFromShoppingCart(b.id));
                        setProductsInShoppingBag(
                          productsInShoppingBag.filter(
                            (item) => item.id !== b.id,
                          ),
                        );
                      }}
                      css={buttonStyles}
                    >
                      <IconContext.Provider
                        value={{ color: 'grey', title: 'trash icon' }}
                      >
                        <div>
                          <FaTrash />
                        </div>
                      </IconContext.Provider>
                    </button>
                    <div>
                      {b.currency} {(b.usedPrice * b.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              <div css={totalStyles}>
                <div>Total:</div>
                <div>
                  €{' '}
                  {productsInShoppingBag
                    .map((b) => b.usedPrice * b.quantity)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0,
                    )
                    .toFixed(2)}
                </div>
              </div>
            </div>
            <div css={buttonContainer}>
              <Link href="/checkout">
                <a data-cy="shopping-cart-checkout-link">
                  <button css={navButtonStyles()}>Proceed to checkout</button>
                </a>
              </Link>
              <Link href="/products">
                <a>
                  <button css={navButtonStyles('secondary')}>
                    Continue shopping
                  </button>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p css={headingStyles}>
              Oh snap... there's nothing in your bag yet :(
            </p>
            <Link href="/products">
              <a>
                <button css={navButtonStyles()}>Continue shopping</button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getAllProducts } = await import('../util/database');

  const products = await getAllProducts();

  const rawCookie = context.req.cookies.shoppingcart;

  // check if raw cookie is undefined
  const cookieArray = rawCookie ? JSON.parse(rawCookie) : [];

  // combine arrays "shoppingcart" (as defined by cookie)
  // and "products" (as defined in database) to create one array
  // with desired info on products in cart (incl. quantity)
  const productsInShoppingBag = cookieArray.map((item) => {
    const draftShoppingBagObject = products.find((book) => book.id === item.id);
    return {
      id: draftShoppingBagObject.id,
      titleShort: draftShoppingBagObject.titleShort,
      author: draftShoppingBagObject.author,
      img: draftShoppingBagObject.img,
      usedPrice: draftShoppingBagObject.usedPrice,
      currency: draftShoppingBagObject.currency,
      quantity: item.quantity,
    };
  });

  return {
    props: {
      productsInShoppingBag,
    },
  };
}
