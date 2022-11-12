import { useQuery } from 'react-query'

import { api } from '../services/api'

interface UserDataProps {
  login: string
}

async function loadUserData(userId: string): Promise<UserDataProps> {
  const { data } = await api.get(`/user/${userId}`)

  return data
}

export function useUser(userId: string) {
  return useQuery(['user'], () => loadUserData(userId))
}
