import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from '@emotion/react';
import Head from 'next/head';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';

const outerContainerStyles = css`
  padding: 8px 24px;
  display: flex;
  flex: 2 1 auto;
  width: 100%;
  margin-bottom: 32px;
`;

export default function Checkout(props) {
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div css={outerContainerStyles}>
        <CheckoutForm setShoppingCart={props.setShoppingCart} />
        <OrderSummary productsInShoppingBag={props.productsInShoppingBag} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getAllProducts } = await import('../util/database');

  const products = await getAllProducts();

  const rawCookie = context.req.cookies.shoppingcart;

  // check if raw cookie is undefined
  const cookieArray = rawCookie ? JSON.parse(rawCookie) : [];

  // combine arrays "shoppingcart" (as defined by cookie)
  // and "products" (as defined in database) to create one array
  // with desired info on products in cart (incl. quantity)
  const productsInShoppingBag = cookieArray.map((item) => {
    const draftShoppingBagObject = products.find((book) => book.id === item.id);
    return {
      id: draftShoppingBagObject.id,
      titleShort: draftShoppingBagObject.titleShort,
      author: draftShoppingBagObject.author,
      img: draftShoppingBagObject.img,
      usedPrice: draftShoppingBagObject.usedPrice,
      currency: draftShoppingBagObject.currency,
      quantity: item.quantity,
    };
  });

  return {
    props: {
      productsInShoppingBag,
    },
  };
}
