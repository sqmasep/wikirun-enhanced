"use client";

import { Slot } from "@radix-ui/react-slot";
import { VariantProps, tv } from "tailwind-variants";

export type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  keyof VariantProps<typeof buttonVariants>
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const buttonVariants = tv({
  base: "text-white",
  variants: {
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    },
    color: {
      primary: "bg-blue-500 ",
      secondary: "bg-gray-500 ",
      danger: "bg-red-500 ",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export function Button({ asChild, size, color, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp {...props} className={buttonVariants({ size, color })} />;
}
