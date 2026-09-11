# LevelUpID Frontend — Context

> Onboarding context untuk sesi baru. Baca ini dulu sebelum mulai kerja.
> Bahasa: mixed (istilah teknis English, penjelasan Indonesia).

---

## 1. Product Overview

**LevelUpID** adalah platform SaaS e-commerce. Ada 2 domain produk: **Alpha** (internal + akuisisi customer) dan **Echo** (e-commerce yang dijalankan customer/tenant).

**Business flow:**
```
Customer daftar via Alpha Landing
   → di-manage tim internal via Alpha Admin
   → customer setup toko via Echo Admin (+ website builder)
   → toko live sebagai Echo Storefront (custom domain per tenant)
```

**"Echo" = instance e-commerce milik tenant.**

Scope pekerjaan saat ini: **Frontend only**. BE dikerjakan tim terpisah (sebagian API sudah ready, sisanya masih development).

---

## 2. Empat Aplikasi

| App | Peran | Users | Domain |
|-----|-------|-------|--------|
| **alpha-admin** | Panel internal — manage customer, subscription, monitoring, RBAC | Staff internal | Internal (`admin.levelupid.com`) |
| **alpha-landing** | Marketing + registrasi customer, konten dinamis dari endpoint | Public + calon customer | `levelupid.com` |
| **echo-admin** | Setup toko, product/order management, **website builder** | Tenant (store owner + staff) | `echo-admin.levelupid.com` |
| **echo-storefront** | Storefront e-commerce hasil setup | End consumer | **Custom domain per tenant** |

---

## 3. Arsitektur Monorepo

**Keputusan: Single monorepo (Turborepo + pnpm).** Bukan multi-repo.

**Alasan:** shared design system (semua app pakai shadcn + Tailwind), shared API types (Alpha & Echo overlap di Customer/Product/Tenant), atomic changes lintas app, Turborepo native untuk filtered build & remote cache. Deployment tetap terpisah per app.

```
levelupid-fe/
├── apps/
│   ├── alpha-admin/         # fork template baseui
│   ├── alpha-landing/       # fresh Next.js (marketing + register)
│   ├── echo-admin/          # fork template baseui + website builder
│   └── echo-storefront/     # fresh Next.js + multi-tenant middleware
├── packages/
│   ├── ui/                  # shared shadcn/Base UI components
│   ├── api-client/          # Axios factory + interceptors
│   ├── query-client/        # React Query config + query key factory
│   ├── auth/                # Auth.js shared config + guards
│   ├── types/               # shared TS types + Zod schemas (BE contracts)
│   ├── api-mocks/           # MSW handlers (endpoint belum ready)
│   ├── utils/               # shared helpers (format, validation)
│   ├── config-tailwind/     # shared Tailwind v4 preset
│   ├── config-typescript/   # shared tsconfig bases
│   └── config-biome/        # shared Biome config
├── docs/
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 4. Tech Stack (Final)

| Kategori | Pilihan | Catatan |
|----------|---------|---------|
| Monorepo | **Turborepo + pnpm workspaces** | Bun ditolak (risiko runtime Next.js) |
| Framework | **Next.js 16 (App Router)** | Semua 4 app, termasuk landing (ISR untuk SEO) |
| Language | **TypeScript (strict)** | Shared configs |
| UI | **shadcn/ui + Base UI** | Template: `next-shadcn-admin-dashboard-baseui` |
| Styling | **Tailwind CSS v4** | Shared preset |
| Client state | **Zustand** | Slice per domain |
| Server state | **TanStack React Query** | Shared client factory |
| HTTP | **Axios** | Shared instance + auth interceptor |
| Forms | **React Hook Form + Zod** | |
| Tables | **TanStack Table** | Bawaan template |
| Auth | **Auth.js v5 (NextAuth)** | Hybrid sessions (lihat §6) |
| Mocking | **MSW** | Toggle via `NEXT_PUBLIC_USE_MOCK` |
| Lint/Format | **Biome** | Sama dengan template |
| Git hooks | **Husky + lint-staged** | Bawaan template |
| Testing | **Vitest + Playwright** | Setup di Phase 0 |

**Template repo:** https://github.com/arhamkhnz/next-shadcn-admin-dashboard-baseui

---

## 5. Shared Packages

- **`ui`** — re-export shadcn/Base UI + custom components lintas app (`cva` untuk variants)
- **`api-client`** — `createApiClient({ baseURL, getToken, onUnauthorized })`, interceptor auth + refresh + error normalization, tipe `ApiResponse<T>` / `ApiError`
- **`query-client`** — `createQueryClient()` + `createQueryKeys()` factory, RSC-ready
- **`auth`** — session types, Auth.js config shared, guards (`requireAuth`, `requireRole`)
- **`types`** — BE contracts (Customer, Product, Order, Tenant), Zod schemas, shared enums (OrderStatus, UserRole)
- **`api-mocks`** — MSW handlers per domain untuk endpoint belum ready
- **`config-*`** — Tailwind preset, tsconfig bases, Biome config
- **`utils`** — format, validation helpers

Semua di-link via `workspace:*`.

---

## 6. Authentication Strategy

**Hybrid: shared infra (Auth.js), separate sessions per boundary.**

```
Alpha (levelupid.com)
├── alpha-landing → public + register
└── alpha-admin   → internal staff
    Cookie: __alpha_session (scoped .levelupid.com), role-based

