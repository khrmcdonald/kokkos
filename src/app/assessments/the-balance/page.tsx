'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AssessmentFlow } from '@/components'
import { balanceQuestions, calculateBalanceScores, getBalanceInterpretation } from '@/data/assessments'
import { createClient } from '@/lib/supabase/client'
import type { BalanceScore } from '@/data/assessments/types'

type Gender = 'male' | 'female' | null
type Stage = 'intro' | 'assessment' | 'results'

export default function TheBalancePage() {
  const [stage, setStage] = useState<Stage>('intro')
  const [gender, setGender] = useState<Gender>(null)
  const [scores, setScores] = useState<BalanceScore | null>(null)
  const [savedToAccount, setSavedToAccount] = useState(false)

  const handleStartAssessment = (selectedGender: Gender) => {
    setGender(selectedGender)
    setStage('assessment')
  }

  const handleComplete = async (answers: Record<string, number>) => {
    const calculatedScores = calculateBalanceScores(answers)
    setScores(calculatedScores)
    setStage('results')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('assessment_results')
        .insert({
          user_id: user?.id || null,
          assessment_type: 'the-balance',
          gender,
          answers,
          scores: calculatedScores,
        })

      if (!error && user) {
        setSavedToAccount(true)
      }
    } catch (err) {
      console.error('Error saving results:', err)
    }
  }

  // Intro Stage
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-cream to-cream-dark flex flex-col">
        <div className="pt-8 pb-4 flex justify-center">
          <Link href="/assessments" className="text-center no-underline">
            <span className="block font-semibold text-2xl tracking-wide text-sage-dark">KOKKOS</span>
            <span className="text-[0.65rem] tracking-[0.1em] text-sage-dark">Powered by Christ.OS</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-[500px] text-center">
            <span className="text-sm tracking-[0.15em] uppercase text-chakra-sacral mb-4 block">
              Part Two
            </span>
            <h1 className="font-heading text-4xl text-sage-dark mb-4">
              The Balance
            </h1>
            <p className="text-lg text-text-body mb-8">
              Explore the balance between your masculine and feminine energies — the light and shadow within.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-text-muted mb-12">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                10 minutes
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                44 questions
              </span>
            </div>

            <p className="text-text-muted mb-8">
              To provide the most relevant insights, please select:
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleStartAssessment('female')}
                className="px-8 py-4 bg-white border-2 border-sage/20 rounded-xl font-medium text-sage-dark hover:border-sage hover:bg-sage/5 transition-all"
              >
                I identify as Female
              </button>
              <button
                onClick={() => handleStartAssessment('male')}
                className="px-8 py-4 bg-white border-2 border-sage/20 rounded-xl font-medium text-sage-dark hover:border-sage hover:bg-sage/5 transition-all"
              >
                I identify as Male
              </button>
            </div>

            <Link 
              href="/assessments" 
              className="inline-flex items-center gap-2 text-sage mt-12 hover:text-sage-dark transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to assessments
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Assessment Stage
  if (stage === 'assessment') {
    return (
      <AssessmentFlow
        questions={balanceQuestions}
        onComplete={handleComplete}
        title="The Balance"
        accentColor="#FB8C00"
      />
    )
  }

  // Results Stage
  if (stage === 'results' && scores) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-cream to-cream-dark">
        <div className="pt-8 pb-4 flex justify-center">
          <Link href="/" className="text-center no-underline">
            <span className="block font-semibold text-2xl tracking-wide text-sage-dark">KOKKOS</span>
            <span className="text-[0.65rem] tracking-[0.1em] text-sage-dark">Powered by Christ.OS</span>
          </Link>
        </div>

        <div className="max-w-[700px] mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl text-sage-dark mb-3">
              Your Balance
            </h1>
            <p className="text-text-body">
              The interplay of your masculine and feminine energies.
            </p>
            {savedToAccount && (
              <p className="text-sm text-sage mt-4">✓ Results saved to your account</p>
            )}
          </div>

          {/* Balance Visualization */}
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-8">
            {/* Dominant Energy Badge */}
            <div className="text-center mb-8">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                scores.dominantEnergy === 'balanced' 
                  ? 'bg-sage/10 text-sage' 
                  : scores.dominantEnergy === 'masculine'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-pink-100 text-pink-700'
              }`}>
                {scores.dominantEnergy === 'balanced' 
                  ? 'Beautifully Balanced' 
                  : scores.dominantEnergy === 'masculine'
                    ? 'Masculine Dominant'
                    : 'Feminine Dominant'}
              </span>
            </div>

            {/* Balance Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-pink-600">Feminine {scores.feminine}%</span>
                <span className="text-blue-600">Masculine {scores.masculine}%</span>
              </div>
              <div className="h-4 bg-gradient-to-r from-pink-200 via-gray-100 to-blue-200 rounded-full relative">
                {/* Center marker */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-400" />
                {/* Balance indicator */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-sage-dark rounded-full border-2 border-white shadow-md transition-all duration-500"
                  style={{ 
                    left: `${50 + scores.balance / 2}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>
            </div>

            {/* Energy Bars */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  <span className="text-sm font-medium text-text-body">Feminine Energy</span>
                </div>
                <div className="h-3 bg-pink-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${scores.feminine}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-1">
                  Receptivity, intuition, nurturing, flow
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-text-body">Masculine Energy</span>
                </div>
                <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${scores.masculine}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-1">
                  Action, logic, protection, structure
                </p>
              </div>
            </div>

            {/* Interpretation */}
            <div className="bg-cream/50 rounded-lg p-6">
              <h3 className="font-heading text-lg text-sage-dark mb-3">What this means</h3>
              <p className="text-text-body leading-relaxed">
                {getBalanceInterpretation(scores)}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            {!savedToAccount ? (
              <>
                <h3 className="font-heading text-xl text-sage-dark mb-3">Save your results</h3>
                <p className="text-text-body mb-6">Create an account to track your progress over time.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/signup" className="btn">Create Account</Link>
                  <Link href="/assessments" className="px-6 py-3 text-sage hover:text-sage-dark transition-colors">
                    Continue as guest
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-heading text-xl text-sage-dark mb-3">Continue your journey</h3>
                <p className="text-text-body mb-6">Take The Compass to discover your current season.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/assessments/the-compass" className="btn">Take The Compass</Link>
                  <Link href="/dashboard" className="px-6 py-3 text-sage hover:text-sage-dark transition-colors">
                    View Dashboard
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}
