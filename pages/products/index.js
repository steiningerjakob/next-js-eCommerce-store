// ToDo: make filter work also on uncheck and adding
// additional filter (multiple checkboc problem?)

import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Layout from '../../components/Layout';
import { getBooksByGenre } from '../../util/database';

const containerStyles = css`
  margin: 0px 16px;
  width: 100%;
  display: flex;
`;

const filterContainer = css`
  margin-left: 0;
  padding: 16px 0;
  width: 640px;
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
  max-width: 50%;
  max-height: 50%;
  margin: 5px 0px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
`;

const starStyles = css`
  position: absolute;
  bottom: 5%;
  left: 30%;
`;

// const buttonStyles = css`
//   font-weight: 500;
//   background-color: white;
//   text-align: center;
//   border-radius: 4px;
//   border: 1px solid #dcdcdc;
//   margin: 0 12px;
//   width: 32px;
//   height: 24px;

//   :hover {
//     cursor: pointer;
//   }
// `;

export default function Products(props) {
  // creating list of unique genres from books array
  const uniqueGenres = [...new Set(props.books.map((book) => book.genre))];
  const uniqueLanguages = [
    ...new Set(props.books.map((book) => book.language)),
  ];

  // // state variable
  // const [shoppingCart, setShoppingCart] = useState(
  //   getShoppingCartCookieValue(),
  // );

  // // function to re-render upon change of shoppingCart variable
  // useEffect(() => {
  //   setShoppingCart(getShoppingCartCookieValue('shoppingcart'));
  // }, [shoppingCart]);

  // state variables (not working for uncheck and multicheck at the moment)
  const [genreFilter, setGenreFilter] = useState(null);

  // retrieve book objects filtered by genre using helper function
  const booksByGenre = getBooksByGenre(genreFilter);

  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      <div css={containerStyles}>
        <div css={filterContainer}>
          <div>
            <ul css={ulStyles}>All Genres</ul>
            {uniqueGenres.map((g) => (
              <li key={`genre-${g.id}`} css={liStyles}>
                <input
                  type="checkbox"
                  value={g}
                  onChange={(event) =>
                    setGenreFilter(event.currentTarget.value)
                  }
                />
                {g}
              </li>
            ))}
            <ul css={ulStyles}>All Languages</ul>
            {uniqueLanguages.map((l) => (
              <li key={`genre-${l.id}`} css={liStyles}>
                <input type="checkbox" value={l} />
                {l}
              </li>
            ))}
          </div>
        </div>
        <div css={productListContainer}>
          {genreFilter === null
            ? props.books.map((book) => (
                <div css={productContainer} key={`book-${book.id}`}>
                  <Link href={`/products/${book.id}`}>
                    <a>
                      <img
                        css={imgStyles}
                        src={`/${book.image}`}
                        alt={book.title_short}
                      />{' '}
                    </a>
                  </Link>
                  {/* <button
                    onClick={() => {
                      setShoppingCart(addBookByBookId(book.id));
                    }}
                    css={buttonStyles}
                  >
                    +
                  </button> */}
                  <p>{book.title_short}</p>
                  <p> by {book.author}</p>
                  <div css={starStyles}>
                    <ReactStars
                      count={5}
                      size={15}
                      value={parseFloat(book.star_rating)}
                      isHalf={true}
                      edit={false}
                    />
                  </div>
                </div>
              ))
            : booksByGenre.map((book) => (
                <div css={productContainer} key={`book-${book.id}`}>
                  <Link href={`/products/${book.id}`}>
                    <a>
                      <img
                        css={imgStyles}
                        src={`/${book.image}`}
                        alt={book.title_short}
                      />{' '}
                    </a>
                  </Link>
                  <p>{book.title_short}</p>
                  <p> by {book.author}</p>
                  <div css={starStyles}>
                    <ReactStars
                      count={5}
                      size={15}
                      value={parseFloat(book.star_rating)}
                      isHalf={true}
                      edit={false}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { books } = await import('../../util/database');
  return {
    props: {
      books,
    },
  };
}
