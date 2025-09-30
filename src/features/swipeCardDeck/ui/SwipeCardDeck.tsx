import {
	AnimatePresence,
	PanInfo,
	motion,
	useMotionValue,
	useTransform
} from 'framer-motion';
import React, { useRef, useState } from 'react';

import { PersonPreviewCard } from '@/entities/person/ui/PersonPreviewCard';
import { UserProfile } from '@/entities/user/model/types';
import { PersonGame } from '@/features/personGamesSlider/model/types';

type PersonPreview = Pick<
	UserProfile,
	'nickname' | 'image' | 'country_code' | 'age' | 'interests' | 'about'
> &
	Partial<UserProfile>;

interface SwipeCardDeckProps {
	users: PersonPreview[];
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
				initial={{ opacity: 0.3, scale: 0.95 }}
				animate={{ opacity: 0.3, scale: 0.95 }}
				style={{ zIndex: 5 }}
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

interface SwipeableCardProps {
	user: PersonPreview;
	games: PersonGame[];
	onSwipe: (dir: number) => void;
	direction: number | null;
}

const SwipeableCard = ({
	user,
	games,
	onSwipe,
	direction
}: SwipeableCardProps) => {
	const x = useMotionValue(0);
	const rotate = useTransform(x, [-200, 200], [-15, 15]);
	const dragEnabledRef = useRef(true);

	const handlePointerDown = (e: React.PointerEvent) => {
		const target = e.target as HTMLElement;
		if (target.closest('.swiper') || target.closest('.swiper-pagination')) {
			dragEnabledRef.current = false;
		} else {
			dragEnabledRef.current = true;
		}
	};

	const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
		if (!dragEnabledRef.current) {
			event.preventDefault();
		}
	};

	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		if (!dragEnabledRef.current) {
			x.set(0);
			return;
		}

		const offsetX = info.offset.x;
		const velocityX = info.velocity.x;
		const swipeThreshold = 150;
		const velocityThreshold = 500;

		if (offsetX > swipeThreshold || velocityX > velocityThreshold) {
			x.set(1000);
			onSwipe(1);
		} else if (offsetX < -swipeThreshold || velocityX < -velocityThreshold) {
			x.set(-1000);
			onSwipe(-1);
		} else {
			x.set(0);
		}
	};

	return (
		<motion.div
			className='absolute w-full h-full'
			style={{ x, rotate, zIndex: 15 }}
			drag='x'
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.3}
			onPointerDown={handlePointerDown}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
			exit={{
				x: direction ? direction * 1000 : 0,
				opacity: 0,
				transition: { duration: 0.3 }
			}}
		>
			<PersonPreviewCard person={user} games={games} />
		</motion.div>
	);
};
