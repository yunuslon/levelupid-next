import { z } from 'zod'

export const StatItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string(),
})

export const TestimonialItemSchema = z.object({
  author_name: z.string(),
  author_role: z.string(),
  company_name: z.string(),
  quote: z.string(),
  rating: z.number().min(1).max(5),
})

export const FaqItemSchema = z.object({
  category: z.string(),
  question: z.string(),
  answer: z.string(),
})

export const CtaSectionSchema = z.object({
  code: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  button_label: z.string(),
  button_url: z.string(),
  background_color: z.string().nullable(),
})

export const SiteSettingsSchema = z.object({
  'site.logo_url': z.string(),
  'site.contact_email': z.string(),
  'site.instagram_url': z.string(),
  'site.ga_measurement_id': z.string(),
  'site.maintenance_mode': z.string(),
  'site.contact_phone': z.string(),
  'site.meta_pixel_id': z.string(),
  'site.facebook_url': z.string(),
  'site.favicon_url': z.string(),
  'site.whatsapp': z.string(),
  'site.tagline': z.string(),
  'site.tiktok_url': z.string(),
  'site.address': z.string(),
})

export const LandingContentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    stats: z.array(StatItemSchema),
    testimonials: z.array(TestimonialItemSchema),
    faqs: z.array(FaqItemSchema),
    cta: z.object({
      home_bottom: CtaSectionSchema,
    }),
    site: SiteSettingsSchema,
  }),
  meta: z.object({
    request_id: z.string(),
    timestamp: z.string(),
  }),
})

export type StatItem = z.infer<typeof StatItemSchema>
export type TestimonialItem = z.infer<typeof TestimonialItemSchema>
export type FaqItem = z.infer<typeof FaqItemSchema>
export type CtaSection = z.infer<typeof CtaSectionSchema>
export type SiteSettings = z.infer<typeof SiteSettingsSchema>
export type LandingContentResponse = z.infer<
  typeof LandingContentResponseSchema
>
