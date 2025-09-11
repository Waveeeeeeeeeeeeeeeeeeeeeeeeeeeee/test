import { axiosInstance } from '@/shared/api/axiosInstance';

type LocationDetailsParams = {
	country_name: string;
	city_name: string;
};

export const validateLocation = (data: LocationDetailsParams) => {
	return axiosInstance.get('gis/v1/location_details', {
		params: {
			country_name: data.country_name,
			city_name: data.city_name
		}
	});
};
