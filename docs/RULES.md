# Working Rules

Aturan wajib untuk setiap task. Baca sebelum mulai kerja.

---

## 1. Ask When Unclear

Tanyakan semua hal yang ambigu atau kurang jelas sebelum mulai coding.
Jangan berasumsi tentang intent user, requirement, atau desain.

**Contoh:**
- ❌ "Saya asumsikan pakai library X karena umumnya begitu"
- ✅ "Untuk kasus ini pakai library X atau Y? X lebih ringan, Y lebih fitur lengkap."

---

## 2. Keep Logic Concise

Prefer short, readable code. Kalau logic bisa lebih pendek tanpa mengorbankan clarity, pilih yang pendek. Hindari over-engineering.

**Prinsip:**
- Satu function = satu tanggung jawab
- Early return > nested if
- Hindari abstraction premature

---

## 3. Avoid Circular Flow

Flow harus linear dan mudah di-trace. Hindari:
- Callback hell / nested promises berlebihan
- State yang saling depend circular
- Component/function yang route balik ke dirinya sendiri
- Import cycle antar module

---

## 4. Always Update CURRENT_STATE.md

Setiap **milestone task** selesai (bukan sub-task kecil):
- Update `docs/CURRENT_STATE.md` dengan progress terkini
- Tick checkbox di `docs/PLAN.md` yang relevan
- Update timestamp `Last updated`
- Notify user di akhir response: `✓ CURRENT_STATE.md updated`

**Definisi milestone task (level B):**
Setiap unit kerja yang punya deliverable jelas dalam satu phase.
Contoh: "extract UI components done", "auth package setup done".
Bukan sub-task granular seperti "create Button component".

---

## 5. Industry-Aligned Development

Semua keputusan development — arsitektur, gaya penulisan kode, konvensi, tooling — harus berpatokan pada standar industri yang berlaku umum, bukan preferensi ad-hoc. Kalau ada pola/konvensi umum di ekosistem (misal: `next/font` untuk font di Next.js, bukan raw CSS import), pilih yang idiomatic untuk stack yang dipakai.

**Prinsip:**
- Ikuti konvensi resmi framework/library yang dipakai
- Pilih pendekatan yang related & recognizable oleh developer lain di ekosistem
- Hindari solusi "pintar sendiri" yang menyimpang dari best practice umum

---

## 6. Reuse Before Recreate

Sebelum membuat function/component/hook baru, **WAJIB cek dulu** apakah sudah ada yang punya tujuan sama di codebase (shared packages, existing components, dll). Jangan buat duplikat dengan maksud serupa. Buat baru hanya jika ada kebutuhan spesifik yang benar-benar tidak bisa dipenuhi oleh yang sudah ada.

**Alur:**
1. Cek `packages/ui`, `packages/utils`, dan komponen/helper existing dulu
2. Kalau ada yang cocok → pakai/extend yang sudah ada
3. Kalau butuh variasi → pertimbangkan menambah opsi ke yang existing sebelum bikin baru
4. Buat baru hanya untuk kebutuhan khusus yang genuinely belum ter-cover

---

## 7. Follow Clean Code & SOLID Principles

Semua code harus mengikuti prinsip clean code dan SOLID. Pastikan kode mudah dibaca, di-maintain, dan di-extend oleh developer lain.

**Clean Code:**
- **Meaningful names** — variable, function, class harus self-explanatory. Hindari singkatan ambigu (`usr` → `user`, `calc` → `calculateTotal`)
- **Single responsibility** — satu function/class = satu tujuan. Jika function melakukan 2+ hal berbeda, split
- **Small functions** — prefer short, focused functions. Jika function terlalu panjang, pertimbangkan refactor
- **No magic numbers** — pakai named constants, bukan hardcoded value
- **Clear error handling** — jangan silent catch. Log/throw dengan message jelas

**SOLID:**
- **S — Single Responsibility:** setiap module/class punya satu alasan untuk berubah
- **O — Open/Closed:** terbuka untuk extension (via composition/inheritance), tertutup untuk modification (jangan edit core logic yang sudah stabil)
- **L — Liskov Substitution:** subtype harus bisa replace parent tanpa break behavior
- **I — Interface Segregation:** jangan paksa implementor depend pada method yang tidak dipakai (prefer small, specific interfaces)
- **D — Dependency Inversion:** depend on abstractions (interfaces/types), bukan concrete implementations

Balance dengan pragmatisme — jangan over-engineer.

---

## Notes

- Aturan bisa bertambah seiring kebutuhan project.
- Setiap penambahan aturan harus di-approve user dulu.
