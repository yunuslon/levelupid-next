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

## Notes

- Aturan bisa bertambah seiring kebutuhan project.
- Setiap penambahan aturan harus di-approve user dulu.
