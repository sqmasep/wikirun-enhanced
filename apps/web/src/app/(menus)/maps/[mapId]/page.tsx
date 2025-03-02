import { cn } from "@repo/ui/lib/utils";

export default function Map({ params }: { params: { mapId: string } }) {
  const mapId = params.mapId;

  return (
    <div className="container mx-auto">
      <h1 className="mt-24 text-5xl font-bold">Map {mapId}</h1>
      <div className="mt-8 flex">
        <div className="grow">
          <p>Map description</p>
        </div>

        {/* ranking */}
        <div
          className={cn(
            "flex max-h-80 basis-2/3 flex-col overflow-y-scroll rounded-lg border border-[#262626] p-4",
            "scrollbar-track-zinc-950 scrollbar-thin scrollbar-thumb-zinc-50",
          )}
        ></div>
      </div>
    </div>
  );
}
