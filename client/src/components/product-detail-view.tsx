"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { ProductCarousel, ProductDetailOptions, ProductGallery } from "@/components/commerce";
import { MeasurementModal } from "@/components/measurement-modal";
import { PromoBanner } from "@/components/states";
import { Breadcrumbs } from "@/components/page-chrome";
import { ProductInformationAccordion } from "@/components/ui";
import { resolveImage } from "@/lib/images";
import { formatPrice, productToCard } from "@/lib/services/products";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  relatedProducts: Product[];
  bespoke?: boolean;
};

export function ProductDetailView({ product, relatedProducts, bespoke = false }: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [measurementOpen, setMeasurementOpen] = useState(false);

  const images = (() => {
    const variant = product.variants?.find((v) => v.color === selectedColor) ?? product.variants?.[0];
    const variantImages = variant?.images?.map(resolveImage) ?? [];
    const direct = product.imageUrl ? [resolveImage(product.imageUrl)] : [];
    return [...new Set([...variantImages, ...direct])];
  })();

  const colors = (product.variants ?? []).map((v) => ({ name: v.color, value: "#d4d4d4" }));
  const sizes = product.sizes ?? ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      designerName: product.designerName,
      imageUrl: resolveImage(product.imageUrl),
      size: selectedSize ?? sizes[0],
      price: product.currentPrice,
      productCode: product.productCode,
      estimatedShipping: "12TH OF OCTOBER",
    });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-[5px] pt-3 lg:px-6 lg:pt-5">
      <Breadcrumbs items={[
        { label: "PRODUCTS", href: "/products" },
        { label: product.title },
      ]} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:gap-8">
        <div className="min-w-0">
          {images.length > 0 ? (
            <ProductGallery images={images} alt={product.title} />
          ) : (
            <div className="relative aspect-[336/505] bg-gray-light" />
          )}
        </div>

        <div className="pt-1 lg:pt-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[13px] font-medium uppercase tracking-[0.42px] lg:text-[14px]">{product.designerName}</p>
            <button type="button" aria-label="Save product" className="flex size-8 items-center justify-center border border-black/10 bg-white">
              <Heart size={18} />
            </button>
          </div>

          <h1 className="text-[24px] font-medium uppercase tracking-[0.72px] lg:text-[32px]">{product.title}</h1>
          {product.subtitle ? <p className="mt-2 text-[13px] text-gray">{product.subtitle}</p> : null}

          <div className="mt-4 flex flex-wrap items-end gap-3 text-[15px] lg:text-[18px]">
            <span className="font-semibold">{formatPrice(product.currentPrice)}</span>
            {product.previousPrice ? <del className="text-gray">{formatPrice(product.previousPrice)}</del> : null}
            {product.discountPercentage ? <span className="text-sale">{product.discountPercentage}% Off</span> : null}
          </div>
          <p className="mt-1 text-[11px] text-gray">Inclusive of all taxes</p>

          <div className="mt-6">
            <ProductDetailOptions
              sizes={sizes}
              colors={colors.length ? colors : [{ name: "Default", value: "#d4d4d4" }]}
              onAddToCart={handleAddToCart}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={handleAddToCart} className="h-10 border border-black bg-black text-[13px] font-semibold tracking-[0.65px] text-white hover:bg-action">
              BUY NOW
            </button>
            <button type="button" onClick={handleAddToCart} className="h-10 border border-black bg-white text-[13px] font-semibold tracking-[0.65px]">
              ADD TO CART
            </button>
          </div>

          {bespoke ? (
            <button type="button" onClick={() => setMeasurementOpen(true)} className="mt-4 block w-full text-center text-[12px] font-semibold uppercase tracking-[0.56px] underline">
              Custom Tailoring Available
            </button>
          ) : null}

          {product.addons?.length ? (
            <div className="mt-8 border-t border-gray-light pt-6">
              <p className="mb-4 text-[13px] font-semibold tracking-[0.65px]">ADD ONS</p>
              <div className="space-y-4">
                {product.addons.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between border border-gray-light p-3">
                    <div>
                      <p className="text-[13px] font-medium">{addon.name}</p>
                      <p className="text-[12px] text-gray">{formatPrice(addon.price)}</p>
                    </div>
                    {addon.sizes ? (
                      <select className="border border-gray-light px-2 py-1 text-[11px]">
                        {addon.sizes.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <ProductInformationAccordion
              description={product.description ?? "Crafted with a modern silhouette and intricate detailing for celebratory occasions."}
              shipping={product.shippingInfo ?? "This product will be shipped to you after 3-4 weeks from the date of order placed."}
              disclaimer={product.disclaimer ?? "This product will be exclusively handcrafted for you."}
            />
            {product.productCode ? (
              <p className="mt-4 text-[11px] text-gray">Product Code: {product.productCode}</p>
            ) : null}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {["Customisations", "Worldwide Shipping", "Quality Checked"].map((label) => (
              <div key={label} className="border border-gray-light p-3 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.44px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-12">
        <PromoBanner />
        {relatedProducts.length > 0 ? (
          <ProductCarousel
            products={relatedProducts.map(productToCard)}
            title="SALE EXTENDED: LUXE LEHENGAS"
          />
        ) : null}
      </div>
      <MeasurementModal open={measurementOpen} onClose={() => setMeasurementOpen(false)} />
    </div>
  );
}
