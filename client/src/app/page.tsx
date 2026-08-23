import HomePage from '@/components/home-page';
import { getActiveBanners, getHomepageCategories, getHomepageProducts, getDesigners, getCelebrities, getWeddingItems, getFavourites } from '@/lib/api';

export default async function Page() {
  const [banners, categories, productsByCategory, designers, celebrities, weddingItems, favourites] = await Promise.all([
    getActiveBanners(),
    getHomepageCategories(),
    getHomepageProducts(),
    getDesigners(),
    getCelebrities(),
    getWeddingItems(),
    getFavourites(),
  ]);

  return <HomePage data={{ banners, categories, productsByCategory, designers, celebrities, weddingItems, favourites }} />;
}
