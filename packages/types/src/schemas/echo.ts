import { z } from 'zod'

export const EchoNextScreenSchema = z.enum([
  'wizard',
  'provisioning',
  'provisioning_failed',
  'suspended',
  'dashboard',
])

export const EchoLoginResponseSchema = z.object({
  token: z.string(),
  token_type: z.literal('Bearer'),
  expires_at: z.string(),
  user: z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.email(),
    is_owner: z.boolean(),
    tenant_id: z.number(),
  }),
})

export const EchoCategorySchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
})

export const EchoThemeSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  preview_image_url: z.url().nullable(),
  default_config: z.record(z.string(), z.unknown()),
})

export const EchoWizardOptionsSchema = z.object({
  categories: z.array(EchoCategorySchema),
  themes: z.array(EchoThemeSchema),
})

export const EchoWizardSchema = z.object({
  current_step: z.number().int().min(1),
  last_step: z.number().int().min(1),
  completed_at: z.string().nullable(),
  status: z.string(),
  payload: z.record(z.string(), z.unknown()).or(z.array(z.unknown())),
  website: z.object({
    store_name: z.string(),
    category_id: z.number().nullable(),
    theme_id: z.number().nullable(),
    currency: z.string().nullable(),
    language: z.string().nullable(),
    timezone: z.string().nullable(),
  }),
})

export const EchoAccountStateSchema = z.object({
  user: z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.email(),
    phone: z.string().nullable(),
    is_owner: z.boolean(),
    email_verified_at: z.string().nullable(),
  }),
  tenant: z.object({
    id: z.number(),
    code: z.string(),
    business_name: z.string().nullable(),
    lifecycle_status: z.string(),
    provisioning_status: z.string(),
    is_suspended: z.boolean(),
    suspension_reason: z.string().nullable(),
  }),
  website: z
    .object({
      status: z.string(),
      store_name: z.string(),
      wizard_current_step: z.number(),
      wizard_completed_at: z.string().nullable(),
      domain: z.string().nullable(),
    })
    .nullable(),
  provisioning: z
    .object({
      job_id: z.number(),
      status: z.string(),
      progress_percent: z.number(),
      current_step: z.string().nullable(),
    })
    .nullable(),
  next_screen: EchoNextScreenSchema,
})

export const EchoSubdomainCheckSchema = z.object({
  available: z.boolean(),
  reason: z.string().nullable(),
  domain: z.string(),
})

export type EchoNextScreen = z.infer<typeof EchoNextScreenSchema>
export type EchoLoginResponse = z.infer<typeof EchoLoginResponseSchema>
export type EchoWizardOptions = z.infer<typeof EchoWizardOptionsSchema>
export type EchoWizard = z.infer<typeof EchoWizardSchema>
export type EchoAccountState = z.infer<typeof EchoAccountStateSchema>
export type EchoSubdomainCheck = z.infer<typeof EchoSubdomainCheckSchema>
