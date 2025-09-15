import { useState } from 'react';

import { GameListProps } from '../model/types';

import Search from '@/features/search/Search';
import VirtualVariantSelection from '@/features/variantSelection/ui/VirtualVariantSelection';

export const GameList = ({
	games,
	searchValue,
	onSearchChange,
	selectedGameIds,
	onChangeSelectedGameIds,
	allGameTitles,
	searchPlaceholder = 'Поиск'
}: GameListProps) => {
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const filteredGames = selectedTag
		? games.filter(game => game.title === selectedTag)
		: searchValue.trim() === ''
			? games
			: games.filter(game =>
					game.title.toLowerCase().includes(searchValue.toLowerCase())
				);

	const handleAddInterest = (tag: string) => {
		const game = games.find(g => g.title === tag);
		if (game) {
			onChangeSelectedGameIds([...selectedGameIds, game.id]);
		}
		setSelectedTag(tag);
		onSearchChange('');
	};

	const handleSearchChange = (value: string) => {
		onSearchChange(value);
		if (value === '') {
			setSelectedTag(null);
		}
	};

	return (
		<div className='w-full mx-auto'>
			<Search
				tags={allGameTitles}
				addInterest={handleAddInterest}
				placeholder={searchPlaceholder}
				searchValue={searchValue}
				onSearchChange={handleSearchChange}
			/>

			<VirtualVariantSelection
				data={filteredGames.map(game => ({
					code: game.id,
					label: game.title,
					seclabel: `${game.players} чел.`,
					icon: () => (
						<img
							src={game.icon}
							alt={game.title}
							className='w-[52px] h-[52px] rounded-2xl'
						/>
					)
				}))}
				selected={selectedGameIds}
				onSelect={value => {
					if (Array.isArray(value)) {
						onChangeSelectedGameIds(value);
					} else {
						onChangeSelectedGameIds([value]);
					}
				}}
				multiple
			/>
		</div>
	);
};
