import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Improve interaction between citizens and politicians</h1>
        <p className="hero-lead">
          Report issues, give feedback, and receive updates from your representatives.
          One platform for transparency and responsiveness in governance.
        </p>
        {!user ? (
          <Link to="/login" className="btn btn-primary btn-lg">Get started</Link>
        ) : (
          <div className="hero-dashboard-links">
            <Link to={`/${user.role}`} className="btn btn-primary">Go to my dashboard</Link>
          </div>
        )}
      </section>
      <section className="roles-section">
        <h2>How it works</h2>
        <div className="roles-grid">
          <div className="role-card">
            <span className="role-card-icon">👤</span>
            <h3>Citizen</h3>
            <p>Report issues, provide feedback, and receive updates from politicians.</p>
          </div>
          <div className="role-card">
            <span className="role-card-icon">🏛️</span>
            <h3>Politician</h3>
            <p>Respond to citizen concerns, post updates, and engage in discussions.</p>
          </div>
          <div className="role-card">
            <span className="role-card-icon">🛡️</span>
            <h3>Moderator</h3>
            <p>Monitor interactions, ensure respectful communication, resolve conflicts.</p>
          </div>
          <div className="role-card">
            <span className="role-card-icon">⚙️</span>
            <h3>Admin</h3>
            <p>Oversee platform operations, manage user roles, ensure data integrity.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
