# Current State

> Last updated: 2026-09-12 (UI Parity Fixes complete)

---

## Phase Aktif

**Alpha Landing Page — 100% ✅ COMPLETE**

Next: **Phase 1 (Template Integration & Shared UI)** untuk admin apps, atau lanjut Alpha Admin.

---

## Recently Completed

### Alpha Landing Page (Fase A → I) ✅

- ✅ **FASE A — Foundation:** package.json (lucide-react, recharts, RHF, zod, hookform-resolvers), Tailwind v4 config, PostCSS, globals.css (OKLCH design tokens + animations), root layout (Bricolage Grotesque + Onest font, metadata SEO, ISR support), React Query providers, .env.example
- ✅ **FASE B — Content Layer:** 13 mock content files di `app/(marketing)/_content/` (site, hero, features, free-panel, steps, analytics, testimonials, stats, faqs, cta, partners, demo, footer) + Zod schema untuk `/landing/content` response
- ✅ **FASE C — Shared Primitives di `@levelupid/ui`:** cn, Button, Collapsible, Checkbox, useMediaQuery
- ✅ **FASE D — Layout & Animations:** useReveal hook (IntersectionObserver), SiteHeader (sticky nav + mobile menu), SiteFooter (4 columns + newsletter form + socials), marketing layout wrapper
- ✅ **FASE E — 16 Marketing Sections (3 batches):** hero, capability-chips, mini-storefront, features, free-panel, analytics-preview (Recharts), demo-theme, how-it-works, testimonials (carousel mobile), stats-band, faq (collapsible), contact-section (RHF+zod), partners, cta-section (emerald gradient) + section-badge helper
- ✅ **FASE F — Server Actions (secret handling):** submitLead → `/landing/leads`, subscribeNewsletter → `/landing/newsletter` (+CF-Access), registerTenant → `/register` (+CF-Access). Semua di `app/_actions/*.ts`, secret aman di server-side.
- ✅ **FASE G — Registration Skeleton:** `/register` route dengan form (RHF+zod), success state, verification flow siap untuk Phase 3
- ✅ **FASE H — Legal Pages:** `/privacy` + `/terms` (placeholder, siap edit final copy sesuai UU PDP)
- ✅ **FASE I — Full Verify:** `pnpm lint`, `pnpm typecheck`, `pnpm build` — all 4 apps pass. Alpha-landing prerendered 4 routes dengan ISR 1h.
- ✅ **CONTEXT.md updated** dengan section 8.1 Ready API Endpoints

### UI Feedback Round 2 (register + legal pages) ✅

- ✅ **Register page** — sekarang pakai `SiteHeader` + `SiteFooter` (sama seperti marketing pages). Button "Daftar" di header auto-hide saat pathname mulai `/register` via `usePathname()`. Navlinks (Fitur, Cara Kerja, FAQ, Kontak) tetap tampil.
- ✅ **Legal pages white space fixed** — `(marketing)/layout.tsx` sekarang pakai flex column dengan `min-h-[100dvh]` + `<main className="flex-1">`. Footer selalu nempel di bawah viewport pada halaman pendek (privacy, terms).
- ✅ **Border color issue documented** — didokumentasikan di section Known Issues untuk fix di sesi baru
- ✅ Verified: `pnpm lint`, `pnpm typecheck`, `pnpm build` — all pass

### UI Parity Fixes (post-review) ✅

- ✅ **Font fixed** — ganti Poppins → **Bricolage Grotesque** (display) + **Onest** (sans), match referensi persis via `next/font/google`
- ✅ **Design tokens fixed** — ganti token ad-hoc → OKLCH neutral asli dari referensi `theme.css` (background, border, card, muted, dll), brand override (emerald/mint) dipertahankan. Fix root cause border & background yang beda dari referensi.
- ✅ **Register page rebuild** — 2-column layout (form + benefits aside), field disederhanakan (hilangkan password_confirmation dari UI, tetap dikirim otomatis ke BE), checkbox agreeTerms + link Terms/Privacy, 3-step flow (form → check-email → verified) dengan resend verification
- ✅ **Checkbox primitive** ditambahkan ke `@levelupid/ui/components/checkbox.tsx`
- ✅ **resendVerification action** ditambahkan → `POST /register/resend`
- ✅ **getEnv helper** dikonsolidasi ke `app/_lib/env.ts` (sebelumnya duplikat di 3 action files) — sesuai rule baru "Reuse Before Recreate"
- ✅ **RULES.md updated** — tambah rule #5 (Industry-Aligned Development) & #6 (Reuse Before Recreate)
- ✅ Verified: `pnpm lint`, `pnpm typecheck`, `pnpm build` — all pass

