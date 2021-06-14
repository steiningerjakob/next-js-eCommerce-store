import Head from 'next/head';
import Layout from '../components/Layout';

export default function Login(props) {
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Login</title>
      </Head>
      <h1>This is the user login page</h1>
    </Layout>
  );
}
