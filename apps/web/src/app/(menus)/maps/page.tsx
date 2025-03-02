import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Maps() {
  return (
    <div className="container mx-auto">
      <div className="mt-24 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Maps</h1>
        <Button asChild>
          <Link href="/maps/new">
            <Plus />
            Create a map
          </Link>
        </Button>
      </div>
    </div>
  );
}
