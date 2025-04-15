import SkipIco from '../../../6.shared/assets/icons/skip.svg?react'

type Props = {
	userId: string
}

export const SkipButton = ({ userId }: Props) => {
	const handleSkip = () => {
		console.log('Skip user', userId)
	}

	return (
		<button
			onClick={handleSkip}
			className='flex-1 flex gap-0.5 items-center flex-col justify-center py-3 bg-neutral-800 rounded-2xl text-white text-sm cursor-pointer'
		>
			<SkipIco />
			Пропустить
		</button>
	)
}
