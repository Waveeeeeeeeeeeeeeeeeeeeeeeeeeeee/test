import { AnimatePresence, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

type Props = {
	isOpen: boolean;
};

export const Modal = ({ children, isOpen }: PropsWithChildren<Props>) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 bg-black bg-opacity-50 flex justify-center w-full h-screen z-[200]'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className='bg-[var(--main-bg)] w-full rounded-t-2xl p-4 overflow-y-auto'
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
