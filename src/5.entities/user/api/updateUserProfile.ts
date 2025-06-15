import { axiosInstance } from '@/6.shared/api/axiosInstance'
import { UserProfile } from '../model/types'

export const updateUserProfile = {
  async updateProfile(data: Partial<UserProfile>) {
    const response = await axiosInstance.put('/database/profiles/update_profile', {
      profile_id: data.profile_id,
      name: data.nickname,
      age: data.age,
      gender: data.gender,
      country: data.country,
      city: data.city,
      about: data.about,
      selectedLanguage: data.selectedLanguage,
      hobbies: data.interests && data.interests.join(', '),
    }
    )
    return response.data
  },
  
}