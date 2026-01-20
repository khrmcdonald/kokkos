'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[999] transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <header 
        className={`fixed top-0 left-0 right-0 z-[1000] px-12 transition-all duration-400 ${
          scrolled 
            ? 'py-3.5 bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(107,124,94,0.08)]' 
            : 'py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="no-underline">
            <span className="block font-semibold text-2xl text-sage-dark">KOKKOS</span>
            <span className="text-[0.6rem] tracking-[0.08em] text-sage-dark">Powered by Christ.OS</span>
          </Link>

          <nav className={`flex items-center gap-12 max-md:fixed max-md:top-0 max-md:right-0 max-md:h-full max-md:w-[280px] max-md:bg-white max-md:flex-col max-md:items-start max-md:p-8 max-md:pt-24 max-md:gap-0 max-md:shadow-[-10px_0_40px_rgba(0,0,0,0.1)] max-md:z-[1000] max-md:transition-transform max-md:duration-300 ${
            mobileOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'
          }`}>
            <Link href="/" className="nav-link max-md:py-4 max-md:w-full max-md:border-b max-md:border-sage/10">
              Home
            </Link>
            <Link href="/about" className="nav-link max-md:py-4 max-md:w-full max-md:border-b max-md:border-sage/10">
              About
            </Link>
            <Link href="/assessments" className="nav-link max-md:py-4 max-md:w-full max-md:border-b max-md:border-sage/10">
              Assessments
            </Link>
            <Link href="/contact" className="nav-link max-md:py-4 max-md:w-full max-md:border-b max-md:border-sage/10">
              Contact
            </Link>
            <Link href="/assessments" className="btn max-md:mt-6 max-md:w-full max-md:text-center">
              Take Assessment
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="hidden max-md:flex flex-col gap-1.5 p-1 z-[1001]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-[26px] h-0.5 bg-sage-dark rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-[26px] h-0.5 bg-sage-dark rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-[26px] h-0.5 bg-sage-dark rounded transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>
    </>
  )
}
