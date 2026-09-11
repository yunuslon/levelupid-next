'use client'

import { Collapsible } from '@levelupid/ui/components/collapsible'
import { HelpCircle } from 'lucide-react'
import { useReveal } from '../../_hooks/use-reveal'
import { faqSupport } from '../_content/cta'
import { faqs } from '../_content/faqs'
import { SectionBadge } from './section-badge'

export function Faq() {
  const headRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()
  const supportRef = useReveal<HTMLDivElement>()
  return (
    <section id="faq" className="scroll-mt-20 bg-mint-soft py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <div ref={headRef} className="reveal text-center">
          <SectionBadge icon={HelpCircle} label="FAQ" />
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Pertanyaan yang sering{' '}
            <span className="heading-accent">muncul.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-slate-600">
            Semua yang perlu Anda tahu tentang LevelUpID. Tidak menemukan
            jawaban?{' '}
            <a
              href="#kontak"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              Hubungi tim kami.
            </a>
          </p>
        </div>

        <div ref={listRef} className="reveal-group mt-12 space-y-3">
          {faqs.map((faq) => (
            <Collapsible
              key={faq.question}
              className="rounded-2xl border bg-white px-5"
              trigger={
                <span className="text-[15px] font-medium">{faq.question}</span>
              }
            >
              <p className="text-sm leading-relaxed text-slate-600">
                {faq.answer}
              </p>
            </Collapsible>
          ))}
        </div>

        <div
          ref={supportRef}
          className="reveal mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[var(--primary)]/25 bg-mint px-6 py-5 sm:flex-row"
        >
          <div>
            <p className="font-semibold">{faqSupport.title}</p>
            <p className="text-sm text-slate-600">{faqSupport.body}</p>
          </div>
          <a
            href="#kontak"
            className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {faqSupport.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
