import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  signInSchema,
  SignInSchemaInput,
  SignInSchemaOutput,
} from "@repo/validation/auth/signIn";
import { useForm } from "react-hook-form";
import { apiClient } from "../../../lib/apiClient";

export default function useSignInForm() {
  const form = useForm<SignInSchemaInput>({
    resolver: valibotResolver(signInSchema),
  });

  async function signIn(data: SignInSchemaOutput) {
    console.log("submitted!", data);
    await apiClient.auth["sign-in"].$post({
      json: {
        email: data.email,
        password: data.password,
      },
    });
  }

  return { form, signIn };
}
