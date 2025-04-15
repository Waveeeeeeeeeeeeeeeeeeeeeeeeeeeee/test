import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { PersonGame } from '../model/types'

import { PersonGameCard } from '@/5.entities/person'

type Props = {
	games: PersonGame[]
}

export const PersonGamesSlider = ({ games }: Props) => {
	return (
		<>
			<Swiper
				modules={[Pagination]}
				pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
				spaceBetween={16}
				slidesPerView={1}
				className='w-full'
			>
				{games.map(game => (
					<SwiperSlide key={game.id}>
						<PersonGameCard game={game} />
					</SwiperSlide>
				))}
			</Swiper>

			<div className='custom-swiper-pagination  flex justify-center gap-1.5' />
		</>
	)
}
