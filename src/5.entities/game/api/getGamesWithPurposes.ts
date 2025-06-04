import { axiosInstance } from '@/6.shared/api/axiosInstance';
import { GameWithPurposes } from '../model/store';

export const getGamesWithPurposes = async (): Promise<GameWithPurposes[]> => {
  const response = await axiosInstance.get('/games/get_games_with_purposes');
  return response.data;
};
