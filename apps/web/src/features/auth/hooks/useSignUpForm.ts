import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  signUpSchema,
  SignUpSchemaInput,
  SignUpSchemaOutput,
} from "@repo/validation/auth/signUp";
import { useForm } from "react-hook-form";
import { apiClient } from "#/lib/apiClient";
import { redirect } from "next/navigation";
import { signUp } from "../actions";

export default function useSignUpForm() {
  const form = useForm<SignUpSchemaInput>({
    resolver: valibotResolver(signUpSchema),
  });

  return { form, signUp };
}
