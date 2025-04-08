import Header from '@/3.widgets/header/ui/Header'

export const Home = () => {
	return (
		<div className=' min-h-screen p-5 bg-[var(--grey-medium)]'>
			<Header />
			<hr className='text-[var(--alpha-20)] my-5' />
			<div className='max-h-80 h-full overflow-hidden'></div>
		</div>
	)
}
