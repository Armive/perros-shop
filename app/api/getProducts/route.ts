import { getProducts } from '@/lib/tribi';

export async function GET() {
  try {
    const products = await getProducts();
    return Response.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
