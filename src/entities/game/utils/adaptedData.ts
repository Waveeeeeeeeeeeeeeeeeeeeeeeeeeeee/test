import { GamesResponse } from '../api/getGamesWithPurposes';

export const adaptGames = (data: GamesResponse) => {
	const icons: Record<number, string> = {
		1: 'https://upload.wikimedia.org/wikipedia/ru/0/09/EA_FC_25_Cover.jpg',
		2: 'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg',
		3: 'https://upload.wikimedia.org/wikipedia/ru/0/09/EA_FC_25_Cover.jpg',
		4: 'https://upload.wikimedia.org/wikipedia/ru/thumb/8/8e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Dota_2.jpg/400px-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Dota_2.jpg'
	};

	console.log(data);

	return data.games_with_purposes.map(item => ({
		id: String(item.game.id),
		title: item.game.name,
		icon: icons[item.game.id] || '',
		players: 1382,
		purposes: item.purposes || []
	}));
};
