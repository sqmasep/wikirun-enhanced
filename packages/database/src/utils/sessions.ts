import { db } from "../client";

const EXPIRES_IN = 1000 * 60 * 60 * 24 * 7; // 1 week

export async function createSession(sessionId: string, userId: string) {
  return db.session.create({
    data: {
      sessionId,
      userId,
      expiresAt: new Date(Date.now() + EXPIRES_IN),
    },
  });
}

export async function invalidateSession(sessionId: string) {
  return db.session.delete({
    where: {
      sessionId,
    },
  });
}

export function invalidateUserSessions(userId: string): void {
  db.session.deleteMany({
    where: {
      userId,
    },
  });
}
