import { Accordion } from "@/components/ui";
import { PageShell, ContentContainer } from "@/components/templates/page-shell";
import { PageHeader } from "@/components/page-chrome";
import { mockFAQ } from "@/lib/mocks/content";

export const metadata = { title: "FAQ | Trilokini" };

export default function FAQPage() {
  return (
    <PageShell>
      <ContentContainer className="py-8 lg:py-12">
        <PageHeader title="FREQUENTLY ASKED QUESTIONS" />
        <div className="mx-auto max-w-2xl">
          {mockFAQ.map((item) => (
            <Accordion key={item.id} title={item.question}>
              <p>{item.answer}</p>
            </Accordion>
          ))}
        </div>
      </ContentContainer>
    </PageShell>
  );
}
