'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AssessmentFlow } from '@/components'
import { sevenSeedsQuestions, calculateSevenSeedsScores, seeds, getSeedInterpretation } from '@/data/assessments'
import { createClient } from '@/lib/supabase/client'
import type { SevenSeedsScores, SeedId } from '@/data/assessments/types'

type Gender = 'male' | 'female' | null
type Stage = 'intro' | 'assessment' | 'results'

export default function SevenSeedsPage() {
  const router = useRouter()
  const [stage, setStage] = useState<Stage>('intro')
  const [gender, setGender] = useState<Gender>(null)
  const [scores, setScores] = useState<SevenSeedsScores | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [savedToAccount, setSavedToAccount] = useState(false)

  const handleStartAssessment = (selectedGender: Gender) => {
    setGender(selectedGender)
    setStage('assessment')
  }

  const handleComplete = async (answers: Record<string, number>) => {
    const calculatedScores = calculateSevenSeedsScores(answers)
    setScores(calculatedScores)
    setStage('results')

    // Try to save to database
    setIsSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('assessment_results')
        .insert({
          user_id: user?.id || null,
          assessment_type: 'seven-seeds',
          gender,
          answers,
          scores: calculatedScores,
        })

      if (!error && user) {
        setSavedToAccount(true)
      }
    } catch (err) {
      console.error('Error saving results:', err)
    } finally {
      setIsSaving(false)
    }
  }

  // Intro Stage - Gender Selection
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-cream to-cream-dark flex flex-col">
        {/* Header */}
        <div className="pt-8 pb-4 flex justify-center">
          <Link href="/assessments" className="text-center no-underline">
            <span className="block font-semibold text-2xl tracking-wide text-sage-dark">KOKKOS</span>
            <span className="text-[0.65rem] tracking-[0.1em] text-sage-dark">Powered by Christ.OS</span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-[500px] text-center">
            <span className="text-sm tracking-[0.15em] uppercase text-chakra-root mb-4 block">
              Part One
            </span>
            <h1 className="font-heading text-4xl text-sage-dark mb-4">
              The Seven Seeds
            </h1>
            <p className="text-lg text-text-body mb-8">
              Discover which areas of your soul are flourishing — and which are blocked.
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
                91 questions
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
        questions={sevenSeedsQuestions}
        onComplete={handleComplete}
        title="The Seven Seeds"
        accentColor="#E53935"
      />
    )
  }

  // Results Stage
  if (stage === 'results' && scores) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-cream to-cream-dark">
        {/* Header */}
        <div className="pt-8 pb-4 flex justify-center">
          <Link href="/" className="text-center no-underline">
            <span className="block font-semibold text-2xl tracking-wide text-sage-dark">KOKKOS</span>
            <span className="text-[0.65rem] tracking-[0.1em] text-sage-dark">Powered by Christ.OS</span>
          </Link>
        </div>

        {/* Results Content */}
        <div className="max-w-[800px] mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl text-sage-dark mb-3">
              Your Seven Seeds
            </h1>
            <p className="text-text-body">
              Here&apos;s what your assessment reveals about your soul&apos;s energy centers.
            </p>
            
            {savedToAccount && (
              <p className="text-sm text-sage mt-4">
                ✓ Results saved to your account
              </p>
            )}
          </div>

          {/* Seeds Grid */}
          <div className="space-y-4 mb-12">
            {seeds.map((seed) => {
              const seedScore = scores[seed.id as SeedId]
              return (
                <div 
                  key={seed.id}
                  className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                      style={{ backgroundColor: seed.color }}
                    >
                      {seedScore.percentage}%
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-lg text-sage-dark">
                          {seed.name}
                        </h3>
                        <span 
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${seed.color}20`,
                            color: seed.color 
                          }}
                        >
                          {seedScore.level}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted mb-3">{seed.theme}</p>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-sage/10 rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${seedScore.percentage}%`,
                            backgroundColor: seed.color 
                          }}
                        />
                      </div>
                      
                      <p className="text-sm text-text-body">
                        {getSeedInterpretation(seed.id, seedScore.level)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            {!savedToAccount ? (
              <>
                <h3 className="font-heading text-xl text-sage-dark mb-3">
                  Save your results
                </h3>
                <p className="text-text-body mb-6">
                  Create an account to track your progress over time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/signup" className="btn">
                    Create Account
                  </Link>
                  <Link 
                    href="/assessments" 
                    className="px-6 py-3 text-sage hover:text-sage-dark transition-colors"
                  >
                    Continue as guest
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-heading text-xl text-sage-dark mb-3">
                  Continue your journey
                </h3>
                <p className="text-text-body mb-6">
                  Take The Balance assessment to explore your masculine and feminine energies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/assessments/the-balance" className="btn">
                    Take The Balance
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="px-6 py-3 text-sage hover:text-sage-dark transition-colors"
                  >
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
