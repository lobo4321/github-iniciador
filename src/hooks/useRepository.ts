import { useQuery } from 'react-query'
import { api } from '../services/api'

interface RepositoryDataProps {
  name: string
  html_url: string
  visibility: string
  default_branch: string
  forks: number
  subscribers_count: string
}

async function loadRepository(
  username: string,
  repositoryTitle: string,
): Promise<RepositoryDataProps> {
  const { data } = await api.get(`/repos/${username}/${repositoryTitle}`)

  return data
}

export function useRepository(username: string, repositoryTitle: string) {
  return useQuery(['repository'], () =>
    loadRepository(username, repositoryTitle),
  )
}