### Version Upgrade ✅

- ✅ Next.js 15.0.3 → **16.3.4**
- ✅ React/React-DOM 19.0.0 → **19.3.0**
- ✅ TypeScript 5.6.0 → **7.0.2**
- ✅ Semua dependency lain di-align (Recharts 3.10.1, Lucide 1.44.0, RHF 7.87.0, Zod 4.6.2, dll)
- ✅ Breaking changes handled: Turbo 2.0 `pipeline`→`tasks`, TS 7 removed `baseUrl`, MSW 2.x API

### Foundation (Phase 0) ✅

- ✅ Documentation setup (CONTEXT.md, PLAN.md, README.md, RULES.md)
- ✅ Root configs (package.json, pnpm-workspace.yaml, turbo.json, biome.json, .gitignore)
- ✅ Shared config packages (config-typescript, config-tailwind, config-biome)
- ✅ Package skeletons: ui, api-client, query-client, auth, types, api-mocks, utils
- ✅ App skeletons: alpha-admin, alpha-landing, echo-admin, echo-storefront

---

## In Progress

_(none — Alpha Landing selesai; siap ke Phase 1 admin atau feature lanjutan)_

---

## Next Steps (Pilih Salah Satu)

**Option A: Complete Alpha Landing polish**
1. Integrate `GET /landing/content` — swap mock data ke real API di section stats/testimonials/faqs/cta
2. Fetch data di server component dengan ISR revalidate
3. Add error boundary + loading states
4. Add sitemap.xml + robots.txt

**Option B: Phase 1 — Alpha Admin Template Fork**
1. Fork `next-shadcn-admin-dashboard-baseui` ke `apps/alpha-admin/`
2. Fork ke `apps/echo-admin/`
3. Extract shared UI components ke `packages/ui/src/components/`
4. Update imports ke `@levelupid/ui`

**Option C: Phase 3 — Registration Verification Flow (partial done)**
1. ~~Resend verification link handler + UI~~ ✅ done (check-email step)
2. `/register/verify?token=xxx` page — call POST `/register/verify` (belum dibuat — user klik link di email akan hit backend langsung atau butuh page ini)
3. Redirect ke `verified` step setelah verifikasi sukses

---

## Blockers

_(none)_

---

## Known Issues (untuk sesi berikutnya)

### 🐛 Border color utility class tidak berubah warna

**Gejala:** Coba pakai `border-red-600`, `border-blue-500`, atau utility color Tailwind lain untuk border → tetap render warna default `var(--border)` (abu-abu muda). Padahal `bg-red-600` dll bekerja normal.

**Root cause:** Di `apps/alpha-landing/app/globals.css` (sekitar line 106-108):

```css
* {
  border-color: var(--border);
}
```

Universal selector `*` ini di-declare **setelah** `@import "tailwindcss"`. Karena specificity `*` (0,0,0) dan Tailwind utility class `.border-red-600` (0,1,0) — secara teori utility harus menang. Tapi ternyata **cascade order** memenangkan yang terakhir di-declare di CSS file kalau specificity sama. Hasil: rule `* { border-color: var(--border) }` selalu menang.

**Kenapa `bg-*` aman:** Tidak ada universal selector `* { background-color }` yang override, jadi utility class Tailwind langsung diaplikasikan.

**Fix Options (pilih saat sesi baru):**

