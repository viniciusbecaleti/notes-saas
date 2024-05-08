import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'

import { SubmitButton } from '@/app/components/submit-button'
import prisma from '@/app/lib/prisma'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

async function getData({ userId }: { userId: string }) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  })

  return data
}

export default async function DashboardConfiguracoes() {
  const { getUser } = getKindeServerSession()

  const user = await getUser()
  const data = await getData({ userId: user?.id as string })

  async function postData(formData: FormData) {
    'use server'

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: formData.get('name') as string,
        colorScheme: formData.get('color') as string,
      },
    })

    revalidatePath('/', 'layout')
  }

  return (
    <section className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Configurações</h1>
          <p className="text-lg text-muted-foreground">
            Configurações do seu perfil
          </p>
        </div>
      </div>

      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
            <CardDescription>
              Forneça informações gerais sobre você. Por favor, não se esqueça
              de salvar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Seu nome</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  defaultValue={data?.name ?? undefined}
                  placeholder="Seu nome"
                />
              </div>

              <div className="space-y-1">
                <Label>Seu Email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  defaultValue={data?.email ?? undefined}
                  placeholder="Seu Email"
                  disabled
                />
              </div>

              <div className="space-y-1">
                <Label>Esquema de cores</Label>
                <Select
                  name="color"
                  defaultValue={data?.colorScheme ?? undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma cor" />
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Cor</SelectLabel>
                        <SelectItem value="theme-zinc">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-zinc-500"></div>
                            <div>Zinco</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-slate">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-slate-500"></div>
                            <div>Ardósia</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-stone">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-stone-500"></div>
                            <div>Pedra</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-gray">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                            <div>Cinza</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-neutral">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-neutral-500"></div>
                            <div>Neutro</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-red">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-red-500"></div>
                            <div>Vermelho</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-rose">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-rose-500"></div>
                            <div>Rosa</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-orange">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                            <div>Laranja</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-green">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-green-500"></div>
                            <div>Verde</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-blue">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                            <div>Azul</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-yellow">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                            <div>Amarelo</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="theme-violet">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-violet-500"></div>
                            <div>Violeta</div>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </section>
  )
}
