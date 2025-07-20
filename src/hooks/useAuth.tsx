'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export type UserRole = 'user' | 'hospital' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signup: (data: {
    name: string
    email: string
    password: string
    role: UserRole
    phone: string
  }) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, rememberMe = false) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication logic
      if (email === 'admin@redbridge.com' && password === 'admin123') {
        const userData: User = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'admin',
        }
        setUser(userData)
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData))
        }
        router.push('/admin')
      } else if (email.includes('hospital') && password === 'hospital123') {
        const userData: User = {
          id: '2',
          name: 'Hospital Admin',
          email: email,
          role: 'hospital',
        }
        setUser(userData)
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData))
        }
        router.push('/hospital')
      } else if (password === 'user123') {
        const userData: User = {
          id: '3',
          name: 'John Doe',
          email: email,
          role: 'user',
        }
        setUser(userData)
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData))
        }
        router.push('/user')
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (data: {
    name: string
    email: string
    password: string
    role: UserRole
    phone: string
  }) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock signup logic
      const userData: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Redirect based on role
      const redirectPath = data.role === 'hospital' ? '/hospital' : '/user'
      router.push(redirectPath)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  const forgotPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock forgot password logic
    console.log('Password reset email sent to:', email)
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
