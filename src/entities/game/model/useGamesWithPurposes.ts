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
				const largeGamesList = [...adaptedGames];

				for (let i = 0; i < 1000; i++) {
					adaptedGames.forEach(game => {
						largeGamesList.push({
							...game,
							id:
								game.id +
								`_clone_${i}_${Math.random().toString(36).slice(2, 5)}`,
							title: `${game.title} ${i}`
						});
					});
				}

				setGames(largeGamesList);
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
