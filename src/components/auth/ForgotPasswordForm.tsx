'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ArrowLeft } from 'lucide-react'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>
  loading?: boolean
  error?: string | null
  success?: boolean
}

export function ForgotPasswordForm({ onSubmit, loading = false, error, success }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const handleFormSubmit = async (data: ForgotPasswordFormData) => {
    await onSubmit(data.email)
  }

  if (success) {
    return (
      <div className="space-y-6">
        <Alert>
          <AlertDescription>
            We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
          </AlertDescription>
        </Alert>
        
        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-red-600 hover:text-red-700 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          {...register('email')}
          className="w-full"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Reset Link
      </Button>

      <div className="text-center">
        <Link
          href="/auth/login"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-700 hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>
      </div>
    </form>
  )
}
