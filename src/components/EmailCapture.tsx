'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface EmailCaptureProps {
  source?: string
  className?: string
  variant?: 'default' | 'footer'
}

export function EmailCapture({ source = 'website', className = '', variant = 'default' }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    setIsLoading(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('email_subscribers')
        .insert([{ email, source }])

      if (error) {
        // Check for duplicate email
        if (error.code === '23505') {
          setStatus('success')
          setEmail('')
          return
        }
        throw error
      }

      setStatus('success')
      setEmail('')
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'success') {
    return (
      <div className={`text-center ${className}`}>
        <div className={`inline-flex items-center gap-2 ${variant === 'footer' ? 'text-sage-dark' : 'text-sage'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">You&apos;re on the list!</span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className={`flex gap-3 ${variant === 'footer' ? 'flex-col sm:flex-row' : ''}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={`flex-1 px-4 py-3 text-base font-body border rounded-xl outline-none transition-all focus:ring-[3px] ${
            variant === 'footer'
              ? 'border-sage/20 bg-white focus:border-sage focus:ring-sage/10'
              : 'border-sage/20 bg-white focus:border-sage focus:ring-sage/10'
          } text-text-dark placeholder:text-sage-light`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-3 font-semibold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
            variant === 'footer'
              ? 'bg-sage text-white hover:bg-sage-dark'
              : 'btn'
          }`}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </form>
  )
}
