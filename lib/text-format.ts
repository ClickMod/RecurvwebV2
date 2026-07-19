/**
 * Applies sentence case to a string (first character uppercased, rest lowercased).
 * Intended for CTA label fields coming from Strapi so editors can type in any
 * case and the UI always displays consistently.
 *
 * Accepted limitation: acronyms are lowercased (e.g. "POPIA" → "Popia").
 * Do not add acronym-detection logic without explicit request.
 */
export function toSentenceCase(input: string): string {
  if (!input) return input;
  const trimmed = input.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}
