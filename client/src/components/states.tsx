export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-light ${className}`} />;
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <LoadingSkeleton className="aspect-[244/366] w-full" />
          <LoadingSkeleton className="mt-3 h-4 w-2/3" />
          <LoadingSkeleton className="mt-2 h-3 w-full" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", message = "Check back soon for new arrivals." }: { title?: string; message?: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-[16px] font-semibold tracking-[0.64px]">{title}</p>
      <p className="mt-2 text-[13px] text-gray">{message}</p>
    </div>
  );
}

export function ErrorState({ message = "Something went wrong.", onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="py-16 text-center">
      <p className="text-[16px] font-semibold tracking-[0.64px]">Error</p>
      <p className="mt-2 text-[13px] text-gray">{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="mt-4 border border-black px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.56px]">
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function PromoBanner({ className = "" }: { className?: string }) {
  return (
    <section className={`relative mx-1 aspect-[1712/328] w-full overflow-hidden bg-black lg:mx-6 ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <p className="text-[12px] font-medium uppercase tracking-[0.48px] text-[#d4a853] lg:text-[14px]">Sale Extended</p>
        <p className="mt-1 text-[20px] font-semibold uppercase tracking-[1px] text-[#d4a853] lg:text-[32px]">Flat 30% Off</p>
        <p className="font-display text-[18px] italic text-white lg:text-[28px]">Luxe Lehengas</p>
        <a href="/products?category=sale" className="mt-3 border border-white px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.55px] hover:bg-white hover:text-black">
          Shop Now
        </a>
      </div>
    </section>
  );
}
