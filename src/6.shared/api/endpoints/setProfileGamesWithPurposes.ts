import { axiosInstance } from '../axiosInstance'

type SetProfileGamesWithPurposesParams = {
  profile_id: number
  game_id: number
  purpose_ids: number[]
}

export const setProfileGamesWithPurposes = (data: SetProfileGamesWithPurposesParams) => {
  return axiosInstance.post('/profiles/create_profile_games_purposes', data)
}