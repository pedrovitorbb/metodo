import { RegisterForm } from "@/components/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Metodo Hypno",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
