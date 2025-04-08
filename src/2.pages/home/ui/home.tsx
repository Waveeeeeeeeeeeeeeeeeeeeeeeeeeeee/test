import Header from '@/3.widgets/header/ui/Header'
import { MovingGallery } from '@/4.features/movingGallery'
import testImg from '@/6.shared/assets/images/test.png'

export const Home = () => {
	return (
		<div className=' min-h-screen p-5 bg-[var(--grey-medium)]'>
			<Header />
			<hr className='text-[var(--alpha-20)] my-5' />
			<div className='max-h-80 h-full overflow-hidden'>
				<MovingGallery
					images={[testImg, testImg, testImg]}
					direction='up'
					speed={50}
				/>
			</div>
		</div>
	)
}
