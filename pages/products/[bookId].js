import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import ReactStars from 'react-rating-stars-component';
import Layout from '../../components/Layout';
import { addBookByBookId, parseCookieValue } from '../../util/cookies';

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
  border-radius: 8px;
  border: none;
  margin: 24px 0;
  width: 304px;
  height: 72px;

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }

  :focus {
    background-color: #81b29a;
    :hover {
      opacity: 1;
      cursor: default;
    }
  }
`;

export default function ProductDetails(props) {
  // function to display a delivery date (1 week from current date)
  function getDeliveryDate() {
    const today = new Date();
    const deliveryDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7,
    );
    return JSON.stringify(deliveryDate).split('T')[0].split('"')[1];
  }
  // Show message if product does not exist
  if (!props.singleProduct) {
    return (
      <Layout
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
      >
        <Head>
          <title>Product not found!</title>
        </Head>
        Product not found
      </Layout>
    );
  }

  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>{props.singleProduct.titleShort}</title>
      </Head>
      <div css={gridStyles}>
        <section>
          <img
            src={`/${props.singleProduct.img}`}
            alt={props.singleProduct.titleShort}
          />
        </section>
        <section>
          <p css={headingStyles}>{props.singleProduct.titleShort}</p>
          <p css={authorStyles}>by {props.singleProduct.author}</p>
          <p css={headingStyles}>Product details:</p>
          <p css={ratingStyles}>
            <div>
              <ReactStars
                count={5}
                size={24}
                value={parseFloat(props.singleProduct.starRating)}
                isHalf={true}
                edit={false}
              />
            </div>
            <div>{props.singleProduct.reviews} reviews</div>
          </p>
          <p>
            <span css={boldStyles}>Publisher: </span>
            {props.singleProduct.publisher}
          </p>
          <p>
            <span css={boldStyles}>Publication date: </span>
            {props.singleProduct.publicationDate}
          </p>
          <p>
            <span css={boldStyles}>Language: </span>
            {props.singleProduct.lang}
          </p>
          <p>
            <span css={boldStyles}>Pages: </span>
            {props.singleProduct.pages}
          </p>
          <p>
            <span css={boldStyles}>ISBN: </span>
            {props.singleProduct.isbn}
          </p>
          <p>
            <span css={boldStyles}>Description: </span>
            {props.singleProduct.descript}
          </p>
        </section>
        <section>
          <p css={headingStyles}>Buy used from us:</p>
          <p css={priceStyles}>
            {props.singleProduct.currency}{' '}
            {parseFloat(props.singleProduct.usedPrice).toFixed(2)}
          </p>
          <p css={amazonStyles}>
            (Amazon's price: {props.singleProduct.currency}{' '}
            {parseFloat(props.singleProduct.newPrice).toFixed(2)})
          </p>
          <p>Expected delivery date: {getDeliveryDate()}</p>
          <Link href="../../shoppingcart">
            <a data-cy="single-product-shopping-cart-link">
              <button
                onClick={() => {
                  props.setShoppingCart(
                    addBookByBookId(props.singleProduct.id),
                  );
                }}
                css={buttonStyles}
              >
                Add to shopping bag
              </button>
            </a>
          </Link>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getProductById } = await import('../../util/database');
  const bookId = context.query.bookId;

  const singleProduct = await getProductById(bookId);

  return {
    props: {
      singleProduct: singleProduct || null,
      quantity: parseCookieValue(context.req.cookies.quantity, []),
    },
  };
}
