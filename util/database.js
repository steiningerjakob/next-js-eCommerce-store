import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Read Postgres secret connection from .env file
dotenvSafe.config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Perform queries:
// 1. All products
export async function getAllProducts() {
  const products = await sql`
  SELECT
    *
  FROM
    products`;
  return products.map((product) => camelcaseKeys(product));
}

// 2. Single product by some criterion / identifier
export async function getProductById(id) {
  const singleProduct = await sql`
    SELECT
    *
    FROM
    products
    WHERE
    id = ${Number(id)}
  `;
  return singleProduct.map((product) => camelcaseKeys(product))[0];
}

export async function getProductsByGenre(id) {
  const products = await sql`
    SELECT
    *
    FROM
    products
    WHERE
    id = ${Number(id)}
  `;
  return products.map((product) => camelcaseKeys(product));
}

export async function getProductByLanguage(id) {
  const products = await sql`
    SELECT
    *
    FROM
    products
    WHERE
    id = ${Number(id)}
  `;
  return products.map((product) => camelcaseKeys(product));
}

// adapted from:
// https://www.emgoto.com/react-search-bar/

export async function searchFunction(query) {
  const products = await sql`
    SELECT
      *
    FROM
      products`;
  if (!query) {
    return products.map((product) => camelcaseKeys(product));
  } else {
    return (
      products
        // filter book descriptions that include query
        .filter((b) => {
          const productDescription = b.descript.toLowerCase();
          return productDescription.includes(query);
        })
        .map((product) => camelcaseKeys(product))
    );
  }
}
// This will transform ALL array elements to lower case,
// but for some reason not working for search
// const allArrayElementsToLowerCase = products.map((b) =>
//     String.prototype.toLowerCase.apply(JSON.stringify(b)),
//   );
