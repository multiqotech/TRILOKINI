"use client";

import Image from "next/image";
import { useState } from "react";
import { Accordion, IconButton } from "./ui";

const navigation = ["NEW", "WOMEN", "LEHENGAS", "SAREES", "KURTA SETS", "ANARKALIS", "SAHARAS", "WESTERN", "PRET", "FUSION", "WEDDING", "READY TO SHIP", "SALE"];
const mobileNavigation = ["SHOP ALL", "WEDDING", "RECEPTION", "ENGAGEMENT", "SANGEET"];
const icons = {
  menu: "/icons/menu.png",
  search: "/icons/search.png",
  account: "/icons/account.png",
  cart: "/icons/cart.png",
  sort: "/icons/sort-down.png",
};

export function DesktopHeader() {
  return (
    <header className="hidden bg-white lg:block" aria-label="Desktop header">
      <div className="flex h-[31px] items-center justify-center border-b border-black bg-black text-[12px] tracking-[0.36px] text-white">
        <nav className="flex gap-8" aria-label="Utility navigation">
          <a href="#collections">COLLECTIONS</a><a href="#category">CATEGORY</a><a href="#films">FILMS</a><a href="#bespoke">BESPOKE</a><a href="#story">STORY</a>
        </nav>
      </div>
      <div className="relative h-[113px] border-b border-gray-light">
        <Image src="/logos/trilokini-header.png" alt="Trilokini" width={182} height={139} className="absolute left-1/2 top-1/2 h-[110px] w-[145px] -translate-x-1/2 -translate-y-1/2 object-contain" priority />
        <div className="mx-auto flex h-[78px] max-w-[1269px] items-center justify-between px-6 text-[14px] tracking-[0.56px]">
          <div className="flex items-center gap-5"><span>INR</span><Image src={icons.sort} alt="" width={10} height={10} /></div>
          <div className="flex items-center gap-5"><span>ACCOUNT</span><IconButton label="Search" icon={icons.search} /><IconButton label="Account" icon={icons.account} /><IconButton label="Cart" icon={icons.cart} /></div>
        </div>
        <nav className="absolute bottom-0 left-1/2 flex w-full max-w-[933px] -translate-x-1/2 justify-between px-5 pb-2 text-[13px] tracking-[0.36px]" aria-label="Category navigation">
          {navigation.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</a>)}
        </nav>
      </div>
    </header>
  );
}

export function MobileHeader({ onMenu }: { onMenu?: () => void }) {
  return (
    <header className="flex h-[51px] items-center justify-between border-b border-gray-light bg-white px-1 lg:hidden" aria-label="Mobile header">
      <IconButton label="Open menu" icon={icons.menu} onClick={onMenu} className="size-10" />
      <Image src="/logos/trilokini-header.png" alt="Trilokini" width={119} height={50} className="h-[50px] w-[119px] object-contain" priority />
      <div className="flex items-center"><IconButton label="Search" icon={icons.search} /><IconButton label="Account" icon={icons.account} /><IconButton label="Cart" icon={icons.cart} /></div>
    </header>
  );
}

export function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  if (!open) return null;
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-[310px] max-w-[86vw] bg-white shadow-xl" aria-label="Mobile menu">
      <div className="flex items-center justify-between border-b border-gray-light px-4 py-5"><p className="font-display text-[32px]">Namaste!</p><IconButton label="Close menu" onClick={onClose} /></div>
      <div className="px-5 py-5 text-[14px] tracking-[0.56px]"><div className="mb-7 flex justify-between"><span>INR</span><span>ACCOUNT</span></div><nav className="flex flex-col gap-5" aria-label="Mobile navigation">{["CATEGORY", "COLLECTIONS", "FILMS", "BESPOKE", "STORY", "CONTACT US"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={onClose}>{item}</a>)}</nav><div className="mt-12 border-t border-black/20 pt-6 text-gray"><p>care@offstore.com</p><p className="mt-4">1800 120 000 500 (India)</p></div></div>
    </aside>
  );
}

export function MobileStickyNav() {
  const navIcons = ["/icons/shop-all.png", "/icons/wedding-nav.png", "/icons/reception-nav.png", "/icons/engagement-nav.png", "/icons/sangeet-nav.png"];
  return <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[79px] items-center justify-around overflow-x-auto border-t border-black/20 bg-white px-2 lg:hidden" aria-label="Mobile category navigation">{mobileNavigation.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} className="flex min-w-[68px] flex-col items-center gap-1 text-[10px] tracking-[0.36px]"><Image src={navIcons[index]} alt="" width={42} height={42} className="size-[42px] object-contain" />{item}</a>)}</nav>;
}

