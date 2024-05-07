import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { ThemeToggle } from './theme-toggle'
import { UserNav } from './user-nav'

export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession()

  const isUserAuthenticated = await isAuthenticated()
  const user = await getUser()

  return (
    <nav className="flex h-[10vh] items-center border-b bg-background">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Notes<span className="text-primary">SaaS</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          <div className="flex items-center gap-x-5">
            {isUserAuthenticated && (
              <UserNav
                name={user?.given_name as string}
                email={user?.email as string}
                picture={user?.picture as string}
              />
            )}

            {!isUserAuthenticated && (
              <>
                <LoginLink>
                  <Button>Entre</Button>
                </LoginLink>
                <RegisterLink>
                  <Button variant="secondary">Crie sua conta</Button>
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
