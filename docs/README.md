# LevelUpID Frontend — Documentation Index

> Navigation untuk semua dokumentasi project.

---

## 📚 Dokumentasi Utama

**Reading order untuk sesi baru:**
1. [CURRENT_STATE.md](./CURRENT_STATE.md) — cek progress terkini
2. [RULES.md](./RULES.md) — aturan kerja wajib
3. [CONTEXT.md](./CONTEXT.md) — overview project
4. [PLAN.md](./PLAN.md) — detail phase yang aktif

---

### [CURRENT_STATE.md](./CURRENT_STATE.md) ⭐
**Snapshot progress terkini.** Di-overwrite setiap milestone task selesai.

**Isi:** Phase aktif, recently completed, next steps, blockers, decisions terkini.

---

### [RULES.md](./RULES.md) ⭐
**Aturan kerja wajib** — baca sebelum mulai coding.

**Isi:** Ask when unclear, keep logic concise, avoid circular flow, always update CURRENT_STATE.

---

### [CONTEXT.md](./CONTEXT.md)
**Overview lengkap project:** product, arsitektur, tech stack, convention, open decisions.

**Baca ini jika:**
- Baru join project
- Lupa context setelah break
- Perlu referensi cepat tech stack

---

### [PLAN.md](./PLAN.md)
**Implementation roadmap** dengan phased checklist dari Phase 0 (foundation) sampai Phase 6 (e-commerce core).

**Gunakan ini untuk:**
- Track progress development
- Tahu apa yang harus dikerjakan next
- Estimasi timeline per phase

---

## 🏗️ Struktur Monorepo (Final)

```
levelupid-fe/
├── apps/
│   ├── alpha-admin/         # Internal panel (template baseui)
│   ├── alpha-landing/       # Marketing + registrasi customer
│   ├── echo-admin/          # Tenant admin + website builder (template baseui)
│   └── echo-storefront/     # E-commerce multi-tenant (custom domain)
│
├── packages/
│   ├── ui/                  # Shared shadcn/Base UI components
│   ├── api-client/          # Axios factory + interceptors
│   ├── query-client/        # React Query config + query keys
│   ├── auth/                # Auth.js shared + guards
│   ├── types/               # Zod schemas + TS types (BE contracts)
│   ├── api-mocks/           # MSW handlers
│   ├── utils/               # Format, validation helpers
│   ├── config-tailwind/     # Shared Tailwind v4 preset
│   ├── config-typescript/   # Shared tsconfig bases
│   └── config-biome/        # Shared Biome config
│
├── docs/                    # ← kamu di sini
├── turbo.json               # Turborepo pipeline config
├── pnpm-workspace.yaml      # pnpm workspace config
└── package.json             # Root package
```

---

## 🎯 Quick Start (Sesi Baru)

1. **Baca CONTEXT.md** (5-10 menit) — pahami big picture
2. **Cek PLAN.md** — lihat phase mana yang sedang/akan dikerjakan
3. **Install dependencies:**
   ```bash
   pnpm install
   ```
4. **Development:**
   ```bash
   pnpm dev              # run semua apps
   pnpm dev --filter=alpha-admin  # run specific app
   ```
5. **Linting & typecheck:**
   ```bash
   pnpm turbo lint typecheck
   ```

---

## 🔑 Tech Stack Ringkasan

| Layer | Tool |
|-------|------|
| Monorepo | Turborepo + pnpm |
| Framework | Next.js 16 (App Router) |
| UI | shadcn/ui + Base UI |
| Styling | Tailwind CSS v4 |
| State | Zustand + React Query |
| Auth | Auth.js v5 |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Mocking | MSW |
| Lint | Biome |

Detail lengkap: [CONTEXT.md §4](./CONTEXT.md#4-tech-stack-final)

---

## 🚀 Roadmap Status

| Phase | Status | Estimasi |
|-------|--------|----------|
| Phase 0: Foundation | 🔴 Not started | 1 week |
| Phase 1: Template Integration | 🔴 Not started | 1-2 weeks |
| Phase 2: Shared Packages | 🔴 Not started | 1-2 weeks |
| Phase 3: Alpha Domain | 🔴 Not started | 2-3 weeks |
| Phase 4: Echo Foundation | 🔴 Not started | 3-4 weeks |
| Phase 5: Website Builder MVP | 🔴 Not started | 2-3 weeks |
| Phase 6: E-commerce Core | 🔴 Not started | 4-6 weeks |

Detail checklist: [PLAN.md](./PLAN.md)

---

## 📝 Akan Ditambahkan (Future)

Dokumentasi ini akan bertambah saat development:

- **ARCHITECTURE.md** — diagram arsitektur detail (data flow, auth flow, multi-tenant)
- **API.md** — dokumentasi API contracts & endpoints
- **COMPONENTS.md** — component library docs (`packages/ui`)
- **DEPLOYMENT.md** — deployment guide per app
- **TESTING.md** — testing strategy & guide
- **TROUBLESHOOTING.md** — common issues & solutions

---

## 🤝 Contribution Guidelines

Saat ini belum ada tim contribution. Guidelines akan ditambahkan saat:
- Ada multiple contributors
- Perlu PR review process
- Perlu branching strategy

---

## 📞 Contact & References

- **Template Admin:** https://github.com/arhamkhnz/next-shadcn-admin-dashboard-baseui
- **Turborepo Docs:** https://turbo.build/repo/docs
- **Next.js 16 Docs:** https://nextjs.org/docs
- **Auth.js v5:** https://authjs.dev

---

**Last updated:** 2026-09-11  
**Project status:** Foundation phase (documentation only)
