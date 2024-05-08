import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { CheckCircle2 } from 'lucide-react'
import { redirect } from 'next/navigation'

import prisma from '@/app/lib/prisma'
import { getStripeSession } from '@/app/lib/stripe'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const featureItems = [
  {
    name: 'Notas ilimitadas',
  },
  {
    name: 'Suporte via chat',
  },
  {
    name: 'Sem anúncios',
  },
  {
    name: 'Exportar notas',
  },
  {
    name: 'E muito mais',
  },
]

async function getData({ userId }: { userId: string }) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  })

  return data
}

export default async function DashboardFaturamento() {
  const { getUser } = getKindeServerSession()

  const user = await getUser()
  const data = await getData({ userId: user?.id as string })

  async function createSubscription() {
    'use server'

    if (!data?.user.stripeCustomerId) {
      throw new Error('Usuário não possui um stripeCustomerId')
    }

    const subscriptionUrl = await getStripeSession({
      customerId: data.user.stripeCustomerId,
      domainUrl: 'http://localhost:3000',
      priceId: process.env.STRIPE_PRICE_ID as string,
    })

    return redirect(subscriptionUrl)
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
              Mensal
            </h3>
          </div>

          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            R$19,90
            <span className="ml-1 text-2xl text-muted-foreground">/mês</span>
          </div>

          <p className="mt-5 text-lg text-muted-foreground">
            Escreva quantas notas quiser por R$19,90/mês
          </p>
        </CardContent>

        <div className="m-1 flex flex-1 flex-col justify-between space-y-6 rounded-lg bg-secondary px-6 pb-8 pt-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {featureItems.map((item) => (
              <li key={item.name} className="flex items-center">
                <div className="flex-shrink0-">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base">{item.name}</p>
              </li>
            ))}
          </ul>

          <form className="w-full" action={createSubscription}>
            <Button className="w-full" type="submit">
              Comprar agora
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
