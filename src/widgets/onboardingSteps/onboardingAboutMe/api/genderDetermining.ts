import { axiosInstance } from '@/shared/api/axiosInstance';

type GenderDeterminingParams = {
	nickname: string;
	description: string;
};

export const genderDetermining = (data: GenderDeterminingParams) => {
	return axiosInstance.get('ai/v1/dating/gender_determining', {
		params: {
			nickname: data.nickname,
			description: data.description
		}
	});
};
