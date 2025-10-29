import { axiosInstance } from '../axiosInstance';

export type UpdateProfileParams = {
	gender?: string;
	age_range?: string;
	search_type?: 'JUST_PLAY' | 'REAL_MEETING' | 'NOTIFY_ON_NEW_PROFILES';
	about?: string;
	hobbies?: string;
	game_platform?: string[];
	activity_time?: string;
};

export type UpdateProfileResponse = {
	success: boolean;
};

export const updateProfile = async (
	data: UpdateProfileParams
): Promise<UpdateProfileResponse> => {
	const response = await axiosInstance.put(
		'/ace-friends/dating/v1/profiles/update_profile',
		data
	);
	return response.data;
};
