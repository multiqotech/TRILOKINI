import Image from "next/image";
import Link from "next/link";
import { PageShell, ContentContainer } from "@/components/templates/page-shell";
import { PageHeader } from "@/components/page-chrome";
import { ProductCarousel } from "@/components/commerce";
import { productToCard } from "@/lib/services/products";
import { getMockProductList } from "@/lib/mocks/products";

export const metadata = { title: "Bespoke | Trilokini" };

const home = "/images/home";

export default function BespokePage() {
  const products = getMockProductList().products.slice(0, 5).map(productToCard);

  return (
    <PageShell>
      <ContentContainer className="py-8 lg:py-12">
        <PageHeader
          title="BESPOKE"
          subtitle="Personalize your garment with custom tailoring, bespoke colours, and made-to-measure craftsmanship."
        />
        <div className="relative mb-10 aspect-[1440/480] w-full overflow-hidden bg-gray-light">
          <Image src={`${home}/desktop-hero.png`} alt="Bespoke" fill className="object-cover" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {["Custom Fit", "Bespoke Colour", "Made to Measure"].map((title, i) => (
            <div key={title} className="border border-black/10 p-6 text-center">
              <h3 className="text-[14px] font-semibold uppercase tracking-[0.7px]">{title}</h3>
              <p className="mt-3 text-[13px] leading-6 text-gray">Work with our artisans to create a one-of-a-kind piece tailored to your measurements and style.</p>
              <Link href={`/bespoke/products/prod-${i + 1}`} className="mt-4 inline-block border border-black px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.56px]">
                Explore
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <ProductCarousel products={products} title="BESPOKE PICKS" />
        </div>
      </ContentContainer>
    </PageShell>
  );
}
