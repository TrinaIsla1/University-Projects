import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <h1>⚔️ CharacterForge</h1>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <main className="landing-content">
        <section className="hero">
          <h2>Create Your Legend</h2>
          <p>Design, customize, and battle with your unique RPG character</p>
          <Link to="/register" className="btn btn-primary">
            Start Your Journey
          </Link>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>🎨 Character Creator</h3>
            <p>
              Customize appearance, choose classes, and define your character's
              story
            </p>
          </div>
          <div className="feature-card">
            <h3>⚔️ Battle System</h3>
            <p>Engage in epic battles and prove your combat prowess</p>
          </div>
          <div className="feature-card">
            <h3>📈 Leveling & Growth</h3>
            <p>Gain experience, level up, and unlock powerful abilities</p>
          </div>
          <div className="feature-card">
            <h3>🛍️ Equipment & Items</h3>
            <p>
              Collect weapons, armor, and consumables to enhance your character
            </p>
          </div>
          <div className="feature-card">
            <h3>🏆 Achievements</h3>
            <p>Unlock achievements and compete on the leaderboard</p>
          </div>
          <div className="feature-card">
            <h3>💰 Virtual Economy</h3>
            <p>Earn gold through battles and shop for rare items</p>
          </div>
        </section>
      </main>
    </div>
  )
}
