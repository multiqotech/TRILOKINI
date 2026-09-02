import type { ApiProduct } from "@/lib/api";
import { getProductById as apiGetProductById, getProducts as apiGetProducts } from "@/lib/api";
import { getMockProductById, getMockProductList, getMockRelatedProducts } from "@/lib/mocks/products";
import type { Product, ProductListParams, ProductListResult } from "@/lib/types";

function apiToProduct(p: ApiProduct): Product {
  const price = Number(p.currentPrice ?? p.variants?.[0]?.currentPrice ?? 0);
  const prev = Number(p.previousPrice ?? p.variants?.[0]?.previousPrice ?? 0);
  return {
    id: p._id,
    categoryId: typeof p.category === "object" ? p.category._id : p.category,
    title: p.title,
    subtitle: p.subtitle,
    designerName: p.designerName || "TRILOKINI",
    currentPrice: price,
    previousPrice: prev > price ? prev : undefined,
    discountPercentage: p.discountPercentage || p.variants?.[0]?.discountPercentage,
    imageUrl: p.imageUrl || p.variants?.[0]?.images?.[0] || "",
    variants: p.variants?.map((v) => ({
      color: v.color,
      images: v.images,
      currentPrice: v.currentPrice,
      previousPrice: v.previousPrice,
      discountPercentage: v.discountPercentage,
    })),
    tags: p.tags,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  };
}

export async function getProductList(params: ProductListParams = {}): Promise<ProductListResult> {
  try {
    const apiProducts = await apiGetProducts();
    if (Array.isArray(apiProducts) && apiProducts.length > 0) {
      const products = apiProducts.map(apiToProduct);
      const mockResult = getMockProductList(params);
      return { ...mockResult, products: products.length ? products : mockResult.products, filterGroups: mockResult.filterGroups };
    }
  } catch {
    // fall through to mock
  }
  return getMockProductList(params);
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const apiProduct = await apiGetProductById(id);
    if (apiProduct?._id) return apiToProduct(apiProduct);
  } catch {
    // fall through
  }
  return getMockProductById(id) ?? getMockProductById("prod-1");
}

export async function getRelatedProducts(id: string): Promise<Product[]> {
  return getMockRelatedProducts(id);
}

export function formatPrice(value: number): string {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

export function productToCard(product: Product) {
  return {
    id: product.id,
    src: product.imageUrl,
    designer: product.designerName,
    name: product.title,
    price: formatPrice(product.currentPrice),
    originalPrice: product.previousPrice ? formatPrice(product.previousPrice) : undefined,
    discount: product.discountPercentage ? `${product.discountPercentage}% Off` : undefined,
    href: `/products/${product.id}`,
  };
}
