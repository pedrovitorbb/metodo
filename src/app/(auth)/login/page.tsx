import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Método Hypno",
};

export default function LoginPage() {
  return <LoginForm />;
}
