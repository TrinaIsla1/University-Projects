export const CLASSES = {
  WARRIOR: {
    id: 'warrior',
    name: '⚔️ Warrior',
    description: 'Strong melee fighter with high defense',
    baseStats: {
      health: 100,
      attack: 18,
      defense: 16,
      magic: 5,
      speed: 7,
      accuracy: 12,
      criticalChance: 8,
    },
    ability: 'Shield Bash',
  },
  MAGE: {
    id: 'mage',
    name: '🔮 Mage',
    description: 'Master of magic spells',
    baseStats: {
      health: 50,
      attack: 8,
      defense: 6,
      magic: 20,
      speed: 10,
      accuracy: 14,
      criticalChance: 6,
    },
    ability: 'Fireball',
  },
  ARCHER: {
    id: 'archer',
    name: '🏹 Archer',
    description: 'Agile ranged fighter',
    baseStats: {
      health: 70,
      attack: 14,
      defense: 8,
      magic: 7,
      speed: 16,
      accuracy: 18,
      criticalChance: 12,
    },
    ability: 'Multi Shot',
  },
  ASSASSIN: {
    id: 'assassin',
    name: '🗡️ Assassin',
    description: 'Swift and deadly',
    baseStats: {
      health: 60,
      attack: 16,
      defense: 7,
      magic: 6,
      speed: 18,
      accuracy: 15,
      criticalChance: 20,
    },
    ability: 'Shadow Strike',
  },
  PALADIN: {
    id: 'paladin',
    name: '🛡️ Paladin',
    description: 'Defender with healing power',
    baseStats: {
      health: 90,
      attack: 12,
      defense: 18,
      magic: 12,
      speed: 8,
      accuracy: 13,
      criticalChance: 6,
    },
    ability: 'Divine Shield',
  },
  HEALER: {
    id: 'healer',
    name: '💚 Healer',
    description: 'Support specialist',
    baseStats: {
      health: 65,
      attack: 7,
      defense: 10,
      magic: 18,
      speed: 11,
      accuracy: 12,
      criticalChance: 4,
    },
    ability: 'Heal',
  },
}

export const ITEMS = {
  WEAPONS: [
    { name: 'Iron Sword', price: 100, bonus: { stat: 'attack', value: 15 } },
    { name: 'Magic Staff', price: 150, bonus: { stat: 'magic', value: 20 } },
    { name: 'Wooden Bow', price: 80, bonus: { stat: 'accuracy', value: 12 } },
    { name: 'Dragon Blade', price: 500, bonus: { stat: 'attack', value: 50 } },
  ],
  ARMOR: [
    {
      name: 'Leather Armor',
      price: 120,
      bonus: { stat: 'defense', value: 10 },
    },
    { name: 'Iron Plate', price: 200, bonus: { stat: 'defense', value: 20 } },
    { name: 'Dragon Armor', price: 400, bonus: { stat: 'defense', value: 40 } },
    {
      name: 'Robes of Protection',
      price: 150,
      bonus: { stat: 'magic', value: 15 },
    },
  ],
  CONSUMABLES: [
    { name: 'Health Potion', price: 25, bonus: { stat: 'health', value: 30 } },
    { name: 'Mana Potion', price: 30, bonus: { stat: 'magic', value: 20 } },
    {
      name: 'Strength Elixir',
      price: 50,
      bonus: { stat: 'attack', value: 25 },
    },
  ],
}

export const ACHIEVEMENTS = [
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Win your first battle',
  },
  { id: 'collector', name: 'Collector', description: 'Own 10 items' },
  { id: 'warrior', name: 'Warrior', description: 'Reach Level 10' },
  {
    id: 'millionaire',
    name: 'Millionaire',
    description: 'Collect 10,000 gold',
  },
  { id: 'boss-slayer', name: 'Boss Slayer', description: 'Defeat a boss' },
  { id: 'legendary', name: 'Legendary', description: 'Reach Level 50' },
]

export const EXPERIENCE_CURVE = {
  baseEXP: 100,
  multiplier: 1.1,
}

export const STAT_LIMITS = {
  MIN: 1,
  MAX: 10,
}

export const LEVEL_CAP = 100
