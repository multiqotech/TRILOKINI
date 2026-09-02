import { notFound } from "next/navigation";
import { TextPageLayout } from "@/components/templates/page-shell";
import { getMockCMSPage } from "@/lib/mocks/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getMockCMSPage(slug);
  return { title: page ? `${page.title} | Trilokini` : "Page | Trilokini" };
}

export default async function CMSPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getMockCMSPage(slug);
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