**Option A (Recommended)** — Wrap dalam `@layer base` supaya jadi lower priority daripada utilities:
```css
@layer base {
  * {
    border-color: var(--border);
  }
}
```
Karena Tailwind v4 layer order: `theme` → `base` → `components` → `utilities`. Utility class akan menang otomatis.

**Option B** — Pakai `:where()` untuk zero specificity:
```css
:where(*) {
  border-color: var(--border);
}
```

**Option C** — Ikuti pola referensi `packages/config-tailwind/theme.css` line 140-143:
```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
}
```

**Verifikasi:** Setelah fix, coba `<div className="border border-red-600">` — border harus merah, bukan abu-abu.

**Impact:** Tidak block build/lint/typecheck. Cuma limitation styling — developer tidak bisa override border color per-element via utility class.

---

## Decisions Made (Recent)

- **Package manager:** pnpm (bukan Bun) — alasan: stability Next.js runtime, Vercel deployment lancar
- **Monorepo:** Single Turborepo (bukan multi-repo) — alasan: shared design system, atomic changes
- **Framework:** Next.js 16 untuk semua 4 app (termasuk landing) — alasan: ISR + SEO consistent
- **Auth strategy:** Hybrid sessions terpisah per boundary (Alpha internal, Echo admin, Echo consumer)
- **Multi-tenant:** Custom domain per tenant, resolve via middleware hostname
- **Landing font:** Poppins (via `next/font/google`)
- **Landing charts:** Recharts direct (skip ChartContainer wrapper, keep simple)
- **Content strategy:** Mock data dulu di `_content/*.ts`, swap ke API `/landing/content` di iterasi berikutnya
- **CF-Access secret handling:** Server Actions only (`app/_actions/*.ts`), never expose to browser
- **ISR:** homepage `revalidate = 3600` (1 jam)
- **Legal pages:** Copy dari reference project (placeholder, edit final di kemudian hari)

---

## Tech Stack (Current Versions)

| Package | Version |
|---------|---------|
| Next.js | 16.3.4 |
| React | 19.3.0 |
| TypeScript | 7.0.2 |
| Tailwind CSS | 4.3.3 |
| TanStack Query | 5.102.8 |
| Zustand | 5.0.15 |
| Zod | 4.6.2 |
| Recharts | 3.10.1 |
| React Hook Form | 7.87.0 |
| Lucide React | 1.44.0 |
| Axios | 1.20.0 |
| MSW | 2.15.0 |
| NextAuth | 5.0.0-beta.32 |
| Turbo | 2.10.12 |
| Biome | 2.5.13 |

---

## Alpha Landing — File Structure

```
apps/alpha-landing/
├── app/
│   ├── (marketing)/              # public route group
│   │   ├── _components/          # 16 section components
│   │   ├── _content/             # 13 mock content files
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── layout.tsx            # header+footer wrapper
│   │   └── page.tsx              # ISR homepage (revalidate 3600s)
│   ├── (auth)/
│   │   ├── register/
│   │   │   ├── _components/registration-form.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── _actions/                 # Server Actions (CF-Access secret aman)
│   │   ├── leads.ts
│   │   ├── newsletter.ts
│   │   └── register.ts
│   ├── _hooks/use-reveal.ts      # scroll animation
│   ├── globals.css               # tokens + animations + Tailwind
│   ├── layout.tsx                # Poppins font, metadata, providers
│   └── providers.tsx             # React Query
├── .env.example
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Notes for Next Session

- **Env setup:** copy `.env.example` → `.env.local`, isi `ALPHA_API_URL`, `CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`
- **Command dev:** `pnpm dev --filter=@levelupid/alpha-landing` → port 3000 default
- **Command build:** `pnpm build --filter=@levelupid/alpha-landing`
- **Template repo (untuk admin nanti):** https://github.com/arhamkhnz/next-shadcn-admin-dashboard-baseui
- **Warning:** echo-storefront middleware deprecated di Next 16 → run `npx @next/codemod@canary middleware-to-proxy .` (belum urgent)
- **Baca dulu:** `docs/RULES.md` + `docs/CONTEXT.md` sebelum mulai kerja
