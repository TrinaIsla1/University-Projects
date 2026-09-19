import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Leaderboard.css'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard')
        const data = await response.json()
        setLeaderboard(data)
      } catch (err) {
        console.error('Failed to fetch leaderboard', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="leaderboard-page">
      <Link to="/dashboard">← Back</Link>
      <h2>🏆 Leaderboard</h2>
      <div className="leaderboard-table">
        <div className="table-header">
          <span>Rank</span>
          <span>Character Name</span>
          <span>Class</span>
          <span>Level</span>
          <span>Experience</span>
        </div>
        {leaderboard.map((character, idx) => (
          <div key={character._id} className="table-row">
            <span className="rank">#{idx + 1}</span>
            <span>{character.name}</span>
            <span>{character.class}</span>
            <span>{character.level}</span>
            <span>{character.experience}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
