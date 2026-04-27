import { shopify } from '@/lib/shopify';
import { COLLECTIONS_QUERY, PRODUCTS_QUERY } from '@/lib/queries';

interface CollectionImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface Category {
  name: string;
  href: string;
  image: CollectionImage | null;
}

export async function getCollections(): Promise<Category[]> {
  const data = await shopify.request(COLLECTIONS_QUERY);
  return data.data.collections.edges.map(
    (edge: {
      node: { id: string; title: string; handle: string; image: CollectionImage | null };
    }) => ({
      name: edge.node.title,
      href: `/tienda?coleccion=${edge.node.handle}`,
      image: edge.node.image,
      id: edge.node.id,
    })
  );
}

export async function getProducts() {
  const data = await shopify.request(PRODUCTS_QUERY);
  return data.data.products.edges.map(
    (edge: {
      node: {
        title: string;
        id: string;
        handle: string;
        image: CollectionImage | null;
        selectedOrFirstAvailableVariant: { price: { amount: string; currencyCode: string } };
      };
    }) => edge.node
  );
}
