import { axiosInstance } from '@/shared/api/axiosInstance';

export const getLocationDetails = async (country: string, city: string) => {
  const response = await axiosInstance.get('gis/v1/location_details', {
    params: { country_name: country, city_name: city }
  });
  return response.data.country_code;
};