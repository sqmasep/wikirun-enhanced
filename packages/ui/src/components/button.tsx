"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

export type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  keyof VariantProps<typeof button>
> &
  VariantProps<typeof button> & {
    asChild?: boolean;
  };

const button = cva(
  "inline-flex items-center justify-center gap-3 rounded-md px-2 py-1 text-center text-sm whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      color: { a: "", primary: "bg-blue-300 text-black" },
    },

    defaultVariants: {
      color: "primary",
    },
  },
);

export function Button({ asChild, color, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp {...props} className={button({ color, className })} />;
}
