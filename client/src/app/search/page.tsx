import { Suspense } from "react";
import { ProductListingView } from "@/components/product-listing-view";
import { ProductGridSkeleton } from "@/components/states";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function SearchContent({ q }: { q: string }) {
  return <ProductListingView search={q} />;
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <SearchContent q={q} />
    </Suspense>
  );
}
