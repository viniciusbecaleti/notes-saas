import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { CreditCard, DoorClosedIcon, HomeIcon, Settings } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const dashboardLinks = [
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

export async function UserNav({
  name,
  email,
  picture,
}: {
  name: string
  email: string
  picture: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
        >
          <Avatar>
            <AvatarImage src={picture} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dashboardLinks.map((link) => (
            <DropdownMenuItem asChild key={link.href}>
              <Link
                href={link.href}
                className="flex cursor-pointer items-center justify-between"
              >
                {link.name}
                <link.icon className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer items-center justify-between"
        >
          <LogoutLink>
            Sair{' '}
            <span>
              <DoorClosedIcon className="h-4 w-4" />
            </span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
