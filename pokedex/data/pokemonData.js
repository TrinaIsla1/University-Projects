// data/pokemonData.js
//
// This file holds all of our Pokemon info as a plain JavaScript array.
// Since we are NOT using an API, this array is our entire "database."
// Each object below = one Pokemon card in the app.
//
// "image" is just a FILE NAME (a string), not the actual image.
// We do this on purpose because React Native's require() only works
// with file paths that exist at build time -- if we pointed straight
// to a missing file, the whole app would crash to build.
// Instead, "image" is matched up later inside data/imageMap.js,
// which is where the real require() calls live.
//
// Scope: only LEGENDARY / MYTHICAL Pokemon from Generations 1-3
// (National Pokedex #001 - #386).

export const pokemonList = [
  // ---------- GENERATION 1 (Kanto) ----------
  {
    id: 144,
    name: "Articuno",
    type: "Ice/Flying",
    generation: 1,
    description:
      "A legendary bird said to appear before winter travelers, leaving trails of frost from its wings as it flies.",
    image: "articuno.png",
  },
  {
    id: 145,
    name: "Zapdos",
    type: "Electric/Flying",
    generation: 1,
    description:
      "A legendary bird that dwells in thunderclouds, said to descend from storms to release bursts of lightning.",
    image: "zapdos.png",
  },
  {
    id: 146,
    name: "Moltres",
    type: "Fire/Flying",
    generation: 1,
    description:
      "A legendary bird whose glowing feathers are said to heal wounds, believed to signal the arrival of spring.",
    image: "moltres.png",
  },
  {
    id: 150,
    name: "Mewtwo",
    type: "Psychic",
    generation: 1,
    description:
      "A Pokemon created through genetic engineering, given immense psychic power far beyond that of natural Pokemon.",
    image: "mewtwo.png",
  },
  {
    id: 151,
    name: "Mew",
    type: "Psychic",
    generation: 1,
    description:
      "An extremely rare Pokemon believed to carry the genetic code of every Pokemon, said to be the ancestor of them all.",
    image: "mew.png",
  },

  // ---------- GENERATION 2 (Johto) ----------
  {
    id: 243,
    name: "Raikou",
    type: "Electric",
    generation: 2,
    description:
      "A legendary beast said to embody the power of lightning, racing across the land faster than thunder.",
    image: "raikou.png",
  },
  {
    id: 244,
    name: "Entei",
    type: "Fire",
    generation: 2,
    description:
      "A legendary beast said to embody the power of magma, its roar shaking the ground like an erupting volcano.",
    image: "entei.png",
  },
  {
    id: 245,
    name: "Suicune",
    type: "Water",
    generation: 2,
    description:
      "A legendary beast said to embody the purity of water, believed to be able to cleanse anything it touches.",
    image: "suicune.png",
  },
  {
    id: 249,
    name: "Lugia",
    type: "Psychic/Flying",
    generation: 2,
    description:
      "A guardian said to sleep at the bottom of the sea, so powerful that a single wingbeat can cause storms.",
    image: "lugia.png",
  },
  {
    id: 250,
    name: "Ho-Oh",
    type: "Fire/Flying",
    generation: 2,
    description:
      "A rainbow-colored guardian of the skies, said to grant eternal happiness to anyone who sees it.",
    image: "ho-oh.png",
  },
  {
    id: 251,
    name: "Celebi",
    type: "Psychic/Grass",
    generation: 2,
    description:
      "A mythical Pokemon said to travel through time, appearing only in peaceful forests untouched by people.",
    image: "celebi.png",
  },

  // ---------- GENERATION 3 (Hoenn) ----------
  {
    id: 377,
    name: "Regirock",
    type: "Rock",
    generation: 3,
    description:
      "An ancient Pokemon assembled from countless rocks, said to have been sealed away in a desert cave.",
    image: "regirock.png",
  },
  {
    id: 378,
    name: "Regice",
    type: "Ice",
    generation: 3,
    description:
      "An ancient Pokemon formed from glacial ice during an ice age, its body never rising above freezing.",
    image: "regice.png",
  },
  {
    id: 379,
    name: "Registeel",
    type: "Steel",
    generation: 3,
    description:
      "An ancient Pokemon with a body harder than any known metal, said to have slept in a cave for many years.",
    image: "registeel.png",
  },
  {
    id: 380,
    name: "Latias",
    type: "Dragon/Psychic",
    generation: 3,
    description:
      "A gentle Pokemon that can bend light to become invisible, and is said to understand human emotions.",
    image: "latias.png",
  },
  {
    id: 381,
    name: "Latios",
    type: "Dragon/Psychic",
    generation: 3,
    description:
      "A Pokemon capable of high-speed flight using telekinesis, fiercely protective of those close to it.",
    image: "latios.png",
  },
  {
    id: 382,
    name: "Kyogre",
    type: "Water",
    generation: 3,
    description:
      "A Pokemon said to have expanded the seas, capable of summoning torrential rain across the whole region.",
    image: "kyogre.png",
  },
  {
    id: 383,
    name: "Groudon",
    type: "Ground",
    generation: 3,
    description:
      "A Pokemon said to have raised continents from the sea, capable of causing intense sunlight and drought.",
    image: "groudon.png",
  },
  {
    id: 384,
    name: "Rayquaza",
    type: "Dragon/Flying",
    generation: 3,
    description:
      "A Pokemon that lives in the ozone layer, said to descend to earth to stop conflict between Kyogre and Groudon.",
    image: "rayquaza.png",
  },
  {
    id: 385,
    name: "Jirachi",
    type: "Steel/Psychic",
    generation: 3,
    description:
      "A mythical Pokemon that sleeps for a thousand years, said to wake for seven days and grant a single wish.",
    image: "jirachi.png",
  },
  {
    id: 386,
    name: "Deoxys",
    type: "Psychic",
    generation: 3,
    description:
      "A mythical Pokemon born from a mutated space virus, able to shift between different battle forms.",
    image: "deoxys.png",
  },
];
