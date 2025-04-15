import duo from '../../../6.shared/assets/images/duo.svg?react'
import justPlay from '../../../6.shared/assets/images/justplay.svg?react'
import praks from '../../../6.shared/assets/images/praks.svg?react'
import ultimate from '../../../6.shared/assets/images/ultimate.svg?react'
import сonqueror from '../../../6.shared/assets/images/сonqueror.svg?react'

import { SearchCardTypes } from '@/5.entities/search/model/types'
import { SearchCard } from '@/5.entities/search/ui/SearchCard'
import { useCustomTranslation } from '@/6.shared'

const TargetSearchList = () => {
	const { justPlayTxt, conquerorTxt, praksTxt, duoTxt } =
		useCustomTranslation('targetSearchList')
	const searchList: SearchCardTypes[] = [
		{
			id: 'just-play-1',
			title: justPlayTxt,
			href: '/search/just-play',
			icon: justPlay,
			players: 2384
		},
		{
			id: 'сonqueror-1',
			title: conquerorTxt,
			icon: сonqueror,
			href: '/search/сonqueror',
			players: 2384
		},
		{
			id: 'ultimate-1',
			title: 'Ultimate Royal',
			icon: ultimate,
			href: '/search/ultimate',
			players: 2384
		},
		{
			id: 'praks-1',
			title: praksTxt,
			icon: praks,
			href: '/search/praks',
			players: 2384
		},
		{
			id: 'duo-1',
			title: duoTxt,
			icon: duo,
			href: '/search/duo',
			players: 2384
		},
		{
			id: 'wow-1',
			title: 'WoW',
			icon: justPlay,
			href: '/search/wow',
			players: 2384
		},
		{
			id: 'tdm-1',
			title: 'TDM',
			icon: justPlay,
			href: '/search/tdm',
			players: 2384
		}
	]
	return (
		<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2'>
			{searchList.map(card => (
				<SearchCard key={card.id} data={card} />
			))}
		</div>
	)
}

export default TargetSearchList
