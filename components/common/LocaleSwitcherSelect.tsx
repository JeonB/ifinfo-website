'use client'

import { usePathname, useRouter } from '@/navigation'
import { Locale } from '@/types'
import clsx from 'clsx'
import { ChangeEvent, ReactNode, useTransition } from 'react'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale
    startTransition(() => {
      const newUrl = `/${pathname}`
      router.replace(newUrl, { locale: nextLocale })
    })
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30',
      )}>
      {/* <p className="sr-only">{label}</p> */}
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}>
        {children}
      </select>
    </label>
  )
}
