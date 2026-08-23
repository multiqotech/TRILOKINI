"use client";

import Image from "next/image";
import { useState } from "react";

type IconButtonProps = {
  label: string;
  icon?: string | React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function IconButton({ label, icon, onClick, className = "" }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex size-10 items-center justify-center border-0 bg-transparent p-2 text-black transition-opacity hover:opacity-60 ${className}`}
    >
      {typeof icon === "string" ? <Image src={icon} alt="" width={24} height={24} className="size-full object-contain" /> : icon ? icon : <span className="text-lg leading-none">{label.slice(0, 1)}</span>}
    </button>
  );
}

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-black/20">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between py-4 text-left text-[14px] font-semibold tracking-[0.56px]"
      >
        <span>{title}</span>
        <span aria-hidden className="text-lg font-normal leading-none">{open ? "-" : "+"}</span>
      </button>
      {open ? <div className="pb-4 text-[14px] leading-6 text-gray">{children}</div> : null}
    </div>
  );
}

type SizeSelectorProps = {
  sizes: string[];
  selected?: string;
  onChange?: (size: string) => void;
};

export function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Select your size">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          role="radio"
          aria-checked={selected === size}
          onClick={() => onChange?.(size)}
          className={`h-11 min-w-12 border px-3 text-[13px] font-semibold tracking-[0.65px] transition-colors ${selected === size ? "border-black bg-black text-white" : "border-gray-light bg-white text-black"}`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

type ColorSelectorProps = {
  colors: { name: string; value: string }[];
  selected?: string;
  onChange?: (color: string) => void;
};

export function ColorSelector({ colors, selected, onChange }: ColorSelectorProps) {
  return (
    <div className="flex gap-3" role="radiogroup" aria-label="Available colours">
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          role="radio"
          aria-label={color.name}
          aria-checked={selected === color.name}
          onClick={() => onChange?.(color.name)}
          className={`size-8 border p-0.5 ${selected === color.name ? "border-black" : "border-transparent"}`}
        >
          <span className="block size-full border border-black/10" style={{ backgroundColor: color.value }} />
        </button>
      ))}
    </div>
  );
}

export function AddToCartButton({ onClick, disabled = false, children = "ADD TO CART" }: { onClick?: () => void; disabled?: boolean; children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-12 w-full border border-black bg-black px-6 text-[13px] font-semibold tracking-[0.65px] text-white transition-colors hover:bg-action disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

type ProductInformationAccordionProps = {
  description: string;
  shipping: string;
  disclaimer: string;
};

export function ProductInformationAccordion({ description, shipping, disclaimer }: ProductInformationAccordionProps) {
  return (
    <div className="border-t border-gray-light">
      <Accordion title="PRODUCT DESCRIPTION"><p>{description}</p></Accordion>
      <Accordion title="SHIPPING INFORMATION"><p>{shipping}</p></Accordion>
      <Accordion title="DISCLAIMER"><p>{disclaimer}</p></Accordion>
    </div>
  );
}
