import { axiosInstance } from "@/6.shared/api/axiosInstance";

export const getLocationDetails = async (country: string, city: string) => {
  const response = await axiosInstance.get('/gis/ace-friends/gis/v1/location-details/', {
    params: { country_name: country, city_name: city },
  });
  return response.data.country_code; 
};
