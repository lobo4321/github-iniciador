import Image from 'next/image'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useRepository, useUser } from '../../hooks'
import Head from 'next/head'

export default function Repository() {
  const { data: session } = useSession()
  const router = useRouter()
  const repositoryTitle = router.query.repositoryTitle
  const userId = session?.user?.image?.replace(/\D/g, '').slice(0, -1)

  const user = useUser(userId as string)

  const username = user.data?.login

  const repository = useRepository(
    username as string,
    repositoryTitle as string,
  )

  function handleGoBack() {
    router.back()
  }

  return (
    <>
      <Head>
        <title>{repository.data?.name} | Github Iniciador</title>
      </Head>
      <main className="max-w-7xl m-auto px-4 mt-32 flex flex-col gap-10">
        {session?.user ? (
          <>
            <div>
              <button
                className="text-lg font-bold text-blue-600 transition hover:text-blue-500"
                onClick={handleGoBack}
              >
                Voltar
              </button>
            </div>
            <h1 className="text-6xl font-bold">{repository.data?.name}</h1>
            <a
              href={repository.data?.html_url}
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-600"
            >
              {repository.data?.html_url}
            </a>
            <h2>private/public: {repository.data?.visibility}</h2>
            <h2>default branch: {repository.data?.default_branch}</h2>
            <h2>forks: {repository.data?.forks}</h2>
            <h2>subscribers: {repository.data?.subscribers_count}</h2>
          </>
        ) : (
          <div className="flex mt-20 flex-col items-center gap-10">
            <Image src="/user.svg" width={400} height={400} alt="Github" />
            <h1>Please Sign In to get access to this page</h1>
          </div>
        )}
      </main>
    </>
  )
}
