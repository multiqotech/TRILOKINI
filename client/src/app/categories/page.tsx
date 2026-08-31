import CategoryPage from '@/components/category-page';
import { getBulkShowCategories } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const categories = await getBulkShowCategories();

  return <CategoryPage categories={Array.isArray(categories) ? categories : []} />;
}
