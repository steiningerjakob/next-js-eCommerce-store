import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Layout from '../../components/Layout';
import {
  addBookByBookId,
  clearShoppingCart,
  getShoppingCartCookieValue,
  parseCookieValue,
  removeBookFromShoppingCart,
  subtractBookByBookId,
} from '../../util/cookies';

const gridStyles = css`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  margin-top: 25px;
  margin-left: 15px;
`;

const imgStyles = css`
  max-width: 100%;
  max-height: 100%;
`;

const boldStyles = css`
  font-weight: 600;
`;

export default function ProductDetails(props) {
  // state variables
  const [shoppingCart, setShoppingCart] = useState(
    getShoppingCartCookieValue(),
  );

  // function to re-render upon change of shoppingCart variable
  useEffect(() => {
    setShoppingCart(getShoppingCartCookieValue('quantity'));
  }, [shoppingCart]);

  function getDeliveryDate() {
    const today = new Date();
    const deliveryDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7,
    );
    return JSON.stringify(deliveryDate).split('T')[0].split('"')[1];
  }
  return (
    <Layout>
      <Head>
        <title>{props.book.title_short}</title>
      </Head>
      <div css={gridStyles}>
        <section>
          <img
            css={imgStyles}
            src={`/${props.book.image}`}
            alt={props.book.title_short}
          />
          {/* Image component crashing the server */}
          {/* <Image
          css={imgStyles}
          src={`/${props.book.image}`}
          alt={props.book.title_short}
          width="500"
          height="300"
        /> */}
        </section>
        <section>
          <h1>{props.book.title_short}</h1>
          <h3>by {props.book.author}</h3>
          <h2>Product details:</h2>
          <p>
            <span>
              <ReactStars
                count={5}
                size={24}
                value={parseFloat(props.book.star_rating)}
                isHalf={true}
                edit={false}
              />{' '}
              {props.book.reviews} reviews
            </span>
          </p>
          {console.log(parseFloat(props.book.star_rating))}
          <p>
            <span css={boldStyles}>Publisher: </span>
            {props.book.publisher}
          </p>
          <p>
            <span css={boldStyles}>Publication date: </span>
            {props.book.publication_date}
          </p>
          <p>
            <span css={boldStyles}>Language: </span>
            {props.book.language}
          </p>
          <p>
            <span css={boldStyles}>Pages: </span>
            {props.book.pages}
          </p>
          <p>
            <span css={boldStyles}>ISBN: </span>
            {props.book.isbn}
          </p>
        </section>
        <section>
          <p>
            Buy used from us: {props.book.currency}{' '}
            {parseFloat(props.book.used_price).toFixed(2)}
          </p>
          <p>
            Buy new from Amazon: {props.book.currency}{' '}
            {parseFloat(props.book.new_price).toFixed(2)}
          </p>
          <p>Expected delivery date: {getDeliveryDate()}</p>
          <button
            onClick={() => {
              setShoppingCart(addBookByBookId(props.book.id));
            }}
          >
            +1
          </button>
          <button
            onClick={() => {
              setShoppingCart(subtractBookByBookId(props.book.id));
            }}
          >
            -1
          </button>
          <br />
          <button
            onClick={() => {
              setShoppingCart(removeBookFromShoppingCart(props.book.id));
            }}
          >
            Remove item from shopping cart
          </button>
          <br />
          <button
            onClick={() => {
              setShoppingCart(clearShoppingCart());
            }}
          >
            Clear shopping cart
          </button>
          <div>
            {JSON.stringify(shoppingCart)}
            <br />
            {shoppingCart.find((item) => item.id === props.book.id)?.quantity}
          </div>
          <Link href="../../shoppingcart">
            <a>
              <button>Go to shopping cart</button>
            </a>
          </Link>
        </section>
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
      book,
      books,
      quantity: parseCookieValue(context.req.cookies.quantity, []),
    },
  };
}
