# LevelUpID Frontend — Implementation Plan

> Phased roadmap dengan checklist. Setiap phase punya prerequisites, deliverables, dan estimasi scope.

---

## Phase 0: Foundation Setup

**Goal:** Setup monorepo skeleton, shared configs, CI/CD, git hooks.

**Prerequisites:** Node.js LTS, pnpm installed.

**Estimasi:** 1 week

### Checklist

- [ ] Init Turborepo dengan pnpm workspace
  ```bash
  pnpm dlx create-turbo@latest
  ```
- [ ] Configure `turbo.json` (pipeline tasks: build, dev, lint, test)
- [ ] Setup `pnpm-workspace.yaml`
- [ ] Create folder structure: `apps/`, `packages/`, `docs/`
- [ ] Setup shared configs:
  - [ ] `packages/config-typescript` — base tsconfig (`base.json`, `nextjs.json`, `react-library.json`)
  - [ ] `packages/config-tailwind` — Tailwind v4 preset
  - [ ] `packages/config-biome` — Biome config + scripts
- [ ] Setup git hooks:
  - [ ] Husky + lint-staged
  - [ ] Pre-commit: `biome check --write`, typecheck
  - [ ] Commit-msg: conventional commits (opsional)
- [ ] CI/CD skeleton (GitHub Actions / GitLab CI):
  - [ ] Install dependencies (`pnpm install --frozen-lockfile`)
  - [ ] Lint + typecheck (`turbo run lint typecheck`)
  - [ ] Build all apps (`turbo run build`)
  - [ ] Setup Turborepo remote cache (Vercel Remote Cache / custom S3)
- [ ] `.gitignore` global:
  ```
  node_modules/
  .turbo/
  dist/
  .next/
  .env*.local
  ```
- [ ] Create root `README.md` dengan getting started

**Deliverables:**
- Monorepo bisa `pnpm install`, `pnpm dev`, `pnpm build`
- CI pipeline hijau
- Git hooks enforce code quality

---

## Phase 1: Template Integration & Shared UI

**Goal:** Fork template admin ke 2 apps, extract shared components ke `packages/ui`.

**Prerequisites:** Phase 0 selesai.

**Estimasi:** 1-2 weeks

### Checklist

#### 1.1 Fork Template ke Apps

- [ ] Clone template `next-shadcn-admin-dashboard-baseui` ke temp folder
- [ ] Copy ke `apps/alpha-admin/`
  - [ ] Clean: hapus `.git/`, `node_modules/`, `media/`
  - [ ] Update `package.json` name: `@levelupid/alpha-admin`
  - [ ] Update imports jika ada hardcoded paths
- [ ] Copy ke `apps/echo-admin/`
  - [ ] Update `package.json` name: `@levelupid/echo-admin`
- [ ] Test both apps bisa run standalone (`pnpm dev`)

#### 1.2 Extract Shared UI Components

- [ ] Create `packages/ui/` structure:
  ```
  packages/ui/
  ├── src/
  │   ├── components/        # shadcn/Base UI re-exports
  │   │   ├── button.tsx
  │   │   ├── card.tsx
  │   │   ├── dialog.tsx
  │   │   └── ...
  │   ├── custom/            # custom components
  │   │   ├── logo-levelup.tsx
  │   │   ├── empty-state.tsx
  │   │   └── loading-spinner.tsx
  │   ├── hooks/             # shared hooks (useMediaQuery, dll)
  │   └── lib/
  │       └── utils.ts       # cn() helper
  ├── package.json
  ├── tsconfig.json          # extends @levelupid/config-typescript
  └── tailwind.config.ts     # extends @levelupid/config-tailwind
  ```
- [ ] Move common components dari template ke `packages/ui/src/components/`
- [ ] Setup exports di `packages/ui/package.json`:
  ```json
  {
    "exports": {
      "./components/*": "./src/components/*.tsx",
      "./custom/*": "./src/custom/*.tsx",
      "./hooks/*": "./src/hooks/*.tsx",
      "./lib/*": "./src/lib/*.ts"
    }
  }
  ```
- [ ] Update imports di `alpha-admin` & `echo-admin`:
  ```ts
  // Dari: import { Button } from "@/components/ui/button"
  // Jadi: import { Button } from "@levelupid/ui/components/button"
  ```
- [ ] Test: kedua admin app masih jalan dengan imports baru

#### 1.3 Shared Configs Integration

