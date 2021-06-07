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
      <h1>This is the thank you page</h1>
    </Layout>
  );
}
