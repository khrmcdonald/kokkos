import Link from 'next/link'
import { EmailCapture } from '@/components'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-32 pb-16 px-8 overflow-hidden bg-[linear-gradient(135deg,rgba(248,246,243,0.92)_0%,rgba(245,242,237,0.88)_100%),url('/images/hero-bg.jpg')] bg-cover bg-center">
        {/* Chakra gradient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-chakra-root/5 blur-[80px]" />
          <div className="absolute top-[30%] right-[20%] w-[250px] h-[250px] rounded-full bg-chakra-sacral/5 blur-[80px]" />
          <div className="absolute bottom-[20%] left-[30%] w-[280px] h-[280px] rounded-full bg-chakra-heart/5 blur-[80px]" />
          <div className="absolute bottom-[30%] right-[30%] w-[260px] h-[260px] rounded-full bg-chakra-crown/5 blur-[80px]" />
        </div>

        <div className="text-center max-w-[800px] relative z-10">
          <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-light text-sage-dark mb-6 leading-tight">
            <span className="block">Who Am I?</span>
          </h1>
          <p className="font-heading italic text-[clamp(1.1rem,2.5vw,1.5rem)] text-sage-medium mb-8">
            One Question. Quantum Possibilities.
          </p>
          <p className="text-lg text-text-body max-w-[600px] mx-auto leading-relaxed">
            The world&apos;s first comprehensive soul and body assessment grounded in Christian theology and eastern wisdom.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sage-light text-xs tracking-[0.2em] uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-sage-light to-transparent" />
        </div>
      </section>

      {/* Bridge Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-lg text-text-body mb-8">
            <strong className="text-sage-dark">KOKKOS</strong> — the Greek word for seed. A mustard seed can move mountains. Where will you allow it to take you?
          </p>
          <p className="font-heading text-xl text-sage-dark mb-4">
            That chronic pain. That unexplained exhaustion.
          </p>
          <p className="font-heading text-xl text-sage-dark mb-4">
            That feeling that something is off but you can&apos;t name it.
          </p>
          <p className="font-heading text-xl text-sage-dark">
            What if your body and soul have been trying to tell you the same story — and no one taught you how to listen?
          </p>
        </div>
      </section>

      {/* Seeker Section */}
      <section className="py-24 px-8 bg-cream-dark">
        <div className="max-w-[900px] mx-auto">
          <p className="font-heading italic text-xl text-sage-medium mb-4">
            Some things can&apos;t be fixed.
          </p>
          <h2 className="font-heading text-[clamp(1.5rem,4vw,2.5rem)] font-normal text-sage-dark leading-snug">
            They have to be moved. Grief. Guilt. Sorrow. Regret. Fear. The ache in your body that doctors can&apos;t explain. The weight you inherited without knowing.
          </h2>
        </div>
      </section>

      {/* Results Teaser Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-sm tracking-[0.15em] uppercase text-sage mb-4">
            Plant the Seed
          </p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.5rem)] text-sage-dark mb-4">
            The assessment is how you begin.
          </h2>
          <p className="text-lg text-text-body mb-12">
            Your journey starts here. 10 minutes to begin discovering who you really are.
          </p>

          <div className="space-y-6 text-left max-w-[500px] mx-auto mb-12">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-chakra-root mt-1.5 flex-shrink-0" />
              <p className="text-text-body">
                <strong className="text-sage-dark">Understand the connection</strong> — why your body might be holding what your mind forgot
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-chakra-heart mt-1.5 flex-shrink-0" />
              <p className="text-text-body">
                <strong className="text-sage-dark">Know exactly where to focus</strong> — no more guessing what&apos;s wrong or where to start
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-chakra-crown mt-1.5 flex-shrink-0" />
              <p className="text-text-body">
                <strong className="text-sage-dark">Receive your path forward</strong> — personalized virtues grounded in Christian theology, mapped to your growth
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link href="/assessments" className="btn inline-flex items-center gap-2">
              Begin the Assessment
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <p className="text-sm text-sage-light">
              Free · 10 minutes · Deeply personal results
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-8 bg-cream-dark">
        <div className="max-w-[500px] mx-auto text-center">
          <p className="text-sm tracking-[0.15em] uppercase text-sage mb-4">
            Stay Connected
          </p>
          <h2 className="font-heading text-2xl text-sage-dark mb-4">
            Join the journey
          </h2>
          <p className="text-text-body mb-8">
            Receive insights on spiritual growth, body-soul connection, and new assessment tools.
          </p>
          <EmailCapture source="homepage" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-sage-dark to-sage text-white text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.5rem)] font-normal mb-4">
            The answers are already within you.
          </h2>
          <p className="font-heading italic text-xl text-white/85 mb-8">
            Discover the divine pattern within — so you can move the mountains around you.
          </p>
          <Link href="/assessments" className="btn btn-white">
            Begin the Assessment
          </Link>
        </div>
      </section>
    </>
  )
}
