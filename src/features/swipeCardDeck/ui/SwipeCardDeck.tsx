// SwipeCardDeck.tsx
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import { PersonPreviewCard } from '@/entities/person/ui/PersonPreviewCard';
import { UserProfile } from '@/entities/user/model/types';
import { PersonGame } from '@/features/personGamesSlider/model/types';

interface SwipeCardDeckProps {
	users: UserProfile[];
	games: PersonGame[];
	selectedUserId?: string | null;
}

export const SwipeCardDeck = ({
	users,
	games,
	selectedUserId
}: SwipeCardDeckProps) => {
	// Если есть выбранная карточка → currentIndex = 0, иначе null
	const initialIndex = selectedUserId
		? users.findIndex(u => u.id === selectedUserId)
		: null;

	const [currentIndex, setCurrentIndex] = useState<number | null>(initialIndex);
	const [direction, setDirection] = useState<number | null>(null);

	const handleSwipe = (dir: number) => {
		if (currentIndex === null) return;
		setDirection(dir);
		setTimeout(() => {
			setCurrentIndex((prev: number) =>
				prev !== null ? (prev + 1) % users.length : 0
			);
			setDirection(null);
		}, 300);
	};

	if (users.length === 0) return null;

	const activeUser = currentIndex !== null ? users[currentIndex] : null;
	const nextUser =
		currentIndex !== null ? users[(currentIndex + 1) % users.length] : null;

	return (
		<div className='relative w-full h-full flex items-center justify-center overflow-hidden touch-none'>
			{nextUser && (
				<motion.div
					key={nextUser.nickname}
					className='absolute w-full h-full'
					initial={{ opacity: 0.3, scale: 0.95 }}
					animate={{ opacity: 0.3, scale: 0.95 }}
					style={{ zIndex: 5 }}
				>
					<PersonPreviewCard person={nextUser} games={games} />
				</motion.div>
			)}

			{activeUser && (
				<AnimatePresence mode='popLayout'>
					<SwipeableCard
						key={activeUser.nickname}
						user={activeUser}
						games={games}
						onSwipe={handleSwipe}
						direction={direction}
					/>
				</AnimatePresence>
			)}

			{/* Если currentIndex=null → все карточки просто выводятся без активности */}
			{currentIndex === null &&
				users.map(u => (
					<div key={u.nickname} className='absolute w-full h-full'>
						<PersonPreviewCard person={u} games={games} />
					</div>
				))}
		</div>
	);
};
