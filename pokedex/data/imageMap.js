// data/imageMap.js
//
// WHY THIS FILE EXISTS:
// In React Native, require('./someImage.png') only works if that file
// ALREADY EXISTS when the app is bundled -- you can't build the path
// dynamically with a variable, and you can't point it at a missing file.
//
// Since the assets/pokemon folder starts out EMPTY (you're adding the
// images yourself later), we can't put 20 require() calls in here yet --
// the app would fail to build because those files don't exist.
//
// HOW TO USE THIS FILE:
// 1. Drop an image into assets/pokemon/, e.g. assets/pokemon/mewtwo.png
// 2. Come to this file and UNCOMMENT (or add) the matching line below.
// 3. Save. The app will hot-reload and the image will appear automatically
//    -- PokemonCard.js already knows how to look it up.
//
// The key on the left (e.g. "mewtwo.png") must exactly match the
// "image" value for that Pokemon in data/pokemonData.js.

export const imageMap = {
  // 'articuno.png':  require('../assets/pokemon/articuno.png'),
  // 'zapdos.png':    require('../assets/pokemon/zapdos.png'),
  // 'moltres.png':   require('../assets/pokemon/moltres.png'),
  // 'mewtwo.png':    require('../assets/pokemon/mewtwo.png'),
  // 'mew.png':       require('../assets/pokemon/mew.png'),
  // 'raikou.png':    require('../assets/pokemon/raikou.png'),
  // 'entei.png':     require('../assets/pokemon/entei.png'),
  // 'suicune.png':   require('../assets/pokemon/suicune.png'),
  // 'lugia.png':     require('../assets/pokemon/lugia.png'),
  // 'ho-oh.png':     require('../assets/pokemon/ho-oh.png'),
  // 'celebi.png':    require('../assets/pokemon/celebi.png'),
  // 'regirock.png':  require('../assets/pokemon/regirock.png'),
  // 'regice.png':    require('../assets/pokemon/regice.png'),
  // 'registeel.png': require('../assets/pokemon/registeel.png'),
  // 'latias.png':    require('../assets/pokemon/latias.png'),
  // 'latios.png':    require('../assets/pokemon/latios.png'),
  // 'kyogre.png':    require('../assets/pokemon/kyogre.png'),
  // 'groudon.png':   require('../assets/pokemon/groudon.png'),
  // 'rayquaza.png':  require('../assets/pokemon/rayquaza.png'),
  // 'jirachi.png':   require('../assets/pokemon/jirachi.png'),
  // 'deoxys.png':    require('../assets/pokemon/deoxys.png'),
};

// Small helper function: given a filename string, return the real
// image source if we have it mapped, or "null" if we don't (yet).
// PokemonCard.js uses this to decide whether to show a real image
// or a placeholder box.
export function getPokemonImage(filename) {
  return imageMap[filename] || null;
}
