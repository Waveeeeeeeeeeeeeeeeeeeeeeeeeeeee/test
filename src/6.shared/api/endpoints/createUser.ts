import { axiosInstance } from '../axiosInstance'

type CreateUserParams = {
  name: string
  lang: string
  city: string
  country: string
  country_code: string
  email: null
  password_hash: null
  telegram_id: number
}

export type CreateUserResponse = {
  id: number
  name: string
  lang: string
  city: string
  country: string
  country_code: string
  email: string | null
  password_hash: string | null
  telegram_id: number
  is_blocked: boolean
  blocked_to: string | null
  created_at: string
}
export const createUser = async (
  data: CreateUserParams
): Promise<CreateUserResponse> => {
  const res = await axiosInstance.post('/users/create_user', data)
  return res.data
}
