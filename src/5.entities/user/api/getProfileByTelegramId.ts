import { axiosInstance } from "@/6.shared/api/axiosInstance"

export const getProfileByTelegramId = async (telegramId: string) => {
  const response = await axiosInstance.get('/profiles/get_profile_by_telegram_id', {
    params: {
        user_id: telegramId,
    }
  })
  return response.data
}