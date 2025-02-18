import * as v from "valibot";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 32;

export const usernameSchema = v.pipe(
  v.string(),
  v.minLength(USERNAME_MIN_LENGTH),
  v.maxLength(USERNAME_MAX_LENGTH)
);
