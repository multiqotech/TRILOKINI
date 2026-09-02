import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/page-chrome";
import { PageShell, ContentContainer } from "@/components/templates/page-shell";
import { getMockFilmBySlug } from "@/lib/mocks/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getMockFilmBySlug(slug);
  return { title: article ? `${article.title} | Trilokini` : "Article | Trilokini" };
}

export default async function FilmArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getMockFilmBySlug(slug);
  if (!article) notFound();

  return (
    <PageShell>
      <ContentContainer className="py-8 lg:py-12">
        <Breadcrumbs items={[{ label: "FILMS", href: "/films" }, { label: article.title }]} />
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden bg-gray-light">
            <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
          </div>
          <p className="text-[11px] text-gray">{new Date(article.publishedAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</p>
          <h1 className="mt-3 text-[20px] font-semibold uppercase tracking-[0.8px] lg:text-[28px]">{article.title}</h1>
          <p className="mt-6 text-[14px] leading-7 text-gray">{article.body}</p>
        </div>
      </ContentContainer>
    </PageShell>
  );
}
