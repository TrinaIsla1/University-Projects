export const calculateDamage = (attackerStats, defenderStats) => {
  const baseDamage = attackerStats.attack || 10
  const variance = Math.random() * 10 - 5 // -5 to +5
  const defense = defenderStats.defense || 5
  const finalDamage = Math.max(
    1,
    Math.floor(baseDamage + variance - defense * 0.5),
  )
  return finalDamage
}

export const calculateCriticalHit = (accuracy, criticalChance) => {
  const critChance = (criticalChance || 5) + (accuracy || 10) * 0.2
  return Math.random() * 100 < critChance
}

export const calculateExperienceForLevel = (level) => {
  return Math.floor(100 * Math.pow(1.1, level - 1))
}

export const getStatBonus = (items) => {
  const bonus = {
    health: 0,
    attack: 0,
    defense: 0,
    magic: 0,
    speed: 0,
    accuracy: 0,
    criticalChance: 0,
  }

  items.forEach((item) => {
    if (item.bonus && item.bonus.stat) {
      bonus[item.bonus.stat] += item.bonus.value || 0
    }
  })

  return bonus
}

export const calculateLevelUp = (experience, level) => {
  const nextLevelExp = calculateExperienceForLevel(level + 1)
  if (experience >= nextLevelExp) {
    return {
      leveledUp: true,
      newLevel: level + 1,
      remainingExp: experience - nextLevelExp,
    }
  }
  return { leveledUp: false }
}

export const formatGold = (gold) => {
  return `${gold.toLocaleString()} Gold`
}

export const calculateBattleRewards = (characterLevel, enemyLevel) => {
  const baseExp = 50 * Math.pow(1.05, enemyLevel - 1)
  const baseGold = 20 * Math.pow(1.05, enemyLevel - 1)

  return {
    experience: Math.floor(baseExp),
    gold: Math.floor(baseGold),
  }
}
