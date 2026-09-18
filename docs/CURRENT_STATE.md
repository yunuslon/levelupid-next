# Current State

> Last updated: 2026-09-18 (Echo Admin cleanup + Alpha Landing API hardening)

---

## Phase Aktif

**Phase 4: Echo Admin API Integration — IN PROGRESS 🚧**

Echo Admin sekarang terhubung ke staging API untuk auth, account state, dan onboarding wizard. Dashboard dan menu domain sudah disiapkan dengan placeholder karena endpoint produk/pesanan masih development.

---

## Recently Completed

### Phase 1: Template Integration & Echo Admin Onboarding ✅

**1.1 Template Fork (alpha-admin & echo-admin)**
- ✅ Copied next-shadcn-admin-dashboard-baseui to both apps
- ✅ Updated package.json dependencies (61 UI components, Base UI, TanStack Table, Zustand, etc.)
- ✅ Updated next.config.ts, postcss.config.mjs, components.json
- ✅ Fixed TypeScript errors (cn, react-hook-form, @shadcn/react, type assertions)
- ✅ Both apps build and typecheck clean

**1.2 Shared UI Components → @levelupid/ui**
- ✅ Copied 61 components to packages/ui/src/components/
- ✅ Added shared dependencies: class-variance-authority, cmdk, cn, @base-ui/react, etc.
- ✅ Created @levelupid/ui/components/form.tsx (shadcn Form pattern)
- ✅ Created use-mobile and use-lg hooks
- ✅ packages/ui typechecks clean

**1.3 Shared Configs Integration**
- ✅ Both admin apps extend @levelupid/config-typescript
- ✅ Tailwind v4 via postcss (no config file needed)
- ✅ Root biome.json inherited by all apps

**1.4 Echo Admin — Onboarding Wizard**
- ✅ Created onboarding/_store/onboarding-store.ts (Zustand)
- ✅ Created 5-step tab-based wizard layout
- ✅ Steps: Identitas (store name, category, description, tagline), Kontak (email, phone, WA, address), Domain (subdomain with availability check), Tampilan (COMING SOON placeholder), Konfirmasi (summary)
- ✅ Mock auth store with session state
- ✅ Cookie-based onboarded flag set on completion

**1.5 Post-Onboarding Dashboard**
- ✅ Proxy middleware guard redirects non-onboarded users to /onboarding
- ✅ Onboarding completion redirects to /dashboard/default
- ✅ Template dashboard skeleton ready (default, crm, finance, etc.)

**1.7 Fix 404 (post-review)**
- ✅ Moved `src/proxy.ts` → `proxy.ts` (root) — Next 16 requires proxy at app root, not src/. Middleware now active (confirmed `ƒ Proxy (Middleware)` in build)
- ✅ Added `src/app/page.tsx` root redirect — `/` was 404 (no root page). Now redirects to /onboarding or /dashboard/default based on `echo_onboarded` cookie
- ✅ Verified no redirect loop; typecheck + build pass

### API Layer Refactor (Alpha Landing) ✅

- ✅ **fetch → axios** — semua Server Actions (`leads.ts`, `newsletter.ts`, `register.ts`) sekarang pakai Axios, konsisten dengan stack yang disepakati (bukan `fetch` native)
- ✅ **CF-Access headers dipusatkan** — dibuat `app/_lib/alpha-api.ts` dengan 2 instance: `alphaPublicApi` (tanpa CF-Access) & `alphaCFApi` (dengan CF-Access). Sebelumnya headers duplikat di 3 file
- ✅ **Keputusan: TIDAK enkapsulasi di `packages/api-client`** — alasan: alpha-landing scope kecil (public content + register), CF-Access hanya sementara (development, akan dihapus saat BE lepas Cloudflare Access). `api-client` untuk authenticated APIs (getToken/onUnauthorized) tidak relevan di sini
- ✅ **Cleanup untuk masa depan** — saat CF-Access dihapus, cukup edit 1 file (`alpha-api.ts`), bukan 3 action files
- ✅ **Error handling dipertahankan** — tetap map ke `{ ok, message, errors }`, pakai `AxiosError` type guard (bukan `any`) agar lolos Biome
- ✅ Verified: `pnpm turbo lint typecheck` + `pnpm build` — all pass

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

### Admin Apps Testing & Bug Fixes ✅

**2.1 Alpha-Admin & Echo-Admin 404 Diagnosis**
- ✅ Identified: both apps had empty `app/` directories at root, causing Next.js 16 to ignore routes in `src/app/`
- ✅ Root cause: template copied with empty `app/` folder. Next.js prefers root `app/` over `src/app/` by default
- ✅ Fix: removed empty `apps/alpha-admin/app` and `apps/echo-admin/app` directories
- ✅ Result: all routes now resolvable

**2.2 Echo-Admin Onboarding 500 Error**
- ✅ Issue: `/onboarding` route returned 500 — "useSidebar must be used within a SidebarProvider"
- ✅ Root cause: `onboarding-wizard.tsx` imported `Sidebar` from `@levelupid/ui/components/sidebar` (shared package), but layout provided `SidebarProvider` from `@/components/ui/sidebar` (local app copy). Two separate React contexts → provider mismatch
- ✅ Fix: aligned `onboarding-wizard.tsx` to import from `@/components/ui/sidebar` (same as all other components in both apps)
- ✅ Result: onboarding now loads without errors