export function PromotionalBanner({ src = "/images/home-hero.png", alt = "" }: { src?: string; alt?: string }) {
  return <div className="relative h-[107px] w-full overflow-hidden bg-gray-light"><Image src={src} alt={alt} fill className="object-cover" /></div>;
}

const footerGroups = [{ title: "CATEGORY", links: ["Kurta Pajama", "Nehru Jackets", "Indo Western", "Sherwani", "Lehenga", "Saree", "Kids Wear", "Accesories"] }, { title: "SUPPORT", links: ["Track Order", "Contact Us", "My Account"] }, { title: "QUICK LINKS", links: ["About Us", "Brand Story", "Blogs", "Careers", "Store Locator"] }, { title: "OUR POLICIES", links: ["FAQ's", "Shipping Details", "Return, Exchange and Refund Policy", "Terms of Use", "Privacy Policy", "Cookie Policy"] }];

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  return <form className="flex flex-col gap-3" onSubmit={(event) => { event.preventDefault(); }}><label htmlFor="footer-email" className="text-[16px] font-semibold tracking-[0.64px]">KEEP IN TOUCH</label><input id="footer-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="h-10 border border-black bg-white px-3 text-[13px] outline-none placeholder:text-gray" /><button type="submit" className="h-9 w-[104px] border border-black bg-white text-[13px] font-semibold tracking-[0.56px]">Sign me Up</button></form>;
}

export function Footer() {
  return <footer className="bg-white" aria-label="Footer"><div className="relative overflow-hidden border-t border-black/20 bg-footer-wash px-6 py-8 lg:px-[75px] lg:py-7"><div className="pointer-events-none absolute inset-0 opacity-20"><Image src="/logos/trilokini-footer.png" alt="" fill className="object-cover" /></div><div className="relative mx-auto max-w-[1290px]"><div className="hidden grid-cols-5 border-b border-black/20 pb-5 lg:grid">{footerGroups.map((group) => <div key={group.title}><h2 className="mb-5 text-[14px] font-semibold tracking-[0.56px]">{group.title}</h2><ul className="space-y-4 text-[14px] leading-5 text-gray">{group.links.map((link) => <li key={link}><a href="#">{link}</a></li>)}</ul></div>)}<div><h2 className="mb-5 text-[14px] font-semibold tracking-[0.56px]">CONTACT</h2><a href="mailto:care@offstore.com" className="text-[14px] text-gray underline">care@offstore.com</a><p className="mt-4 max-w-[256px] text-[14px] leading-6 text-gray">Call us at: 1800-120-000-520 (India) / +91 8000000001 (International)<br />10 am - 7 pm, Monday - Saturday</p></div></div><div className="lg:hidden">{footerGroups.map((group) => <Accordion key={group.title} title={group.title}><ul className="space-y-2">{group.links.map((link) => <li key={link}><a href="#">{link}</a></li>)}</ul></Accordion>)}<Accordion title="CONTACT"><a href="mailto:care@offstore.com">care@offstore.com</a><p className="mt-3">1800 120 000 500 (India)</p></Accordion></div><div className="grid gap-8 border-b border-black/20 py-8 lg:grid-cols-2 lg:gap-16"><div><h2 className="text-[16px] font-semibold tracking-[0.64px]">COMPLETELY SAFE AND SECURE PAYMENT METHOD</h2><p className="mt-2 text-[9px] text-gray">We accept Netbanking, all major credit cards. We also accept orders with cash payment.</p><div className="mt-3 flex gap-3"><Image src="/payments/visa.png" alt="Visa" width={40} height={16} /><Image src="/payments/mastercard.svg" alt="Mastercard" width={60} height={40} /></div></div><NewsletterForm /></div><div className="flex justify-center pt-5 font-display text-[16px] lg:pt-8">© 2026 Offstore Fashions Ltd. All rights reserved.</div></div></div></footer>;
}

export function ResponsiveShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <><DesktopHeader /><MobileHeader onMenu={() => setSidebarOpen(true)} /><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />{children}<MobileStickyNav /></>;
}
