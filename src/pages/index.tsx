import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { SignInButton } from '../components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Github-Iniciador</title>
      </Head>
      <main className="max-w-7xl m-auto flex justify-between items-center mt-28 sm:flex-row sm:gap-0 flex-col px-4 gap-10">
        <div className="flex flex-col gap-10">
          <h2 className="text-2xl">Hello Welcome 👏</h2>
          <h1 className="sm:text-6xl sm:w-4/5 text-4xl">
            Get access yours repositories in Github
          </h1>
          <p>
            In this website you will be able to get all repositories in an
            organized way
          </p>
          <div className="hidden sm:block">
            <Link href="/repositories" passHref>
              <button className="py-5 px-16 bg-blue-600 hover:bg-blue-500 transition rounded-full ">
                Repositories
              </button>
            </Link>
          </div>
          <div className="block sm:hidden">
            <SignInButton />
          </div>
        </div>
        <div className="w-[30rem] h-[30rem] relative hidden sm:block">
          <Image src="/coding.svg" layout="fill" alt="Person coding" />
        </div>
      </main>
    </>
  )
}
