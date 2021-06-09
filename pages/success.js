// ToDo:
// make thank you page that shows when checkout is completed

import Head from 'next/head';
import Layout from '../components/Layout';

export default function Success(props) {
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Thank you!</title>
      </Head>
      <p>
        Thank you for your order! We will send you a confirmation email shortly.
        We hope to see you again in our shop soon!
      </p>
    </Layout>
  );
}
