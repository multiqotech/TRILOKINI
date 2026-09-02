import Image from "next/image";
import Link from "next/link";
import { PageShell, ContentContainer } from "@/components/templates/page-shell";
import { PromoBanner } from "@/components/states";
import { mockFilmArticles } from "@/lib/mocks/content";

export const metadata = { title: "Films | Trilokini" };

export default function FilmsPage() {
  const featured = mockFilmArticles.filter((a) => a.featured);
  const articles = mockFilmArticles;

  return (
    <PageShell>
      <PromoBanner className="mx-0 mt-0 aspect-[1440/505] lg:aspect-[1440/505]" />
      <ContentContainer className="py-8 lg:py-12">
        <div className="mb-10 grid gap-2 lg:grid-cols-4 lg:gap-5">
          {featured.slice(0, 1).map((item) => (
            <Link key={item.slug} href={`/films/${item.slug}`} className="relative col-span-2 row-span-2 aspect-[691/667] overflow-hidden bg-gray-light lg:aspect-auto lg:min-h-[667px]">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 lg:col-span-2 lg:gap-5">
            {articles.slice(0, 4).map((item) => (
              <Link key={item.slug} href={`/films/${item.slug}`} className="relative aspect-[335/323] overflow-hidden bg-gray-light">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {articles.map((article) => (
            <Link key={article.slug} href={`/films/${article.slug}`} className="flex gap-4 border-b border-black/10 pb-6">
              <div className="relative size-[151px] shrink-0 overflow-hidden bg-gray-light">
                <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-[14px] font-semibold uppercase tracking-[0.7px]">{article.title}</h2>
                <p className="mt-2 text-[11px] leading-5 text-gray">{article.excerpt}</p>
                <p className="mt-2 text-[11px] text-gray">{new Date(article.publishedAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
            </Link>
          ))}
        </div>
      </ContentContainer>
    </PageShell>
  );
}
