'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending && (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Por favor, aguarde
        </Button>
      )}
      {!pending && (
        <Button className="w-fit" type="submit">
          Salvar agora
        </Button>
      )}
    </>
  )
}
