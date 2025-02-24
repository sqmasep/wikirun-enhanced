import { apiClient } from "#/lib/apiClient";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { signInSchema, SignInSchemaInput } from "@repo/validation/auth/signIn";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "../actions";

export default function useSignInForm() {
  const form = useForm<SignInSchemaInput>({
    resolver: valibotResolver(signInSchema),
  });

  // async function signIn(data: SignInSchemaInput) {
  //   const a = await apiClient.auth["sign-in"].$post({
  //     json: {
  //       email: data.email,
  //       password: data.password,
  //     },
  //   });

  //   const b = await a.json();

  //   if (b.success) {
  //     redirect("/");
  //   }
  // }

  return { form, signIn };
}
