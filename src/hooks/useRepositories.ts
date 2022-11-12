import { useQuery } from 'react-query'
import { api } from '../services/api'

interface IRepositoriesData {
  id: number
  name: string
  updated_at: Date
  language: string
  description: string
  html_url: string
}

async function loadUserRepositories(
  username: string,
): Promise<IRepositoriesData[]> {
  const { data } = await api.get('/users/lobo4321/repos', {
    params: { per_page: 100 },
  })

  return data
}

export function useRepositories(username: string) {
  return useQuery(['repositories'], () => loadUserRepositories(username))
}
