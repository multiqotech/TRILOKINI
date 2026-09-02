"use client";

import { useState } from "react";

function FormField({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return <label htmlFor={id} className="block text-[13px] tracking-[0.65px]"><span className="mb-2 block font-semibold">{label}</span><input id={id} name={id} type={type} required className="h-[44px] w-full border border-gray-light bg-white px-3 outline-none focus:border-black" /></label>;
}

export function LoginForm({ onSubmit }: { onSubmit?: (data: FormData) => void }) {
  return <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); onSubmit?.(new FormData(event.currentTarget)); }}><FormField id="mobile-number" label="Mobile Number" type="tel" /><FormField id="password" label="Password" type="password" /><div className="flex justify-between text-[12px] text-gray"><a href="#forgot-password">Forgot Your Password ?</a><a href="/signup">Don&apos;t have an account ? Sign Up</a></div><button type="submit" className="h-11 w-full border border-black bg-black text-[13px] font-semibold tracking-[0.65px] text-white">LOGIN</button><button type="button" className="h-11 w-full border border-gray-light bg-white text-[13px] font-semibold tracking-[0.65px]">LOGIN WITH GOOGLE</button></form>;
}

export function SignupForm({ onSubmit }: { onSubmit?: (data: FormData) => void }) {
  const [agreed, setAgreed] = useState(false);
  return <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); onSubmit?.(new FormData(event.currentTarget)); }}><FormField id="full-name" label="Full Name" /><FormField id="signup-mobile-number" label="Mobile Number" type="tel" /><FormField id="otp" label="Enter OTP" /><FormField id="create-password" label="Create Password" type="password" /><label className="flex gap-2 text-[12px] text-gray"><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} required className="accent-black" />I agree to Pernia&apos;s Pop up Shop T&amp;Cs.</label><label className="flex gap-2 text-[12px] text-gray"><input type="checkbox" className="accent-black" />Send me Email Updates on New Arrivals &amp; Deals.</label><button type="submit" disabled={!agreed} className="h-11 w-full border border-black bg-black text-[13px] font-semibold tracking-[0.65px] text-white disabled:opacity-50">SIGN UP</button></form>;
}
