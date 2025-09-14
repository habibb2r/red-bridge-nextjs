/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import apiService from '@/lib/api'
import {jwtDecode} from 'jwt-decode'


export type UserRole = 'user' | 'hospital' | 'admin'

export interface User {
  id: string
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

  console.log(user, loading);
  useEffect(() => {
    // Restore user session from accessToken in cookies
    console.log("Restoring user session...");
    function getCookie(name: string) {
      if (typeof document === 'undefined') return null;
      const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }

    const decodeJWT = async (token: string) => {
      try {
        const decodeData = await jwtDecode(token) as User;
        return decodeData;
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
      }
    }
    const accessToken = getCookie('accessToken');
    console.log("Access Token:", accessToken);
    if (accessToken) {
      (async () => {
        const decoded = await decodeJWT(accessToken);
        if (decoded) {
          setUser(decoded);
          console.log("Decoded User:", decoded);
        }
        setLoading(false);
      })();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiService.login({ email, password });
      console.log('Login response:', response);
      const envelope: any = response.data;
      if (response?.success && envelope?.data) {
        const { user: userData, accessToken: token } = envelope.data;
        console.log('User data:', userData);
        setUser(userData);
        // Set accessToken in cookie (expires in 7 days)
        document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; secure`;
        // Redirect based on role
        switch (userData.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'hospital':
            router.push('/hospital');
            break;
          default:
            router.push('/user');
            break;
        }
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const signup = async (data: {
    name: string
    email: string
    password: string
    role: 'user' | 'hospital'
    phoneNumber: string
  }) => {
    setLoading(true);
    try {
      const response = await apiService.signup(data);
      const envelope: any = response.data;
      if (envelope?.success && envelope?.data) {
        const { user: userData, token } = envelope.data;
        setUser(userData);
        // Set accessToken in cookie (expires in 7 days)
        document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; secure`;
        // Redirect based on role
        const redirectPath = userData.role === 'hospital' ? '/hospital' : '/user';
        router.push(redirectPath);
      } else {
        throw new Error(response.error || 'Signup failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    // Call API logout if needed
    apiService.logout().catch(() => {
      // Continue with local logout even if API call fails
    });
    setUser(null);
    // Remove accessToken cookie
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    router.push('/');
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
