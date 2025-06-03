import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getProfileByTelegramId } from '@/5.entities/user/api/getProfileByTelegramId'
import { useUserStore } from '@/5.entities/user/model/store'

export const CheckExistingProfile = () => {
	const navigate = useNavigate()
	const { user, setUserAndProfileIds } = useUserStore()

	useEffect(() => {
		if (!user?.id) return

		const checkProfile = async () => {
			try {
				const data = await getProfileByTelegramId(user.id.toString())
				if (data?.user_id && data?.profile_id) {
					setUserAndProfileIds(data.user_id, data.profile_id)
					navigate('/onboarding')
				}
			} catch (err) {
				console.error('Ошибка при проверке профиля:', err)
			} finally {
				navigate('/onboarding')
			}
		}

		checkProfile()
	}, [user])

	return null
}
