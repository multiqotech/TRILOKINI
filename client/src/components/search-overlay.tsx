"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconButton } from "./ui";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery("");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40" onClick={onClose}>
      <div className="bg-white px-4 py-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto flex max-w-[1440px] items-center gap-4">
          <form onSubmit={handleSubmit} className="flex flex-1 gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, designers..."
              autoFocus
              className="h-12 flex-1 border border-gray-light px-4 text-[14px] outline-none focus:border-black"
            />
            <button type="submit" className="h-12 border border-black bg-black px-6 text-[13px] font-semibold tracking-[0.65px] text-white">
              SEARCH
            </button>
          </form>
          <IconButton label="Close search" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
