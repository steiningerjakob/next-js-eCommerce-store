import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home(props) {
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Home</title>
      </Head>
      <h1>This is the landing page</h1>
    </Layout>
  );
}
