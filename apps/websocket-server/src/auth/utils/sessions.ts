import { getCookie, setCookie } from "hono/cookie";
import { encodeBase32, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { Session, User, db } from "@repo/database/client";

export function generateSessionToken() {
  const tokenBytes = new Uint8Array(20);
  crypto.getRandomValues(tokenBytes);

  const token = encodeBase32(tokenBytes).toLowerCase();

  return token;

  // const randomBytes = new Uint8Array(15);
  // crypto.getRandomValues(randomBytes);

  // return btoa(String.fromCharCode(...randomBytes));
}

export function setSessionTokenCookie(
  c: Parameters<typeof setCookie>[0],
  sessionId: string,
  expiresAt: Date
) {
  setCookie(c, "session_id", sessionId, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires: expiresAt,
    domain: process.env.COOKIE_DOMAIN,
    path: "/",
    sameSite: "lax",
  });
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const row = await db.session.findFirst({
    where: { sessionId },
    include: { User: true },
  });

  if (row === null) {
    return { session: null, user: null };
  }

  const session: Session = {
    sessionId: row.sessionId,
    userId: row.userId,
    expiresAt: row.expiresAt,
  };

  const user: User = {
    id: row.User.id,
    github_id: row.User.github_id,
    username: row.User.username,
    email: row.User.email,
    emailVerifiedAt: row.User.emailVerifiedAt,
    hashedPassword: row.User.hashedPassword,
  };

  if (Date.now() >= row.expiresAt.getTime()) {
    db.session.delete({
      where: { sessionId },
    });

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    db.execute("UPDATE session SET expires_at = ? WHERE session.id = ?", [
      Math.floor(session.expiresAt.getTime() / 1000),
      session.id,
    ]);
  }
  return { session, user };
}

export async function getCurrentSession() {
  const token = cookies().get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  const result = validateSessionToken(token);
  return result;
}

//  = cache((): SessionValidationResult => {
// 	const token = cookies().get("session")?.value ?? null;
// 	if (token === null) {
// 		return { session: null, user: null };
// 	}
// 	const result = validateSessionToken(token);
// 	return result;
// });
