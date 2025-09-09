import { axiosInstance } from '../axiosInstance'

type CreateProfileParams = {
  user_id: number
  age: number
  gender: string
  about: string
  hobbies: string
}

export const createProfile = async (data: CreateProfileParams) => {
    const res = await axiosInstance.post('/database/profiles/create_profile', data)
    return res.data
}