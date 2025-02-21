import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  signUpSchema,
  SignUpSchemaInput,
  SignUpSchemaOutput,
} from "@repo/validation/auth/signUp";
import { useForm } from "react-hook-form";
import { apiClient } from "../../../lib/apiClient";

export default function useSignUpForm() {
  const form = useForm<SignUpSchemaInput>({
    resolver: valibotResolver(signUpSchema),
  });

  async function signUp(data: SignUpSchemaOutput) {
    await apiClient.auth["sign-up"].$post({
      json: {
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    });
  }

  return { form, signUp };
}
