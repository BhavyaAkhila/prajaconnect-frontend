import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useIssues } from '../../hooks/useApi'
import './MyReports.css'

const statusClass = (s) => ({ open: 'status-open', in_progress: 'status-progress', resolved: 'status-resolved' }[s] || '')

export default function MyReports() {
  const { user } = useAuth()
  const issues = useIssues().filter((i) => i.author === user?.name)

  return (
    <div className="my-reports page">
      <h1>My reports</h1>
      <p className="page-desc">Issues and feedback you have submitted.</p>
      <Link to="/citizen/report" className="btn btn-primary" style={{ marginBottom: '1rem' }}>New report</Link>
      {issues.length === 0 ? (
        <p className="empty">You haven't submitted any reports yet. <Link to="/citizen/report">Report an issue</Link>.</p>
      ) : (
        <ul className="reports-list">
          {issues.map((i) => (
            <li key={i.id} className="report-card">
              <div className="report-header">
                <strong>{i.title}</strong>
                <span className={`status ${statusClass(i.status)}`}>{i.status.replace('_', ' ')}</span>
              </div>
              <span className="meta">{i.category} · {new Date(i.createdAt).toLocaleDateString()}</span>
              {i.description && <p>{i.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
