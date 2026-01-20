'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-white via-cream to-cream-dark">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="no-underline">
              <span className="block font-semibold text-2xl text-sage-dark">KOKKOS</span>
              <span className="text-[0.65rem] tracking-[0.1em] text-sage-dark">Powered by Christ.OS</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-[0_8px_40px_rgba(107,124,94,0.08)] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sage to-sage-medium rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl text-sage-dark mb-3">Check your email</h2>
            <p className="text-text-body mb-6">
              We&apos;ve sent you a confirmation link. Click it to activate your account.
            </p>
            <Link href="/auth/login" className="text-sage hover:text-sage-dark transition-colors">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-white via-cream to-cream-dark">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="no-underline">
            <span className="block font-semibold text-2xl text-sage-dark">KOKKOS</span>
            <span className="text-[0.65rem] tracking-[0.1em] text-sage-dark">Powered by Christ.OS</span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_40px_rgba(107,124,94,0.08)]">
          <h1 className="font-heading text-2xl text-sage-dark text-center mb-2">
            Create your account
          </h1>
          <p className="text-text-muted text-center mb-8">
            Save your assessment results and track your journey
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="fullName" className="block text-[0.85rem] font-semibold text-sage-dark mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="Your name"
                className="w-full px-4 py-3.5 text-base font-body border border-sage/20 rounded-xl outline-none transition-all focus:border-sage focus:ring-[3px] focus:ring-sage/10 bg-white text-text-dark placeholder:text-sage-light"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-[0.85rem] font-semibold text-sage-dark mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 text-base font-body border border-sage/20 rounded-xl outline-none transition-all focus:border-sage focus:ring-[3px] focus:ring-sage/10 bg-white text-text-dark placeholder:text-sage-light"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-[0.85rem] font-semibold text-sage-dark mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="w-full px-4 py-3.5 text-base font-body border border-sage/20 rounded-xl outline-none transition-all focus:border-sage focus:ring-[3px] focus:ring-sage/10 bg-white text-text-dark placeholder:text-sage-light"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn disabled:bg-sage-light disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-text-muted text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-sage hover:text-sage-dark transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sage-light hover:text-sage transition-colors text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
