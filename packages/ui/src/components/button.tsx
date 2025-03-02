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
  [
    "inline-flex items-center justify-center gap-3 rounded-xl px-2 py-1 text-center whitespace-nowrap select-none",
    "outline-offset-0 transition-[outline-offset] duration-[20ms] ease-in-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      color: {
        primary: [
          "bg-blue-950 text-blue-100",
          "focus-visible:outline-blue-500",
        ],
        secondary: [
          "bg-zinc-900 text-gray-100",
          "focus-visible:outline-zinc-500",
        ],
      },

      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
    },

    defaultVariants: {
      color: "primary",
      size: "md",
    },
  },
);

export function Button({ asChild, color, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp {...props} className={button({ color, className })} />;
}
