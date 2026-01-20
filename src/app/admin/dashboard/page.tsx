import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

// Add admin email addresses here
const ADMIN_EMAILS = ['admin@kokkos.com', 'kate@kokkos.com']

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Check if user is authenticated and is admin
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
    redirect('/')
  }

  // Fetch analytics data
  const [
    { count: totalUsers },
    { count: totalAssessments },
    { count: totalSubscribers },
    { data: recentAssessments },
    { data: assessmentsByType },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('assessment_results').select('*', { count: 'exact', head: true }),
    supabase.from('email_subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('assessment_results')
      .select('assessment_type, completed_at')
      .order('completed_at', { ascending: false })
      .limit(10),
    supabase.from('assessment_results')
      .select('assessment_type')
  ])

  // Calculate assessments by type
  const typeCounts = (assessmentsByType || []).reduce((acc, item) => {
    acc[item.assessment_type] = (acc[item.assessment_type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream to-cream-dark">
      {/* Header */}
      <header className="px-8 py-6 border-b border-sage/10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" className="no-underline">
            <span className="block font-semibold text-xl text-sage-dark">KOKKOS</span>
            <span className="text-[0.55rem] tracking-[0.08em] text-sage-dark">Admin Dashboard</span>
          </Link>
          <Link href="/dashboard" className="text-sage hover:text-sage-dark transition-colors text-sm">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="px-8 py-12">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-heading text-3xl text-sage-dark mb-8">Analytics</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <p className="text-sm text-text-muted mb-1">Total Users</p>
              <p className="font-heading text-4xl text-sage-dark">{totalUsers || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <p className="text-sm text-text-muted mb-1">Assessments Completed</p>
              <p className="font-heading text-4xl text-sage-dark">{totalAssessments || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <p className="text-sm text-text-muted mb-1">Email Subscribers</p>
              <p className="font-heading text-4xl text-sage-dark">{totalSubscribers || 0}</p>
            </div>
          </div>

          {/* Assessments by Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="font-heading text-xl text-sage-dark mb-6">Assessments by Type</h2>
              <div className="space-y-4">
                {Object.entries(typeCounts).map(([type, count]) => (
                  <div key={type}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-text-body capitalize">
                        {type.replace('-', ' ')}
                      </span>
                      <span className="text-sm text-text-muted">{count}</span>
                    </div>
                    <div className="h-2 bg-sage/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sage rounded-full"
                        style={{ width: `${Math.min(100, (count / (totalAssessments || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {Object.keys(typeCounts).length === 0 && (
                  <p className="text-text-muted text-sm">No assessments yet</p>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="font-heading text-xl text-sage-dark mb-6">Recent Assessments</h2>
              <div className="space-y-3">
                {(recentAssessments || []).map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-sage/10 last:border-0">
                    <span className="text-sm text-text-body capitalize">
                      {item.assessment_type.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-text-muted">
                      {new Date(item.completed_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {(recentAssessments || []).length === 0 && (
                  <p className="text-text-muted text-sm">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
