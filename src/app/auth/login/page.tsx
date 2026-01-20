'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
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
            Welcome back
          </h1>
          <p className="text-text-muted text-center mb-8">
            Sign in to view your assessment results
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
                placeholder="Your password"
                className="w-full px-4 py-3.5 text-base font-body border border-sage/20 rounded-xl outline-none transition-all focus:border-sage focus:ring-[3px] focus:ring-sage/10 bg-white text-text-dark placeholder:text-sage-light"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn disabled:bg-sage-light disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-text-muted text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-sage hover:text-sage-dark transition-colors font-medium">
              Create one
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
