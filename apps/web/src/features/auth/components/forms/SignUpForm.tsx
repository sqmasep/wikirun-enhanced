"use client";

import useSignUpForm from "#/features/auth/hooks/useSignUpForm";

export default function SignUpForm() {
  const { form, signUp } = useSignUpForm();

  return (
    <form onSubmit={form.handleSubmit(signUp)}>
      <input
        {...form.register("username")}
        name="username"
        type="text"
        placeholder="Username"
      />
      <input
        {...form.register("email")}
        name="email"
        type="email"
        placeholder="Email"
      />
      <input
        {...form.register("password")}
        name="password"
        type="password"
        placeholder="Password"
      />
      <input
        {...form.register("confirmPassword")}
        name="confirmPassword"
        type="password"
        placeholder="Confirm assword"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
