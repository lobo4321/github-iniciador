import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import * as Select from '@radix-ui/react-select'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { RepositoryCard } from '../../components'
import { useRepositories, useUser } from '../../hooks'
import { useState } from 'react'

export default function Repositories() {
  const { data: session } = useSession()
  const [searchRepositories, setSearchRepositories] = useState('')
  const [languageRepositories, setLanguageRepositories] = useState('all')

  const userId = session?.user?.image?.replace(/\D/g, '').slice(0, -1)

  const user = useUser(userId as string)

  const username = user.data?.login

  const repositories = useRepositories(username as string)

  const languagesInRepositories = repositories.data?.map((repo) => {
    return repo.language
  })

  const uniqueValuesLanguagesRepositories = languagesInRepositories?.filter(
    (e, i, a) => a.indexOf(e) === i,
  )

  const filteredRepositorieByLanguage = repositories.data?.filter((repo) => {
    if (languageRepositories === 'all') {
      return repo
    } else {
      return repo.language === languageRepositories
    }
  })

  const filteredRepositories = filteredRepositorieByLanguage?.filter((repo) => {
    if (searchRepositories === '') {
      return repo
    } else {
      return repo.name.includes(searchRepositories.toLocaleLowerCase())
    }
  })

  return (
    <>
      <Head>
        <title>Repositories | Github-Iniciador</title>
      </Head>

      <main className="max-w-7xl m-auto mt-16 px-4 pb-5">
        {!session?.user ? (
          <div className="flex mt-20 flex-col items-center gap-10">
            <Image src="/user.svg" width={400} height={400} alt="Github" />
            <h1>Please Sign In to get access to this page</h1>
          </div>
        ) : (
          <>
            <h1 className="sm:text-4xl text-3xl">
              Hello {user.data?.login} you have {repositories.data?.length}{' '}
              repositories!
            </h1>
            <div className="flex justify-between items-center sm:gap-20 mt-5 gap-4">
              <input
                className="flex-1 bg-zinc-600 p-3 rounded-lg outline-none focus:shadow-blue-600 shadow-sm "
                placeholder="Search ..."
                type="text"
                value={searchRepositories}
                onChange={(e) => setSearchRepositories(e.target.value)}
              />
              <Select.Root onValueChange={setLanguageRepositories}>
                <Select.Trigger className="flex items-center gap-3 bg-zinc-600 p-3 rounded-sm">
                  <Select.Value placeholder="Select a language" />
                  <Select.Icon>
                    <MdKeyboardArrowDown size={20} color="#FFF" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="overflow-hidden bg-zinc-600 shadow rounded-sm ">
                    <Select.Viewport className="p-3 flex flex-col gap-2 ">
                      <Select.Item value="all" className="cursor-pointer ">
                        <Select.ItemText className="text-white text-lg">
                          All
                        </Select.ItemText>
                      </Select.Item>
                      {uniqueValuesLanguagesRepositories?.map((value) => (
                        <Select.Item
                          value={value}
                          key={value}
                          className="cursor-pointer "
                        >
                          <Select.ItemText className="text-white text-lg">
                            {value}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex gap-10 flex-wrap mt-12">
              {filteredRepositories?.map((repo) => (
                <RepositoryCard
                  key={repo.id}
                  description={repo.description}
                  language={repo.language}
                  title={repo.name}
                  updatedAt={repo.updated_at}
                />
              ))}
            </div>
            {repositories.isLoading && <h2>Loading ...</h2>}

            {filteredRepositories?.length === 0 && (
              <div className="flex mt-10 flex-col items-center gap-10">
                <Image
                  src="/empty-state.svg"
                  width={400}
                  height={400}
                  alt="Github"
                />
                <h1>Sorry we did not find any repository</h1>
              </div>
            )}
          </>
        )}
      </main>
    </>
  )
}
