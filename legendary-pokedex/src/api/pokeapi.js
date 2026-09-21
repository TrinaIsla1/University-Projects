// REQ-3.1 / REQ-5.1.2: thin wrapper around the native fetch API — no extra
// HTTP client library. Every function here is meant to be called from
// inside a useEffect (see src/hooks) with an AbortController passed in for
// REQ-5.1.3's race-condition guard.

const BASE_URL = 'https://pokeapi.co/api/v2'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function getJson(url, signal) {
  let response
  try {
    response = await fetch(url, { signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err // let callers swallow this
    throw new ApiError('Network request failed', 0)
  }

  // REQ-5.2.2: non-2xx responses are caught and surfaced as user-friendly errors.
  if (!response.ok) {
    throw new ApiError(`Request failed (${response.status})`, response.status)
  }

  try {
    return await response.json()
  } catch {
    throw new ApiError(
      'Received malformed data from the server',
      response.status,
    )
  }
}

export function fetchPokemon(apiName, signal) {
  return getJson(`${BASE_URL}/pokemon/${apiName}`, signal)
}

export function fetchSpeciesByUrl(url, signal) {
  return getJson(url, signal)
}

export function fetchEvolutionChain(url, signal) {
  // `url` comes straight from the species payload
  // (species.evolution_chain.url), per REQ-4.4.3.
  return getJson(url, signal)
}

export { ApiError }
