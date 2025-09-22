import { axiosInstance } from '../axiosInstance';

type CreateProfileParams = {
	user_id: number;
	gender: string;
	about: string;
	hobbies: string;
	game_platform: string[];
	age_range: string;
	search_type: string;
	activity_time: string;
};

export const createProfile = async (data: CreateProfileParams) => {
	const res = await axiosInstance.post(
		'/database/v1/dating/profiles/create_profile',
		data
	);
	return res.data;
};
