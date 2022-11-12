import { useQuery } from 'react-query'
import { api } from '../services/api'

async function loadRepository(username: string, repositoryTitle: string) {
  const { data } = await api.get(`/repos/${username}/${repositoryTitle}`)

  return data
}

export function useRepository(username: string, repositoryTitle: string) {
  return useQuery(['repository'], () =>
    loadRepository(username, repositoryTitle),
  )
}
