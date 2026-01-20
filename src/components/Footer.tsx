import Link from 'next/link'
import { EmailCapture } from './EmailCapture'

export function Footer() {
  return (
    <footer className="bg-cream-dark py-16 px-8 border-t border-sage/10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-start flex-wrap gap-12 mb-12 max-md:flex-col">
          {/* Brand */}
          <div className="max-w-[300px]">
            <span className="font-semibold text-2xl text-black block">KOKKOS</span>
            <p className="text-[0.7rem] tracking-[0.1em] text-black mt-1 mb-2">
              Powered by Christ.OS
            </p>
            <p className="font-heading italic text-base text-black mb-2">
              Never stop quietly growing.
            </p>
            <p className="text-sm text-text-body leading-relaxed">
              The world&apos;s first comprehensive soul and body assessment rooted in Christian theology and Eastern wisdom.
            </p>
          </div>

          {/* Newsletter */}
          <div className="max-w-[320px]">
            <h4 className="text-[0.85rem] font-semibold tracking-[0.1em] uppercase text-black mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-text-body mb-4">
              Insights on spiritual growth and new tools.
            </p>
            <EmailCapture source="footer" variant="footer" />
          </div>

          {/* Links */}
          <div className="flex gap-16 max-md:flex-col max-md:gap-8">
            <div>
              <h4 className="text-[0.85rem] font-semibold tracking-[0.1em] uppercase text-black mb-4">
                Assessments
              </h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Link href="/assessments" className="text-sm text-black no-underline hover:text-sage transition-colors">
                    Begin Your Journey
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[0.85rem] font-semibold tracking-[0.1em] uppercase text-black mb-4">
                Company
              </h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Link href="/about" className="text-sm text-black no-underline hover:text-sage transition-colors">
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact" className="text-sm text-black no-underline hover:text-sage transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-sage/10">
          <p className="text-[0.85rem] text-black">
            © {new Date().getFullYear()} KOKKOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
