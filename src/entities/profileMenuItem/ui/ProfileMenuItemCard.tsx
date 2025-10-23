import { FC } from 'react';
import { useNavigate } from 'react-router';

import { ProfileMenuItem } from '@/features/profileMenu/config';
import { useCustomTranslation } from '@/shared';
import { useRulesToggle } from '@/widgets/onboardingSteps/model/toggleRules';

interface Props {
	item: ProfileMenuItem;
}

export const ProfileMenuItemCard: FC<Props> = ({ item }) => {
	const navigate = useNavigate();
	const {
		settings,
		games,
		support,
		rules,
		privacy,
		settings_description,
		games_description,
		support_description,
		rules_description,
		privacy_description
	} = useCustomTranslation('profile');
	const { open } = useRulesToggle();

	const handleNavigate = (route: string) => {
		if (route === 'rules') {
			open();
			return;
		}
		navigate(route);
	};

	const getItemText = (key: string) => {
		switch (key) {
			case 'settings':
				return settings || 'Settings';
			case 'games':
				return games || 'Games';
			case 'support':
				return support || 'Support';
			case 'rules':
				return rules || 'Rules';
			case 'privacy':
				return privacy || 'Privacy';
			default:
				return key;
		}
	};

	const getItemDescription = (key: string) => {
		switch (key) {
			case 'settings':
				return settings_description || 'Personal information, description tags';
			case 'games':
				return games_description || 'Change your game list and goals';
			case 'support':
				return support_description || 'Personal information, description tags';
			case 'rules':
				return rules_description || 'Personal information, description tags';
			case 'privacy':
				return privacy_description || 'Personal information, description tags';
			default:
				return '';
		}
	};

	return (
		<button
			onClick={() => handleNavigate(item.route)}
			className='flex items-center gap-4 bg-[var(--second-bg)] p-4 rounded-2xl text-left  text-white hover:bg-[var(--third-bg)] transition-colors w-full cursor-pointer'
		>
			<div className='mt-1'>
				<item.icon />
			</div>
			<div>
				<div className='font-semibold mb-0.5'>{getItemText(item.key)}</div>
				<div className='text-sm text-gray-400'>
					{getItemDescription(item.key)}
				</div>
			</div>
		</button>
	);
};
