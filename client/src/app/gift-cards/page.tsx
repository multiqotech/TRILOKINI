import Image from "next/image";
import Link from "next/link";
import { PageShell, ContentContainer } from "@/components/templates/page-shell";
import { PageHeader } from "@/components/page-chrome";
import { mockGiftCards } from "@/lib/mocks/content";

export const metadata = { title: "Gift Cards | Trilokini" };

export default function GiftCardsPage() {
  return (
    <PageShell>
      <ContentContainer className="py-8 lg:py-12">
        <PageHeader title="GIFT CARDS" subtitle="Give the gift of choice with a Trilokini gift card." />
        <div className="grid gap-6 sm:grid-cols-2">
          {mockGiftCards.map((card) => (
            <Link key={card.id} href={`/gift-cards/${card.id}`} className="group block border border-black/10">
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-light">
                <Image src={card.imageUrl} alt={card.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="p-5">
                <h2 className="text-[16px] font-semibold uppercase tracking-[0.64px]">{card.title}</h2>
                <p className="mt-2 text-[13px] text-gray">{card.description}</p>
                <p className="mt-3 text-[12px] font-medium">From Rs. {card.minAmount.toLocaleString("en-IN")}</p>
              </div>
            </Link>
          ))}
        </div>
      </ContentContainer>
    </PageShell>
  );
}
