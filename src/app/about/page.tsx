import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About · KOKKOS',
  description: 'Learn about KOKKOS, the divine pattern within every human soul, and Kate, the founder.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-48 pb-20 px-8 text-center bg-white">
        <h1 className="font-heading text-[clamp(1.8rem,4.5vw,2.8rem)] font-normal text-sage-dark max-w-[700px] mx-auto leading-snug">
          One divine pattern hidden in plain sight.
        </h1>
      </section>

      {/* Split Section: Kate + What is KOKKOS */}
      <section className="py-20 px-8 md:px-16 bg-white">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/kate.jpg"
              alt="Kate, founder of KOKKOS"
              width={320}
              height={400}
              className="rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] max-w-[320px] md:max-w-full"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="font-heading text-2xl font-medium text-sage-dark mb-6">
              Hi, I&apos;m Kate. I built KOKKOS.
            </p>
            
            <p className="text-[1.05rem] leading-[1.8] text-text-body mb-4">
              KOKKOS is the fruit of a long journey through confusion, suffering, and seeking.
            </p>
            
            <p className="text-[1.05rem] leading-[1.8] text-text-body mb-4">
              For years I searched for something that could make sense of the whole person — not just personality, not just health, not just spirituality. Nothing existed. So I built it.
            </p>
            
            <p className="text-[1.05rem] leading-[1.8] text-text-body mb-4">
              <strong className="text-sage-dark">Christ.OS</strong> is the divine pattern within every human soul. The pattern is universal. The expression is yours alone.
            </p>

            <p className="text-[1.05rem] leading-[1.8] text-text-body">
              I made this for the seekers. The ones who sense there&apos;s more to understand — and more to do.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 px-8 bg-cream">
        <div className="max-w-[600px] mx-auto">
          <p className="text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-sage text-center mb-8">
            Our Values
          </p>
          <div className="flex flex-col gap-6 text-center">
            <p className="font-heading text-[clamp(1.15rem,2.5vw,1.35rem)] leading-relaxed text-text-body">
              <em className="text-sage-dark italic">Simplicity is beauty.</em>
            </p>
            <div className="w-10 h-px bg-sage-pale mx-auto" />
            <p className="font-heading text-[clamp(1.15rem,2.5vw,1.35rem)] leading-relaxed text-text-body">
              Rooted in Christ, curious about truth <em className="text-sage-dark italic">wherever it&apos;s found.</em>
            </p>
            <div className="w-10 h-px bg-sage-pale mx-auto" />
            <p className="font-heading text-[clamp(1.15rem,2.5vw,1.35rem)] leading-relaxed text-text-body">
              Structure reveals. Mystery invites. <em className="text-sage-dark italic">We hold both.</em>
            </p>
            <div className="w-10 h-px bg-sage-pale mx-auto" />
            <p className="font-heading text-[clamp(1.15rem,2.5vw,1.35rem)] leading-relaxed text-text-body">
              Think of yourself less — <em className="text-sage-dark italic">see yourself more clearly.</em>
            </p>
            <div className="w-10 h-px bg-sage-pale mx-auto" />
            <p className="font-heading text-[clamp(1.15rem,2.5vw,1.35rem)] leading-relaxed text-text-body">
              Not data points. <em className="text-sage-dark italic">Flesh, bone, and soul.</em>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-white text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2rem)] font-normal text-sage-dark mb-4 leading-tight">
            Ready to move mountains?
          </h2>
          <p className="text-[1.05rem] text-text-muted mb-8">
            The assessment takes about 10 minutes. The clarity lasts a lifetime.
          </p>
          <Link href="/assessments" className="btn">
            Begin the Assessment
          </Link>
        </div>
      </section>
    </>
  )
}
