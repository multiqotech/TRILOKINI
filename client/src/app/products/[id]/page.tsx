import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { PageShell } from "@/components/templates/page-shell";
import { getProduct, getRelatedProducts } from "@/lib/services/products";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product ? `${product.title} | Trilokini` : "Product | Trilokini" };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  const relatedProducts = await getRelatedProducts(id);

  return (
    <PageShell>
      <ProductDetailView product={product} relatedProducts={relatedProducts} bespoke />
    </PageShell>
  );
}
