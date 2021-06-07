// static import from the database at the top,
// since all files in the API folder are
// server-side only

import { getAllProducts } from '../../../util/database';

export default async function AllProducts(req, res) {
  const products = await getAllProducts();
  res.status(200).json({ products: products });
}
