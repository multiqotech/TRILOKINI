import { TextPageLayout } from "@/components/templates/page-shell";
import { getMockCMSPage } from "@/lib/mocks/content";
import { notFound } from "next/navigation";

export default function TermsPage() {
  const page = getMockCMSPage("terms");
  if (!page) notFound();

  return (
    <TextPageLayout title={page.title}>
      <p>{page.content}</p>
      {page.sections?.map((section) => (
        <div key={section.heading} className="mt-8">
          <h2 className="mb-2 text-[16px] font-semibold text-black">{section.heading}</h2>
          <p>{section.body}</p>
        </div>
      ))}
    </TextPageLayout>
  );
}
