import React from 'react'
import { getUsers } from '../../data/demoStore'
import './UserManagement.css'

export default function UserManagement() {
  const users = getUsers()

  return (
    <div className="user-management page">
      <h1>User management</h1>
      <p className="page-desc">Manage user accounts and roles. Ensure data integrity across the platform.</p>
      {users.length === 0 ? (
        <p className="empty">No users in the system.</p>
      ) : (
        <div className="table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td><span className="role-badge">{u.role}</span></td>
                  <td>
                    <button type="button" className="btn btn-ghost btn-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
