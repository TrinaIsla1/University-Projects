import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchCharacters = async () => {
      try {
        const data = await api.getCharacters(token)
        setCharacters(data)
      } catch (err) {
        console.error('Failed to fetch characters', err)
        setError(err.message || 'Failed to load characters')
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [navigate])

  if (loading) return <div className="dashboard">Loading...</div>

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>⚔️ CharacterForge</h1>
        <div className="nav-links">
          <Link to="/character/create">New Character</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/')
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <h2>My Characters</h2>
        {error && <div className="error-message">{error}</div>}
        {characters.length === 0 ? (
          <div className="empty-state">
            <p>No characters yet. Create your first character!</p>
            <Link to="/character/create" className="btn btn-primary">
              Create Character
            </Link>
          </div>
        ) : (
          <div className="characters-grid">
            {characters.map((char) => (
              <div key={char._id} className="character-card">
                <h3>{char.name}</h3>
                <p>Class: {char.class}</p>
                <p>Level: {char.level}</p>
                <p>Experience: {char.experience}</p>
                <Link to={`/character/${char._id}`} className="btn btn-primary">
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
