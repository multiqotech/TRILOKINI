"use client";

import Image from "next/image";
import { useState } from "react";
import { AddToCartButton, IconButton, SizeSelector, ColorSelector } from "./ui";

import { Heart } from "lucide-react";

export type Product = { id: string; src: string; designer: string; name: string; price: string; originalPrice?: string; discount?: string };

export function ProductCard({ product, onFavorite, hideFavorite }: { product: Product; onFavorite?: (product: Product) => void; hideFavorite?: boolean }) {
  return <article className="group"><div className="relative aspect-[244/366] overflow-hidden bg-gray-light"><Image src={product.src} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />{!hideFavorite && <IconButton label={`Add ${product.name} to favourites`} icon={<Heart size={20} />} onClick={() => onFavorite?.(product)} className="absolute right-1 top-1 size-9 bg-white/80 p-2" />}</div><div className="pt-3 text-[12px] tracking-[0.36px]"><p className="text-[13px] font-medium tracking-[0.39px]">{product.designer}</p><h3 className="mt-1 leading-5 text-gray">{product.name}</h3><p className="mt-2 leading-5">{product.price}{product.originalPrice ? <del className="ml-3 text-gray">{product.originalPrice}</del> : null}{product.discount ? <span className="ml-3 text-sale">{product.discount}</span> : null}</p></div></article>;
}

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-5 lg:gap-x-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

export function ProductCarousel({ products, title, hideFavorite }: { products: Product[]; title?: string; hideFavorite?: boolean }) {
  return (
    <section className="relative">
      {title ? <h2 className="mb-5 text-[18px] font-semibold tracking-[0.72px]">{title}</h2> : null}
      <div className="relative group px-[5px] lg:px-12">
        <button className="absolute left-0 top-[35%] z-10 hidden -translate-y-1/2 p-2 lg:block hover:bg-gray-100 rounded-full transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="flex snap-x snap-mandatory gap-3 lg:gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="w-[140px] min-w-[140px] snap-start lg:w-[calc(20%-13px)] lg:min-w-[calc(20%-13px)]">
              <ProductCard product={product} hideFavorite={hideFavorite} />
            </div>
          ))}
        </div>
        <button className="absolute right-0 top-[35%] z-10 hidden -translate-y-1/2 p-2 lg:block hover:bg-gray-100 rounded-full transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
}

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selected, setSelected] = useState(0);
  return <div className="grid gap-3 lg:grid-cols-[78px_minmax(0,1fr)]"><ProductThumbnailStrip images={images} alt={alt} selected={selected} onSelect={setSelected} /><div className="relative aspect-[336/505] bg-gray-light"><Image src={images[selected]} alt={alt} fill className="object-cover" /></div></div>;
}

export function ProductThumbnailStrip({ images, alt, selected = 0, onSelect }: { images: string[]; alt: string; selected?: number; onSelect?: (index: number) => void }) {
  return <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">{images.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => onSelect?.(index)} className={`relative size-[78px] min-w-[78px] overflow-hidden border ${selected === index ? "border-black" : "border-transparent"}`}><Image src={image} alt={`${alt} view ${index + 1}`} fill className="object-cover" /></button>)}</div>;
}

export function Filters({ groups }: { groups: { title: string; options: string[] }[] }) {
  return <aside className="hidden w-[199px] shrink-0 lg:block" aria-label="Product filters"><div className="space-y-8">{groups.map((group) => <fieldset key={group.title}><legend className="mb-4 text-[14px] font-semibold tracking-[0.65px]">{group.title}</legend><div className="space-y-3">{group.options.map((option) => <label key={option} className="flex items-center gap-2 text-[12px] tracking-[0.36px]"><input type="checkbox" className="size-[13px] accent-black" />{option}</label>)}</div></fieldset>)}</div></aside>;
}

export function SortControl({ value = "Popular", onChange }: { value?: string; onChange?: (value: string) => void }) {
  return <label className="flex h-8 items-center gap-2 border border-gray-light px-2 text-[12px] tracking-[0.36px]">Sort by :<select value={value} onChange={(event) => onChange?.(event.target.value)} className="border-0 bg-white outline-none"><option>Popular</option><option>Price - Low to High</option><option>Price - High to Low</option></select></label>;
}

export function SortSheet({ open, onClose, onApply }: { open: boolean; onClose?: () => void; onApply?: (value: string) => void }) {
  const [value, setValue] = useState("Popular");
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-end bg-black/20 lg:hidden"><div className="w-full bg-white"><div className="flex h-[51px] items-center justify-between border-b border-gray-light px-3"><span className="text-[14px] font-semibold tracking-[0.56px]">SORT BY</span><IconButton label="Close sort options" onClick={onClose} /></div>{["Popular", "Price - Low to High", "Price - High to Low"].map((option) => <label key={option} className="flex h-[51px] items-center gap-3 border-b border-gray-light px-6 text-[14px] tracking-[0.36px]"><input type="radio" name="sort" checked={value === option} onChange={() => setValue(option)} />{option}</label>)}<div className="flex h-[59px] divide-x divide-black/20 border-t border-black"><button type="button" onClick={() => setValue("Popular")} className="w-1/2 text-[13px] font-semibold tracking-[0.56px]">CLEAR ALL</button><button type="button" onClick={() => { onApply?.(value); onClose?.(); }} className="w-1/2 text-[13px] font-semibold tracking-[0.56px]">APPLY</button></div></div></div>;
}

export function CartItem({ product, quantity = 1, onRemove }: { product: Product; quantity?: number; onRemove?: () => void }) {
  return <article className="flex gap-4 border-b border-gray-light py-4"><div className="relative size-[88px] shrink-0 bg-gray-light"><Image src={product.src} alt={product.name} fill className="object-cover" /></div><div className="min-w-0 flex-1 text-[12px] tracking-[0.36px]"><p className="font-medium">{product.designer}</p><p className="mt-1 text-gray">{product.name}</p><p className="mt-2">{quantity} x {product.price}</p></div><button type="button" onClick={onRemove} className="self-start text-[12px] text-gray underline">Remove</button></article>;
}

export function CartPopout({ open, items, onClose }: { open: boolean; items: Product[]; onClose?: () => void }) {
  if (!open) return null;
  return <aside className="fixed inset-y-0 right-0 z-50 w-[min(440px,100vw)] bg-white p-6 shadow-xl" aria-label="Shopping cart"><div className="flex items-center justify-between border-b border-black pb-4"><h2 className="text-[18px] font-semibold tracking-[0.72px]">YOUR CART</h2><IconButton label="Close cart" onClick={onClose} /></div><div>{items.map((item) => <CartItem key={item.id} product={item} />)}</div><div className="mt-6"><AddToCartButton>CHECKOUT</AddToCartButton></div></aside>;
}

export function ProductDetailOptions({ sizes, colors, onAddToCart }: { sizes: string[]; colors: { name: string; value: string }[]; onAddToCart?: () => void }) {
  const [size, setSize] = useState<string>();
  const [color, setColor] = useState<string>();
  return <div className="space-y-6"><div><p className="mb-3 text-[13px] font-semibold tracking-[0.65px]">Available colours</p><ColorSelector colors={colors} selected={color} onChange={setColor} /></div><div><p className="mb-3 text-[13px] font-semibold tracking-[0.65px]">Select your size <span className="text-action">Size Guide</span></p><SizeSelector sizes={sizes} selected={size} onChange={setSize} /></div><AddToCartButton onClick={onAddToCart} /></div>;
}
