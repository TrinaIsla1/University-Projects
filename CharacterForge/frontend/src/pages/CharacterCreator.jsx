import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/CharacterCreator.css'

const STAT_BUDGET = 35

const CLASSES = [
  {
    id: 'warrior',
    name: '⚔️ Warrior',
    strength: 'HP & Defense',
    weakness: 'Magic',
  },
  { id: 'mage', name: '🔮 Mage', strength: 'Magic', weakness: 'Defense' },
  {
    id: 'archer',
    name: '🏹 Archer',
    strength: 'Accuracy & Speed',
    weakness: 'HP',
  },
  {
    id: 'assassin',
    name: '🗡️ Assassin',
    strength: 'Critical Damage',
    weakness: 'Defense',
  },
  {
    id: 'paladin',
    name: '🛡️ Paladin',
    strength: 'Defense & Healing',
    weakness: 'Speed',
  },
  {
    id: 'healer',
    name: '💚 Healer',
    strength: 'Healing & Support',
    weakness: 'Attack',
  },
]

export default function CharacterCreator() {
  const [step, setStep] = useState(1)
  const [character, setCharacter] = useState({
    name: '',
    age: 20,
    gender: 'male',
    class: 'warrior',
    personality: '',
    backstory: '',
    appearance: {
      hairStyle: 'short',
      hairColor: 'black',
      skinTone: 'fair',
      eyeColor: 'brown',
      outfit: 'leather',
      accessories: 'none',
    },
    stats: {
      health: 5,
      attack: 5,
      defense: 5,
      magic: 5,
      speed: 5,
      accuracy: 5,
      criticalChance: 5,
    },
  })
  const [error, setError] = useState('')
  const [classDetails, setClassDetails] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    // Enrich the class cards with real ability data from the backend.
    // If this fails (e.g. DB not seeded yet), the cards still work fine
    // with just the strength/weakness summary below.
    api
      .getClasses()
      .then((data) => {
        const byName = {}
        data.forEach((cls) => {
          byName[cls.name] = cls
        })
        setClassDetails(byName)
      })
      .catch((err) => console.warn('Could not load class details', err))
  }, [])

  const handleCreateCharacter = async () => {
    if (!character.name.trim()) {
      setError('Please give your character a name.')
      setStep(1)
      return
    }

    try {
      setError('')
      const token = localStorage.getItem('token')
      const data = await api.createCharacter(character, token)
      navigate(`/character/${data._id}`)
    } catch (err) {
      console.error('Failed to create character', err)
      setError(err.message || 'Failed to create character. Please try again.')
    }
  }

  return (
    <div className="character-creator">
      <div className="creator-container">
        <h2>Create Your Character</h2>
        <p>Step {step} of 4</p>

        {step === 1 && (
          <div className="creator-step">
            <h3>Basic Information</h3>
            <input
              type="text"
              placeholder="Character Name"
              value={character.name}
              onChange={(e) =>
                setCharacter({ ...character, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Age"
              value={character.age}
              onChange={(e) =>
                setCharacter({ ...character, age: parseInt(e.target.value) })
              }
            />
            <select
              value={character.gender}
              onChange={(e) =>
                setCharacter({ ...character, gender: e.target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Personality"
              value={character.personality}
              onChange={(e) =>
                setCharacter({ ...character, personality: e.target.value })
              }
            />
          </div>
        )}

        {step === 2 && (
          <div className="creator-step">
            <h3>Choose Your Class</h3>
            <div className="classes-grid">
              {CLASSES.map((c) => (
                <div
                  key={c.id}
                  className={`class-card ${character.class === c.id ? 'selected' : ''}`}
                  onClick={() => setCharacter({ ...character, class: c.id })}
                >
                  <h4>{c.name}</h4>
                  <p>
                    <strong>Strength:</strong> {c.strength}
                  </p>
                  <p>
                    <strong>Weakness:</strong> {c.weakness}
                  </p>
                  {classDetails[c.id] && (
                    <p>
                      <strong>{classDetails[c.id].uniqueAbility}:</strong>{' '}
                      {classDetails[c.id].abilityDescription}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="creator-step">
            <h3>Customize Appearance</h3>
            <select
              value={character.appearance.hairStyle}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  appearance: {
                    ...character.appearance,
                    hairStyle: e.target.value,
                  },
                })
              }
            >
              <option value="short">Short Hair</option>
              <option value="long">Long Hair</option>
              <option value="curly">Curly Hair</option>
              <option value="bald">Bald</option>
            </select>
            <select
              value={character.appearance.hairColor}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  appearance: {
                    ...character.appearance,
                    hairColor: e.target.value,
                  },
                })
              }
            >
              <option value="black">Black</option>
              <option value="brown">Brown</option>
              <option value="blonde">Blonde</option>
              <option value="red">Red</option>
            </select>
            <select
              value={character.appearance.eyeColor}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  appearance: {
                    ...character.appearance,
                    eyeColor: e.target.value,
                  },
                })
              }
            >
              <option value="brown">Brown</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="hazel">Hazel</option>
            </select>
            <select
              value={character.appearance.outfit}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  appearance: {
                    ...character.appearance,
                    outfit: e.target.value,
                  },
                })
              }
            >
              <option value="leather">Leather Armor</option>
              <option value="metal">Metal Armor</option>
              <option value="robes">Robes</option>
              <option value="casual">Casual</option>
            </select>
          </div>
        )}

        {step === 4 && (
          <div className="creator-step">
            <h3>Allocate Stats ({STAT_BUDGET} points total)</h3>
            <p>Distribute your skill points among these stats:</p>
            {Object.keys(character.stats).map((stat) => {
              const total = Object.values(character.stats).reduce(
                (a, b) => a + b,
                0,
              )
              const remaining = STAT_BUDGET - total + character.stats[stat]
              return (
                <div key={stat} className="stat-input">
                  <label>{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                  <input
                    type="range"
                    min="1"
                    max={Math.min(10, remaining)}
                    value={character.stats[stat]}
                    onChange={(e) => {
                      const requested = parseInt(e.target.value)
                      const clamped = Math.min(requested, remaining)
                      setCharacter({
                        ...character,
                        stats: { ...character.stats, [stat]: clamped },
                      })
                    }}
                  />
                  <span>{character.stats[stat]}</span>
                </div>
              )
            })}
            <p>
              Points used:{' '}
              {Object.values(character.stats).reduce((a, b) => a + b, 0)} /{' '}
              {STAT_BUDGET}
            </p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          {step > 1 && (
            <button
              className="btn btn-secondary"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              className="btn btn-primary"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button className="btn btn-primary" onClick={handleCreateCharacter}>
              Create Character
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
