import { useEffect } from 'react';
import { useGameStore } from './store';
import { getGamesWithPurposes } from '../api/getGamesWithPurposes';
import { adaptGames } from '../utils/adaptedData';

export const useGamesWithPurposes = () => {
  const { games, isLoading, error, setGames, setLoading, setError } = useGameStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
       const data = await getGamesWithPurposes();
        const adaptedGames = adaptGames(data);
        setGames(adaptedGames);
      } catch (err: any) {
        setError(err.message ?? 'Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setGames, setLoading, setError]);

  return { games, isLoading, error };
};
