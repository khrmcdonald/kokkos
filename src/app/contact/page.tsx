'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Implement actual form submission (Supabase or API route)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  return (
    <main className="flex-1 pt-36 pb-20 px-8 flex items-center justify-center min-h-screen">
      <div className="max-w-[800px] w-full grid md:grid-cols-[200px_1fr] gap-16 items-start">
        {/* Intro */}
        <div className="md:sticky md:top-32 text-center md:text-left">
          <Image
            src="/images/kate.jpg"
            alt="Kate"
            width={140}
            height={140}
            className="w-[140px] h-[140px] object-cover object-top rounded-full shadow-[0_12px_40px_rgba(45,58,45,0.15)] mb-6 mx-auto md:mx-0"
          />
          <h1 className="font-heading text-2xl font-normal text-sage-dark mb-3">
            Let&apos;s connect.
          </h1>
          <p className="text-[0.95rem] leading-relaxed text-text-body">
            I&apos;m Kate. I built KOKKOS and I read every message personally.
          </p>
          <p className="text-[0.85rem] text-text-muted mt-4 italic">
            I typically respond within 48 hours.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_40px_rgba(107,124,94,0.08)]">
          {isSuccess ? (
            <div className="text-center py-12 px-8">
              <div className="w-15 h-15 bg-gradient-to-br from-sage to-sage-medium rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl text-sage-dark mb-3">Message sent!</h2>
              <p className="text-text-body">Thank you for reaching out. I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-[0.85rem] font-semibold text-sage-dark mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 text-base font-body border border-sage/20 rounded-xl outline-none transition-all focus:border-sage focus:ring-[3px] focus:ring-sage/10 bg-white text-text-dark placeholder:text-sage-light"
                />
              </div>

              <div className="mb-6">
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
                <label htmlFor="message" className="block text-[0.85rem] font-semibold text-sage-dark mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="What's on your mind?"
                  rows={5}
                  className="w-full px-4 py-3.5 text-base font-body border border-sage/20 rounded-xl outline-none transition-all focus:border-sage focus:ring-[3px] focus:ring-sage/10 bg-white text-text-dark placeholder:text-sage-light resize-y min-h-[150px]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn disabled:bg-sage-light disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
