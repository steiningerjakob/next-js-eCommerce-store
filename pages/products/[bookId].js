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
} from '../../util/cookies';

const gridStyles = css`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  gap: 24px;
  margin-top: 25px;
  margin-left: 15px;
`;

const headingStyles = css`
  font-size: 1.5em;
  font-weight: 600;
  margin: 8px 0;
`;

const authorStyles = css`
  font-weight: 500;
  margin-bottom: 48px;
  color: grey;
`;

const amazonStyles = css`
  font-weight: 400;
  color: grey;
  margin-top: -32px;
`;

const ratingStyles = css`
  display: flex;
  align-items: center;

  div + div {
    margin-left: 16px;
    color: grey;
  }
`;

const boldStyles = css`
  font-weight: 600;
`;

const priceStyles = css`
  font-size: 3em;
  font-weight: 600;
  color: #153243;
  margin-top: 16px;
`;

const buttonStyles = css`
  font-weight: 600;
  font-size: 1.1em;
  background-color: #153243;
  color: white;
  text-align: center;
  padding: 24px 64px;
  border-radius: 8px;
  border: none;
  margin: 16px 0;

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }

  :focus {
    background-color: #81b29a;
  }
`;

export default function ProductDetails(props) {
  // state variables
  const [shoppingCart, setShoppingCart] = useState(
    getShoppingCartCookieValue(),
  );

  // function to re-render upon change of shoppingCart variable
  useEffect(() => {
    setShoppingCart(getShoppingCartCookieValue('shoppingcart'));
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
          <img src={`/${props.book.image}`} alt={props.book.title_short} />
        </section>
        <section>
          <p css={headingStyles}>{props.book.title_short}</p>
          <p css={authorStyles}>by {props.book.author}</p>
          <p css={headingStyles}>Product details:</p>
          <p css={ratingStyles}>
            <div>
              <ReactStars
                count={5}
                size={24}
                value={parseFloat(props.book.star_rating)}
                isHalf={true}
                edit={false}
              />
            </div>
            <div>{props.book.reviews} reviews</div>
          </p>
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
          <p>
            <span css={boldStyles}>Description: </span>
            [Yet to be added to database]
          </p>
        </section>
        <section>
          <p css={headingStyles}>Buy used from us:</p>
          <p css={priceStyles}>
            {props.book.currency} {parseFloat(props.book.used_price).toFixed(2)}
          </p>
          <p css={amazonStyles}>
            (Amazon's price: {props.book.currency}{' '}
            {parseFloat(props.book.new_price).toFixed(2)})
          </p>
          <p>Expected delivery date: {getDeliveryDate()}</p>
          <button
            onClick={() => {
              setShoppingCart(addBookByBookId(props.book.id));
            }}
            css={buttonStyles}
          >
            Add to shopping bag
          </button>
          <br />
          <br />
          <br />
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
