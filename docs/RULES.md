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

## Notes

- Aturan bisa bertambah seiring kebutuhan project.
- Setiap penambahan aturan harus di-approve user dulu.