- [ ] Update `tsconfig.json` di semua apps extend dari `@levelupid/config-typescript/nextjs.json`
- [ ] Update `tailwind.config.ts` di semua apps extend dari `@levelupid/config-tailwind`
- [ ] Update `biome.json` di root extend dari `@levelupid/config-biome`
- [ ] Test: `pnpm turbo lint` dan `pnpm turbo typecheck` pass

**Deliverables:**
- 2 admin apps (`alpha-admin`, `echo-admin`) running dengan shared UI package
- Shared configs active
- Turborepo tasks (`dev`, `build`, `lint`, `typecheck`) working

---

## Phase 2: Shared Packages (API, Auth, Types)

**Goal:** Build foundational packages untuk API integration, auth, types.

**Prerequisites:** Phase 1 selesai, ada sample BE API spec (atau mock spec).

**Estimasi:** 1-2 weeks

### Checklist

#### 2.1 `packages/types`

- [ ] Create structure:
  ```
  packages/types/
  ├── src/
  │   ├── schemas/           # Zod schemas
  │   │   ├── customer.ts
  │   │   ├── product.ts
  │   │   ├── order.ts
  │   │   ├── tenant.ts
  │   │   └── auth.ts
  │   ├── types/             # TS types (inferred dari Zod)
  │   │   └── index.ts
  │   ├── enums/
  │   │   ├── order-status.ts
  │   │   ├── user-role.ts
  │   │   └── payment-status.ts
  │   └── index.ts           # re-exports
  ```
- [ ] Define Zod schemas berdasarkan BE spec (atau mock dulu)
- [ ] Export inferred types: `export type Customer = z.infer<typeof CustomerSchema>`

#### 2.2 `packages/api-client`

- [ ] Create Axios factory:
  ```ts
  // src/create-api-client.ts
  export function createApiClient(config: {
    baseURL: string;
    getToken: () => string | null;
    onUnauthorized?: () => void;
  }): AxiosInstance
  ```
- [ ] Interceptors:
  - [ ] Request: inject auth token dari `getToken()`
  - [ ] Response: normalize error ke `ApiError` type
  - [ ] Response 401: call `onUnauthorized()` (untuk redirect login)
  - [ ] Response 403: handle forbidden
- [ ] Define standard types:
  ```ts
  export type ApiResponse<T> = { data: T; meta?: { total: number } };
  export type ApiError = { message: string; code: string; status: number };
  ```

#### 2.3 `packages/query-client`

- [ ] Create React Query client factory:
  ```ts
  export function createQueryClient(options?: QueryClientConfig): QueryClient
  ```
- [ ] Default options: staleTime, cacheTime, retry logic, refetchOnWindowFocus
- [ ] Query keys factory:
  ```ts
  // src/query-keys.ts
  export const queryKeys = {
    customers: {
      all: ['customers'] as const,
      lists: () => [...queryKeys.customers.all, 'list'] as const,
      list: (filters: string) => [...queryKeys.customers.lists(), { filters }] as const,
      details: () => [...queryKeys.customers.all, 'detail'] as const,
      detail: (id: string) => [...queryKeys.customers.details(), id] as const,
    },
    // ... pattern untuk domain lain
  };
  ```

#### 2.4 `packages/auth`

- [ ] Auth.js v5 shared config:
  ```ts
  // src/auth.config.ts
  export const authConfig = {
    providers: [...],
    callbacks: { jwt, session },
    pages: { signIn: '/login', error: '/auth/error' },
  };
  ```
- [ ] Session types:
  ```ts
  export type AlphaSession = { user: { id, role, name, email } };
  export type EchoAdminSession = { user: { id, tenantId, role, name, email } };
  export type EchoConsumerSession = { user: { id, tenantId, name, email } };
  ```
- [ ] Middleware guards:
  ```ts
  export function requireAuth(session: Session | null): session is Session;
  export function requireRole(session: Session, roles: string[]): boolean;
  ```

#### 2.5 `packages/utils`

- [ ] Format helpers: `formatCurrency()`, `formatDate()`, `formatPhone()`
- [ ] Validation helpers: `isValidEmail()`, `isValidURL()`
- [ ] String helpers: `slugify()`, `truncate()`

#### 2.6 `packages/api-mocks`

- [ ] Setup MSW:
  ```
  packages/api-mocks/
  ├── src/
  │   ├── handlers/
  │   │   ├── customer.ts
  │   │   ├── product.ts
  │   │   ├── order.ts
  │   │   └── tenant.ts
  │   ├── data/               # mock data
  │   │   └── fixtures.ts
  │   ├── browser.ts          # setupWorker untuk dev
  │   └── server.ts           # setupServer untuk test (opsional)
  ```
