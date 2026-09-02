"use client";

import { useState } from "react";
import type { GiftCard } from "@/lib/types";

export function GiftCardForm({ card }: { card: GiftCard }) {
  const [amount, setAmount] = useState<number | "custom">(card.amounts[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = amount === "custom" ? Number(customAmount) : amount;

  return (
    <div>
      <h1 className="text-[22px] font-semibold uppercase tracking-[0.88px]">{card.title}</h1>
      <p className="mt-3 text-[14px] leading-6 text-gray">{card.description}</p>
      <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <fieldset>
          <legend className="mb-3 text-[13px] font-semibold uppercase tracking-[0.65px]">Select Amount</legend>
          <div className="flex flex-wrap gap-2">
            {card.amounts.map((value) => (
              <button key={value} type="button" onClick={() => setAmount(value)} className={`h-10 min-w-20 border px-3 text-[12px] font-semibold ${amount === value ? "border-black bg-black text-white" : "border-gray-light"}`}>
                Rs. {value.toLocaleString("en-IN")}
              </button>
            ))}
            <button type="button" onClick={() => setAmount("custom")} className={`h-10 border px-3 text-[12px] font-semibold ${amount === "custom" ? "border-black bg-black text-white" : "border-gray-light"}`}>
              Custom
            </button>
          </div>
          {amount === "custom" ? (
            <input type="number" min={card.minAmount} max={card.maxAmount} value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} placeholder={`${card.minAmount} - ${card.maxAmount}`} className="mt-3 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" />
          ) : null}
        </fieldset>
        <label className="block text-[13px] font-semibold">Recipient Email<input type="email" required className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" /></label>
        <label className="block text-[13px] font-semibold">Your Name<input required className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" /></label>
        <label className="block text-[13px] font-semibold">Message<textarea rows={3} className="mt-2 w-full border border-gray-light p-3 text-[13px] outline-none focus:border-black" /></label>
        <button type="submit" className="h-12 w-full bg-black text-[13px] font-semibold tracking-[0.65px] text-white">
          PURCHASE GIFT CARD — Rs. {finalAmount.toLocaleString("en-IN")}
        </button>
        {submitted ? <p className="text-[13px] text-gray">Gift card order received! (Mock submission)</p> : null}
      </form>
    </div>
  );
}
