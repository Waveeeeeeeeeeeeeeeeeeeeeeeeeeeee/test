import { SearchCardTypes } from '../model/types'

import duo from '@/shared/assets/images/duo.svg?react'
import justPlay from '@/shared/assets/images/justplay.svg?react'
import praks from '@/shared/assets/images/praks.svg?react'
import ultimate from '@/shared/assets/images/ultimate.svg?react'
import сonqueror from '@/shared/assets/images/сonqueror.svg?react'

export const searchList: SearchCardTypes[] = [
	{
		id: 'just-play-1',
		title: 'Просто поиграть',
		href: '/search/just-play',
		icon: justPlay,
		players: 2384
	},
	{
		id: 'сonqueror-1',
		title: 'Завоеватель',
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
		title: 'Праки',
		icon: praks,
		href: '/search/praks',
		players: 2384
	},
	{
		id: 'duo-1',
		title: 'Дуо',
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
