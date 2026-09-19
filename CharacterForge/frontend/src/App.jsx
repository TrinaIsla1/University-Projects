import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import CharacterCreator from './pages/CharacterCreator'
import CharacterProfile from './pages/CharacterProfile'
import Inventory from './pages/Inventory'
import Shop from './pages/Shop'
import BattleArena from './pages/BattleArena'
import Leaderboard from './pages/Leaderboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/character/create" element={<CharacterCreator />} />
        <Route path="/character/:id" element={<CharacterProfile />} />
        <Route path="/inventory/:characterId" element={<Inventory />} />
        <Route path="/shop/:characterId" element={<Shop />} />
        <Route path="/battle/:characterId" element={<BattleArena />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  )
}

export default App
