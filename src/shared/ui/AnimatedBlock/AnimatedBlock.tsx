import { AnimatePresence, motion } from 'framer-motion';

export const AnimatedBlock = ({ children }: {children: React.ReactNode;}) => {
  return (
    <AnimatePresence mode='wait'>
			<motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}>
        
				{children}
			</motion.div>
		</AnimatePresence>);

};