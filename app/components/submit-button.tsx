'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { Button, ButtonProps } from '@/components/ui/button'

interface SubmitButtonProps extends ButtonProps {
  defaultText: string
  textLoading: string
  className?: string
}

export function SubmitButton({
  defaultText,
  textLoading,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <>
      {pending && (
        <Button disabled className={`w-fit ${className}`}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {textLoading}
        </Button>
      )}
      {!pending && (
        <Button className={`w-fit ${className}`} type="submit">
          {defaultText}
        </Button>
      )}
    </>
  )
}
