import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PersonGame } from '../model/types';

import { PersonGameCard } from '@/entities/person';

type Props = {
  games: PersonGame[];
};

export const PersonGamesSlider = ({ games }: Props) => {
  const paginationRef = useRef<HTMLDivElement>(null);

  return (
    <div className='swiper-container'>
			<Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: paginationRef.current,
          dynamicBullets: true
        }}
        spaceBetween={16}
        slidesPerView={1}
        onInit={(swiper) => {
          swiper.pagination.init();
          swiper.pagination.render();
        }}>
        
				{games.map((game) =>
        <SwiperSlide key={game.id}>
						<PersonGameCard game={game} />
					</SwiperSlide>
        )}
			</Swiper>

			<div
        ref={paginationRef}
        className='swiper-pagination'
        style={{
          position: 'relative',
          marginTop: '16px',
          height: '10px'
        }} />
      
		</div>);

};