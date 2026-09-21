import { useEffect, useRef, useState, useCallback } from 'react'
import {
  fetchPokemon,
  fetchSpeciesByUrl,
  fetchEvolutionChain,
  ApiError,
} from '../api/pokeapi'

function flattenEvolutionChain(chainLink) {
  // Walks the (possibly branching) PokéAPI evolution-chain tree into a
  // flat, ordered array for simple horizontal rendering. Most Legendaries
  // are single-stage, so branching is rare, but this handles it by
  // following the first branch at each level — good enough for display.
  const stages = []
  let node = chainLink
  while (node) {
    stages.push({
      name: node.species.name,
      speciesUrl: node.species.url,
      trigger: node.evolution_details?.[0]?.trigger?.name ?? null,
      minLevel: node.evolution_details?.[0]?.min_level ?? null,
      item: node.evolution_details?.[0]?.item?.name ?? null,
    })
    node = node.evolves_to?.[0] ?? null
  }
  return stages
}

/**
 * Fetches /pokemon, /pokemon-species, and (if present) the evolution
 * chain for a single entry, only when the user opens its detail screen
 * (REQ-5.1.4: per-entry data fetched on demand, not eagerly).
 */
export function usePokemonDetail(apiName) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // loading | error | ready
  const [errorMessage, setErrorMessage] = useState(null)
  const requestId = useRef(0)

  const load = useCallback(() => {
    if (!apiName) return () => {}
    const thisRequestId = ++requestId.current
    const controller = new AbortController()

    setStatus('loading')
    setErrorMessage(null)
    ;(async () => {
      try {
        const pokemon = await fetchPokemon(apiName, controller.signal)
        if (thisRequestId !== requestId.current) return
        const species = await fetchSpeciesByUrl(
          pokemon.species.url,
          controller.signal,
        )
        if (thisRequestId !== requestId.current) return

        // REQ-5.2.4: evolution chain may be missing/malformed — don't crash,
        // fall back to "does not evolve" style empty state.
        let evolutionStages = []
        if (species.evolution_chain?.url) {
          try {
            const chain = await fetchEvolutionChain(
              species.evolution_chain.url,
              controller.signal,
            )
            evolutionStages = flattenEvolutionChain(chain.chain)
          } catch (err) {
            if (err.name === 'AbortError') throw err
            evolutionStages = [] // rendered as "Does not evolve"
          }
        }
        if (thisRequestId !== requestId.current) return

        const flavorEntry = species.flavor_text_entries?.find(
          (e) => e.language.name === 'en',
        )

        setData({
          name: pokemon.name,
          pokedexNumber: pokemon.id,
          height: pokemon.height, // decimetres
          weight: pokemon.weight, // hectograms
          types: pokemon.types
            .sort((a, b) => a.slot - b.slot)
            .map((t) => t.type.name),
          abilities: pokemon.abilities.map((a) => ({
            name: a.ability.name,
            isHidden: a.is_hidden,
          })),
          stats: pokemon.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          sprite:
            pokemon.sprites?.other?.['official-artwork']?.front_default ??
            pokemon.sprites?.front_default ??
            null,
          shinySprite:
            pokemon.sprites?.other?.['official-artwork']?.front_shiny ??
            pokemon.sprites?.front_shiny ??
            null,
          cry: pokemon.cries?.latest ?? null,
          category:
            species.genera?.find((g) => g.language.name === 'en')?.genus ??
            null,
          flavorText: flavorEntry
            ? flavorEntry.flavor_text.replace(/[\n\f]/g, ' ')
            : null,
          hasMultipleForms:
            (pokemon.forms?.length ?? 0) > 1 ||
            (species.varieties?.length ?? 0) > 1,
          forms: species.varieties?.map((v) => v.pokemon.name) ?? [
            pokemon.name,
          ],
          evolutionStages,
        })
        setStatus('ready')
      } catch (err) {
        if (err.name === 'AbortError') return
        if (thisRequestId !== requestId.current) return
        const message =
          err instanceof ApiError
            ? "Couldn't load this Pokémon — check your connection and try again."
            : 'Something went wrong loading this Pokémon.'
        setErrorMessage(message)
        setStatus('error')
      }
    })()

    return () => controller.abort()
  }, [apiName])

  useEffect(() => {
    const cancel = load()
    return cancel
  }, [load])

  return { data, status, errorMessage, retry: load }
}
