'use client'

import { useState } from 'react'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleForgotPassword = async (email: string) => {
    try {
      setError(null)
      setLoading(true)
      await forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
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
          <p className="text-gray-600 mt-2">Reset your password</p>
        </div>

        {/* Forgot Password Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {success ? 'Check Your Email' : 'Forgot Password?'}
            </CardTitle>
            <CardDescription className="text-center">
              {success 
                ? 'We\'ve sent you a password reset link'
                : 'Enter your email address and we\'ll send you a link to reset your password'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm 
              onSubmit={handleForgotPassword} 
              loading={loading} 
              error={error}
              success={success}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
