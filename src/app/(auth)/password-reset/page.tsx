import { PasswordResetForm } from "@/components/password-reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Flux Academy",
};

export default function PasswordResetPage() {
  return <PasswordResetForm />;
}
