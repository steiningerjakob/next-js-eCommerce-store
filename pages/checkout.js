// ToDo:
// make user input fields for shipping and payment info
// STRETCH: connect to stripe

import Head from 'next/head';
import Layout from '../components/Layout';

export default function Checkout() {
  return (
    <Layout>
      <Head>
        <title>Checkout</title>
      </Head>
      <h1>This is the checkout page</h1>
    </Layout>
  );
}
