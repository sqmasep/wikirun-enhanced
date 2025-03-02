import { cva } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";

const input = cva([
  "flex h-9 w-full rounded-xl border border-zinc-800 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:ring-blue-800",
  "placeholder:text-muted-foreground",
  "file:text-foreground",
]);

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return <input {...props} className={cn(input({ className }))} />;
}
