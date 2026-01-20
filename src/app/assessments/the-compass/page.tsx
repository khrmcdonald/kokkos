'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AssessmentFlow } from '@/components'
import { compassQuestions, calculateCompassScores, seasons, fearResponses, getSeasonInterpretation } from '@/data/assessments'
import { createClient } from '@/lib/supabase/client'
import type { CompassScores, SeasonId } from '@/data/assessments/types'

type Gender = 'male' | 'female' | null
type Stage = 'intro' | 'assessment' | 'results'

export default function TheCompassPage() {
  const [stage, setStage] = useState<Stage>('intro')
  const [gender, setGender] = useState<Gender>(null)
  const [scores, setScores] = useState<CompassScores | null>(null)
  const [savedToAccount, setSavedToAccount] = useState(false)

  const handleStartAssessment = (selectedGender: Gender) => {
    setGender(selectedGender)
    setStage('assessment')
  }

  const handleComplete = async (answers: Record<string, number>) => {
    const calculatedScores = calculateCompassScores(answers)
    setScores(calculatedScores)
    setStage('results')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('assessment_results')
        .insert({
          user_id: user?.id || null,
          assessment_type: 'the-compass',
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
            <span className="text-sm tracking-[0.15em] uppercase text-chakra-heart mb-4 block">
              Part Three
            </span>
            <h1 className="font-heading text-4xl text-sage-dark mb-4">
              The Compass of Seasons
            </h1>
            <p className="text-lg text-text-body mb-8">
              Discover your current season — where you are, how you respond to fear, and the doorways to movement.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-text-muted mb-12">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                7 minutes
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                40 questions
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
        questions={compassQuestions}
        onComplete={handleComplete}
        title="The Compass of Seasons"
        accentColor="#43A047"
      />
    )
  }

  // Results Stage
  if (stage === 'results' && scores) {
    const currentSeasonData = seasons.find(s => s.id === scores.currentSeason)
    const fearResponseData = fearResponses.find(f => f.id === scores.fearResponse)

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
              Your Compass
            </h1>
            <p className="text-text-body">
              Your current season and how you respond to fear.
            </p>
            {savedToAccount && (
              <p className="text-sm text-sage mt-4">✓ Results saved to your account</p>
            )}
          </div>

          {/* Current Season */}
          {currentSeasonData && (
            <div 
              className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-6"
              style={{ borderLeft: `4px solid ${currentSeasonData.color}` }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shrink-0"
                  style={{ backgroundColor: currentSeasonData.color }}
                >
                  {currentSeasonData.name === 'Spring' && '🌱'}
                  {currentSeasonData.name === 'Summer' && '☀️'}
                  {currentSeasonData.name === 'Fall' && '🍂'}
                  {currentSeasonData.name === 'Winter' && '❄️'}
                </div>
                <div>
                  <span className="text-sm font-medium text-text-muted">You are in</span>
                  <h2 className="font-heading text-2xl text-sage-dark mb-2">{currentSeasonData.name}</h2>
                  <p className="text-sm text-text-muted mb-3">{currentSeasonData.theme}</p>
                  <p className="text-text-body">{currentSeasonData.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {currentSeasonData.qualities.map(q => (
                      <span 
                        key={q}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${currentSeasonData.color}20`, color: currentSeasonData.color }}
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Season Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-6">
            <h3 className="font-heading text-lg text-sage-dark mb-4">All Seasons</h3>
            <div className="space-y-4">
              {seasons.map(season => {
                const score = scores.seasonScores[season.id as SeasonId]
                return (
                  <div key={season.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium" style={{ color: season.color }}>
                        {season.name}
                      </span>
                      <span className="text-sm text-text-muted">{score.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${score.percentage}%`, backgroundColor: season.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Fear Response */}
          {fearResponseData && (
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-8">
              <h3 className="font-heading text-lg text-sage-dark mb-4">Your Fear Response</h3>
              <div className="bg-cream/50 rounded-lg p-4 mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-sage/10 text-sage mb-3">
                  {fearResponseData.name}
                </span>
                <p className="text-text-body mb-3">{fearResponseData.description}</p>
                <p className="text-sm text-text-muted mb-2">
                  <strong>Shadow:</strong> {fearResponseData.shadow}
                </p>
                <p className="text-sm text-sage">
                  <strong>Growth:</strong> {fearResponseData.growth}
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-white rounded-xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            {!savedToAccount ? (
              <>
                <h3 className="font-heading text-xl text-sage-dark mb-3">Save your results</h3>
                <p className="text-text-body mb-6">Create an account to track your journey over time.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/signup" className="btn">Create Account</Link>
                  <Link href="/assessments" className="px-6 py-3 text-sage hover:text-sage-dark transition-colors">
                    Continue as guest
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-heading text-xl text-sage-dark mb-3">Journey Complete!</h3>
                <p className="text-text-body mb-6">You&apos;ve completed all three assessments. View your full profile.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard" className="btn">View Dashboard</Link>
                  <Link href="/assessments" className="px-6 py-3 text-sage hover:text-sage-dark transition-colors">
                    Take Again
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
