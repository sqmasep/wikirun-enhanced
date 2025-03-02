export default function Singleplayer() {
  return (
    <div className="container mx-auto">
      <h1 className="mt-24 text-5xl font-bold">Singleplayer</h1>

      <div className="mt-8 grid h-full grid-cols-4 gap-8 rounded-4xl border border-zinc-800 bg-zinc-950 p-8">
        <div className="rounded-4xl border border-zinc-800 p-12">
          <h2 className="text-3xl">Normal</h2>
        </div>
        <div className="rounded-4xl border border-zinc-800 p-12">
          <h2 className="text-3xl">Categoryless</h2>
        </div>
        <div className="rounded-4xl border border-zinc-800 p-12">
          <h2 className="text-3xl">Shortest path</h2>
        </div>
        <div className="rounded-4xl border border-zinc-800 p-12">
          <h2 className="text-3xl">Marathon</h2>
        </div>
      </div>
    </div>
  );
}
