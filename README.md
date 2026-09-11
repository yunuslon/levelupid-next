# LevelUpID Frontend

> Monorepo frontend untuk platform SaaS e-commerce LevelUpID.

---

## 🚀 Quick Start

**Project ini masih fase dokumentasi.** Belum ada setup Turborepo atau apps.

### Untuk Mulai Kerja (Sesi Baru)

1. **Baca dokumentasi lengkap:**
   ```bash
   cd docs/
   # Baca README.md untuk navigasi
   # Baca CONTEXT.md untuk overview
   # Baca PLAN.md untuk roadmap
   ```

2. **Atau langsung:**
   - 📖 [**docs/CONTEXT.md**](./docs/CONTEXT.md) — Overview project (wajib baca)
   - 📋 [**docs/PLAN.md**](./docs/PLAN.md) — Implementation roadmap
   - 📚 [**docs/README.md**](./docs/README.md) — Documentation index

---

## 📦 Struktur (Target)

```
levelupid-fe/
├── apps/
│   ├── alpha-admin/         # Internal admin panel
│   ├── alpha-landing/       # Marketing + customer registration
│   ├── echo-admin/          # Tenant admin + website builder
│   └── echo-storefront/     # Multi-tenant e-commerce
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── api-client/          # HTTP client
│   ├── types/               # Shared types + schemas
│   └── ...                  # (lihat docs/CONTEXT.md untuk detail)
└── docs/                    # ← Documentation
```

---

## 🛠️ Tech Stack

- **Monorepo:** Turborepo + pnpm
- **Framework:** Next.js 16 (App Router)
- **UI:** shadcn/ui + Base UI
- **State:** Zustand + React Query
- **Auth:** Auth.js v5

Lengkap: [docs/CONTEXT.md](./docs/CONTEXT.md#4-tech-stack-final)

---

## 📝 Status

**Current:** Phase 0 (dokumentasi selesai, implementation belum mulai)

Lihat roadmap: [docs/PLAN.md](./docs/PLAN.md)

---

## 📞 References

- Template admin: https://github.com/arhamkhnz/next-shadcn-admin-dashboard-baseui
- Turborepo: https://turbo.build
- Next.js: https://nextjs.org

---

**Mulai dari dokumentasi di folder `docs/` terlebih dahulu.**
