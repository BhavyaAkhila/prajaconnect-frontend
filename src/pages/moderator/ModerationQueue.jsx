import React from 'react'
import './ModerationQueue.css'

export default function ModerationQueue() {
  const items = [] // Demo: empty queue; in production would list reported content

  return (
    <div className="moderation-queue page">
      <h1>Moderation queue</h1>
      <p className="page-desc">Review reported content and user interactions. Ensure respectful communication.</p>
      {items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">✓</span>
          <p>No items in the moderation queue. All clear.</p>
        </div>
      ) : (
        <ul className="queue-list">
          {items.map((item) => (
            <li key={item.id} className="queue-item">
              <div className="queue-item-actions">
                <button type="button" className="btn btn-ghost btn-sm">Approve</button>
                <button type="button" className="btn btn-primary btn-sm">Remove</button>
                <button type="button" className="btn btn-ghost btn-sm">Warn user</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
