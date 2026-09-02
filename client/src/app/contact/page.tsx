"use client";

import { FormPageLayout } from "@/components/templates/page-shell";
import { PageHeader } from "@/components/page-chrome";

const interests = [
  "Customer service / Order Related",
  "Corporate / Wedding gifts / Bulk order",
  "Collaborating as a designer",
  "Collaborating as a content creater",
  "Working with us",
];

export default function ContactPage() {
  return (
    <FormPageLayout>
      <PageHeader
        title="CONTACT US"
        subtitle="For customer service, product or online order related inquiries please contact us by completing the form below or via email at customercare@trilokini.com"
      />
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <label className="block text-[13px] font-semibold tracking-[0.65px]">
          Full Name
          <input required className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" />
        </label>
        <label className="block text-[13px] font-semibold tracking-[0.65px]">
          Email Id
          <input type="email" required className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" />
        </label>
        <label className="block text-[13px] font-semibold tracking-[0.65px]">
          Contact Number
          <input type="tel" required className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" />
        </label>
        <label className="block text-[13px] font-semibold tracking-[0.65px]">
          Whatsapp Number
          <input type="tel" className="mt-2 h-11 w-full border border-gray-light px-3 text-[13px] outline-none focus:border-black" />
        </label>
        <label className="flex items-center gap-2 text-[12px] text-gray">
          <input type="checkbox" className="accent-black" /> same as contact number
        </label>
        <fieldset>
          <legend className="mb-3 text-[13px] font-semibold tracking-[0.65px]">Are you interested in?</legend>
          <div className="space-y-2">
            {interests.map((item) => (
              <label key={item} className="flex items-center gap-2 text-[13px]">
                <input type="radio" name="interest" value={item} className="accent-black" /> {item}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-[13px] font-semibold tracking-[0.65px]">
          Add Notes
          <textarea rows={4} className="mt-2 w-full border border-gray-light p-3 text-[13px] outline-none focus:border-black" />
        </label>
        <label className="block text-[13px] font-semibold tracking-[0.65px]">
          Attach File
          <input type="file" className="mt-2 block w-full text-[12px]" />
        </label>
        <button type="submit" className="h-11 w-full border border-black bg-black text-[13px] font-semibold tracking-[0.65px] text-white">
          SUBMIT
        </button>
      </form>
    </FormPageLayout>
  );
}
