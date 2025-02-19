import { getCookie, setCookie } from "hono/cookie";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { Session, User, db } from "@repo/database/client";

export function generateSessionToken(): string {
  const tokenBytes = new Uint8Array(20);
  crypto.getRandomValues(tokenBytes);

  const token = encodeBase32LowerCaseNoPadding(tokenBytes);

  return token;
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
  // WARN this commented line is from the guide. however i also added the encoding step
  // WARN in the database/utils/sessions.ts file. idk which function should use this encoding
  // const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const sessionId = token;

  const result = await db.session.findUnique({
    where: { id: sessionId },
    include: { User: true },
  });

  if (result === null) {
    return { session: null, user: null };
  }

  const { User, ...session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.session.delete({
      where: { id: sessionId },
    });

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    await db.session.update({
      where: { id: session.id },
      data: { expiresAt: session.expiresAt },
    });
  }

  return { session, user: User };
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
