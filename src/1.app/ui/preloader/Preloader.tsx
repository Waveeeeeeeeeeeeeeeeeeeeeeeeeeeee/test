import type { FC } from 'react'

import styles from './Preloader.module.css'
import Progress from './progress/Progress'

const Preloader: FC = () => {
	return (
		<div className={styles.preloader}>
			<div className='text-white text-center'>
				<h1 className=' text-3xl max-w-[335px] font-poetsen text-center mt-9 mx-auto'>
					Title
				</h1>
				<p className=' font-semibold '>Text</p>
			</div>
			<div>
				<Progress />
			</div>
		</div>
	)
}

export default Preloader
