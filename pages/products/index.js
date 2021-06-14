// ToDos:
// 1) Fix search function so that correct image renders
// Prio B: move search bar to header

import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Layout from '../../components/Layout';
import SearchField from '../../components/SearchField';
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

  > p {
    margin-left: 256px;
    margin-top: -27px;
  }
`;

const productContainer = css`
  width: 256px;
  max-height: 352px;
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

export default function Products(props) {
  // create list of unique genres from products array
  const uniqueGenres = [
    ...new Set(props.products.map((book) => book.genre)),
  ].concat(...['All genres']);
  const uniqueLanguages = [
    ...new Set(props.products.map((book) => book.lang)),
  ].concat(...['All languages']);

  // state variables for filters
  const [genreFilter, setGenreFilter] = useState('All genres');
  const [languageFilter, setLanguageFilter] = useState('All languages');

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
              <li key={`genre-${genre.name}`} css={liStyles}>
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
              <li key={`lang-${lang.name}`} css={liStyles}>
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
          {props.filteredProducts.length === 0 ? (
            <p>Didn't find any books that match your search... try again</p>
          ) : (
            props.filteredProducts
              .filter((b) => {
                if (genreFilter === 'All genres') {
                  return true;
                } else if (genreFilter === b.genre) {
                  return true;
                } else {
                  return false;
                }
              })
              .filter((b) => {
                if (languageFilter === 'All languages') {
                  return true;
                } else if (languageFilter === b.lang) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((b) => (
                <div css={productContainer} key={`book-${b.id}`}>
                  <Link href={`/products/${b.id}`}>
                    <a data-cy="product-list-single-product-link">
                      <img
                        css={imgStyles}
                        src={`/${b.img}`}
                        alt={b.titleShort}
                      />{' '}
                    </a>
                  </Link>
                  {/* search function renders wrong image and link */}
                  <button
                    onClick={() => {
                      props.setShoppingCart(addBookByBookId(b.id));
                      alert('Product added to shopping bag!');
                    }}
                    css={buttonStyles}
                  >
                    +
                  </button>
                  <p css={titleStyles}>{b.titleShort}</p>
                  <p> by {b.author}</p>
                  <p css={priceStyles}>
                    {' '}
                    {b.currency} {b.usedPrice.toFixed(2)}
                  </p>
                  <div css={starStyles}>
                    <ReactStars
                      count={5}
                      size={15}
                      value={b.starRating}
                      isHalf={true}
                      edit={false}
                    />
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getAllProducts, searchFunction } = await import(
    '../../util/database'
  );

  const products = await getAllProducts();

  // 1. get current search query value from url
  const filteredProducts = await searchFunction(context.query.s);
  console.log(context.query);

  return {
    props: {
      products: products,
      filteredProducts: filteredProducts,
    },
  };
}
