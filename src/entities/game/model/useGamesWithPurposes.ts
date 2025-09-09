import { useEffect } from 'react';

import { getGamesWithPurposes } from '../api/getGamesWithPurposes';
import { adaptGames } from '../utils/adaptedData';

import { useGameStore } from './store';

export const useGamesWithPurposes = () => {
	const { games, isLoading, error, setGames, setLoading, setError } =
		useGameStore();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getGamesWithPurposes();
				const adaptedGames = adaptGames(data);
				setGames(adaptedGames);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('Failed to fetch games');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [setGames, setLoading, setError]);

	return { games, isLoading, error };
};
