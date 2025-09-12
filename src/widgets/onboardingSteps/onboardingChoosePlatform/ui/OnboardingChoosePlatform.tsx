import clsx from 'clsx';

import MobileIco from '../assets/mobile.svg?react';
import PcIco from '../assets/pc.svg?react';
import PlaystationIco from '../assets/playstation.svg?react';
import XboxIco from '../assets/xbox.svg?react';

import styles from './OnboardingChoosePlatform.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { useCustomTranslation } from '@/shared';

const platforms = [
	{ code: 'pc', label: 'PC', icon: PcIco },
	{ code: 'xbox', label: 'XBOX', icon: XboxIco },
	{ code: 'playstation', label: 'PlayStation', icon: PlaystationIco },
	{ code: 'mobile', label: 'Mobile', icon: MobileIco }
];

export const OnboardingChoosePlatform = () => {
	const selectedPlatform = useUserStore(
		state => state.profile.selectedPlatform
	);
	const setProfileField = useUserStore(state => state.setProfileField);

	const { title, description } = useCustomTranslation(
		'onboardingChoosePlatform'
	);

	const handlePlatformChange = (platform: string[]) => {
		setProfileField('selectedPlatform', platform);
	};

	return (
		<div className='flex flex-col gap-6 relative'>
			<div>
				<h1 className={clsx(styles.title, 'font-gilroy')}>{title}</h1>
				<p className={styles.description}>{description}</p>
			</div>
			<VariantSelection
				data={platforms}
				selected={selectedPlatform}
				multiple={true}
				onSelect={value => handlePlatformChange(value as string[])}
			/>
		</div>
	);
};
