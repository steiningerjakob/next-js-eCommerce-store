import { getProductById } from '../../../util/database';

export default async function SingleProduct(req, res) {
  const bookId = req.query.bookId;

  if (req.method === 'GET') {
    const product = await getProductById(bookId);
    res.status(200).json({ products: product || null });
  } else if (req.method === 'DELETE') {
    // THE FOLLOWING HAS YET TO BE REPLACED BY
    // DATABASE "DELETE" QUERY FUNCTION
    res.status(400).json(null);
  }
}
