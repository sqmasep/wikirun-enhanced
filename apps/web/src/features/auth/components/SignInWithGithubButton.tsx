import { apiClient } from "#/lib/apiClient";
import { Button } from "@repo/ui/components/button";
import GithubIcon from "@repo/ui/components/icons/GithubIcon";
import { cn } from "@repo/ui/lib/utils";

export default function SignInWithGithubButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      asChild
      className={cn("border-zinc-800 bg-zinc-900 text-white", className)}
    >
      <a href={apiClient.auth.github.$url().toString()}>
        <GithubIcon />
        Sign in with GitHub
      </a>
    </Button>
  );
}
