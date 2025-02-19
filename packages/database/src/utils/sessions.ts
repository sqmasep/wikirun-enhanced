import { db } from "../client";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

const EXPIRES_IN = 1000 * 60 * 60 * 24 * 7; // 1 week

export async function createSession(token: string, userId: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  return db.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + EXPIRES_IN),
    },
  });
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.session.delete({
    where: {
      id: sessionId,
    },
  });
}

export async function invalidateUserSessions(userId: string): Promise<void> {
  await db.session.deleteMany({
    where: {
      userId,
    },
  });
}
