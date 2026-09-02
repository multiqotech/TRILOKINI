export type ProductVariant = {
  color: string;
  images: string[];
  currentPrice: number;
  previousPrice?: number;
  discountPercentage?: number;
};

export type Product = {
  id: string;
  categoryId?: string;
  title: string;
  subtitle?: string;
  designerName: string;
  currentPrice: number;
  previousPrice?: number;
  discountPercentage?: number;
  imageUrl: string;
  variants?: ProductVariant[];
  tags?: string[];
  productCode?: string;
  sizes?: string[];
  stockBySize?: Record<string, number>;
  description?: string;
  shippingInfo?: string;
  disclaimer?: string;
  isBespoke?: boolean;
  addons?: ProductAddon[];
};

export type ProductAddon = {
  id: string;
  name: string;
  price: number;
  sizes?: string[];
};

export type FilterGroup = {
  title: string;
  options: string[];
};

export type ProductListParams = {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  filters?: Record<string, string[]>;
};

export type ProductListResult = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  filterGroups: FilterGroup[];
};

export type CartLineItem = {
  id: string;
  productId: string;
  title: string;
  designerName: string;
  imageUrl: string;
  size: string;
  price: number;
  quantity: number;
  productCode?: string;
  estimatedShipping?: string;
};

export type CartSummary = {
  subtotal: number;
  discount: number;
  shipping: number | null;
  total: number;
};

export type Cart = {
  items: CartLineItem[];
  summary: CartSummary;
  couponCode?: string;
  isGift?: boolean;
};

export type FilmArticle = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  imageUrl: string;
  publishedAt: string;
  featured?: boolean;
};

export type GiftCard = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  amounts: number[];
  minAmount: number;
  maxAmount: number;
};

export type CMSPage = {
  slug: string;
  title: string;
  content: string;
  sections?: { heading: string; body: string }[];
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  orders: { id: string; date: string; total: number; status: string }[];
};

export type ContactFormData = {
  fullName: string;
  email: string;
  contactNumber: string;
  whatsappNumber?: string;
  sameAsContact?: boolean;
  interest: string;
  notes?: string;
};

export type BespokeOption = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};
