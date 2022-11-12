import { AiFillGithub } from 'react-icons/ai'

import { useSession, signIn, signOut } from 'next-auth/react'

export function SignInButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="bg-zinc-700 px-5 py-3 rounded-full flex items-center gap-4 hover:bg-zinc-800 transition"
      >
        <AiFillGithub size={25} color="#2563EB" />
        {session.user?.name}
      </button>
    )
  } else {
    return (
      <button
        onClick={() => signIn('github')}
        className="bg-zinc-700 px-5 py-3 rounded-full flex items-center gap-4 hover:bg-zinc-800 transition"
      >
        <AiFillGithub size={25} />
        Sign In with Github
      </button>
    )
  }
}
