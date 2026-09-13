"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { AuthModal } from "@/components/auth/auth-modal";
import { SearchOverlay } from "@/components/search-overlay";
import { categoryNav, footerLinks, mobileStickyNav, utilityNav } from "@/lib/navigation";
import { CartPopout } from "./commerce";
import { Accordion, IconButton } from "./ui";

const icons = {
  menu: "/icons/menu.svg",
  search: "/icons/search.png",
  account: "/icons/account.png",
  cart: "/icons/cart.png",
  sort: "/icons/sort-down.png",
};

const navIcons = ["/icons/shop-all.png", "/icons/wedding-nav.png", "/icons/reception-nav.png", "/icons/engagement-nav.png", "/icons/sangeet-nav.png"];

export function DesktopHeader() {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const { user, openAuth } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 hidden bg-white lg:block" aria-label="Desktop header">
        <div className="relative h-[140px]">
          <div className="flex h-[31px] items-center justify-center bg-[#EAEAEA]">
            <nav className="flex items-center gap-[26px] text-[12px] font-semibold tracking-[0.36px] text-[#757575]" aria-label="Utility navigation">
              {utilityNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${item.label === "CATEGORY" ? "text-[13px] tracking-[0.39px]" : ""} ${pathname.startsWith(item.href) ? "text-black" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="relative h-[109px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.13)]">
            <div className="flex h-[78px] items-center justify-between px-[86px] text-[12px] font-semibold text-black">
              <div className="flex items-center gap-[52px]">
                <div className="flex items-center gap-[1px]">
                  <span>INR</span>
                  <Image src={icons.sort} alt="" width={10} height={10} className="size-[10px] object-contain" />
                </div>
                {user ? (
                  <Link href="/account">ACCOUNT</Link>
                ) : (
                  <button type="button" onClick={() => openAuth("login")}>ACCOUNT</button>
                )}
              </div>
              <div className="flex items-center gap-[20px]">
                <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex size-[28px] items-center justify-center" aria-label="Search">
                  <Image src={icons.search} alt="" width={28} height={28} className="size-[28px] object-contain" />
                </button>
                {user ? (
                  <Link href="/account" className="inline-flex size-[28px] items-center justify-center" aria-label="Account">
                    <Image src={icons.account} alt="" width={28} height={28} className="size-[28px] object-contain" />
                  </Link>
                ) : (
                  <button type="button" onClick={() => openAuth("login")} className="inline-flex size-[28px] items-center justify-center" aria-label="Account">
                    <Image src={icons.account} alt="" width={28} height={28} className="size-[28px] object-contain" />
                  </button>
                )}
                <button type="button" onClick={openCart} className="relative inline-flex size-[28px] items-center justify-center" aria-label="Open cart">
                  <Image src={icons.cart} alt="" width={28} height={28} className="size-[28px] object-contain" />
                  {itemCount > 0 ? (
                    <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">{itemCount}</span>
                  ) : null}
                </button>
              </div>
            </div>

            <nav className="absolute inset-x-0 bottom-[8px] mx-auto flex w-[933px] max-w-[calc(100%-48px)] justify-between text-[12px] font-medium leading-normal text-black" aria-label="Category navigation">
              {categoryNav.map((item) => (
                <Link key={item.href} href={item.href} className={item.highlight ? "text-sale-nav" : "hover:text-gray"}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" className="absolute left-1/2 top-[5px] z-10 -translate-x-1/2">
            <Image src="/logos/trilokini-header.png" alt="Trilokini" width={182} height={139} className="h-[139px] w-[182px] object-cover" priority />
          </Link>
        </div>
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function MobileHeader({ onMenu }: { onMenu?: () => void }) {
  const { openCart, itemCount } = useCart();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-[51px] items-center justify-between border-b border-gray-light bg-white px-1 lg:hidden" aria-label="Mobile header">
        <IconButton label="Open menu" icon={icons.menu} onClick={onMenu} className="size-10" />
        <Link href="/">
          <Image src="/logos/trilokini-header.png" alt="Trilokini" width={119} height={50} className="h-[50px] w-[65px] object-cover" priority />
        </Link>
        <div className="flex items-center">
          <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex size-10 items-center justify-center" aria-label="Search">
            <Image src={icons.search} alt="" width={24} height={24} className="size-6 object-contain" />
          </button>
          <Link href={user ? "/account" : "/login"} className="inline-flex size-10 items-center justify-center" aria-label="Account">
            <Image src={icons.account} alt="" width={24} height={24} className="size-6 object-contain" />
          </Link>
          <button type="button" onClick={openCart} className="relative inline-flex size-10 items-center justify-center" aria-label="Open cart">
            <Image src={icons.cart} alt="" width={24} height={24} className="size-6 object-contain" />
            {itemCount > 0 ? <span className="absolute right-1 top-1 size-2 rounded-full bg-black" /> : null}
          </button>
        </div>
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

const sidebarLinks = [
  { label: "CATEGORY", href: "/categories" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "FILMS", href: "/films" },
  { label: "BESPOKE", href: "/bespoke" },
  { label: "STORY", href: "/story" },
  { label: "CONTACT US", href: "/contact" },
];

export function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const { user } = useAuth();
  if (!open) return null;
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-[310px] max-w-[86vw] bg-white shadow-xl" aria-label="Mobile menu">
      <div className="flex items-center justify-between border-b border-gray-light px-4 py-5">
        <p className="font-display text-[32px]">Namaste!</p>
        <IconButton label="Close menu" onClick={onClose} />
      </div>
      <div className="px-5 py-5 text-[14px] tracking-[0.56px]">
        <div className="mb-7 flex justify-between">
          <span>INR</span>
          <Link href={user ? "/account" : "/login"} onClick={onClose}>ACCOUNT</Link>
        </div>
        <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
          {sidebarLinks.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose}>{item.label}</Link>
          ))}
        </nav>
        <div className="mt-12 border-t border-black/20 pt-6 text-gray">
          <a href="mailto:customercare@trilokini.com">customercare@trilokini.com</a>
          <p className="mt-4">1800 120 000 520 (India)</p>
        </div>
      </div>
    </aside>
  );
}

export function MobileStickyNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[79px] items-center justify-around overflow-x-auto border-t border-black/20 bg-white px-2 lg:hidden" aria-label="Mobile category navigation">
      {mobileStickyNav.map((item, index) => (
        <Link key={item.href} href={item.href} className="flex min-w-[68px] flex-col items-center gap-1 text-[10px] tracking-[0.36px]">
          <Image src={navIcons[index]} alt="" width={42} height={42} className="size-[42px] object-contain" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => { e.preventDefault(); setStatus("success"); }}
    >
      <label htmlFor="footer-email" className="text-[16px] font-semibold tracking-[0.64px]">KEEP IN TOUCH</label>
      <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="h-10 border border-black bg-white px-3 text-[13px] outline-none placeholder:text-gray" />
      <button type="submit" className="h-9 w-[104px] border border-black bg-white text-[13px] font-semibold tracking-[0.56px]">Sign me Up</button>
      {status === "success" ? <p className="text-[12px] text-gray">Thank you for subscribing!</p> : null}
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-white" aria-label="Footer">
      <div className="relative overflow-hidden border-t border-black/20 bg-footer-wash px-6 py-8 lg:px-[75px] lg:py-7">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Image src="/logos/trilokini-footer.png" alt="" fill className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-[1290px]">
          <div className="hidden grid-cols-5 border-b border-black/20 pb-5 lg:grid">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h2 className="mb-5 text-[14px] font-semibold tracking-[0.56px]">{title}</h2>
                <ul className="space-y-4 text-[14px] leading-5 text-gray">
                  {links.map((link) => (
                    <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="mb-5 text-[14px] font-semibold tracking-[0.56px]">CONTACT</h2>
              <a href="mailto:customercare@trilokini.com" className="text-[14px] text-gray underline">customercare@trilokini.com</a>
              <p className="mt-4 max-w-[256px] text-[14px] leading-6 text-gray">
                Call us at: 1800-120-000-520 (India) / +91 8000000001 (International)<br />
                10 am - 7 pm, Monday - Saturday
              </p>
            </div>
          </div>
          <div className="lg:hidden">
            {Object.entries(footerLinks).map(([title, links]) => (
              <Accordion key={title} title={title}>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
                  ))}
                </ul>
              </Accordion>
            ))}
            <Accordion title="CONTACT">
              <a href="mailto:customercare@trilokini.com">customercare@trilokini.com</a>
              <p className="mt-3">1800 120 000 520 (India)</p>
            </Accordion>
          </div>
          <div className="grid gap-8 border-b border-black/20 py-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-[16px] font-semibold tracking-[0.64px]">COMPLETELY SAFE AND SECURE PAYMENT METHOD</h2>
              <p className="mt-2 text-[9px] text-gray">We accept Netbanking, all major credit cards. We also accept orders with cash payment.</p>
              <div className="mt-3 flex gap-3">
                <Image src="/payments/visa.png" alt="Visa" width={40} height={16} />
                <Image src="/payments/mastercard.svg" alt="Mastercard" width={60} height={40} />
              </div>
            </div>
            <NewsletterForm />
          </div>
          <div className="flex justify-center pt-5 font-display text-[16px] lg:pt-8">© 2026 Offstore Fashions Ltd. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export function ResponsiveShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cart, isOpen, closeCart, removeItem } = useCart();

  const cartProducts = cart.items.map((item) => ({
    id: item.id,
    src: item.imageUrl,
    designer: item.designerName,
    name: item.title,
    price: `Rs. ${item.price.toLocaleString("en-IN")}`,
    href: `/products/${item.productId}`,
  }));

  return (
    <>
      <DesktopHeader />
      <MobileHeader onMenu={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen ? <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} /> : null}
      {children}
      <MobileStickyNav />
      <CartPopout open={isOpen} items={cartProducts} onClose={closeCart} onRemove={removeItem} />
      <AuthModal />
    </>
  );
}
