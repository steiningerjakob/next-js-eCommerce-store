import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Layout from '../../components/Layout';
import { convertQueryValue } from '../../util/context';
import { addBookByBookId, ShoppingCart } from '../../util/cookies';
import { Product } from '../../util/database';

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

const readMoreStyles = css`
  color: #284b63;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;

  :hover {
    text-decoration: underline;
  }
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

type Props = {
  shoppingCart: ShoppingCart;
  singleProduct?: Product;
  setShoppingCart: Dispatch<SetStateAction<ShoppingCart>>;
};

export default function ProductDetails(props: Props) {
  // state variable and event handler for "read more" component
  // see also: https://www.geeksforgeeks.org/how-to-create-a-read-more-component-in-reactjs/
  const [readMoreIsActive, setReadMoreIsActive] = useState(true);
  function toggleReadMore() {
    setReadMoreIsActive(!readMoreIsActive);
  }

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
                value={props.singleProduct.starRating}
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
            {readMoreIsActive
              ? props.singleProduct.descript.slice(0, 360)
              : props.singleProduct.descript}
            <button onClick={toggleReadMore} css={readMoreStyles}>
              {readMoreIsActive ? '...read more' : ' show less'}
            </button>
          </p>
        </section>
        <section>
          <p css={headingStyles}>Buy used from us:</p>
          <p css={priceStyles}>
            {props.singleProduct.currency}{' '}
            {Number(props.singleProduct.usedPrice).toFixed(2)}
          </p>
          <p css={amazonStyles}>
            (Amazon's price: {props.singleProduct.currency}{' '}
            {Number(props.singleProduct.newPrice).toFixed(2)})
          </p>
          <p>Expected delivery date: {getDeliveryDate()}</p>
          <Link href="../../shoppingcart">
            <a data-cy="single-product-shopping-cart-link">
              <button
                onClick={() => {
                  if (props.singleProduct) {
                    props.setShoppingCart(
                      addBookByBookId(props.singleProduct.id),
                    );
                  }
                }}
                css={navButtonStyles()}
              >
                Add to shopping bag
              </button>
            </a>
          </Link>
          <Link href="/products">
            <a>
              <button css={navButtonStyles('secondary')}>
                Continue shopping
              </button>
            </a>
          </Link>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getProductById } = await import('../../util/database');
  const bookId = convertQueryValue(context.query.bookId);

  const singleProduct = await getProductById(bookId);

  return {
    props: {
      singleProduct,
    },
  };
}
