import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/Inventory.css'

export default function Inventory() {
  const { characterId } = useParams()
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchInventory = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const data = await api.getInventory(characterId, token)
      setInventory(data)
    } catch (err) {
      console.error('Failed to fetch inventory', err)
      setError(err.message || 'Failed to load inventory')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId])

  const handleEquip = async (inventoryId) => {
    try {
      const token = localStorage.getItem('token')
      await api.equipItem(inventoryId, token)
      fetchInventory()
    } catch (err) {
      console.error('Failed to equip item', err)
      setError(err.message || 'Failed to equip item')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="inventory-page">
      <Link to={`/character/${characterId}`}>← Back</Link>
      <h2>Inventory</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="inventory-grid">
        {inventory.length === 0 ? (
          <p>Your inventory is empty</p>
        ) : (
          inventory.map((entry) => {
            const item = entry.itemId
            if (!item) return null // item was deleted from the shop catalog
            return (
              <div key={entry._id} className="inventory-item">
                <h4>{item.name}</h4>
                <p>Type: {item.type}</p>
                <p>Quantity: {entry.quantity}</p>
                {item.bonus && (
                  <p>
                    +{item.bonus.stat}: {item.bonus.value}
                  </p>
                )}
                {entry.equipped ? (
                  <span className="equipped-badge">Equipped</span>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEquip(entry._id)}
                  >
                    Equip
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
