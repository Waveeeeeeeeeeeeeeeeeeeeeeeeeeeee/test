import { axiosInstance } from '@/shared/api/axiosInstance';

type GenderDeterminingParams = {
  nickname: string;
  description: string;
};

export const genderDetermining = (
data: GenderDeterminingParams,
signal?: AbortSignal) =>
{
  return axiosInstance.post(
    'ai/v1/dating/gender_determining',
    {
      nickname: data.nickname,
      description: data.description
    },
    { signal }
  );
};