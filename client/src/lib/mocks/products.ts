import type { FilterGroup, Product, ProductListParams, ProductListResult } from "@/lib/types";

const home = "/images/home";

export const mockFilterGroups: FilterGroup[] = [
  { title: "CATEGORY", options: ["Saree", "Dupatta", "Stole", "Blouse / Top", "Unstitched Suit Set", "Kurta", "Dress", "Shrug", "Kaftan"] },
  { title: "COLLECTION", options: ["Bhot", "Sambraani"] },
  { title: "COLOR / TONES", options: ["Chandan / White", "Neel / Blue", "Neem / Green", "Red / Kumkum", "Yellow / Haldi", "Gulabi / Pink", "Kala / Black"] },
  { title: "PRICE", options: ["Rs. 5,000 to Rs. 10,000", "Rs. 10,000 to Rs. 20,000", "Rs. 20,000 to Rs. 30,000", "Rs. 30,000 and Above"] },
];

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    categoryId: "lehengas",
    title: "Pink Organza Floral Printed Lehenga Set",
    subtitle: "Featuring delicate floral prints on organza with hand-finished details.",
    designerName: "ISHA GUPTA TAYAL",
    currentPrice: 43400,
    previousPrice: 63500,
    discountPercentage: 30,
    imageUrl: `${home}/hero-product-1.png`,
    productCode: "IGT-LH-001",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    stockBySize: { XS: 1, S: 3, M: 5, L: 2 },
    tags: ["lehenga", "sale"],
    description: "Featuring a pink organza lehenga with floral print and hand embroidery. Paired with matching blouse and dupatta.",
    shippingInfo: "This product will be shipped to you after 3-4 weeks from the date of order placed.",
    disclaimer: "This product will be exclusively handcrafted for you, making the colour/texture/pattern slightly vary from the image shown.",
    variants: [
      { color: "Pink", images: [`${home}/hero-product-1.png`, `${home}/hero-product-2.png`], currentPrice: 43400, previousPrice: 63500, discountPercentage: 30 },
      { color: "Ivory", images: [`${home}/hero-product-3.png`], currentPrice: 43400, previousPrice: 63500, discountPercentage: 30 },
    ],
    addons: [
      { id: "addon-1", name: "Blouse", price: 12000, sizes: ["XS", "S", "M", "L", "XL"] },
      { id: "addon-2", name: "Lehenga", price: 28000, sizes: ["XS", "S", "M", "L", "XL"] },
      { id: "addon-3", name: "Dupatta", price: 8000 },
    ],
  },
  {
    id: "prod-2",
    categoryId: "lehengas",
    title: "Yellow Printed Sahara Set",
    subtitle: "Featuring a yellow kurta in dupion silk base with floral print.",
    designerName: "DRISHTI & ZAHABIA",
    currentPrice: 24168,
    previousPrice: 30000,
    discountPercentage: 19,
    imageUrl: `${home}/hero-product-2.png`,
    productCode: "DRZC032204",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
    tags: ["sahara", "kurta"],
    description: "Featuring a yellow kurta in dupion silk base with floral print and hand embroidery.",
    shippingInfo: "Shipped within 3-4 weeks. Custom made orders are not returnable.",
    disclaimer: "Handcrafted exclusively for you; colour/texture may slightly vary.",
    variants: [{ color: "Yellow", images: [`${home}/hero-product-2.png`, `${home}/hero-product-3.png`], currentPrice: 24168, previousPrice: 30000, discountPercentage: 19 }],
  },
  {
    id: "prod-3",
    categoryId: "sarees",
    title: "Fuchsia-Orange Tissue Pre-Draped Saree Set",
    subtitle: "Pre-draped tissue saree with contemporary finishing.",
    designerName: "RIDHI MEHRA",
    currentPrice: 95000,
    imageUrl: `${home}/hero-product-3.png`,
    productCode: "RMLF022615",
    sizes: ["XS", "S", "M", "L"],
    tags: ["saree"],
    description: "Fuchsia-orange tissue pre-draped saree set with embellished blouse.",
    shippingInfo: "Estimated shipping: 12th of October.",
    disclaimer: "Colour may vary slightly due to handcrafted nature.",
    variants: [{ color: "Fuchsia", images: [`${home}/hero-product-3.png`], currentPrice: 95000 }],
  },
  {
    id: "prod-4",
    categoryId: "lehengas",
    title: "Ivory Embroidered Lehenga Set",
    designerName: "ISHA GUPTA TAYAL",
    currentPrice: 52000,
    previousPrice: 68000,
    discountPercentage: 24,
    imageUrl: `${home}/hero-product-4.png`,
    sizes: ["S", "M", "L", "XL"],
    tags: ["lehenga", "wedding"],
    variants: [{ color: "Ivory", images: [`${home}/hero-product-4.png`], currentPrice: 52000, previousPrice: 68000, discountPercentage: 24 }],
  },
  {
    id: "prod-5",
    categoryId: "lehengas",
    title: "Red Silk Bridal Lehenga",
    designerName: "ISHA GUPTA TAYAL",
    currentPrice: 78000,
    previousPrice: 95000,
    discountPercentage: 18,
    imageUrl: `${home}/hero-product-5.png`,
    sizes: ["S", "M", "L"],
    tags: ["lehenga", "bridal", "wedding"],
    variants: [{ color: "Red", images: [`${home}/hero-product-5.png`], currentPrice: 78000, previousPrice: 95000, discountPercentage: 18 }],
  },
];

function matchesPrice(product: Product, priceFilters: string[]): boolean {
  if (!priceFilters.length) return true;
  const value = product.currentPrice;
  return priceFilters.some((filter) => {
    if (filter === "Rs. 5,000 to Rs. 10,000") return value >= 5000 && value <= 10000;
    if (filter === "Rs. 10,000 to Rs. 20,000") return value > 10000 && value <= 20000;
    if (filter === "Rs. 20,000 to Rs. 30,000") return value > 20000 && value <= 30000;
    if (filter === "Rs. 30,000 and Above") return value > 30000;
    return true;
  });
}

export function getMockProductList(params: ProductListParams = {}): ProductListResult {
  const { category, search, sort, page = 1, limit = 12, filters = {} } = params;
  let items = [...mockProducts];

  if (category && category !== "all") {
    items = items.filter((p) => p.categoryId === category || p.tags?.includes(category));
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter((p) =>
      `${p.title} ${p.designerName} ${p.tags?.join(" ")}`.toLowerCase().includes(q)
    );
  }

  if (filters.CATEGORY?.length) {
    items = items.filter((p) =>
      filters.CATEGORY!.some((f) => `${p.title} ${p.designerName}`.toLowerCase().includes(f.toLowerCase()))
    );
  }

  if (filters.PRICE?.length) {
    items = items.filter((p) => matchesPrice(p, filters.PRICE!));
  }

  if (sort === "Price - Low to High") items.sort((a, b) => a.currentPrice - b.currentPrice);
  else if (sort === "Price - High to Low") items.sort((a, b) => b.currentPrice - a.currentPrice);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    products: items.slice(start, start + limit),
    total,
    page,
    totalPages,
    filterGroups: mockFilterGroups,
  };
}

export function getMockProductById(id: string): Product | null {
  return mockProducts.find((p) => p.id === id) ?? null;
}

export function getMockRelatedProducts(id: string, limit = 5): Product[] {
  const product = getMockProductById(id);
  if (!product) return mockProducts.slice(0, limit);
  return mockProducts.filter((p) => p.id !== id && p.categoryId === product.categoryId).slice(0, limit);
}
