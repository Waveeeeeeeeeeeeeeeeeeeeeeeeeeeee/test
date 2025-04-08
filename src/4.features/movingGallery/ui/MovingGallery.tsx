import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

interface InfiniteScrollProps {
	images: string[]
	direction?: 'up' | 'down'
	speed?: number
}

export const MovingGallery: React.FC<InfiniteScrollProps> = ({
	images,
	direction = 'up',
	speed = 120
}) => {
	const [ref, { height }] = useMeasure()
	const yTranslation = useMotionValue(0)
	const [mustFinish, setMustFinish] = useState(false)
	const [rerender, setRerender] = useState(false)

	useEffect(() => {
		let controls
		const finalPosition = height

		if (mustFinish) {
			controls = animate(yTranslation, [yTranslation.get(), finalPosition], {
				ease: 'linear',
				duration: speed * (1 + yTranslation.get() / finalPosition),
				onComplete: () => {
					setMustFinish(false)
					setRerender(!rerender)
				}
			})
		} else {
			controls = animate(yTranslation, [0, finalPosition], {
				ease: 'linear',
				duration: finalPosition / (speed * 0.05),
				repeat: Infinity,
				repeatType: 'loop',
				repeatDelay: 0
			})
		}

		return controls?.stop
	}, [yTranslation, height, speed, rerender])

	return (
		<motion.div
			className='overflow-hidden relative w-full h-[max-content] gap-3 flex flex-col'
			ref={ref}
			style={{ y: yTranslation }}
		>
			{[...images, ...images].map((img, index) => (
				<img
					key={index}
					src={img}
					alt='Scrolling Image'
					className='w-[80px] h-[80px]'
				/>
			))}
		</motion.div>
	)
}