**2.3 Playwright Route Testing**
- ✅ Tested 23 routes on alpha-admin (port 3001): all 200s (redirects are 307, expected)
  - `/`, `/dashboard`, `/dashboard/default`, `/dashboard/crm`, `/dashboard/finance`, `/dashboard/analytics`, `/dashboard/users`, `/dashboard/tasks`, `/dashboard/calendar`, `/dashboard/ecommerce`, `/dashboard/invoice`, `/dashboard/kanban`, `/dashboard/profile`, `/dashboard/file-manager`, `/dashboard/coming-soon`, `/chat`, `/mail`, `/auth/v1/login`, `/auth/v1/register`, `/auth/v2/login`, `/auth/v2/register`, `/unauthorized`
- ✅ Tested 23 routes on echo-admin (port 3000): all 200s + `/onboarding` working
- ✅ No 404s on tested routes. Client-side onboarding routing (steps accessed via Zustand state, not URL paths)



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

### Echo Admin API Integration 🚧

- ✅ Server-side Echo API proxy menggunakan `ECHO_API_URL` dan CF-Access headers.
- ✅ Bearer token disimpan dalam HttpOnly cookie dan tidak diekspos ke browser.
- ✅ Login `/auth/login`, logout, token refresh, dan redirect berbasis `GET /me`.
- ✅ Wizard state/options, submit step 1-5, subdomain check, dan finish terintegrasi.
- ✅ Dashboard blocking state untuk `provisioning`, `provisioning_failed`, dan `suspended`.
- ✅ Provisioning polling setiap 8 detik dan tombol refresh manual.
- ✅ Sidebar Echo Admin dan halaman placeholder produk/pesanan.
- ✅ Route template yang tidak dipakai dihapus; dashboard default aktif dipertahankan sebagai baseline untuk pengembangan bertahap.
- ✅ Header account menu memakai user dari `GET /me` dan logout melalui backend.
- ✅ Alpha Landing resend, registration error mapping, dan failed API envelope handling diseragamkan.
- ✅ Dependency/provider Alpha Landing yang tidak memiliki consumer aktif dihapus.
- ✅ Unit test Alpha Landing ditambahkan untuk API helper, resend, dan registration error handling.
- ⚠️ Credential CF-Access staging harus tersedia di `.env.local` dan secret yang sempat dibagikan harus di-rotate.
- ⚠️ 403 dari staging dapat disebabkan oleh VPN/IP block atau Cloudflare WAF challenge; uji ulang tanpa VPN sebelum mengubah proxy.
- ⚠️ Endpoint produk dan pesanan belum diintegrasikan; halaman masih placeholder.

---

## Next Steps

**Option A: Phase 2 — Shared Packages (API, Auth, Types)**
1. Build `@levelupid/api-client` with Axios factory + interceptors
2. Build `@levelupid/query-client` with React Query config + queryKeys factory
3. Build `@levelupid/auth` with Auth.js v5 shared config + session types
4. Build `@levelupid/types` with Zod schemas (Customer, Product, Order, Tenant)
5. Setup MSW mocks in `@levelupid/api-mocks` for endpoints not ready

**Option B: Phase 3 — Continue Echo Admin**
1. Product management (CRUD)
2. Order management (view, status updates)
3. Integrate real API when BE ready

**Option C: Phase 4 — Echo Storefront**
1. Multi-tenant middleware
2. Product listing & detail pages
3. Basic storefront layout

---

## Blockers

_(none)_

---

## Known Issues

_(none new — all Phase 1 issues resolved)_

---

## Decisions Made (This Phase)

- **Template source:** next-shadcn-admin-dashboard-baseui (61 components, Base UI, TanStack Table)
- **UI package strategy:** Centralized shared components in @levelupid/ui, apps import from there
- **Onboarding flow:** Tab-based (single page, all steps on one route, client-side navigation via Zustand)
- **Onboarding guard:** Proxy middleware + cookie flag (mock, will be replaced by Auth.js session later)
- **Form pattern:** shadcn Form (react-hook-form + Zod) — custom impl using Base UI + useRender
- **Mock auth:** Zustand store, separate from real Auth.js (will integrate Phase 3)

### Echo Admin Integration Decisions

- **API base:** staging `ECHO_API_URL` dengan path `/api/v1`.
- **Server boundary:** CF-Access credentials hanya digunakan pada Next.js server-side proxy.
- **Session transport:** backend opaque token tetap dikirim sebagai `Authorization: Bearer`; browser hanya menerima HttpOnly cookie.
- **Account routing:** `GET /me.next_screen` menjadi sumber keputusan layar; route login frontend adalah `/auth/login` tanpa versi URL.
- **Provisioning:** dashboard diblokir dan polling account state setiap 8 detik sampai status menjadi `dashboard`.
- **Echo session boundary:** custom Next.js proxy + HttpOnly cookie dipakai sebagai pengganti Auth.js untuk Echo Admin karena backend memakai opaque token, refresh rotation, dan CF-Access secret harus tetap server-side.
- **Wizard validation:** hanya `store_name` dan `subdomain` yang diblokir oleh validasi frontend; field lain mengikuti kontrak backend dan boleh kosong.
- **Browser API client:** Echo client menggunakan shared Axios factory; `401` mencoba refresh satu kali lalu mengarahkan ke `/auth/login` jika refresh gagal.
- **Network troubleshooting:** request browser ke `/api/echo` memang terlihat sebagai localhost karena melewati Next.js BFF; upstream staging hanya dipanggil server-side. Jangan mengekspos CF Access secret ke browser.
- **Template cleanup:** Echo mempertahankan dashboard default yang sudah tampil, onboarding, auth, profile, serta route Produk/Pesanan placeholder; route demo template lain dihapus dan dapat ditambahkan kembali dari template bila diperlukan.

---

## Tech Stack (Updated)

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
