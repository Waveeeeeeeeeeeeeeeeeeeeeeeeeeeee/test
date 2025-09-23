import { axiosInstance } from '@/shared/api/axiosInstance';

type QualityOfDescriptionParams = {
	description: string;
};

export const qualityOfDescription = (
	data: QualityOfDescriptionParams,
	signal?: AbortSignal
) => {
	return axiosInstance.post(
		'ai/v1/dating/description_evaluation',
		{
			description: data.description
		},
		{ signal }
	);
};
