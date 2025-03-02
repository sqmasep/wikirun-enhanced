"use client";

import { cn } from "@repo/ui/lib/utils";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function GlobalSearchbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative flex items-center justify-center"
    >
      <input
        onFocus={() => setIsOpen(true)}
        placeholder="Search maps, users..."
        className={cn(
          "peer min-w-1/4 rounded-full border border-zinc-800 px-4 py-2 transition-all",
          "placeholder:text-sm placeholder:text-zinc-600",
          isOpen && "min-w-1/2 focus:outline-none",
        )}
      />

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className={cn(
              "absolute top-full left-0 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 shadow-lg backdrop-blur-3xl",
            )}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transformOrigin: "top",
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              type: "tween",
              duration: 0.15,
              delay: 0.22,
            }}
          >
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
            <div>epic</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
