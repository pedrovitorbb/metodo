import { RegisterForm } from "@/components/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse | Método Hypno",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
