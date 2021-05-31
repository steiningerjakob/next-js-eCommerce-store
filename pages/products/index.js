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
  margin: 0px 15px;
  width: 100%;
`;

const listContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const productContainer = css`
  width: 220px;
  background-color: #fafafa;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  border-radius: 10px;
  padding: 15px;
  margin: 20px;
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

export default function Products(props) {
  // creating list of unique genres from books array
  const newUniqueGenres = [...new Set(props.books.map((book) => book.genre))];

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
        <h1>Check out our used books collection</h1>
        <section>
          <div>
            <h3>All Genres [filter currently not working properly]</h3>
            {newUniqueGenres.map((g) => (
              <label key={`genre-${g.id}`}>
                {g}
                <input
                  type="checkbox"
                  value={g}
                  onChange={(event) =>
                    setGenreFilter(event.currentTarget.value)
                  }
                />
              </label>
            ))}
          </div>
        </section>
        <section css={listContainer}>
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
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { books, uniqueGenres } = await import('../../util/database');
  return {
    props: {
      books,
      uniqueGenres,
    },
  };
}
