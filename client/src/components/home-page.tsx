import Image from "next/image";
import { Footer, ResponsiveShell } from "./layout";
import { CelebrityTile, DesignerTile, SectionHeading, WeddingTile } from "./content";
import { Product, ProductCarousel, ProductGrid } from "./commerce";

const home = "/images/home";

const products: Product[] = [
  { id: "sale-1", src: `${home}/hero-product-1.png`, designer: "ISHA GUPTA TAYAL", name: "Pink Organza Floral Printed Lehenga Set", price: "Rs. 43,400", originalPrice: "Rs. 63,500", discount: "30% Off" },
  { id: "sale-2", src: `${home}/hero-product-2.png`, designer: "ISHA GUPTA TAYAL", name: "Pink Organza Floral Printed Lehenga Set", price: "Rs. 43,400", originalPrice: "Rs. 63,500", discount: "30% Off" },
  { id: "sale-3", src: `${home}/hero-product-3.png`, designer: "ISHA GUPTA TAYAL", name: "Pink Organza Floral Printed Lehenga Set", price: "Rs. 43,400", originalPrice: "Rs. 63,500", discount: "30% Off" },
  { id: "sale-4", src: `${home}/hero-product-4.png`, designer: "ISHA GUPTA TAYAL", name: "Pink Organza Floral Printed Lehenga Set", price: "Rs. 43,400", originalPrice: "Rs. 63,500", discount: "30% Off" },
  { id: "sale-5", src: `${home}/hero-product-5.png`, designer: "ISHA GUPTA TAYAL", name: "Pink Organza Floral Printed Lehenga Set", price: "Rs. 43,400", originalPrice: "Rs. 63,500", discount: "30% Off" },
];

const designers = [
  { src: `${home}/designer-1.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/designer-2.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/designer-3.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/designer-4.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/designer-5.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
];

const celebrities = [
  { src: `${home}/celebrity-1.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/celebrity-2.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/celebrity-3.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/celebrity-4.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
];

const wedding = [
  { src: `${home}/wedding-sunlit.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/wedding-evening.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/wedding-heritage.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/wedding-bridesmaid.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/wedding-hues.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/wedding-istya.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
  { src: `${home}/wedding-guest.png`, title: "NIDHIKA SHEKAR", subtitle: "SHOP NOW" },
];

function HomeHero() {
  return <section className="relative h-[360px] overflow-hidden lg:h-[361px]"><Image src={`${home}/desktop-hero.png`} alt="Clothing" fill className="hidden object-cover lg:block" priority /><Image src={`${home}/mobile-hero.png`} alt="Clothing" fill className="object-cover lg:hidden" priority /></section>;
}

function CategoryStrip() {
  const items = ["/images/home/category-1.png", "/images/home/category-2.png", "/images/home/category-3.png", "/images/home/category-4.png"];
  return <section className="grid grid-cols-2 gap-2 px-[5px] pt-[6px] lg:grid-cols-4 lg:gap-10 lg:px-6 lg:pt-8">{items.map((src) => <div key={src} className="relative h-[214px] overflow-hidden bg-gray-light lg:h-[372px]"><Image src={src} alt="" fill className="object-cover" /></div>)}</section>;
}

function HomePromo() {
  return <div className="relative mt-[22px] hidden h-[107px] overflow-hidden lg:block"><Image src={`${home}/promo-banner.png`} alt="" fill className="object-cover" /></div>;
}

function SaleSection() {
  return <section className="space-y-4"><SectionHeading title="SALE EXTENDED: LUXE LEHENGAS" /><ProductCarousel products={products} /></section>;
}

function DesignerSection() {
  return <section className="space-y-5"><SectionHeading title="BESTSELLING DESIGNERS" /><div className="hidden grid-cols-[2fr_1fr] gap-4 px-6 lg:grid"><DesignerTile {...designers[0]} className="aspect-[914/572]" /><DesignerTile {...designers[1]} className="aspect-[460/572]" /><DesignerTile {...designers[2]} className="aspect-[445/524]" /><DesignerTile {...designers[3]} className="aspect-[445/524]" /><DesignerTile {...designers[4]} className="aspect-[460/524]" /></div><div className="grid grid-cols-2 gap-2 px-[5px] lg:hidden">{designers.slice(0, 5).map((item) => <DesignerTile key={item.src} {...item} className="aspect-[192/249]" />)}</div></section>;
}

function CelebritySection() {
  return <section className="space-y-5"><SectionHeading title="CELEBRITY CLOSET" /><div className="flex gap-3 overflow-x-auto px-[5px] lg:grid lg:grid-cols-4 lg:gap-5 lg:px-6">{celebrities.map((item) => <CelebrityTile key={item.src} {...item} className="aspect-[140/210] min-w-[140px] lg:aspect-[331/495] lg:min-w-0" />)}</div></section>;
}

function WeddingSection() {
  return <section className="space-y-5"><SectionHeading title="THE WEDDING STUDIO" /><div className="grid grid-cols-2 gap-2 px-[5px] lg:grid-cols-4 lg:gap-5 lg:px-6">{wedding.map((item, index) => <WeddingTile key={item.src} {...item} className={`${index === 4 ? "col-span-2 lg:col-span-2" : ""} aspect-[192/288] lg:aspect-[330/495]`} />)}</div></section>;
}

function HomeContent() {
  return <main className="overflow-hidden pb-20 lg:pb-0"><HomeHero /><CategoryStrip /><HomePromo /><div className="space-y-12 pt-[10px] lg:space-y-[48px] lg:pt-7"><SaleSection /><DesignerSection /><CelebritySection /><WeddingSection /><section className="space-y-5"><SectionHeading title="TOP SELLING PRODUCTS" /><div className="px-[5px] lg:px-6"><ProductGrid products={products} /></div></section><section className="space-y-5"><SectionHeading title="FAVOURITES" /><div className="grid gap-2 px-[5px] lg:grid-cols-2 lg:gap-5 lg:px-6"><div className="relative aspect-[392/392] overflow-hidden bg-gray-light"><Image src={`${home}/favourites.png`} alt="Favourites" fill className="object-cover" /></div><div className="hidden lg:block" /></div></section><section className="space-y-5"><SectionHeading title="TOP SELLING PRODUCTS" /><div className="px-[5px] lg:px-6"><ProductGrid products={products} /></div></section><section className="space-y-5"><SectionHeading title="CUSTOM LAYOUT" /><div className="relative mx-1 h-[210px] overflow-hidden bg-gray-light lg:mx-6 lg:h-[348px]"><Image src={`${home}/desktop-hero.png`} alt="Clothing" fill className="hidden object-cover lg:block" /><Image src={`${home}/mobile-custom-layout.png`} alt="Clothing" fill className="object-cover lg:hidden" /></div><div className="px-[5px] lg:px-6"><ProductGrid products={products} /></div></section><section className="px-1 lg:px-6"><div className="relative h-[50px] overflow-hidden bg-gray-light lg:h-[103px]"><Image src={`${home}/sale-banner.png`} alt="Sale extended lehengas at flat 30% off" fill className="object-cover" /></div></section></div></main>;
}

export default function HomePage() {
  return <ResponsiveShell><HomeContent /><Footer /></ResponsiveShell>;
}
