import type { Metadata } from "next";
import { CartPageView } from "@/components/cart-page";

export const metadata: Metadata = { title: "Shopping Cart | Trilokini" };

export default function CartPage() {
  return <CartPageView />;
}
