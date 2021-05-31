import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getShoppingCartCookieValue, parseCookieValue } from '../util/cookies';
import { getBookById } from '../util/database';

export default function ShoppingCartPage() {
  const [shoppingCart, setShoppingCart] = useState(
    getShoppingCartCookieValue(),
  );

  useEffect(() => {
    setShoppingCart(getShoppingCartCookieValue('quantity'));
  }, [shoppingCart]);

  // retrieve book objects for books in shopping cart
  const bookIdsInShoppingCart = shoppingCart.map((item) => item.id);
  const booksInShoppingCart = bookIdsInShoppingCart.map((id) =>
    getBookById(id),
  );

  // helper function to calculate subtotals by book, i.e.
  // book price * book quantity in shopping cart
  function getTotalPriceByBook() {
    const p = booksInShoppingCart.map((b) => parseFloat(b.used_price));
    const q = shoppingCart.map((i) => parseFloat(i.quantity));
    const totalByBook = [];
    for (let x = 0; x < Math.min(p.length, q.length); x++) {
      totalByBook[x] = p[x] * q[x];
    }
    return totalByBook;
  }

  const totalByBookOutput = JSON.parse(JSON.stringify(getTotalPriceByBook()));

  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <h1>This is the shopping cart</h1>
      <section>
        <p>Books in shopping cart, and price:</p>
        {booksInShoppingCart.map((b) => (
          <div key={b.id}>
            {b.title_short} by {b.author}: {b.used_price}
          </div>
        ))}
        <p>Quantities in shopping cart:</p>
        {shoppingCart.map((i) => (
          <div key={i.id}>{i.quantity}</div>
        ))}
        <p>Subtotal by book:</p>

        {totalByBookOutput.map((totalPrice) => (
          <div key={totalPrice.id}>€{totalPrice.toFixed(2)}</div>
        ))}
        <p>Total:</p>
        <div>
          €
          {totalByBookOutput
            .reduce((accumulator, currentValue) => accumulator + currentValue)
            .toFixed(2)}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { books } = await import('../util/database');
  return {
    props: {
      books,
      quantity: parseCookieValue(context.req.cookies.quantity, []),
    },
  };
}
