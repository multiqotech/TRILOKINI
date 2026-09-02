import Link from "next/link";
import { PageShell, ContentContainer } from "@/components/templates/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <ContentContainer className="py-24 text-center">
        <h1 className="text-[24px] font-semibold uppercase tracking-[0.96px]">Page Not Found</h1>
        <p className="mt-4 text-[14px] text-gray">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-8 inline-block border border-black px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.56px]">
          Back to Home
        </Link>
      </ContentContainer>
    </PageShell>
  );
}
