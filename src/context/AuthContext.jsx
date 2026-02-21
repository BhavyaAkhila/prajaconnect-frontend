import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const ROLES = { admin: 'Admin', citizen: 'Citizen', politician: 'Politician', moderator: 'Moderator' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fsad08_user')
    if (saved) try { return JSON.parse(saved) } catch { return null }
    return null
  })

  const login = (role, name = 'User') => {
    const u = { role, name, id: Date.now().toString() }
    setUser(u)
    localStorage.setItem('fsad08_user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fsad08_user')
  }

  const switchRole = (role) => {
    if (!user) return
    const u = { ...user, role }
    setUser(u)
    localStorage.setItem('fsad08_user', JSON.stringify(u))
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
