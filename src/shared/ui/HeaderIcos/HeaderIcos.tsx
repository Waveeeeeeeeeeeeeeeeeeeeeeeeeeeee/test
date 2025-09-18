import { motion } from 'framer-motion';

import cs from '../../assets/images/cs.png';
import gamePade from '../../assets/images/gamepad.png';
import lol from '../../assets/images/lol.png';
import meet from '../../assets/images/meet.png';
import pubg from '../../assets/images/pubg.png';
import ru from '../../assets/images/ru.png';
import ua from '../../assets/images/ua.png';
import usa from '../../assets/images/usa.png';

export const HeaderIcosChooseLanguage = () => {
	return (
		<>
			<motion.div
				className='absolute left-1/5'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				<img src={ru} alt='ru' />
			</motion.div>
			<motion.div
				className='absolute right-1/5'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<img src={ua} alt='ua' />
			</motion.div>
			<motion.div
				className='absolute -bottom-10 right-[33%] -z-1'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<img src={usa} alt='usa' />
			</motion.div>
		</>
	);
};

export const HeaderIcosChooseGame = () => {
	return (
		<>
			<motion.div
				className='absolute left-1/5'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				<img src={lol} alt='lol' />
			</motion.div>
			<motion.div
				className='absolute right-1/5'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<img src={cs} alt='cs' />
			</motion.div>
			<motion.div
				className='absolute -bottom-10 right-[33%]'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<img src={pubg} alt='pubg' />
			</motion.div>
		</>
	);
};

export const HeaderIcosChoosePlatform = () => {
	return (
		<>
			<motion.div
				className='absolute left-1/5'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				<img src={gamePade} alt='gamePade' />
			</motion.div>
			<motion.div
				className='absolute right-1/5 top-[70%]'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<img src={meet} alt='meet' />
			</motion.div>
		</>
	);
};
