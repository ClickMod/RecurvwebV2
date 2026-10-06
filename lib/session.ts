/**
 * Reads the login presence flag set by the Recurv web app.
 * Keep the name in sync with recurvapp/src/utils/session-cookie.ts.
 */
export const LOGGED_IN_COOKIE = "recurv_logged_in";

export function hasLoggedInSession(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  return document.cookie.split(";").some((part) => part.trim() === `${LOGGED_IN_COOKIE}=1`);
}
