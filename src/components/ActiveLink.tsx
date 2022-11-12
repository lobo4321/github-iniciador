import Link from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps {
  url: string
  title: string
}

export function ActiveLink({ title, url }: ActiveLinkProps) {
  const { asPath } = useRouter()
  const isActive = url === asPath

  return (
    <Link href={url}>
      <h3 className={isActive ? 'text-blue-600' : ''}>{title}</h3>
    </Link>
  )
}
