import type { FC } from 'react'

import PreloadreBg from '../../assets/images/PreloadBg.svg?react'
import PreloadIco from '../../assets/images/preloadlogo.svg?react'
import TextLogo from '../../assets/images/textLogo.svg?react'

import styles from './Preloader.module.css'
import Progress from './progress/Progress'

const Preloader: FC = () => {
	return (
		<>
			<PreloadreBg className={styles.bgImage} />
			<div className={styles.preloader}>
				<div className='text-white text-center'>
					<h1 className=' text-3xl max-w-[335px] font-poetsen text-center mt-9 mx-auto flex justify-center items-center gap-3'>
						<PreloadIco />
						<TextLogo />
					</h1>
				</div>
				<div>
					<p className='font-bold'>Загрузка</p>
					<Progress />
				</div>
			</div>
		</>
	)
}

export default Preloader
