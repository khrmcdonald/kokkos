import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { seeds, getSeedInterpretation } from '@/data/assessments/seven-seeds'
import { seasons, fearResponses } from '@/data/assessments/the-compass'
import type { SeedId, SeasonId, SevenSeedsScores, BalanceScore, CompassScores } from '@/data/assessments/types'

const assessmentTitles: Record<string, string> = {
  'seven-seeds': 'The Seven Seeds',
  'the-balance': 'The Balance',
  'the-compass': 'The Compass of Seasons',
}

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: result, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !result) {
    notFound()
  }

  const scores = result.scores as SevenSeedsScores | BalanceScore | CompassScores
  const title = assessmentTitles[result.assessment_type] || result.assessment_type

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream to-cream-dark">
      {/* Header */}
      <div className="pt-8 pb-4 flex justify-center">
        <Link href="/" className="text-center no-underline">
          <span className="block font-semibold text-2xl tracking-wide text-sage-dark">KOKKOS</span>
          <span className="text-[0.65rem] tracking-[0.1em] text-sage-dark">Powered by Christ.OS</span>
        </Link>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-sm text-text-muted">Assessment Results</span>
          <h1 className="font-heading text-3xl text-sage-dark mt-2">{title}</h1>
          <p className="text-sm text-text-muted mt-2">
            Completed {new Date(result.completed_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Seven Seeds Results */}
        {result.assessment_type === 'seven-seeds' && (
          <div className="space-y-4 mb-8">
            {seeds.map((seed) => {
              const seedScores = scores as SevenSeedsScores
              const seedScore = seedScores[seed.id as SeedId]
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
                        <h3 className="font-heading text-lg text-sage-dark">{seed.name}</h3>
                        <span 
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${seed.color}20`, color: seed.color }}
                        >
                          {seedScore.level}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted mb-3">{seed.theme}</p>
                      <div className="h-2 bg-sage/10 rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full rounded-full"
                          style={{ width: `${seedScore.percentage}%`, backgroundColor: seed.color }}
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
        )}

        {/* Balance Results */}
        {result.assessment_type === 'the-balance' && (
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-8">
            {(() => {
              const balanceScores = scores as BalanceScore
              return (
                <>
                  <div className="text-center mb-8">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      balanceScores.dominantEnergy === 'balanced' 
                        ? 'bg-sage/10 text-sage' 
                        : balanceScores.dominantEnergy === 'masculine'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-pink-100 text-pink-700'
                    }`}>
                      {balanceScores.dominantEnergy === 'balanced' 
                        ? 'Beautifully Balanced' 
                        : balanceScores.dominantEnergy === 'masculine'
                          ? 'Masculine Dominant'
                          : 'Feminine Dominant'}
                    </span>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-pink-600">Feminine {balanceScores.feminine}%</span>
                      <span className="text-blue-600">Masculine {balanceScores.masculine}%</span>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-pink-200 via-gray-100 to-blue-200 rounded-full relative">
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-400" />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-sage-dark rounded-full border-2 border-white shadow-md"
                        style={{ left: `${50 + balanceScores.balance / 2}%`, transform: 'translate(-50%, -50%)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-pink-500" />
                        <span className="text-sm font-medium text-text-body">Feminine Energy</span>
                      </div>
                      <div className="h-3 bg-pink-100 rounded-full overflow-hidden">
                        <div className="h-full bg-pink-500 rounded-full" style={{ width: `${balanceScores.feminine}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm font-medium text-text-body">Masculine Energy</span>
                      </div>
                      <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${balanceScores.masculine}%` }} />
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        )}

        {/* Compass Results */}
        {result.assessment_type === 'the-compass' && (
          <>
            {(() => {
              const compassScores = scores as CompassScores
              const currentSeasonData = seasons.find(s => s.id === compassScores.currentSeason)
              const fearResponseData = fearResponses.find(f => f.id === compassScores.fearResponse)

              return (
                <>
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
                          <span className="text-sm font-medium text-text-muted">Current Season</span>
                          <h2 className="font-heading text-2xl text-sage-dark mb-2">{currentSeasonData.name}</h2>
                          <p className="text-text-body">{currentSeasonData.description}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {fearResponseData && (
                    <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-8">
                      <h3 className="font-heading text-lg text-sage-dark mb-4">Fear Response: {fearResponseData.name}</h3>
                      <p className="text-text-body mb-3">{fearResponseData.description}</p>
                      <p className="text-sm text-sage"><strong>Growth:</strong> {fearResponseData.growth}</p>
                    </div>
                  )}
                </>
              )
            })()}
          </>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/assessments" className="btn">Take Another Assessment</Link>
          <Link href="/dashboard" className="px-6 py-3 text-sage hover:text-sage-dark transition-colors text-center">
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