Echo Admin (echo-admin.levelupid.com)
└── Cookie: __echo_admin_session — includes tenant_id + role

Echo Storefront (custom domain per tenant)
└── Cookie: __echo_consumer_session — isolated per tenant domain
```

**Alasan session terpisah:**
- Custom domain per tenant **tidak bisa** share cookie dengan `levelupid.com`
- Security isolation: internal ops vs tenant ops vs end consumer
- Consumer di tenant A tidak auto-login di tenant B

---

## 7. Multi-tenant Strategy (Echo Storefront)

- **Custom domain per tenant** (bukan subdomain path).
- `middleware.ts` resolve tenant dari **hostname** → fetch tenant config → render dengan theme/layout tenant → cache per tenant.
- DNS setup: **TBD** (lihat Open Decisions).

```
Request → middleware → resolve hostname → fetch tenant config
        → inject theme/layout → render → cache per tenant
```

---

## 8. BE Integration

BE sebagian ready, sisanya development. Strategi:

1. **Contract-first** — definisikan Zod schema di `packages/types` berdasarkan spec BE.
2. **MSW** — mock endpoint yang belum ada di `packages/api-mocks`.
3. **Feature flag** — `NEXT_PUBLIC_USE_MOCK=true` toggle mock vs real API.
4. Component logic tidak berubah saat switch mock → real.

---

## 9. Convention & Standards

- **Colocation architecture** (ikuti template) — tiap feature simpan pages/components/logic di dalam route folder-nya. Shared UI/hooks/config di top level.
- **Naming:** files `kebab-case`, components `PascalCase`, hooks `useCamelCase`, types `PascalCase`.
- **Import:** `@/...` untuk internal app, `@repo/<package>` untuk shared packages.
- **Validation:** semua input pakai Zod, form via React Hook Form.
- **State:** server state → React Query, client/UI state → Zustand. Jangan duplikat server data ke Zustand.

---

## 10. Open Decisions (Perlu Diskusi Lanjut)

| Topik | Status | Default sementara |
|-------|--------|-------------------|
| **Website builder level** | TBD | Mulai Level A (theme picker) di Phase 5, eksplor Level B nanti |
| **CMS alpha-landing** | TBD | BE bangun endpoint sendiri; evaluasi CMS (Sanity/Payload) kemudian |
| **Deployment target** | Dibahas dengan tim | Asumsi Vercel; self-host masih opsi |
| **DNS custom domain** | TBD | Dibahas saat Phase 4 (Vercel wildcard / Cloudflare SaaS) |
| **Testing depth** | TBD | Vitest unit + Playwright E2E, detail per phase |

### Website Builder — Level Options (referensi diskusi)

| Level | Deskripsi | Fase |
|-------|-----------|------|
| A | Theme picker (color, font, logo) | Phase 5 (MVP) |
| B | Section-based (drag/reorder hero, product grid, testimoni) | Phase 2 builder (rekomendasi) |
| C | Full block builder (Shopify/Wix style) | Future |

Draft storage schema:
```json
{
  "tenant_id": "...",
  "theme": { "primary": "#...", "font": "Inter" },
  "pages": {
    "home": { "sections": [
      { "type": "hero", "props": {} },
      { "type": "product-grid", "props": { "category": "" } }
    ]}
  }
}
```

---

## 11. Getting Started (Sesi Baru)

**Prerequisites:** Node.js LTS, pnpm, git.

**Reading order sebelum coding:**
1. `docs/CURRENT_STATE.md` — cek progress terkini & next steps
2. `docs/RULES.md` — aturan kerja wajib
3. `docs/CONTEXT.md` — file ini (overview)
4. `docs/PLAN.md` — detail checklist phase aktif

**Command dasar:**
- `pnpm install` — install semua deps
- `pnpm dev --filter=<app-name>` — run app tertentu (misal `alpha-admin`)
- `pnpm build` — build semua apps
- `pnpm lint` — lint semua workspace

**Reference:**
- Template admin: https://github.com/arhamkhnz/next-shadcn-admin-dashboard-baseui
- Colocation pattern: https://github.com/arhamkhnz/next-colocation-template
- Turborepo: https://turborepo.com/docs
- Auth.js v5: https://authjs.dev
