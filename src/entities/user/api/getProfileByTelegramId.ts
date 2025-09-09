import { axiosInstance } from '@/shared/api/axiosInstance'

export const getProfileByTelegramId = async (telegramId: string) => {
	const response = await axiosInstance.get(
		'/database/profiles/get_profile_by_telegram_id',
		{
			params: {
				user_id: telegramId
			}
		}
	)
	return response.data
}
