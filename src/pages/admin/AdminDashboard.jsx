import React from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../../data/demoStore'
import { useIssues, useUpdates } from '../../hooks/useApi'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const issues = useIssues()
  const updates = useUpdates()
  const users = getUsers()

  return (
    <div className="admin-dashboard page">
      <h1>Admin dashboard</h1>
      <p className="page-desc">Oversee platform operations, manage user roles, and ensure data integrity.</p>
      <div className="dashboard-actions">
        <Link to="/admin/users" className="card card-action">
          <span className="card-icon">👥</span>
          <h3>User management</h3>
          <p>Manage user accounts and roles.</p>
        </Link>
      </div>
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{users.length}</span>
          <span className="stat-label">Users</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{issues.length}</span>
          <span className="stat-label">Issues reported</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{updates.length}</span>
          <span className="stat-label">Politician updates</span>
        </div>
      </section>
    </div>
  )
}
