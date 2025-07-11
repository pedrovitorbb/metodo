import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Flux Academy",
};

export default function LoginPage() {
  return <LoginForm />;
}
