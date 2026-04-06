import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:8080/api';

export function useIssues() {
  const [issues, setIssues] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    fetch(`${API_BASE}/issues`, {
      headers: { ...(user?.jwt ? { Authorization: `Bearer ${user.jwt}` } : {}) }
    })
    .then(r => r.json())
    .then(data => {
      // Map backend fields to what frontend expects
      const mapped = data.map(d => ({
         ...d,
         author: d.author?.name || 'Unknown',
         createdAt: new Date(d.createdAt).getTime()
      }));
      setIssues(mapped);
    })
    .catch(console.error);
  }, [user]);

  return issues;
}

export function useUpdates() {
  const [updates, setUpdates] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    fetch(`${API_BASE}/updates`, {
      headers: { ...(user?.jwt ? { Authorization: `Bearer ${user.jwt}` } : {}) }
    })
    .then(r => r.json())
    .then(data => {
      const mapped = data.map(d => ({
         ...d,
         author: d.author?.name || 'Unknown',
         createdAt: new Date(d.createdAt).getTime()
      }));
      setUpdates(mapped);
    })
    .catch(console.error);
  }, [user]);

  return updates;
}

export async function addIssueAPI(issueData, jwt) {
  const res = await fetch(`${API_BASE}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
    },
    body: JSON.stringify(issueData)
  });
  return res.json();
}

export async function addUpdateAPI(updateData, jwt) {
  const res = await fetch(`${API_BASE}/updates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
    },
    body: JSON.stringify(updateData)
  });
  return res.json();
}
