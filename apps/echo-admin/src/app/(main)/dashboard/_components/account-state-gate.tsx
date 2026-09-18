'use client'

import { useCallback, useEffect, useState } from 'react'

import type { EchoAccountState } from '@levelupid/types'

import { echoGet } from '@/lib/echo-client'

const POLL_INTERVAL = 8_000

export function AccountStateGate({
  initialState,
  children,
}: {
  initialState: EchoAccountState
  children: React.ReactNode
}) {
  const [state, setState] = useState(initialState)
  const [checking, setChecking] = useState(false)

  const refresh = useCallback(async () => {
    setChecking(true)
    try {
      setState(await echoGet<EchoAccountState>('me'))
    } finally {
      setChecking(false)
    }
  }, [])

  useEffect(() => {
    if (state.next_screen !== 'provisioning') return
    const interval = window.setInterval(refresh, POLL_INTERVAL)
    return () => window.clearInterval(interval)
  }, [refresh, state.next_screen])

  if (state.next_screen === 'provisioning') {
    return (
      <BlockingState
        title="Toko sedang disiapkan"
        description="Kami sedang menyiapkan website dan data toko Anda. Dashboard akan terbuka otomatis setelah proses selesai."
        progress={state.provisioning?.progress_percent ?? 0}
        checking={checking}
        onRefresh={refresh}
      />
    )
  }

  if (state.next_screen === 'provisioning_failed') {
    return (
      <BlockingState
        title="Penyiapan toko gagal"
        description="Penyiapan toko belum berhasil diselesaikan. Coba periksa kembali statusnya atau hubungi dukungan."
        progress={state.provisioning?.progress_percent ?? 0}
        checking={checking}
        onRefresh={refresh}
      />
    )
  }

  if (state.next_screen === 'suspended') {
    return (
      <BlockingState
        title="Akun ditangguhkan"
        description={
          state.tenant.suspension_reason ??
          'Akun Anda sedang ditangguhkan. Silakan hubungi dukungan.'
        }
        progress={0}
        checking={false}
        onRefresh={refresh}
      />
    )
  }

  return children
}

function BlockingState({
  title,
  description,
  progress,
  checking,
  onRefresh,
}: {
  title: string
  description: string
  progress: number
  checking: boolean
  onRefresh: () => void
}) {
  return (
    <div className="flex min-h-[calc(100dvh-3rem)] items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
          {progress >= 100 ? '✓' : '…'}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {progress > 0 && (
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        <button
          type="button"
          className="mt-7 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          onClick={onRefresh}
          disabled={checking}
        >
          {checking ? 'Memeriksa...' : 'Refresh Status'}
        </button>
      </div>
    </div>
  )
}
