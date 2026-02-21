import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const ROLES = [
  { id: 'citizen', label: 'Citizen', desc: 'Report issues, give feedback, get updates' },
  { id: 'politician', label: 'Politician', desc: 'Respond to concerns, post updates, discuss' },
  { id: 'moderator', label: 'Moderator', desc: 'Monitor interactions, ensure respect' },
  { id: 'admin', label: 'Admin', desc: 'Oversee platform, manage roles, data integrity' },
]

export default function Login() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('citizen')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    login(role, name.trim())
    navigate('/')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Citizen & Politician</h1>
        <p className="login-subtitle">FSAD-PS08 — Better communication for better governance</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Your name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              autoFocus
            />
          </label>
          <label>
            Sign in as
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </label>
          <p className="role-desc">{ROLES.find((r) => r.id === role)?.desc}</p>
          <button type="submit" className="btn btn-primary btn-block">Continue</button>
        </form>
      </div>
    </div>
  )
}
