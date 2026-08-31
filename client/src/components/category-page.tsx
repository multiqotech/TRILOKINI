import Image from "next/image";
import { Footer, ResponsiveShell } from "./layout";
import type { Category } from "@/lib/api";

const PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function resolveImage(url?: string): string {
  if (!url) return PLACEHOLDER;
  if (url.startsWith("http") || url.startsWith("/images/")) return url;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return `${apiUrl}${url}`;
}

function CategoryMosaicTile({
  category,
  className,
}: {
  category: Category;
  className: string;
}) {
  const title = category.title || "NIDHIKA SHEKAR";
  const subtitle = category.description || "SHOP NOW";

  return (
    <article className={`group relative overflow-hidden bg-[#f3f3f3] ${className}`}>
      <div className="relative h-full w-full">
        <Image
          src={resolveImage(category.imageUrl)}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent px-[8px] pb-[8px] pt-[32px] lg:px-[12px] lg:pb-[14px] lg:pt-[54px]">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.48px] text-white lg:text-[16px] lg:tracking-[0.64px]">
            {title}
          </h2>
          <p className="mt-[2px] text-[9px] font-semibold uppercase tracking-[0.2px] text-white lg:mt-[2px] lg:text-[14px] lg:tracking-[0.56px]">
            {subtitle}
          </p>
        </div>
      </div>
    </article>
  );
}

function CategoryContent({ categories }: { categories: Category[] }) {
  const items = categories;

  const mobileLayout = [
    { index: 0, className: "aspect-[192/288]" },
    { index: 1, className: "aspect-[192/288]" },
    { index: 2, className: "aspect-[192/288]" },
    { index: 3, className: "aspect-[192/288]" },
    { index: 4, className: "col-span-2 aspect-[391/288]" },
    { index: 5, className: "aspect-[192/288]" },
    { index: 6, className: "aspect-[192/288]" },
    { index: 7, className: "aspect-[192/288]" },
    { index: 8, className: "aspect-[192/288]" },
    { index: 9, className: "col-span-2 aspect-[391/288]" },
  ];

  const desktopLayout = [
    { index: 0, className: "aspect-[330/495]" },
    { index: 1, className: "aspect-[330/495]" },
    { index: 2, className: "aspect-[330/495]" },
    { index: 3, className: "aspect-[330/495]" },
    { index: 4, className: "col-span-2 aspect-[686/506]" },
    { index: 5, className: "aspect-[331/506]" },
    { index: 6, className: "aspect-[330/495]" },
    { index: 7, className: "aspect-[330/495]" },
    { index: 8, className: "aspect-[330/495]" },
    { index: 9, className: "col-span-2 aspect-[686/506]" },
  ];

  return (
    <main className="pb-[58px] pt-[2px] lg:pb-[72px] lg:pt-[6px]">
      <section className="px-[5px] pt-[10px] lg:px-6 lg:pt-[18px]">
        <div className="grid grid-cols-2 gap-2 lg:hidden">
          {mobileLayout.map(({ index, className }) => {
            const item = items[index];
            if (!item) return null;
            return (
              <CategoryMosaicTile
                key={item._id}
                category={item}
                className={className}
              />
            );
          })}
        </div>

        <div className="hidden grid-cols-4 gap-5 lg:grid">
          {desktopLayout.map(({ index, className }) => {
            const item = items[index];
            if (!item) return null;
            return (
              <CategoryMosaicTile
                key={item._id}
                category={item}
                className={className}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default function CategoryPage({ categories }: { categories: Category[] }) {
  return (
    <ResponsiveShell>
      <CategoryContent categories={categories} />
      <Footer />
    </ResponsiveShell>
  );
}
