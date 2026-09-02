import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductListingView } from "@/components/product-listing-view";
import { ProductGridSkeleton } from "@/components/states";

export const metadata: Metadata = { title: "Products | Trilokini" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function ProductsContent({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const search = typeof searchParams.q === "string" ? searchParams.q : typeof searchParams.search === "string" ? searchParams.search : undefined;
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "Popular";
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  return <ProductListingView category={category} search={search} sort={sort} page={page} />;
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductsContent searchParams={params} />
    </Suspense>
  );
}
