// REQ-3.2: This roster is the fixed, authoritative source of truth for which
// Pokémon appear in the app. It is NOT derived from PokéAPI's
// is_legendary/is_mythical flags, since those flags don't perfectly match
// this list. PokéAPI is used only to fetch supporting data (stats, sprites,
// abilities, evolution chains) for each of the names below.
//
// `apiName` is the exact slug PokéAPI expects at /pokemon/{apiName}.

export const GENERATIONS = [
  { gen: 1, region: 'Kanto' },
  { gen: 2, region: 'Johto' },
  { gen: 3, region: 'Hoenn' },
  { gen: 4, region: 'Sinnoh' },
  { gen: 5, region: 'Unova' },
  { gen: 6, region: 'Kalos' },
  { gen: 7, region: 'Alola' },
  { gen: 8, region: 'Galar / Hisui' },
  { gen: 9, region: 'Paldea' },
]

export const LEGENDARY_ROSTER = [
  // Gen 1 — Kanto (4)
  { name: 'Articuno', apiName: 'articuno', gen: 1, region: 'Kanto' },
  { name: 'Zapdos', apiName: 'zapdos', gen: 1, region: 'Kanto' },
  { name: 'Moltres', apiName: 'moltres', gen: 1, region: 'Kanto' },
  { name: 'Mewtwo', apiName: 'mewtwo', gen: 1, region: 'Kanto' },

  // Gen 2 — Johto (5)
  { name: 'Raikou', apiName: 'raikou', gen: 2, region: 'Johto' },
  { name: 'Entei', apiName: 'entei', gen: 2, region: 'Johto' },
  { name: 'Suicune', apiName: 'suicune', gen: 2, region: 'Johto' },
  { name: 'Lugia', apiName: 'lugia', gen: 2, region: 'Johto' },
  { name: 'Ho-Oh', apiName: 'ho-oh', gen: 2, region: 'Johto' },

  // Gen 3 — Hoenn (8)
  { name: 'Regirock', apiName: 'regirock', gen: 3, region: 'Hoenn' },
  { name: 'Regice', apiName: 'regice', gen: 3, region: 'Hoenn' },
  { name: 'Registeel', apiName: 'registeel', gen: 3, region: 'Hoenn' },
  { name: 'Latias', apiName: 'latias', gen: 3, region: 'Hoenn' },
  { name: 'Latios', apiName: 'latios', gen: 3, region: 'Hoenn' },
  { name: 'Kyogre', apiName: 'kyogre', gen: 3, region: 'Hoenn' },
  { name: 'Groudon', apiName: 'groudon', gen: 3, region: 'Hoenn' },
  { name: 'Rayquaza', apiName: 'rayquaza', gen: 3, region: 'Hoenn' },

  // Gen 4 — Sinnoh (9)
  { name: 'Uxie', apiName: 'uxie', gen: 4, region: 'Sinnoh' },
  { name: 'Mesprit', apiName: 'mesprit', gen: 4, region: 'Sinnoh' },
  { name: 'Azelf', apiName: 'azelf', gen: 4, region: 'Sinnoh' },
  { name: 'Dialga', apiName: 'dialga', gen: 4, region: 'Sinnoh' },
  { name: 'Palkia', apiName: 'palkia', gen: 4, region: 'Sinnoh' },
  { name: 'Heatran', apiName: 'heatran', gen: 4, region: 'Sinnoh' },
  { name: 'Regigigas', apiName: 'regigigas', gen: 4, region: 'Sinnoh' },
  { name: 'Giratina', apiName: 'giratina-altered', gen: 4, region: 'Sinnoh' },
  { name: 'Cresselia', apiName: 'cresselia', gen: 4, region: 'Sinnoh' },

  // Gen 5 — Unova (9)
  { name: 'Cobalion', apiName: 'cobalion', gen: 5, region: 'Unova' },
  { name: 'Terrakion', apiName: 'terrakion', gen: 5, region: 'Unova' },
  { name: 'Virizion', apiName: 'virizion', gen: 5, region: 'Unova' },
  { name: 'Tornadus', apiName: 'tornadus-incarnate', gen: 5, region: 'Unova' },
  {
    name: 'Thundurus',
    apiName: 'thundurus-incarnate',
    gen: 5,
    region: 'Unova',
  },
  { name: 'Landorus', apiName: 'landorus-incarnate', gen: 5, region: 'Unova' },
  { name: 'Reshiram', apiName: 'reshiram', gen: 5, region: 'Unova' },
  { name: 'Zekrom', apiName: 'zekrom', gen: 5, region: 'Unova' },
  { name: 'Kyurem', apiName: 'kyurem', gen: 5, region: 'Unova' },

  // Gen 6 — Kalos (3)
  { name: 'Xerneas', apiName: 'xerneas', gen: 6, region: 'Kalos' },
  { name: 'Yveltal', apiName: 'yveltal', gen: 6, region: 'Kalos' },
  { name: 'Zygarde', apiName: 'zygarde-50', gen: 6, region: 'Kalos' },

  // Gen 7 — Alola (11)
  { name: 'Type: Null', apiName: 'type-null', gen: 7, region: 'Alola' },
  { name: 'Silvally', apiName: 'silvally', gen: 7, region: 'Alola' },
  { name: 'Tapu Koko', apiName: 'tapu-koko', gen: 7, region: 'Alola' },
  { name: 'Tapu Lele', apiName: 'tapu-lele', gen: 7, region: 'Alola' },
  { name: 'Tapu Bulu', apiName: 'tapu-bulu', gen: 7, region: 'Alola' },
  { name: 'Tapu Fini', apiName: 'tapu-fini', gen: 7, region: 'Alola' },
  { name: 'Cosmog', apiName: 'cosmog', gen: 7, region: 'Alola' },
  { name: 'Cosmoem', apiName: 'cosmoem', gen: 7, region: 'Alola' },
  { name: 'Solgaleo', apiName: 'solgaleo', gen: 7, region: 'Alola' },
  { name: 'Lunala', apiName: 'lunala', gen: 7, region: 'Alola' },
  { name: 'Necrozma', apiName: 'necrozma', gen: 7, region: 'Alola' },

  // Gen 8 — Galar / Hisui (11)
  { name: 'Zacian', apiName: 'zacian', gen: 8, region: 'Galar / Hisui' },
  { name: 'Zamazenta', apiName: 'zamazenta', gen: 8, region: 'Galar / Hisui' },
  { name: 'Eternatus', apiName: 'eternatus', gen: 8, region: 'Galar / Hisui' },
  { name: 'Kubfu', apiName: 'kubfu', gen: 8, region: 'Galar / Hisui' },
  {
    name: 'Urshifu',
    apiName: 'urshifu-single-strike',
    gen: 8,
    region: 'Galar / Hisui',
  },
  { name: 'Regieleki', apiName: 'regieleki', gen: 8, region: 'Galar / Hisui' },
  { name: 'Regidrago', apiName: 'regidrago', gen: 8, region: 'Galar / Hisui' },
  { name: 'Glastrier', apiName: 'glastrier', gen: 8, region: 'Galar / Hisui' },
  { name: 'Spectrier', apiName: 'spectrier', gen: 8, region: 'Galar / Hisui' },
  { name: 'Calyrex', apiName: 'calyrex', gen: 8, region: 'Galar / Hisui' },
  // Enamorus: associated with Hisui but classified under Gen 8 for roster purposes.
  {
    name: 'Enamorus',
    apiName: 'enamorus-incarnate',
    gen: 8,
    region: 'Galar / Hisui',
  },

  // Gen 9 — Paldea (11)
  { name: 'Wo-Chien', apiName: 'wo-chien', gen: 9, region: 'Paldea' },
  { name: 'Chien-Pao', apiName: 'chien-pao', gen: 9, region: 'Paldea' },
  { name: 'Ting-Lu', apiName: 'ting-lu', gen: 9, region: 'Paldea' },
  { name: 'Chi-Yu', apiName: 'chi-yu', gen: 9, region: 'Paldea' },
  { name: 'Koraidon', apiName: 'koraidon', gen: 9, region: 'Paldea' },
  { name: 'Miraidon', apiName: 'miraidon', gen: 9, region: 'Paldea' },
  { name: 'Okidogi', apiName: 'okidogi', gen: 9, region: 'Paldea' },
  { name: 'Munkidori', apiName: 'munkidori', gen: 9, region: 'Paldea' },
  { name: 'Fezandipiti', apiName: 'fezandipiti', gen: 9, region: 'Paldea' },
  { name: 'Ogerpon', apiName: 'ogerpon', gen: 9, region: 'Paldea' },
  { name: 'Terapagos', apiName: 'terapagos', gen: 9, region: 'Paldea' },
]

// Sanity check helper used only in dev — confirms the roster matches the
// SRS's stated count of 71.
export const ROSTER_COUNT = LEGENDARY_ROSTER.length // expected: 71
