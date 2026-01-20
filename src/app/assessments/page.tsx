import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Choose Your Journey · KOKKOS',
  description: 'Three assessments. One journey. Know yourself — so you can change the world around you.',
}

const assessments = [
  {
    id: 'seven-seeds',
    number: 'Part One',
    title: 'The Seven Seeds',
    description: 'Discover which areas of your soul are flourishing — and which are blocked.',
    time: '10 min',
    questions: 91,
    badge: 'Free',
    href: '/assessments/seven-seeds',
  },
  {
    id: 'the-balance',
    number: 'Part Two',
    title: 'The Balance',
    description: 'Explore the balance between your masculine and feminine energies — the light and shadow within.',
    time: '10 min',
    questions: 44,
    badge: 'Free',
    href: '/assessments/the-balance',
  },
  {
    id: 'the-compass',
    number: 'Part Three',
    title: 'The Compass of Seasons',
    description: 'Discover your current season — where you are, how you respond to fear, and the doorways to movement.',
    time: '7 min',
    questions: 40,
    badge: 'Free',
    href: '/assessments/the-compass',
  },
]

export default function AssessmentsPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-24 pb-4 flex justify-center">
        <Link href="/" className="text-center no-underline">
          <span className="block font-semibold text-2xl tracking-wide text-sage-dark">KOKKOS</span>
          <span className="text-[0.65rem] tracking-[0.1em] text-sage-dark">Powered by Christ.OS</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="text-center py-12 px-8 max-w-[800px] mx-auto">
        <h1 className="font-heading text-[clamp(2rem,5vw,2.8rem)] font-normal text-sage-dark mb-8 leading-tight">
          Your Journey
        </h1>
        <p className="font-body text-xl leading-relaxed text-text-body max-w-[650px] mx-auto">
          Three assessments. One journey. Know yourself — so you can change the world around you.
        </p>
        <p className="text-base text-sage mt-4 italic">
          A cycle, not a destination.
        </p>
      </section>

      {/* Journey Options */}
      <section className="py-8 px-8 max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {assessments.map((assessment) => (
            <Link
              key={assessment.id}
              href={assessment.href}
              className="bg-white border-2 border-sage/10 rounded-[20px] p-8 no-underline text-inherit transition-all duration-300 hover:border-sage hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(93,122,74,0.12)] relative flex flex-col"
            >
              <span className="absolute top-4 right-4 text-[0.7rem] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full bg-sage text-white">
                {assessment.badge}
              </span>
              <span className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-sage-light mb-2">
                {assessment.number}
              </span>
              <h2 className="font-heading text-2xl font-medium text-sage-dark mb-3">
                {assessment.title}
              </h2>
              <p className="text-[0.95rem] leading-relaxed text-text-body flex-grow mb-6">
                {assessment.description}
              </p>
              <div className="flex items-center gap-4 text-[0.85rem] text-sage-light">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  {assessment.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                  {assessment.questions} questions
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Full Journey Card */}
        <Link
          href="/assessments"
          className="block bg-white border-2 border-sage rounded-[20px] p-8 no-underline text-inherit transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(93,122,74,0.12)] bg-gradient-to-br from-white to-[#f8faf6]"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="relative">
              <span className="absolute -top-2 left-0 text-[0.7rem] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full bg-gradient-to-r from-sage to-sage-dark text-white">
                Best Value
              </span>
              <span className="block text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-sage-light mb-2 mt-8">
                Complete Journey
              </span>
              <h2 className="font-heading text-2xl font-medium text-sage-dark mb-3">
                All Three Assessments
              </h2>
              <p className="text-[0.95rem] leading-relaxed text-text-body">
                Your seeds, your balance, your season. The divine pattern stays the same. Your relationship to it evolves.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="btn">
                Start the Journey
              </span>
              <span className="text-[0.8rem] text-sage-light">
                27 min · One journey
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Back Link */}
      <div className="flex justify-center py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sage no-underline text-[0.95rem] hover:text-sage-dark transition-colors">
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to home
        </Link>
      </div>
    </>
  )
}
