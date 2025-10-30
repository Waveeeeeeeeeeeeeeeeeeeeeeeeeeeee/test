import { axiosInstance } from '@/shared/api/axiosInstance';

type CountryDetailsParams = {
  country_name: string;
};

export const validateCountry = (data: CountryDetailsParams) => {
  return axiosInstance.get('gis/v1/country_details', {
    params: {
      country_name: data.country_name
    },
    headers: {
      'X-Access-Token': 's.woOdKCsT5TereQe0NdJiRkSU',
      'X-Token-Version': 'DATING_V1'
    }
  });
};