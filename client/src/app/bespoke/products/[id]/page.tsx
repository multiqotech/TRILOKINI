import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { PageShell } from "@/components/templates/page-shell";
import { getProduct, getRelatedProducts } from "@/lib/services/products";

export default async function BespokeProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  const related = await getRelatedProducts(id);

  return (
    <PageShell>
      <ProductDetailView product={{ ...product, isBespoke: true }} relatedProducts={related} bespoke />
    </PageShell>
  );
}
