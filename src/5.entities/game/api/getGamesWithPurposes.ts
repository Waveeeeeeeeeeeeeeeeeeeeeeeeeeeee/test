import { axiosInstance } from '@/6.shared/api/axiosInstance';
import { GameWithPurposesAdapt } from '../utils/adaptedData';

export const getGamesWithPurposes = async (): Promise<GameWithPurposesAdapt[]> => {
  const response = await axiosInstance.get('/database/games/get_games_with_purposes');
  return response.data;
};
