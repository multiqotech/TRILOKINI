import type { Metadata } from "next";
import { LoginForm } from "@/components/forms";
import { FormPageLayout } from "@/components/templates/page-shell";
import { PageHeader } from "@/components/page-chrome";

export const metadata: Metadata = { title: "Login | Trilokini" };

export default function LoginPage() {
  return (
    <FormPageLayout>
      <PageHeader title="LOG IN" subtitle="Welcome back. Sign in to access your account and orders." />
      <LoginForm />
    </FormPageLayout>
  );
}
