import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { addIssue } from '../../data/demoStore'
import './ReportIssue.css'

const CATEGORIES = ['Infrastructure', 'Environment', 'Safety', 'Healthcare', 'Education', 'Other']

export default function ReportIssue() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Infrastructure')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addIssue({ title, category, description, author: user?.name || 'Citizen' })
    navigate('/citizen/reports')
  }

  return (
    <div className="report-issue page">
      <h1>Report an issue</h1>
      <p className="page-desc">Describe the issue or feedback you want to share with your representatives.</p>
      <form onSubmit={handleSubmit} className="form-card">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief title for the issue"
            required
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue or feedback in detail..."
            rows={5}
          />
        </label>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary">Submit report</button>
        </div>
      </form>
    </div>
  )
}
