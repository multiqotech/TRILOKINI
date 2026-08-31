const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types
export type HeroBanner = {
  _id: string;
  title: string;
  imageUrl: string;
  mobileImageUrl: string;
  linkUrl: string;
  buttonText: string;
  order: number;
  isActive: boolean;
};

export type Category = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  showInHomePage: boolean;
  homePageOrder: number;
};

export type ApiProduct = {
  _id: string;
  category: string | Category;
  title: string;
  subtitle: string;
  currentPrice: number;
  previousPrice: number;
  discountPercentage: number;
  imageUrl: string;
  designerName: string;
  showInHomePage: boolean;
};

export type Designer = {
  _id: string;
  name: string;
  imageUrl: string;
  subtitle: string;
  profileUrl: string;
  order: number;
  isActive: boolean;
};

export type Celebrity = {
  _id: string;
  name: string;
  imageUrl: string;
  subtitle: string;
  profileUrl: string;
  order: number;
  isActive: boolean;
};

export type WeddingItem = {
  _id: string;
  name: string;
  imageUrl: string;
  subtitle: string;
  href: string;
  order: number;
  isActive: boolean;
  isWide: boolean;
};

export type FavouriteItem = {
  _id: string;
  imageUrl: string;
  href: string;
  position: string;
  order: number;
  isActive: boolean;
};

export type HomepageProductGroup = {
  category: Category;
  products: ApiProduct[];
};

// Helper
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [] as unknown as T;
  }
}

// API functions
export const getActiveBanners = () => fetchApi<HeroBanner[]>('/api/hero-banners/active');
export const getHomepageCategories = () => fetchApi<Category[]>('/api/categories/homepage');
export const getBulkShowCategories = () => fetchApi<Category[]>('/api/categories/bulk-show');
export const getHomepageProducts = () => fetchApi<HomepageProductGroup[]>('/api/products/homepage');
export const getBulkShowProducts = () => fetchApi<HomepageProductGroup[]>('/api/products/bulk-show');
export const getDesigners = () => fetchApi<Designer[]>('/api/designers');
export const getCelebrities = () => fetchApi<Celebrity[]>('/api/celebrities');
export const getWeddingItems = () => fetchApi<WeddingItem[]>('/api/wedding-items');
export const getFavourites = () => fetchApi<FavouriteItem[]>('/api/favourites');

export type CollectionImage = {
  _id: string;
  collection: string;
  imageUrl: string;
  position: number;
  href: string;
  isActive: boolean;
};

export type Collection = {
  _id: string;
  title: string;
  order: number;
  isActive: boolean;
  images: CollectionImage[];
};

export const getActiveCollections = () => fetchApi<Collection[]>('/api/collections/active');
