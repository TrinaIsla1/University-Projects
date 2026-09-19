const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function handleResponse(response) {
  let data
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const message = (data && data.message) || `Request failed (${response.status})`
    throw new Error(message)
  }

  return data
}

export const api = {
  // Auth
  register: async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
    return handleResponse(response)
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(response)
  },

  // Characters
  getCharacters: async (token) => {
    const response = await fetch(`${API_BASE_URL}/characters`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return handleResponse(response)
  },

  getCharacter: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/characters/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return handleResponse(response)
  },

  createCharacter: async (data, token) => {
    const response = await fetch(`${API_BASE_URL}/characters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  },

  updateCharacter: async (id, data, token) => {
    const response = await fetch(`${API_BASE_URL}/characters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  },

  // Battles
  startBattle: async (characterId, token) => {
    const response = await fetch(`${API_BASE_URL}/battles/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ characterId }),
    })
    return handleResponse(response)
  },

  attack: async (battleId, token) => {
    const response = await fetch(`${API_BASE_URL}/battles/attack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ battleId }),
    })
    return handleResponse(response)
  },

  // Inventory
  getInventory: async (characterId, token) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${characterId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return handleResponse(response)
  },

  equipItem: async (inventoryId, token) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${inventoryId}/equip`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    })
    return handleResponse(response)
  },

  // Shop
  getShopItems: async () => {
    const response = await fetch(`${API_BASE_URL}/shop/items`)
    return handleResponse(response)
  },

  purchaseItem: async (itemId, characterId, token) => {
    const response = await fetch(`${API_BASE_URL}/shop/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId, characterId }),
    })
    return handleResponse(response)
  },

  // Leaderboard
  getLeaderboard: async () => {
    const response = await fetch(`${API_BASE_URL}/leaderboard`)
    return handleResponse(response)
  },

  // Reference data
  getClasses: async () => {
    const response = await fetch(`${API_BASE_URL}/classes`)
    return handleResponse(response)
  },

  getSkills: async ({ characterClass, maxLevel } = {}) => {
    const params = new URLSearchParams()
    if (characterClass) params.set('characterClass', characterClass)
    if (maxLevel) params.set('maxLevel', maxLevel)
    const query = params.toString() ? `?${params.toString()}` : ''
    const response = await fetch(`${API_BASE_URL}/skills${query}`)
    return handleResponse(response)
  },

  getAchievements: async () => {
    const response = await fetch(`${API_BASE_URL}/achievements`)
    return handleResponse(response)
  },
}
