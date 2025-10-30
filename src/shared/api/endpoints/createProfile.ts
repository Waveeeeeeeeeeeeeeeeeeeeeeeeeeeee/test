import { axiosInstance } from '../axiosInstance';

export type CreateProfileParams = {
  gender: string;
  age_range: string;
  search_type: 'JUST_PLAY' | 'REAL_MEETING' | 'NOTIFY_ON_NEW_PROFILES';
  about: string;
  hobbies?: string;
  game_platform: string[];
  activity_time?: string;
};

export type CreateProfileResponse = {
  id: number;
  user: {
    id: number;
    nickname: string;
    lang: string;
    city: string;
    country: string;
    country_code: string;
    countries: string[];
    lat: number;
    lon: number;
    email: string;
    telegram_id: number;
    is_blocked: boolean;
  };
  gender: string;
  age_range: string;
  search_type: string;
  about: string;
  hobbies?: string;
  games: Array<{
    game: {id: number;name: string;description: string;};
    purposes: Array<{
      purpose_id: number;
      purpose_name: string;
      purpose_description: string;
    }>;
  }>;
  game_platform: string[];
  activity_time?: string;
  created_at: string;
};

export const createProfile = async (
data: CreateProfileParams)
: Promise<CreateProfileResponse> => {
  const response = await axiosInstance.post(
    '/ace-friends/dating/v1/profiles/create_profile',
    data
  );
  return response.data;
};