import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

const listContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

const productContainer = css`
  width: 200px;
  background-color: #fafafa;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  padding: 15px;
  margin: 20px;
  text-align: center;
`;

const imgStyles = css`
  max-width: 50%;
  max-height: 50%;
`;

export default function Products(props) {
  console.log('props', props);
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      <div>
        <h1>This is the product list page</h1>
        <section css={listContainer}>
          {props.books.map((book) => (
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
            </div>
          ))}
        </section>
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
