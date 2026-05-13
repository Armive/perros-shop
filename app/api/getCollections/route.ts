import { getCollections } from '@/lib/tribi';

export async function GET() {
  try {
    const collections = await getCollections();
    return Response.json({ collections });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
