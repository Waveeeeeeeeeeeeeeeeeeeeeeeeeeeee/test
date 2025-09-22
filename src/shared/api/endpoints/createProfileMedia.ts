import { axiosInstance } from '../axiosInstance';

type CreateProfileMediaParams = {
	profile_id: number;
	format: 'JPEG' | 'PNG';
	bucket_url: string;
	bucket_name: string;
	bucket_region: string;
	object_key: string;
	thumbnail_object_key: string;
};

export const createProfileMedia = (data: CreateProfileMediaParams) => {
	return axiosInstance.post(
		'/database/v1/dating/profiles/create_profile_media',
		data
	);
};
