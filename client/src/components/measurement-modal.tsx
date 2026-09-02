"use client";

import { useState } from "react";
import { AddToCartButton } from "./ui";

export function MeasurementModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[16px] font-semibold uppercase tracking-[0.8px]">Personalize your garment</h2>
        <p className="mt-2 text-[13px] text-gray">Select a blouse pattern and enter your measurements.</p>
        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <fieldset>
            <legend className="mb-2 text-[13px] font-semibold">Select a blouse pattern</legend>
            <div className="grid grid-cols-2 gap-2">
              {["Pattern A", "Pattern B"].map((p) => (
                <label key={p} className="flex items-center gap-2 border border-gray-light p-3 text-[12px]">
                  <input type="radio" name="pattern" className="accent-black" /> {p}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-2 gap-3">
            {["Chest", "Waist", "Hip", "Length"].map((field) => (
              <label key={field} className="text-[12px] font-semibold">
                {field}
                <input className="mt-1 h-10 w-full border border-gray-light px-2 text-[13px] outline-none focus:border-black" />
              </label>
            ))}
          </div>
          <AddToCartButton>{submitted ? "SUBMITTED" : "SUBMIT"}</AddToCartButton>
        </form>
      </div>
    </div>
  );
}
