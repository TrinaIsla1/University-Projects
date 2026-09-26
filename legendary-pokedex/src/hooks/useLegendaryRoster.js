import { useEffect, useRef, useState, useCallback } from 'react'
import { LEGENDARY_ROSTER } from '../data/legendaryRoster'
import { fetchPokemon, ApiError } from '../api/pokeapi'

const BATCH_SIZE = 30 // REQ-4.1.3: lazy-load in batches to keep scrolling smooth

function summarize(rosterEntry, apiPayload) {
  return {
    key: rosterEntry.apiName,
    name: rosterEntry.name,
    apiName: rosterEntry.apiName,
    gen: rosterEntry.gen,
    region: rosterEntry.region,
    pokedexNumber: apiPayload.id,
    types: apiPayload.types
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name),
    sprite:
      apiPayload.sprites?.other?.['official-artwork']?.front_default ??
      apiPayload.sprites?.front_default ??
      null,
    statTotal: apiPayload.stats.reduce((sum, s) => sum + s.base_stat, 0),
  }
}

/**
 * Fetches summary data (sprite, types, dex #, stat total) for every
 * roster Pokémon, once per app session, loading it in batches so the
 * home screen can render progressively rather than blocking on all 71
 * requests. REQ-5.1.1/5.1.3: runs inside useEffect, guarded against
 * unmounted-component updates via AbortController.
 */
export function useLegendaryRoster() {
  const [items, setItems] = useState([])
  const [loadedCount, setLoadedCount] = useState(0)
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'ready'
  const [errorMessage, setErrorMessage] = useState(null)
  const requestId = useRef(0)

  const load = useCallback(() => {
    const thisRequestId = ++requestId.current
    const controller = new AbortController()

    setStatus('loading')
    setErrorMessage(null)
    setItems([])
    setLoadedCount(0)
    ;(async () => {
      const results = []
      try {
        for (
          let start = 0;
          start < LEGENDARY_ROSTER.length;
          start += BATCH_SIZE
        ) {
          if (thisRequestId !== requestId.current) return // superseded, bail out

          const batch = LEGENDARY_ROSTER.slice(start, start + BATCH_SIZE)
          const batchResults = await Promise.all(
            batch.map(async (entry) => {
              try {
                const payload = await fetchPokemon(
                  entry.apiName,
                  controller.signal,
                )
                return summarize(entry, payload)
              } catch (err) {
                if (err.name === 'AbortError') throw err
                // One bad entry shouldn't blank the whole screen (REQ-5.2.4):
                // keep it as a minimal placeholder instead of dropping it.
                return {
                  key: entry.apiName,
                  name: entry.name,
                  apiName: entry.apiName,
                  gen: entry.gen,
                  region: entry.region,
                  pokedexNumber: null,
                  types: [],
                  sprite: null,
                  statTotal: 0,
                  loadFailed: true,
                }
              }
            }),
          )

          if (thisRequestId !== requestId.current) return
          results.push(...batchResults)
          setItems([...results])
          setLoadedCount(results.length)
        }
        if (thisRequestId === requestId.current) setStatus('ready')
      } catch (err) {
        if (err.name === 'AbortError') return
        if (thisRequestId !== requestId.current) return
        const message =
          err instanceof ApiError
            ? "Couldn't load the Pokédex — check your connection and try again."
            : 'Something went wrong loading the Pokédex.'
        setErrorMessage(message)
        setStatus('error')
      }
    })()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const cancel = load()
    return cancel
  }, [load])

  return {
    items,
    loadedCount,
    total: LEGENDARY_ROSTER.length,
    status, // loading | error | ready
    errorMessage,
    retry: load,
  }
}
