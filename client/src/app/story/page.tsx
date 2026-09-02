import Image from "next/image";
import Link from "next/link";
import { PageShell, ContentContainer } from "@/components/templates/page-shell";
import { PageHeader } from "@/components/page-chrome";

const home = "/images/home";

export const metadata = { title: "Our Story | Trilokini" };

export default function StoryPage() {
  return (
    <PageShell>
      <ContentContainer className="py-8 lg:py-12">
        <PageHeader
          title="OUR STORY"
          subtitle="Trilokini celebrates contemporary Indian occasionwear — crafted for modern celebrations with timeless artistry."
        />
        <div className="relative mb-10 aspect-[16/7] w-full overflow-hidden bg-gray-light">
          <Image src={`${home}/desktop-hero.png`} alt="Trilokini story" fill className="object-cover" />
        </div>
        <div className="mx-auto max-w-3xl space-y-6 text-[14px] leading-7 text-gray">
          <p>
            Born from a passion for Indian craftsmanship, Trilokini curates designer collections that honour heritage while embracing contemporary silhouettes. Every piece tells a story of artisan-led techniques, thoughtful design, and celebratory dressing.
          </p>
          <p>
            From bridal lehengas to reception sarees, our edit brings together India&apos;s most sought-after designers under one destination — making luxury ethnicwear accessible, personal, and unforgettable.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Craftsmanship", text: "Hand embroidery and artisan techniques at the heart of every collection." },
            { title: "Curation", text: "A thoughtfully edited selection of designers for every celebration." },
            { title: "Personalisation", text: "Custom tailoring and bespoke options for the perfect fit." },
          ].map((item) => (
            <div key={item.title} className="border border-black/10 p-5">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.65px] text-black">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-gray">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/products" className="inline-block border border-black px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.56px]">
            Shop Collections
          </Link>
        </div>
      </ContentContainer>
    </PageShell>
  );
}
