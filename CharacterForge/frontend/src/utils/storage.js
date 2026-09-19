// Local storage helpers
export const storage = {
  setToken: (token) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  removeToken: () => localStorage.removeItem('token'),

  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
  removeUser: () => localStorage.removeItem('user'),

  setCharacter: (character) =>
    localStorage.setItem('currentCharacter', JSON.stringify(character)),
  getCharacter: () => {
    const character = localStorage.getItem('currentCharacter')
    return character ? JSON.parse(character) : null
  },
  removeCharacter: () => localStorage.removeItem('currentCharacter'),

  clear: () => localStorage.clear(),
}
