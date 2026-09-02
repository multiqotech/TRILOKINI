import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.36px] text-gray lg:mb-6 lg:text-[12px]">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 ? <span>/</span> : null}
          {item.href ? (
            <Link href={item.href} className="hover:underline">{item.label}</Link>
          ) : (
            <span className="text-black">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="border-b border-black/10 py-6 text-center lg:py-10">
      <h1 className="text-[18px] font-semibold uppercase tracking-[0.9px] lg:text-[24px] lg:tracking-[1.2px]">{title}</h1>
      {subtitle ? <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-gray lg:text-[14px]">{subtitle}</p> : null}
    </header>
  );
}

export function Pagination({ page, totalPages, basePath, searchParams }: { page: number; totalPages: number; basePath: string; searchParams?: Record<string, string> }) {
  if (totalPages <= 1) return null;

  const buildHref = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(p));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <a href={buildHref(page - 1)} className="border border-gray-light px-4 py-2 text-[12px] font-medium tracking-[0.36px] hover:border-black">
          Previous
        </a>
      ) : null}
      <span className="px-4 text-[12px] text-gray">Page {page} of {totalPages}</span>
      {page < totalPages ? (
        <a href={buildHref(page + 1)} className="border border-gray-light px-4 py-2 text-[12px] font-medium tracking-[0.36px] hover:border-black">
          Next
        </a>
      ) : null}
    </nav>
  );
}
