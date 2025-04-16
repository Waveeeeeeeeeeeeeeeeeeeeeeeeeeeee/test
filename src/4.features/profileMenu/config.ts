import SettingsIco  from '../../6.shared/assets/icons/settings.svg?react'
import InviteIco  from '../../6.shared/assets/icons/invite.svg?react'
import SupporIco from '../../6.shared/assets/icons/support.svg?react'
import RulesIco from '../../6.shared/assets/icons/rules.svg?react'
import PrivacyIco from '../../6.shared/assets/icons/privacy.svg?react'
import { FC, SVGProps } from 'react'

export interface ProfileMenuItem {
	key: string
	icon: FC<SVGProps<SVGSVGElement>>
	route: string
}

export const profileMenuItems: ProfileMenuItem[] = [
	{
		key: 'settings',
		icon: SettingsIco,
		route: '/profile/settings'
	},
	{
		key: 'games',
		icon: InviteIco,
		route: '/profile/games'
	},
	{
		key: 'support',
		icon: SupporIco,
		route: '/profile/support'
	},
	{
		key: 'rules',
		icon: RulesIco,
		route: 'rules'
	},
	{
		key: 'privacy',
		icon: PrivacyIco,
		route: '/profile/privacy'
	}
]
