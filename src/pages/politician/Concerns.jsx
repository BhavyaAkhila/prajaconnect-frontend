import React from 'react'
import { useIssues } from '../../hooks/useApi'
import './Concerns.css'

export default function Concerns() {
  const issues = useIssues()

  return (
    <div className="concerns page">
      <h1>Citizen concerns</h1>
      <p className="page-desc">View and respond to issues and feedback from citizens.</p>
      {issues.length === 0 ? (
        <p className="empty">No concerns reported yet.</p>
      ) : (
        <ul className="concerns-list">
          {issues.map((i) => (
            <li key={i.id} className="concern-card">
              <div className="concern-header">
                <strong>{i.title}</strong>
                <span className="status-tag">{i.status}</span>
              </div>
              <span className="meta">{i.category} · {i.author} · {new Date(i.createdAt).toLocaleDateString()}</span>
              {i.description && <p>{i.description}</p>}
              <div className="concern-actions">
                <button type="button" className="btn btn-ghost btn-sm">Reply</button>
                <button type="button" className="btn btn-primary btn-sm">Mark in progress</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
