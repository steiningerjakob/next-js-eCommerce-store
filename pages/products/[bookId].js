import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../../components/Layout';

const imgStyles = css`
  max-width: 100%;
  max-height: 100%;
`;

export default function ProductDetails(props) {
  console.log('props', props);
  return (
    <Layout>
      <Head>
        <title>{props.book.title_short}</title>
      </Head>
      <div>
        <h1>{props.book.title_short}</h1>
        <h2>by {props.book.author}</h2>
        {/* Image component crashing the server */}
        {/* <Image
          css={imgStyles}
          src={`/${props.book.image}`}
          alt={props.book.title_short}
          width="500"
          height="300"
        /> */}
        <img
          css={imgStyles}
          src={`/${props.book.image}`}
          alt={props.book.title_short}
        />
        <div>New price: [yet to be added to database]</div>
        <div>
          Our price: {props.book.currency} {props.book.price}
        </div>
        <button>Add to cart</button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const bookId = context.query.bookId;

  const { books } = await import('../../util/database');
  const book = books.find((b) => b.id === bookId);
  return {
    props: {
      book: book,
    },
  };
}
