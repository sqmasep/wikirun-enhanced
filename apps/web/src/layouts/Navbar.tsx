import LogoutForm from "#auth/components/forms/LogoutForm";
import { apiClient } from "#/lib/apiClient";
import { cookies } from "next/headers";
import Link from "next/link";
import GlobalSearchbar from "#/features/search/components/GlobalSearchbar";
import { TimerReset } from "lucide-react";
import { Button } from "@repo/ui/components/button";

export default async function Navbar() {
  const res = await apiClient.users.me.$get(undefined, {
    headers: {
      cookie: (await cookies()).toString(),
    },
  });
  const data = await res.json();

  console.log(data);

  return (
    <div className="sticky top-0 z-50 py-2 backdrop-blur-xl">
      <nav className="container mx-auto">
        <ul className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-16">
            <li>
              <Link href="/" className="flex items-center gap-2 italic">
                <TimerReset />
                Wikirun
              </Link>
            </li>

            <div className="flex items-center gap-8">
              <li>
                <Link href="/play/singleplayer" className="italic">
                  Singleplayer
                </Link>
              </li>

              <li>
                <Link href="/play/multiplayer" className="italic">
                  Multiplayer
                </Link>
              </li>

              <li>
                <Link href="/maps" className="italic">
                  Maps
                </Link>
              </li>

              <li>
                <Link href="/game" className="italic">
                  Game
                </Link>
              </li>
            </div>
          </div>

          <div className="flex grow items-center justify-center">
            {/* <input className="min-w-1/4 rounded-full border border-zinc-800 px-8 py-2 transition-all focus:min-w-1/2 focus:outline-none" /> */}
            <GlobalSearchbar />
          </div>

          <div className="flex items-center gap-4">
            <li>
              <Link href="/profile/someId">Some random profile</Link>
            </li>
          </div>

          <div className="flex items-center gap-4">
            {data.user ? (
              <>
                <li>
                  <Link href="/profile">My profile</Link>
                </li>
                <li>
                  <LogoutForm />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button asChild color="secondary">
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild color="primary">
                    <Link href="/sign-up">Sign up</Link>
                  </Button>
                </li>
              </>
            )}
          </div>
          {/* <a href={apiClient.auth.logout.$url().toString()}>Logout</a> */}
        </ul>
      </nav>
    </div>
  );
}
