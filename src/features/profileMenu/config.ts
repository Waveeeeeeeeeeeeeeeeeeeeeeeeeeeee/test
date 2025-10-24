import { Ticket } from 'lucide-react';
import { FC, SVGProps } from 'react';

import InviteIco from '@/shared/assets/icons/invite.svg?react';
import PrivacyIco from '@/shared/assets/icons/privacy.svg?react';
import RulesIco from '@/shared/assets/icons/rules.svg?react';
import SettingsIco from '@/shared/assets/icons/settings.svg?react';
import SupporIco from '@/shared/assets/icons/support.svg?react';

export interface ProfileMenuItem {
	key: string;
	icon: FC<SVGProps<SVGSVGElement>>;
	route: string;
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
		key: 'tickets',
		icon: Ticket,
		route: '/profile/tickets'
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
];
