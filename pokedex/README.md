# Legendary Pokedex (Static Prototype)

A fully static Expo / React Native app listing every Legendary and Mythical
Pokemon from Generations I-III (#001-#386). No API calls, no hooks -- just
a local data file rendered to the screen.

## Project structure

```
pokedex/
  App.js                  <- entry point, renders the list
  components/
    PokemonCard.js         <- renders one Pokemon's card UI
  data/
    pokemonData.js          <- all Pokemon info (name, type, description...)
    imageMap.js              <- maps filenames -> local images (you fill this in)
  assets/
    pokemon/                  <- EMPTY on purpose, add your own images here
```

## 1. Set up the project

```bash
npx create-expo-app pokedex
```

Then copy `App.js`, `components/`, and `data/` from this prototype into your
new project folder (replacing the default `App.js`).

## 2. Install and run

```bash
cd pokedex
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone (same Wi-Fi network),
or press `i` / `a` in the terminal for an iOS/Android simulator.

Right now the app will already run and show all 20 Pokemon with a gray "?"
placeholder where each image should be -- that's expected, since the image
folder is empty.

## 3. Adding your own images

1. Save an image into `assets/pokemon/`, named to match the `image` field in
   `data/pokemonData.js` (e.g. `mewtwo.png`).
2. Open `data/imageMap.js` and uncomment the matching line for that Pokemon.
3. Save -- Expo will hot-reload and the real image replaces the placeholder.

You don't need to touch `PokemonCard.js` or `App.js` for this -- they already
know how to look up whatever is in `imageMap.js`.

## Notes

- All 20 entries are Legendary/Mythical Pokemon from Gen I-III only.
- Styling is done with React Native's `StyleSheet` (there's no CSS file --
  React Native doesn't use actual `.css`).
- This version has no search, filtering, or favorites -- everything is static.
  A future step could add `useState` for a search bar or a "caught" toggle.
