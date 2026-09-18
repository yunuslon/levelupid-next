'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { echoPost } from '@/lib/echo-client'
import { getInitials } from '@/lib/utils'

type AccountUser = {
  full_name: string
  email: string
  is_owner: boolean
}

export function AccountSwitcher({ user }: { user: AccountUser }) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await echoPost('auth/logout')
    } finally {
      router.replace('/auth/login')
      router.refresh()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={false}
        render={<Avatar className="size-9 rounded-lg" />}
        aria-label={`Open account menu for ${user.full_name}`}
      >
        <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 space-y-1 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-semibold">{user.full_name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          <p className="mt-1 text-xs capitalize text-muted-foreground">
            {user.is_owner ? 'Owner' : 'Staff'}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? 'Logging out...' : 'Log out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
