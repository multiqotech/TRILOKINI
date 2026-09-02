import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell, ContentContainer } from "@/components/templates/page-shell";
import { Breadcrumbs } from "@/components/page-chrome";
import { GiftCardForm } from "@/components/gift-card-form";
import { getMockGiftCardById } from "@/lib/mocks/content";

export default async function GiftCardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = getMockGiftCardById(id);
  if (!card) notFound();

  return (
    <PageShell>
      <ContentContainer className="py-8 lg:py-12">
        <Breadcrumbs items={[{ label: "GIFT CARDS", href: "/gift-cards" }, { label: card.title }]} />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-light">
            <Image src={card.imageUrl} alt={card.title} fill className="object-cover" />
          </div>
          <GiftCardForm card={card} />
        </div>
      </ContentContainer>
    </PageShell>
  );
}
