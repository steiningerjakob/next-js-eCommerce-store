import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

export type Product = {
  author: string;
  currency: string;
  descript: string;
  genre: string;
  id: number;
  img: string;
  isbn: string;
  lang: string;
  newPrice: number;
  pages: number;
  publicationDate: string;
  publisher: string;
  reviews: number;
  starRating: number;
  titleLong: string;
  titleShort: string;
  usedPrice: number;
};

// Read Postgres secret connection from .env file
dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

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
  const products = await sql<Product[]>`
  SELECT
    *
  FROM
    products`;
  return products.map((product) => camelcaseKeys(product));
}

// 2. Single product by some criterion / identifier
export async function getProductById(id?: number) {
  const singleProduct = await sql<[Product]>`
    SELECT
    *
    FROM
    products
    WHERE
    id = ${Number(id)}
  `;
  return singleProduct.map((product) => camelcaseKeys(product))[0];
}

export async function getProductsByGenre(id?: number) {
  const products = await sql<Product[]>`
    SELECT
    *
    FROM
    products
    WHERE
    id = ${Number(id)}
  `;
  return products.map((product) => camelcaseKeys(product));
}

export async function getProductByLanguage(id?: number) {
  const products = await sql<Product[]>`
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

export async function searchFunction(query?: string) {
  const products = await sql<Product[]>`
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
          return Object.values(b).some((str) =>
            String(str).toLowerCase().includes(query),
          );
        })
        .map((product) => camelcaseKeys(product))
    );
  }
}
