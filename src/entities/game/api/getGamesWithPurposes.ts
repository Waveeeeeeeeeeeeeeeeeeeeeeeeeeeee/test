import { GameWithPurposesAdapt } from '../utils/adaptedData'

import { axiosInstance } from '@/shared/api/axiosInstance'

export const getGamesWithPurposes = async (): Promise<
	GameWithPurposesAdapt[]
> => {
	const response = await axiosInstance.get(
		'/database/games/get_games_with_purposes'
	)
	return response.data
}
