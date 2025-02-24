import Navbar from "#/layouts/Navbar";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <Navbar />
      fetch id: {(await params).id}
    </div>
  );
}
