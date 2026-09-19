import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/Shop.css'

export default function Shop() {
  const { characterId } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.getShopItems()
        setItems(data)
      } catch (err) {
        console.error('Failed to fetch shop items', err)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const handlePurchase = async (itemId) => {
    try {
      setMessage('')
      const token = localStorage.getItem('token')
      await api.purchaseItem(itemId, characterId, token)
      setMessage('Item purchased!')
    } catch (err) {
      console.error('Failed to purchase item', err)
      setMessage(err.message || 'Purchase failed')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="shop-page">
      <Link to={`/character/${characterId}`}>← Back</Link>
      <h2>Shop</h2>
      {message && <div className="error-message">{message}</div>}
      <div className="shop-grid">
        {items.map((item) => (
          <div key={item._id} className="shop-item">
            <h4>{item.name}</h4>
            <p>Type: {item.type}</p>
            <p className="price">{item.price} Gold</p>
            {item.bonus && (
              <p>
                +{item.bonus.stat}: {item.bonus.value}
              </p>
            )}
            <button
              className="btn btn-primary"
              onClick={() => handlePurchase(item._id)}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
