import Navbar from "#/layouts/Navbar";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return (
    <div>
      <Navbar />
      fetch id: {userId}
    </div>
  );
}
