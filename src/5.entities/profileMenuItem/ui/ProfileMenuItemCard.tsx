import { FC } from 'react'
import { useNavigate } from 'react-router'

import { useRulesToggle } from '@/3.widgets/onboardingSteps/model/toggleRules'
import { ProfileMenuItem } from '@/4.features/profileMenu/config'
import { useCustomTranslation } from '@/6.shared'

interface Props {
	item: ProfileMenuItem
}

export const ProfileMenuItemCard: FC<Props> = ({ item }) => {
	const navigate = useNavigate()
	const t = useCustomTranslation('profile')
	const { open } = useRulesToggle()

	const handleNavigate = (route: string) => {
		if (route === 'rules') {
			open()
			return
		}
		navigate(route)
	}
	return (
		<button
			onClick={() => handleNavigate(item.route)}
			className='flex items-center gap-4 bg-[var(--second-bg)] p-4 rounded-2xl text-left  text-white hover:bg-[var(--third-bg)] transition-colors w-full cursor-pointer'
		>
			<div className='mt-1'>
				<item.icon />
			</div>
			<div>
				<div className='font-semibold mb-0.5'>{t[`${item.key}`]}</div>
				<div className='text-sm text-gray-400'>
					{t[`${item.key}_description`]}
				</div>
			</div>
		</button>
	)
}
