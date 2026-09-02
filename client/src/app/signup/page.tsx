import type { Metadata } from "next";
import { SignupForm } from "@/components/forms";
import { FormPageLayout } from "@/components/templates/page-shell";
import { PageHeader } from "@/components/page-chrome";

export const metadata: Metadata = { title: "Sign Up | Trilokini" };

export default function SignupPage() {
  return (
    <FormPageLayout>
      <PageHeader title="SIGN UP" subtitle="Create an account to track orders and save your favourites." />
      <SignupForm />
    </FormPageLayout>
  );
}
