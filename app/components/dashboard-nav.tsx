'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { dashboardLinks } from './user-nav'

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <ul className="grid items-start gap-2">
      {dashboardLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>
            <span
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                pathname === link.href && 'bg-accent',
              )}
            >
              <link.icon className="mr-2 h-4 w-4 text-primary" />
              {link.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
