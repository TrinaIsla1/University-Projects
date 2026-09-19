const FALLBACK_SECRET = 'dev_only_insecure_fallback_secret'

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  // Fail loudly rather than silently signing tokens with a guessable secret.
  throw new Error(
    'JWT_SECRET environment variable must be set in production.',
  )
}

if (!process.env.JWT_SECRET) {
  console.warn(
    '⚠️ JWT_SECRET not set — using an insecure development fallback. Set JWT_SECRET in your .env file.',
  )
}

export const JWT_SECRET = process.env.JWT_SECRET || FALLBACK_SECRET
export const JWT_EXPIRES_IN = '7d'