- [ ] Mock handlers untuk endpoint yang belum ready
- [ ] Toggle via env: `NEXT_PUBLIC_USE_MOCK=true`

**Deliverables:**
- Semua shared packages ready & tested
- Apps bisa import `@levelupid/types`, `@levelupid/api-client`, dll
- MSW bisa toggle untuk dev tanpa BE

---

## Phase 3: Alpha Domain

**Goal:** Build `alpha-landing` (marketing + register) dan `alpha-admin` (customer CRUD).

**Prerequisites:** Phase 2 selesai.

**Estimasi:** 2-3 weeks

### Checklist

#### 3.1 `apps/alpha-landing`

- [ ] Create fresh Next.js app:
  ```bash
  cd apps/
  pnpm create next-app@latest alpha-landing --typescript --tailwind --app
  ```
- [ ] Setup structure:
  ```
  apps/alpha-landing/
  ├── app/
  │   ├── (marketing)/
  │   │   ├── page.tsx                    # Home (ISR)
  │   │   ├── pricing/page.tsx            # Pricing (ISR)
  │   │   ├── features/[slug]/page.tsx    # Features (ISR)
  │   │   └── layout.tsx
  │   ├── (auth)/
  │   │   ├── register/
  │   │   │   ├── page.tsx
  │   │   │   └── _components/registration-form.tsx
  │   │   ├── login/page.tsx
  │   │   └── layout.tsx
  │   └── api/
  │       └── auth/[...nextauth]/route.ts
  ```
- [ ] Dynamic content integration:
  - [ ] Fetch sections dari `/api/landing/home` (atau mock MSW)
  - [ ] Setup ISR: `export const revalidate = 3600` (1 hour)
  - [ ] On-demand revalidate: `/api/revalidate` endpoint
- [ ] Registration flow:
  - [ ] Form: React Hook Form + Zod schema dari `@levelupid/types`
  - [ ] Submit → POST `/api/customers/register`
  - [ ] Success → redirect ke `/register/success` atau login
- [ ] Auth integration:
  - [ ] Setup Auth.js dengan `@levelupid/auth` config
  - [ ] Login page
  - [ ] Session management

#### 3.2 `apps/alpha-admin` Customer Management

- [ ] Dashboard home (sudah ada dari template)
- [ ] Customer CRUD:
  - [ ] List page: TanStack Table + pagination
  - [ ] Create modal/page: form + submit
  - [ ] Edit modal/page
  - [ ] Delete confirmation
  - [ ] Search/filter
- [ ] API integration via `@levelupid/api-client`:
  ```ts
  const apiClient = createApiClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    getToken: () => session?.accessToken,
    onUnauthorized: () => signOut(),
  });
  ```
- [ ] React Query hooks:
  ```ts
  // app/(dashboard)/customers/_hooks/use-customers.ts
  export function useCustomers(filters: Filters) {
    return useQuery({
      queryKey: queryKeys.customers.list(filters),
      queryFn: () => apiClient.get('/customers', { params: filters }),
    });
  }
  ```
- [ ] Auth guards:
  - [ ] Middleware: redirect jika belum login
  - [ ] RBAC: cek role untuk actions (edit, delete)

**Deliverables:**
- `alpha-landing` live dengan ISR dynamic content + registration
- `alpha-admin` bisa CRUD customers dengan real API atau mock
- Auth flow Alpha (login → dashboard → logout) working

---

## Phase 4: Echo Foundation

**Goal:** Build `echo-admin` (tenant setup, product CRUD) dan `echo-storefront` skeleton (multi-tenant).

**Prerequisites:** Phase 3 selesai.

**Estimasi:** 3-4 weeks

### Checklist

#### 4.1 `apps/echo-admin` Tenant Setup

- [ ] Onboarding wizard (first-time setup):
  - [ ] Step 1: Store info (name, description)
  - [ ] Step 2: Domain setup (custom domain input, DNS instructions)
  - [ ] Step 3: Theme picker (Phase 5 detail)
  - [ ] Complete → redirect ke dashboard
- [ ] Product management:
  - [ ] List page: TanStack Table
  - [ ] Create/edit form: name, description, price, images, category, stock
  - [ ] Upload images (integration dengan BE storage API atau mock)
  - [ ] Variant support (opsional Phase 1, bisa Phase 2)
- [ ] Category management (simple CRUD)
- [ ] Order management (view only di Phase 4, full flow Phase 6):
  - [ ] List orders
  - [ ] View order detail
  - [ ] Update status (pending, processing, shipped, completed)
