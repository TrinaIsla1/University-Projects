// theme.ts
// Design tokens for "Shelf" — a reading-discovery screen.
// Palette is grounded in old library ephemera: ink, aged paper, brass, moss, and a
// single berry accent reserved for the one thing that should catch the eye.

export const colors = {
  ink: '#1C2321', // primary background — warm near-black, not flat #000/#111
  inkRaised: '#2f3833', // card surfaces sitting on ink
  inkLine: '#333B35', // hairline dividers on dark surfaces

  parchment: '#EFE9DD', // primary text on ink
  parchmentMuted: '#A6A092', // secondary text on ink

  brass: '#C9A227', // primary accent — progress, active states
  brassMuted: '#8A7226',

  moss: '#5C7A66', // secondary accent — genre chips, tags
  mossDeep: '#3C5346',

  berry: '#8C3A44', // reserved accent — one hero use only
  berrySoft: '#C98089',

  paper: '#F6F2E8', // inverse surface (stat cards)
  paperInk: '#241F17',
}

export const type = {
  display: {
    fontFamily: 'Georgia', // serif for headings — falls back to platform serif
    letterSpacing: -0.3,
  },
  body: {
    fontFamily: 'System',
    letterSpacing: 0,
  },
}

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const radius = {
  sm: 4,
  md: 10,
  lg: 18,
  pill: 999,
}
