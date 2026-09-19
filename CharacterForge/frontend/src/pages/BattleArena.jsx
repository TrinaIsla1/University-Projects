import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/BattleArena.css'

export default function BattleArena() {
  const { characterId } = useParams()
  const [battle, setBattle] = useState(null)
  const [inBattle, setInBattle] = useState(false)
  const [battleLog, setBattleLog] = useState([])
  const [error, setError] = useState('')

  const startBattle = async () => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      const data = await api.startBattle(characterId, token)
      setBattle(data.battle)
      setInBattle(true)
      setBattleLog([`Battle started against ${data.battle.enemy.name}!`])
    } catch (err) {
      console.error('Failed to start battle', err)
      setError(err.message || 'Failed to start battle')
    }
  }

  const attack = async () => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      const data = await api.attack(battle._id, token)
      setBattle(data.battle)
      setBattleLog((prev) => [...prev, data.log])

      if (data.battle.status !== 'in_progress') {
        setInBattle(false)
        setBattleLog((prev) => [...prev, `Battle ${data.battle.result}!`])
      }
    } catch (err) {
      console.error('Failed to attack', err)
      setError(err.message || 'Failed to attack')
    }
  }

  const healthPercent = (health, maxHealth) =>
    maxHealth > 0 ? Math.max(0, Math.min(100, (health / maxHealth) * 100)) : 0

  return (
    <div className="battle-arena">
      <Link to={`/character/${characterId}`}>← Back</Link>
      <h2>Battle Arena</h2>
      {error && <div className="error-message">{error}</div>}

      {!inBattle ? (
        <button className="btn btn-primary" onClick={startBattle}>
          {battle ? 'Battle Again' : 'Start Battle'}
        </button>
      ) : (
        <div className="battle-container">
          <div className="battle-display">
            <div className="character-vs">
              <div className="vs-left">
                <h3>Your Character</h3>
                {battle && (
                  <>
                    <p>
                      HP: {battle.character.health}/{battle.character.maxHealth}
                    </p>
                    <div className="hp-bar">
                      <div
                        className="hp-fill"
                        style={{
                          width: `${healthPercent(battle.character.health, battle.character.maxHealth)}%`,
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
              <div className="vs-center">VS</div>
              <div className="vs-right">
                <h3>Enemy: {battle?.enemy.name}</h3>
                {battle && (
                  <>
                    <p>
                      HP: {battle.enemy.health}/{battle.enemy.maxHealth}
                    </p>
                    <div className="hp-bar">
                      <div
                        className="hp-fill"
                        style={{
                          width: `${healthPercent(battle.enemy.health, battle.enemy.maxHealth)}%`,
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="battle-actions">
              <button className="btn btn-primary" onClick={attack}>
                Attack
              </button>
              <button className="btn btn-secondary" disabled title="Coming soon">
                Special Ability
              </button>
              <button className="btn btn-secondary" disabled title="Coming soon">
                Use Item
              </button>
              <button className="btn btn-secondary" disabled title="Coming soon">
                Run
              </button>
            </div>

            <div className="battle-log">
              <h4>Battle Log</h4>
              {battleLog.map((log, idx) => (
                <p key={idx}>{log}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