- [ ] Auth: Echo Admin session (separate dari Alpha)

#### 4.2 `apps/echo-storefront` Multi-tenant Skeleton

- [ ] Create fresh Next.js app
- [ ] Multi-tenant middleware:
  ```ts
  // middleware.ts
  export async function middleware(req: NextRequest) {
    const hostname = req.headers.get('host');
    
    // Resolve tenant dari hostname
    const tenant = await getTenantByDomain(hostname);
    
    if (!tenant) return new Response('Store not found', { status: 404 });
    
    // Inject tenant config ke request headers (Next.js rewrite pattern)
    req.headers.set('x-tenant-id', tenant.id);
    req.headers.set('x-tenant-slug', tenant.slug);
    
    return NextResponse.next();
  }
  ```
- [ ] Tenant config fetching & caching:
  ```ts
  // lib/tenant.ts
  export async function getTenantConfig(tenantId: string) {
    // Fetch dari BE: tenant theme, settings, domain
    // Cache: Redis atau Next.js cache (unstable_cache)
  }
  ```
- [ ] Homepage:
  - [ ] Fetch products untuk tenant
  - [ ] Display berdasarkan tenant theme (Phase 5 detail)
  - [ ] Static generation per tenant (challenging, evaluate ISR per tenant)
- [ ] Product listing page: `/products`
- [ ] Product detail page: `/products/[slug]`
- [ ] Basic layout: header (logo, nav, cart icon), footer

#### 4.3 Custom Domain Strategy (Discussion Required)

**Butuh keputusan dari tim:**

- **Option A: Vercel wildcard domain + CNAME**
  - Tenant CNAME `shop.customer.com` → `levelupid.vercel.app`
  - Vercel handle SSL auto via Let's Encrypt
  - Middleware resolve tenant dari hostname
  
- **Option B: Cloudflare for SaaS**
  - Tenant CNAME → Cloudflare
  - Cloudflare proxy ke Next.js app dengan SSL
  - Lebih flexible untuk custom DNS logic

- **Option C: Subdomain saja** (`tenant.levelupid.com`)
  - Lebih simpel, tidak perlu tenant manage DNS
  - Kurang "white-label"

**Default untuk Phase 4:** Mock dengan `/store/[tenantSlug]` path-based routing untuk development. Custom domain di-handle Phase 5+.

**Deliverables:**
- `echo-admin` bisa setup tenant, CRUD products, view orders
- `echo-storefront` bisa display products per tenant (path-based routing dulu)
- Multi-tenant middleware skeleton ready

---

## Phase 5: Website Builder MVP (Level A)

**Goal:** Theme picker di Echo Admin, preview mode, apply theme ke storefront.

**Prerequisites:** Phase 4 selesai.

**Estimasi:** 2-3 weeks

### Checklist

#### 5.1 Theme Picker UI (Echo Admin)

- [ ] Settings page di `echo-admin`: `/settings/theme`
- [ ] Form fields:
  - [ ] Primary color (color picker)
  - [ ] Secondary color
  - [ ] Font family (dropdown: Inter, Roboto, Poppins, dll)
  - [ ] Logo upload
  - [ ] Favicon upload
- [ ] Preview panel (iframe embed storefront dengan theme params)
- [ ] Save → POST `/api/tenants/{id}/theme`

#### 5.2 Theme Storage & API

- [ ] BE endpoint (atau mock):
  ```ts
  PUT /api/tenants/:id/theme
  Body: { primary: "#...", font: "Inter", logo: "url", favicon: "url" }
  ```
- [ ] Schema di `@levelupid/types`:
  ```ts
  export const TenantThemeSchema = z.object({
    primary: z.string().regex(/^#[0-9A-F]{6}$/i),
    secondary: z.string().optional(),
    font: z.enum(['Inter', 'Roboto', 'Poppins']),
    logo: z.string().url(),
    favicon: z.string().url().optional(),
  });
  ```

#### 5.3 Apply Theme di Storefront

- [ ] Fetch tenant theme di middleware atau layout:
  ```ts
  const theme = await getTenantTheme(tenantId);
  ```
- [ ] Inject CSS variables:
  ```tsx
  // app/layout.tsx
  <html style={{
    '--color-primary': theme.primary,
    '--font-family': theme.font,
  }}>
  ```
- [ ] Tailwind dynamic classes (gunakan CSS variables):
  ```css
  /* globals.css */
  .bg-primary { background-color: var(--color-primary); }
  .text-primary { color: var(--color-primary); }
  ```
