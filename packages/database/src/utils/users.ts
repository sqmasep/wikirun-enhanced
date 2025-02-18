import { db } from "../client";
import { Prisma } from "@prisma/client";

export async function createUser(user: Prisma.UserCreateArgs["data"]) {
  return db.user.create({ data: user });
}

export async function findUserByGithubId(githubId: number) {
  return db.user.findUnique({
    where: { github_id: githubId },
  });
}

export async function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email },
  });
}
