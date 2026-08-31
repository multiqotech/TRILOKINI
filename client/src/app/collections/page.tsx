import CollectionPage from "@/components/collection-page";
import { getActiveCollections } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const collections = await getActiveCollections();

  return <CollectionPage collections={Array.isArray(collections) ? collections : []} />;
}