- [ ] Logo & favicon dynamic:
  ```tsx
  <Image src={theme.logo} alt="Store Logo" />
  <link rel="icon" href={theme.favicon} />
  ```

#### 5.4 Preview Mode

- [ ] Query param: `?preview=true&theme=<base64EncodedTheme>`
- [ ] Echo Admin iframe embed storefront dengan preview param
- [ ] Storefront detect preview mode → apply theme dari param, bukan database

**Deliverables:**
- Echo Admin punya theme picker working
- Storefront apply theme dari tenant config
- Preview mode working

---

## Phase 6: E-commerce Core

**Goal:** Cart, checkout, order flow, consumer auth, payment integration.

**Prerequisites:** Phase 5 selesai, BE payment endpoint ready (atau mock).

**Estimasi:** 4-6 weeks

### Checklist

#### 6.1 Cart (Storefront)

- [ ] Client state: Zustand store untuk cart
  ```ts
  // store/cart.ts
  type CartItem = { productId, quantity, variant };
  type CartStore = { items: CartItem[], addItem, removeItem, clearCart };
  ```
- [ ] Add to cart button di product detail
- [ ] Cart page: `/cart`
  - [ ] List items
  - [ ] Update quantity
  - [ ] Remove item
  - [ ] Subtotal calculation
- [ ] Cart icon di header (badge dengan item count)

#### 6.2 Checkout

- [ ] Checkout page: `/checkout`
- [ ] Form steps:
  - [ ] Step 1: Shipping info (name, address, phone)
  - [ ] Step 2: Payment method (pilih gateway, atau mock dulu)
  - [ ] Step 3: Review order
- [ ] Submit order:
  - [ ] POST `/api/orders` dengan cart items + shipping + payment
  - [ ] Success → redirect ke `/orders/[orderId]/success`
- [ ] Order confirmation page

#### 6.3 Consumer Auth (Storefront)

- [ ] Auth.js setup untuk consumer (separate session dari admin)
- [ ] Register/login pages: `/auth/login`, `/auth/register`
- [ ] Guest checkout (opsional: bisa checkout tanpa account)
- [ ] My orders page: `/account/orders`

#### 6.4 Order Management (Echo Admin)

- [ ] Update order status di admin
- [ ] Notification ke consumer (email via BE, atau mock)
- [ ] Order history & analytics (simple stats: total orders, revenue)

#### 6.5 Payment Integration

- [ ] Integration dengan payment gateway (Midtrans, Xendit, Stripe, atau lokal)
- [ ] Payment flow:
  - [ ] User pilih payment → redirect ke gateway
  - [ ] Callback dari gateway → update order status
  - [ ] Webhook handling di BE (FE hanya display status)
- [ ] Mock payment untuk testing

**Deliverables:**
- Full e-commerce flow: browse → cart → checkout → payment → order complete
- Consumer bisa track orders
- Echo Admin bisa manage orders

---

## Future Phases (Not Detailed Yet)

### Phase 7: Website Builder Level B (Section-based)

- Drag-and-drop sections (hero, product grid, testimonials, footer)
- Section library dengan props configurable
- Reorder sections
- Save layout per page (home, about, contact)

### Phase 8: Analytics & Reporting

- Dashboard analytics (sales, traffic, conversion) di Echo Admin
- Integration dengan analytics service (Google Analytics, Plausible)

### Phase 9: Advanced Features

- Discount codes & promotions
- Inventory management
- Shipping integrations
- Multi-currency
- Multi-language (i18n)

### Phase 10: RBAC & Team Management

- Invite staff ke Echo Admin
- Role-based permissions (admin, staff, viewer)
- Audit logs

---

## Notes

- **Setiap phase bisa overlap** (parallel development per team member).
- **BE dependency:** jika endpoint belum ready, pakai MSW mock dulu. Jangan block FE development.
- **Testing:** unit test dengan Vitest per package, E2E dengan Playwright per app. Detail testing checklist per phase akan ditambahkan saat eksekusi.
- **Design system versioning:** jika `packages/ui` breaking changes, coordinate update di semua apps.

---

## Prioritas Jika Timeline Ketat

**Must-have untuk MVP (Phase 0-4):**
- Monorepo setup
- Alpha Landing + Admin (customer acquisition)
- Echo Admin (basic product management)
- Echo Storefront (basic e-commerce, path-based multi-tenant dulu)

**Nice-to-have (Phase 5-6):**
- Theme builder
- Full checkout + payment

**Can wait (Phase 7+):**
- Advanced builder
- Analytics
- RBAC
