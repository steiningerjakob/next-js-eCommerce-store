import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Read Postgres secret connection from .env file
dotenvSafe.config();

// Connect to the database
const sql = postgres();

// Perform query
export async function getProducts() {
  const products = await sql`SELECT * FROM products`;
  return products.map((product) => camelcaseKeys(product));
}

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

export const books = [
  {
    id: '1',
    title_short: 'The Lord of the Rings',
    title_long: 'The Lord of the Rings (3 Book Box set)',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    pages: '1216',
    publisher: 'Harpercollins',
    publication_date: '31.12.2006',
    language: 'English',
    isbn: '9780261102385',
    star_rating: '4.7',
    reviews: '9692',
    image: 'the lord of the rings.jpg',
    used_price: '7.74',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '2',
    title_short: 'Tuesdays with Morrie',
    title_long: 'Tuesdays with Morrie',
    author: 'Mitch Albom',
    genre: 'Education',
    pages: '208',
    publisher: 'Anchor',
    publication_date: '29.12.1998',
    language: 'English',
    isbn: '9780385496490',
    star_rating: '4.6',
    reviews: '10484',
    image: 'tuesdays with morrie.jpg',
    used_price: '0.63',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '3',
    title_short: 'The Mountain Shadow',
    title_long: 'The Mountain Shadow',
    author: 'Gregory David Roberts',
    genre: 'Contemporary Fiction',
    pages: '880',
    publisher: 'Abacus',
    publication_date: '02.06.2016',
    language: 'English',
    isbn: '0349121702',
    star_rating: '4.3',
    reviews: '1862',
    image: 'the mountain shadow.jpg',
    used_price: '1.17',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '4',
    title_short: 'Fall of Giants',
    title_long: 'Fall of Giants',
    author: 'Ken Follett',
    genre: 'Historical Thrillers',
    pages: '941',
    publisher: 'Macmillan',
    publication_date: '03.06.2011',
    language: 'English',
    isbn: '0330535447',
    star_rating: '4.5',
    reviews: '12709',
    image: 'fall of giants.jpg',
    used_price: '0.20',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '5',
    title_short: 'A Game of Thrones',
    title_long: 'GAME OF THRONES THE 20TH A HB',
    author: 'George R.R. Martin',
    genre: 'Fantasy',
    pages: '864',
    publisher: 'Harpercollins',
    publication_date: '18.10.2016',
    language: 'English',
    isbn: '0008228566',
    star_rating: '4.6',
    reviews: '19172',
    image: 'a game of thrones.jpg',
    used_price: '0.15',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '6',
    title_short: 'Harry Potter und der Orden des Phönix',
    title_long: 'Harry Potter und der Orden des Phönix (Band 5)',
    author: 'Joanne K. Rowling',
    genre: 'Fantasy',
    pages: '1024',
    publisher: 'Carlsen',
    publication_date: '15.11.2003',
    language: 'German',
    isbn: '3551555559',
    star_rating: '4.8',
    reviews: '20328',
    image: 'harry potter 5.jpg',
    used_price: '1.61',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '7',
    title_short: 'Die Weite des Himmels',
    title_long: 'Die Weite des Himmels: Der Clan der Otori - Wie alles begann',
    author: 'Lian Hearn',
    genre: 'Fantasy',
    pages: '752',
    publisher: 'Ullstein',
    publication_date: '16.02.2011',
    language: 'German',
    isbn: '3548269052',
    star_rating: '4.7',
    reviews: '188',
    image: 'die weite des himmels.jpg',
    used_price: '1.64',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '8',
    title_short: 'Atlas Shrugged',
    title_long: 'Atlas Shrugged',
    author: 'Ayn Rand',
    genre: 'Political Fiction',
    pages: '1069',
    publisher: 'Penguin',
    publication_date: '30.01.1997',
    language: 'English',
    isbn: '9780451191144',
    star_rating: '4.4',
    reviews: '8750',
    image: 'atlas shrugged.jpg',
    used_price: '1.2',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '9',
    title_short: 'Good Omens',
    title_long:
      'Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch',
    author: 'Terry Pratchett & Neil Gaiman',
    genre: 'Occult',
    pages: '416',
    publisher: 'Corgi',
    publication_date: '01.05.1991',
    language: 'English',
    isbn: '9780552137034',
    star_rating: '4.7',
    reviews: '12393',
    image: 'good omens.jpg',
    used_price: '0.43',
    currency: '€',
    new_price: '25.00',
  },
  {
    id: '10',
    title_short: 'The Name of the Wind',
    title_long: 'The Name of the Wind: The Kingkiller Chronicle: Day One',
    author: 'Patrick Rothfuss',
    genre: 'Fantasy',
    pages: '736',
    publisher: 'DAW',
    publication_date: '01.04.2008',
    language: 'English',
    isbn: '0756404746',
    star_rating: '4.6',
    reviews: '15773',
    image: 'the name of the wind.jpg',
    used_price: '0.97',
    currency: '€',
    new_price: '25.00',
  },
];

// helper functions to select specific book objects from array
export function getBookById(id) {
  return books.find((book) => book.id === id);
}

export function getBooksByGenre(genre) {
  return books.filter((book) => book.genre === genre);
}

export function getBooksByLanguage(language) {
  return books.filter((book) => book.language === language);
}
