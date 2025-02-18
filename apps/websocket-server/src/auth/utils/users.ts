export async function fetchGithubUser(accessToken: string) {
  return fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
}
