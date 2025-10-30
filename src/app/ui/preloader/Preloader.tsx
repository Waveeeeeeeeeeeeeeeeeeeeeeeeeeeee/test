import clsx from 'clsx';
import type { FC } from 'react';

import PreloadLogo from '../../assets/images/mainBg.svg?react';

import styles from './Preloader.module.css';

const Preloader: FC = () => {
  return (
    <>
			<div className={styles.preloader}>
				<div className='text-white text-center'>
					<div>
						<PreloadLogo
              className={clsx(
                'absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2',
                styles.glowing
              )} />
            
						<h1 className=' text-2xl max-w-[335px] font-gilroy font-semibold text-center mt-40 mx-auto flex justify-center items-center gap-3'>
							Ace Friends
						</h1>
						<p className=' mt-2 font-medium font-gilroy text-base text-[#8a8989]'>
							Быстрый поиск <br /> единомышленников
						</p>
					</div>
				</div>
				<div></div>
			</div>
		</>);

};

export default Preloader;