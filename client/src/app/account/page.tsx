"use client";

import { FormPageLayout } from "@/components/templates/page-shell";
import { PageHeader } from "@/components/page-chrome";

const mockOrders = [
  { id: "ORD-1024", date: "2026-08-15", total: 95000, status: "Delivered" },
  { id: "ORD-0987", date: "2026-07-02", total: 43400, status: "Shipped" },
];

export default function AccountPage() {
  return (
    <FormPageLayout>
      <PageHeader title="MY ACCOUNT" subtitle="Manage your profile and view order history." />
      <form className="mb-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label className="block text-[13px] font-semibold">Full Name<input defaultValue="Guest User" className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" /></label>
        <label className="block text-[13px] font-semibold">Email<input type="email" defaultValue="guest@trilokini.com" className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" /></label>
        <label className="block text-[13px] font-semibold">Mobile<input type="tel" defaultValue="+91 98765 43210" className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" /></label>
        <button type="submit" className="h-11 w-full border border-black bg-black text-[13px] font-semibold text-white">SAVE CHANGES</button>
      </form>
      <section>
        <h2 className="mb-4 text-[14px] font-semibold uppercase tracking-[0.7px]">Order History</h2>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border border-black/10 p-4 text-[13px]">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-gray">{order.date}</p>
              </div>
              <div className="text-right">
                <p>Rs. {order.total.toLocaleString("en-IN")}</p>
                <p className="text-gray">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FormPageLayout>
  );
}
