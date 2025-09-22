import { axiosInstance } from '../axiosInstance';

type SetProfileGamesWithPurposesParams = {
	profile_id: number;
	games_with_purposes: Record<string, number[]>;
};

export const setProfileGamesWithPurposes = (
	data: SetProfileGamesWithPurposesParams
) => {
	return axiosInstance.patch(
		'/database/v1/dating/profiles/set_profile_games_with_purposes',
		data
	);
};
