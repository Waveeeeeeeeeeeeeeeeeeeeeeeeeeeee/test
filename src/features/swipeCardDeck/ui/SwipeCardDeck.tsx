import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { SwipeableCard } from './SwipeableCard';
import { TPersonPreview } from '@/entities/person/types/PersonPreview.types';
import { PersonPreviewCard } from '@/entities/person/ui/PersonPreviewCard';
import { PersonGame } from '@/features/personGamesSlider/model/types';

interface SwipeCardDeckProps {
	users: TPersonPreview[];
	games: PersonGame[];
}

export const SwipeCardDeck = ({ users, games }: SwipeCardDeckProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState<number | null>(null);

	const handleSwipe = (dir: number) => {
		setDirection(dir);
		setTimeout(() => {
			setCurrentIndex(prev => (prev + 1) % users.length);
			setDirection(null);
		}, 300);
	};

	if (users.length === 0) return null;

	const activeUser = users[currentIndex];
	const nextUser = users[(currentIndex + 1) % users.length];

	return (
		<div className='relative w-full h-full flex items-center justify-center overflow-hidden touch-none'>
			<motion.div
				key={nextUser.nickname}
				className='absolute w-full h-full'
				initial={{ opacity: 0.3, scale: 0.85 }}
				animate={{ opacity: 0.3, scale: 0.85 }}
				style={{ zIndex: 5, height: '100%', bottom: 50 }}
			>
				<PersonPreviewCard person={nextUser} games={games} />
			</motion.div>
			<AnimatePresence mode='popLayout'>
				<SwipeableCard
					key={activeUser.nickname}
					user={activeUser}
					games={games}
					onSwipe={handleSwipe}
					direction={direction}
				/>
			</AnimatePresence>
		</div>
	);
};
