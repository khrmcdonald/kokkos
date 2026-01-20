import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from './LogoutButton'
import type { AssessmentResult } from '@/lib/supabase/types'

// Assessment display names
const assessmentNames: Record<string, string> = {
  'seven-seeds': 'The Seven Seeds',
  'the-balance': 'The Balance',
  'the-compass': 'The Compass of Seasons',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user's assessment results
  const { data: results } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  const assessmentResults = (results as AssessmentResult[] | null) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream to-cream-dark">
      {/* Header */}
      <header className="px-8 py-6 border-b border-sage/10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" className="no-underline">
            <span className="block font-semibold text-xl text-sage-dark">KOKKOS</span>
            <span className="text-[0.55rem] tracking-[0.08em] text-sage-dark">Powered by Christ.OS</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/assessments" className="text-sage hover:text-sage-dark transition-colors text-sm font-medium">
              Take Assessment
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="font-heading text-3xl text-sage-dark mb-2">
              Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}
            </h1>
            <p className="text-text-muted">
              {user.email}
            </p>
          </div>

          {/* Assessment History */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl text-sage-dark">
                Your Journey
              </h2>
              <Link href="/assessments" className="btn text-sm">
                Start New Assessment
              </Link>
            </div>

            {assessmentResults.length === 0 ? (
              // Empty State
              <div className="bg-white rounded-2xl p-12 shadow-[0_8px_40px_rgba(107,124,94,0.08)] text-center">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-sage-dark mb-3">
                  Begin your journey
                </h3>
                <p className="text-text-body mb-8 max-w-md mx-auto">
                  You haven&apos;t completed any assessments yet. Start with The Seven Seeds to discover which areas of your soul are flourishing.
                </p>
                <Link href="/assessments" className="btn">
                  Take Your First Assessment
                </Link>
              </div>
            ) : (
              // Results Grid
              <div className="grid gap-4">
                {assessmentResults.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(107,124,94,0.06)] border border-sage/10 hover:border-sage/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-lg text-sage-dark mb-1">
                          {assessmentNames[result.assessment_type] || result.assessment_type}
                        </h3>
                        <p className="text-sm text-text-muted">
                          Completed {new Date(result.completed_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <Link
                        href={`/results/${result.id}`}
                        className="text-sage hover:text-sage-dark transition-colors text-sm font-medium flex items-center gap-1"
                      >
                        View Results
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
