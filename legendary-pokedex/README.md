# Legendary Pokédex (Gen 1–9)

React Native / Expo app implementing the *Legendary Pokédex SRS v3.0*.

## Running it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android), or press `i` / `a` for a
simulator. Requires Node 18+.

## What's implemented

| SRS section | Where |
| --- | --- |
| 3 — Fixed 71-entry roster, not derived from PokéAPI flags | `src/data/legendaryRoster.js` |
| 4.1 — Browsing, batched loading | `src/hooks/useLegendaryRoster.js`, `HomeScreen.js` |
| 4.2 — Search (debounced) | `src/hooks/useDebouncedValue.js`, `SearchBar.js` |
| 4.3 — Combinable filters (type, region/gen) + sort + clear | `FilterSheet.js`, `HomeScreen.js` |
| 4.4 — Detail screen: stats, abilities, lore, forms, evolution chain | `DetailScreen.js`, `usePokemonDetail.js`, `EvolutionChain.js` |
| 4.6 — Responsive layout, tap targets, light/dark theme | `ThemeContext.js`, component `StyleSheet`s |
| 5.1 — useEffect + fetch, AbortController race-guard, roster fetched once / details fetched on demand | `src/api/pokeapi.js`, both hooks |
| 5.2 — loading/error/data states, retry, offline banner, graceful fallback on malformed data | `LoadingState.js`, `ErrorState.js`, `OfflineBanner.js` |

## Known gaps / open items (see SRS §8)

- **Offline caching** is marked a stretch goal in the SRS and is **not**
  implemented here — every launch re-fetches from PokéAPI. Wiring in
  `@react-native-async-storage/async-storage` (or a query library's
  persistent cache) is the natural next step if that's prioritized.
- **Infinite scroll / lazy loading (REQ-4.1.3)**: with only 71 entries the
  roster never needs true pagination, so this is handled via the initial
  batched fetch (30 at a time) plus `FlatList`'s built-in windowing rather
  than a separate paging UI. Flag if the intent was something more.
- **Regional forms (§8.4)**: entries with alternate forms (Zacian/Zamazenta,
  Giratina, Tornadus/Thundurus/Landorus, Enamorus, Zygarde, Urshifu) each
  point at one `apiName`; the detail screen surfaces other forms via
  `species.varieties` where PokéAPI exposes them, but this wasn't
  cross-checked form-by-form against §8.4's open question — worth a pass
  before launch.
- **Navigation library**: the SRS doesn't specify one; `@react-navigation`
  (native-stack) was chosen as the React Native standard. Swap freely.
- **Cry playback** uses `expo-av`, which isn't in the SRS's requirements —
  it's a straightforward way to satisfy the "cry/sound clip, played on tap"
  stretch goal in REQ-4.4.1; remove it if audio deps aren't wanted.
- Not yet built: automated tests, CI, and the app-icon/splash/store-listing
  assets — all outside the SRS's functional/non-functional requirements.
