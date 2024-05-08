import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

import { DashboardNav } from '@/app/components/dashboard-nav'
import prisma from '@/app/lib/prisma'
import { stripe } from '@/app/lib/stripe'

async function getData({
  id,
  firstName,
  lastName,
  email,
}: {
  id: string
  firstName: string | null | undefined
  lastName: string | null | undefined
  email: string
}) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  })

  if (!user) {
    const name = `${firstName ?? ''} ${lastName ?? ''}`

    await prisma.user.create({
      data: {
        id,
        name,
        email,
      },
    })
  }

  if (!user?.stripeCustomerId) {
    const { id: stripeId } = await stripe.customers.create({
      email,
    })

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        stripeCustomerId: stripeId,
      },
    })
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getUser } = getKindeServerSession()

  const user = await getUser()

  if (!user) {
    return redirect('/')
  }

  await getData({
    id: user.id as string,
    firstName: user.given_name as string,
    lastName: user.family_name as string,
    email: user.email as string,
  })

  return (
    <div className="mt-10 flex flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
