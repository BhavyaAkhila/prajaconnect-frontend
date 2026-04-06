import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const ROLES = { admin: 'Admin', citizen: 'Citizen', politician: 'Politician', moderator: 'Moderator' }
const API_URL = 'http://localhost:8080/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fsad08_user')
    if (saved) try { return JSON.parse(saved) } catch { return null }
    return null
  })

  const login = async (role, name = 'User', password) => {
    const email = `${name.toLowerCase().replace(/\s+/g, '')}@prajaconnect.com`;
    try {
      let res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!res.ok) {
         let regRes = await fetch(`${API_URL}/auth/register`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ name, email, password, role })
         });
         
         res = await fetch(`${API_URL}/auth/login`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email, password })
         });
      }
      
      const data = await res.json();
      const u = { 
         name: data.name, 
         email: data.email, 
         role: data.role.toLowerCase(), 
         id: data.id, 
         jwt: data.token 
      };
      
      setUser(u);
      localStorage.setItem('fsad08_user', JSON.stringify(u));
    } catch(err) {
      console.error("Backend Error:", err);
      alert("Error talking to backend. Is it running on port 8080?");
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fsad08_user')
  }

  const switchRole = (role) => {
    // Unsupported in backend unless we do admin operations
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, ROLES }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
