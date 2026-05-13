import { shopify } from '@/lib/shopify';
import { COLLECTIONS_QUERY, PRODUCTS_QUERY } from '@/lib/queries';

export async function getCollections(): Promise<Collection[]> {
  const data = await shopify.request(COLLECTIONS_QUERY);
  return data.data.collections.edges.map((edge: { node: Collection }) => (edge.node));
}

export async function getProducts() {
  const data = await shopify.request(PRODUCTS_QUERY);
  return data.data.products.edges.map(
    (edge: {
      node: Product;
    }) => edge.node
  );
}
