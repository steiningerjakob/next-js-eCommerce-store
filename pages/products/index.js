// ToDos:
// 1) make modal appear automatically and not only on refresh
// 2) keep an eye on shopping cart sums (sometimes weird..)
// 3) refactor code to reduce duplication (props)
// 4) Prio B: enable multiple checkbox filtering

import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Layout from '../../components/Layout';
import { addBookByBookId } from '../../util/cookies';

const containerStyles = css`
  margin: 0px 16px;
  width: 100%;
  display: flex;
  flex: auto;
  position: relative;
`;

const filterContainer = css`
  margin-left: 0;
  padding: 16px 0;
  min-width: 208px;
`;

const ulStyles = css`
  margin: 8px 0;
  padding: 16px 4px;
  font-weight: 600;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
`;

const liStyles = css`
  padding: 6px 0;
  list-style-type: none;
  text-indent: -8px;
  margin-left: 8px;
`;

const productListContainer = css`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 24px;
`;

const productContainer = css`
  width: 256px;
  background-color: #f5f5f5;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  border-radius: 8px;
  padding: 16px;
  margin: 24px 32px;
  text-align: center;
  position: relative;
`;

const imgStyles = css`
  max-width: 44%;
  max-height: 44%;
  margin: 5px 0px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
`;

const buttonStyles = css`
  position: absolute;
  top: 5%;
  right: 5%;
  font-weight: 500;
  background-color: white;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  width: 32px;
  height: 24px;

  :hover {
    cursor: pointer;
    background-color: #284b63;
    color: white;
    border: 1px solid white;
  }
`;

const titleStyles = css`
  font-weight: 600;
`;

const priceStyles = css`
  font-size: 1.5em;
  font-weight: 600;
  color: #153243;
`;

const starStyles = css`
  position: absolute;
  bottom: 8%;
  left: 35%;
`;

const modalStyles = (props) => css`
  visibility: ${props ? 'visible' : 'hidden'};
  opacity: ${props ? '1' : '0'};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: top;
  justify-content: flex-end;
  background: rgba(77, 77, 77, 0.7);
  transition: all 0.3s;
`;

const modalContentStyles = css`
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 50vw;
  max-height: 100%;
  background: white;
  padding: 16px 32px;
`;

const headingStyles = css`
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 24px;
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
  width: 272px;
  height: 72px;

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default function Products(props) {
  // create list of unique genres from products array
  const uniqueGenres = [
    ...new Set(props.products.map((book) => book.genre)),
  ].concat(...['All genres']);
  const uniqueLanguages = [
    ...new Set(props.products.map((book) => book.lang)),
  ].concat(...['All languages']);

  // // state variables
  const [genreFilter, setGenreFilter] = useState('All genres');
  const [languageFilter, setLanguageFilter] = useState('All languages');
  const [modalIsActive, setModalIsActive] = useState(false);

  // THE BELOW VARIABLES AND FUNCTIONS SHOULD BE DERIVED FROM
  // PROPS IDEALLY

  const bookIdsInShoppingCart = props.shoppingCart.map((item) => item.id);

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
        <title>Products</title>
      </Head>
      <div css={containerStyles}>
        <div css={filterContainer}>
          <div>
            <ul css={ulStyles}>Filter by Genre</ul>
            {uniqueGenres.map((genre) => (
              <li key={`genre-${genre.id}`} css={liStyles}>
                <input
                  type="radio"
                  value={genre}
                  name="genreFilter"
                  onChange={(event) =>
                    setGenreFilter(event.currentTarget.value)
                  }
                />
                {genre}
              </li>
            ))}
            <ul css={ulStyles}>Filter by Language</ul>
            {uniqueLanguages.map((lang) => (
              <li key={`lang-${lang.id}`} css={liStyles}>
                <input
                  type="radio"
                  value={lang}
                  name="languageFilter"
                  onChange={(event) =>
                    setLanguageFilter(event.currentTarget.value)
                  }
                />
                {lang}
              </li>
            ))}
          </div>
        </div>
        <div css={productListContainer}>
          {props.products
            .filter((book) => {
              if (genreFilter === 'All genres') {
                return true;
              } else if (genreFilter === book.genre) {
                return true;
              } else {
                return false;
              }
            })
            .filter((book) => {
              if (languageFilter === 'All languages') {
                return true;
              } else if (languageFilter === book.lang) {
                return true;
              } else {
                return false;
              }
            })
            .map((book) => (
              <div css={productContainer} key={`book-${book.id}`}>
                <Link href={`/products/${book.id}`}>
                  <a>
                    <img
                      css={imgStyles}
                      src={`/${book.img}`}
                      alt={book.titleShort}
                    />{' '}
                  </a>
                </Link>
                <Link href="/products#modal">
                  <a>
                    <button
                      onClick={() => {
                        props.setShoppingCart(addBookByBookId(book.id));
                        setModalIsActive(true);
                      }}
                      css={buttonStyles}
                    >
                      +
                    </button>
                  </a>
                </Link>
                <p css={titleStyles}>{book.titleShort}</p>
                <p> by {book.author}</p>
                <p css={priceStyles}>
                  {' '}
                  {book.currency} {book.usedPrice.toFixed(2)}
                </p>
                <div css={starStyles}>
                  <ReactStars
                    count={5}
                    size={15}
                    value={book.starRating}
                    isHalf={true}
                    edit={false}
                  />
                </div>
              </div>
            ))}
        </div>
        <div id="modal" css={modalStyles(modalIsActive)}>
          <div css={modalContentStyles}>
            <div css={headingStyles}>
              Added to shopping bag (
              {props.shoppingCart
                .map((item) => item.quantity)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0,
                )
                .toFixed(0)}
              )
            </div>
            <div>
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
                  </div>
                  <div>
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
              <Link href="../../shoppingcart">
                <a>
                  <button css={navButtonStyles}>Proceed to shopping bag</button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getAllProducts } = await import('../../util/database');

  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}
