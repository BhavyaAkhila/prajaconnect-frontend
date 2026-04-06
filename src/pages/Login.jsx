import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import IndianFlag from '../components/IndianFlag'
import './Login.css'

const ROLES_SLIDES = [
  {
    id: 'citizen',
    label: 'Citizen',
    image: 'https://thumbs.dreamstime.com/b/puttaparthi-andhra-pradesh-india-july-portrait-elderly-indian-woman-copy-space-text-close-up-puttaparthi-andhra-pradesh-99145090.jpg',
    desc: 'Report issues, give feedback, get updates',
  },
  {
    id: 'politician',
    label: 'Politician',
    image: 'https://assets.weforum.org/sf_account/image/9pEtECWKSlVX4sl7imE-3K_b1z-wMXI0kmYoWL4XeHA.jpeg',
    desc: 'Respond to concerns, post updates, discuss',
  },
  {
    id: 'moderator',
    label: 'Moderator',
    icon: '🛡️',
    desc: 'Monitor interactions, ensure respect',
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: '⚙️',
    desc: 'Oversee platform, manage roles, data integrity',
  },
]

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('citizen')
  const [slideIndex, setSlideIndex] = useState(0)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !password.trim()) return
    login(role, name.trim(), password)
    navigate('/')
  }

  const handleSlideChange = (index) => {
    setSlideIndex(index)
    setRole(ROLES_SLIDES[index].id)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-flag-wrap">
          <IndianFlag width={48} height={32} />
        </div>
        <h1 className="login-title">PrajaConnect</h1>
        <p className="login-subtitle">Connecting People with Power — Transparently.</p>
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
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>
          
          {/* Role slider */}
          <div className="role-slider-section">
            <label className="role-slider-label">Choose your role</label>
            <div className="role-slider">
              <button
                type="button"
                className="slider-arrow slider-prev"
                onClick={() => handleSlideChange((slideIndex - 1 + ROLES_SLIDES.length) % ROLES_SLIDES.length)}
                aria-label="Previous"
              >
                ‹
              </button>
              <div className="slider-track">
                <div
                  className="slider-track-inner"
                  style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                >
                  {ROLES_SLIDES.map((slide, i) => (
                    <div
                      key={slide.id}
                      className={`slider-slide ${i === slideIndex ? 'slider-slide-active' : ''}`}
                    >
                      <div className="slider-slide-inner">
                        {slide.image ? (
                          <div className="slider-image-wrap">
                            <img src={slide.image} alt={slide.label} className="slider-role-image" />
                          </div>
                        ) : (
                          <span className="slider-icon">{slide.icon}</span>
                        )}
                        <h3>{slide.label}</h3>
                        <p>{slide.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="slider-arrow slider-next"
                onClick={() => handleSlideChange((slideIndex + 1) % ROLES_SLIDES.length)}
                aria-label="Next"
              >
                ›
              </button>
            </div>
            <div className="slider-dots">
              {ROLES_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`dot ${i === slideIndex ? 'active' : ''}`}
                  onClick={() => handleSlideChange(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">Continue as {ROLES_SLIDES[slideIndex].label}</button>
          
          <div className="login-footer" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Don't have an account? <a href="/register" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
