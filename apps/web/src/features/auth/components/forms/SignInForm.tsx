"use client";

import useSignInForm from "../../hooks/useSignInForm";

export default function SignInForm() {
  const { form, signIn } = useSignInForm();

  return (
    <form onSubmit={form.handleSubmit(signIn)}>
      <input
        {...form.register("email")}
        name="email"
        type="email"
        placeholder="Email"
      />
      {form.formState.errors.email && (
        <p>{form.formState.errors.email.message}</p>
      )}
      <input
        {...form.register("password")}
        name="password"
        type="password"
        placeholder="Password"
      />
      {form.formState.errors.password && (
        <p>{form.formState.errors.password.message}</p>
      )}
      <button type="submit">Sign In</button>
    </form>
  );
}
