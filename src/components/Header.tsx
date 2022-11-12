import Image from 'next/image'
import Link from 'next/link'
import { ActiveLink } from './ActiveLink'

import { SignInButton } from './SignInButton'

export function Header() {
  return (
    <div className="border-b border-zinc-600">
      <header className="max-w-7xl m-auto p-6 flex justify-between items-center">
        <div className="flex gap-10 items-center">
          <Link href="/" passHref>
            <Image
              src="/logo-iniciador.png"
              width={180}
              height={120}
              alt="Logo"
              className="mr-10"
            />
          </Link>

          <ActiveLink title="Home" url="/" />
          <ActiveLink title="Repositories" url="/repositories" />
        </div>
        <div className="hidden sm:block">
          <SignInButton />
        </div>
      </header>
    </div>
  )
}
