import { PasswordResetForm } from "@/components/password-reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer Contraseña | Método Hypno",
};

export default function PasswordResetPage() {
  return <PasswordResetForm />;
}
