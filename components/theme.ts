export const theme = {
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F6F5F0',
  surfaceDeep: '#0F0E14',
  ink: '#0F0E14',
  inkSoft: '#5B5969',
  inkOnDeep: '#F6F5F0',
  inkOnDeepSoft: 'rgba(246,245,240,0.65)',
  primary: '#4F33D9',
  primaryHover: '#3D24BD',
  inkHover: '#000000',
  onPrimary: '#FFFFFF',
  softTint: 'rgba(79,51,217,0.08)',
  success: '#1E7A4E',
  successBg: 'rgba(30,122,78,0.10)',
  warn: '#B45A1B',
  line: 'rgba(15,14,20,0.10)',
  lineStrong: 'rgba(15,14,20,0.20)',
  fontDisplay: '"Geist", system-ui, sans-serif',
  fontBody: '"Geist", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export type Theme = typeof theme;

/**
 * Icon size tokens — single source of truth for icon dimensions site-wide.
 * Change a value here to update every icon of that role in one edit.
 *
 *  compact  — dense list bullets, tight inline contexts
 *  card     — icons inside cards, feature lists, problem/solution rows
 *  section  — icons heading a section column or grid cell
 *  display  — large hero / showcase icons
 */
export const iconSize = {
  compact: 16,
  card:    22,
  section: 28,
  display: 36,
} as const;

export type IconSize = typeof iconSize[keyof typeof iconSize];
