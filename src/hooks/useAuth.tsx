/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import apiService, { LoginResponse } from '@/lib/api'

export type UserRole = 'user' | 'hospital' | 'admin'

export interface User {
  _id?: string
  name: string
  email: string
  role: UserRole
  phoneNumber?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signup: (data: {
    name: string
    email: string
    password: string
    role: 'user' | 'hospital'
    phoneNumber: string
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
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        
        // Optionally verify token with backend
        apiService.getProfile().then((response) => {
          if (response.success && response.data) {
            setUser(response.data)
          } else {
            // Token might be invalid, clear storage
            localStorage.removeItem('user')
            localStorage.removeItem('token')
          }
        }).catch(() => {
          // Error verifying token, clear storage
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        })
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await apiService.login({ email, password });
      console.log('Login response:', response)
      const envelope: any = response.data;
      if (response?.success && envelope?.data) {
        const { user: userData, accessToken: token } = envelope.data;
        console.log('User data:', userData)
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        // Set accessToken in cookie (expires in 7 days)
        document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; secure`;
        // Redirect based on role
        switch (userData.role) {
          case 'admin':
            router.push('/admin')
            break
          case 'hospital':
            router.push('/hospital')
            break
          default:
            router.push('/user')
            break
        }
      } else {
        throw new Error(response.error || 'Login failed')
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
    role: 'user' | 'hospital'
    phoneNumber: string
  }) => {
    setLoading(true)
    try {
      const response = await apiService.signup(data)
      const envelope: any = response.data;
      if (envelope?.success && envelope?.data) {
        const { user: userData, token } = envelope.data;
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token)
        // Set accessToken in cookie (expires in 7 days)
        document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; secure`;
        // Redirect based on role
        const redirectPath = userData.role === 'hospital' ? '/hospital' : '/user'
        router.push(redirectPath)
      } else {
        throw new Error(response.error || 'Signup failed')
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // Call API logout if needed
    apiService.logout().catch(() => {
      // Continue with local logout even if API call fails
    })
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    // Remove accessToken cookie
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    router.push('/')
  }

  const forgotPassword = async (email: string) => {
    const response = await apiService.forgotPassword({ email })
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to send reset email')
    }
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
