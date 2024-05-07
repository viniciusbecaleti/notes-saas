'use client'

import { CreditCard, HomeIcon, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Configurações',
    href: '/dashboard/configuracoes',
    icon: Settings,
  },
  {
    name: 'Faturamento',
    href: '/dashboard/faturamento',
    icon: CreditCard,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <ul className="grid items-start gap-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>
            <span
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                pathname === link.href && 'bg-accent',
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
