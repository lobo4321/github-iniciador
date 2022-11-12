import Link from 'next/link'

import { formatDistance, subDays } from 'date-fns'

interface RepositoryCardProps {
  title: string
  updatedAt: Date
  description: string
  language: string
}

export function RepositoryCard({
  description,
  language,
  title,
  updatedAt,
}: RepositoryCardProps) {
  const formattedDate = formatDistance(
    subDays(new Date(updatedAt), 3),
    new Date(),
    {
      addSuffix: true,
    },
  )

  return (
    <Link href={`/repositories/${title}`}>
      <div className="w-[24rem] h-60 p-5 bg-zinc-800 rounded-md border-2 border-transparent hover:border-blue-600">
        <header className="flex justify-between items-center">
          <h2 className="font-bold text-lg truncate">{title}</h2>
          <p className="text-sm">{formattedDate}</p>
        </header>
        <div className="mt-5">{language}</div>
        <p className="mt-10 text-sm">
          {!description ? 'No description' : description}
        </p>
      </div>
    </Link>
  )
}
