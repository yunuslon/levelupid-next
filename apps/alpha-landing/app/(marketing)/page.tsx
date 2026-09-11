import { AnalyticsPreview } from './_components/analytics-preview'
import { CapabilityChips } from './_components/capability-chips'
import { ContactSection } from './_components/contact-section'
import { CtaSection } from './_components/cta-section'
import { DemoTheme } from './_components/demo-theme'
import { Faq } from './_components/faq'
import { Features } from './_components/features'
import { FreePanel } from './_components/free-panel'
import { Hero } from './_components/hero'
import { HowItWorks } from './_components/how-it-works'
import { Partners } from './_components/partners'
import { StatsBand } from './_components/stats-band'
import { Testimonials } from './_components/testimonials'

export const revalidate = 3600 // ISR: 1 hour

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <CapabilityChips />
      <Features />
      <FreePanel />
      <AnalyticsPreview />
      <DemoTheme />
      <HowItWorks />
      <Testimonials />
      <StatsBand />
      <Faq />
      <ContactSection />
      <Partners />
      <CtaSection />
    </>
  )
}
