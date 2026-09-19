import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/CharacterProfile.css'

export default function CharacterProfile() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const token = localStorage.getItem('token')
        const data = await api.getCharacter(id, token)
        setCharacter(data)

        // Only show skills the character has actually unlocked at their level
        const unlockedSkills = await api.getSkills({
          characterClass: data.class,
          maxLevel: data.level,
        })
        setSkills(unlockedSkills)
      } catch (err) {
        console.error('Failed to fetch character', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!character) return <div>Character not found</div>

  return (
    <div className="character-profile">
      <Link to="/dashboard">← Back to Dashboard</Link>
      <div className="profile-container">
        <div className="profile-left">
          <div className="character-display">
            <h2>{character.name}</h2>
            <p className="class-badge">{character.class}</p>
            <p>Level {character.level}</p>
          </div>
        </div>
        <div className="profile-right">
          <div className="stats-section">
            <h3>Stats</h3>
            {character.stats &&
              Object.entries(character.stats).map(([key, value]) => (
                <div key={key} className="stat-bar">
                  <span>
                    {key}: {value}
                  </span>
                </div>
              ))}
          </div>
          <div className="info-section">
            <h3>Information</h3>
            <p>
              <strong>Age:</strong> {character.age}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Experience:</strong> {character.experience}
            </p>
            <p>
              <strong>Gold:</strong> {character.gold}
            </p>
          </div>
          {skills.length > 0 && (
            <div className="skills-section">
              <h3>Class Skills</h3>
              {skills.map((skill) => (
                <div key={skill._id} className="skill-entry">
                  <strong>{skill.name}</strong> (unlocks at Lv.{skill.unlockLevel})
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          )}
          <div className="action-buttons">
            <Link to={`/inventory/${id}`} className="btn btn-primary">
              Inventory
            </Link>
            <Link to={`/shop/${id}`} className="btn btn-primary">
              Shop
            </Link>
            <Link to={`/battle/${id}`} className="btn btn-primary">
              Battle
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
