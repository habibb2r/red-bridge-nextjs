'use client'

import { useState } from 'react'
import { SignupForm } from '@/components/auth/SignupForm'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const { signup, loading } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (data: {
    name: string
    email: string
    password: string
    role: 'user' | 'hospital'
    phone: string
  }) => {
    try {
      setError(null)
      await signup(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-red-600">
            <Heart className="h-8 w-8 fill-current" />
            <span>RedBridge</span>
          </Link>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {/* Signup Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Join RedBridge</CardTitle>
            <CardDescription className="text-center">
              Create an account to start saving lives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm 
              onSignup={handleSignup} 
              loading={loading} 
              error={error} 
            />
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Hospital accounts require verification before activation. 
            You&apos;ll receive an email once your account is approved.
          </p>
        </div>
      </div>
    </div>
  )
}
