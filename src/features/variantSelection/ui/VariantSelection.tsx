import clsx from 'clsx';
import { FC, SVGProps } from 'react';

import CheckIco from '../assets/check.svg?react';

import styles from './VariantSelection.module.css';

interface VariantSelectionProps {
	data: {
		code: string;
		label: string;
		seclabel?: string;
		icon?: FC<SVGProps<SVGSVGElement>>;
	}[];
	selected: string;
	onSelect: (value: string) => void;
	variant?: string;
}

const VariantSelection = ({
	data,
	selected,
	onSelect,
	variant = 'col'
}: VariantSelectionProps) => {
	return (
		<div
			className={clsx(
				`w-full rounded-lg shadow-lg flex flex-${variant} mx-auto gap-3`
			)}
		>
			{data.map(item => (
				<label
					key={item.code}
					className={`flex items-center justify-between w-full p-3 rounded-2xl transition-colors bg-[var(--second-bg)] cursor-pointer duration-300 
					${selected === item.code ? 'border-2 border-[var(--violet)]' : 'border-2 border-transparent'}`}
				>
					<input
						type='radio'
						name='variant-selection'
						value={item.code}
						checked={selected === item.code}
						onChange={() => onSelect(item.code)}
						className='hidden'
					/>
					<div className='flex items-center gap-4'>
						{item?.icon && <item.icon />}
						<div className='flex flex-col'>
							<span>{item.label}</span>
							<span className={styles.secLabel}>
								{item.seclabel && item.seclabel}
							</span>
						</div>
					</div>

					<span
						className={`w-5 h-5 min-w-5 ml-1.5 border-2 rounded-full flex items-center justify-center 
              ${selected === item.code ? 'border-purple-700 bg-purple-700 text-white' : 'border-gray-300 text-transparent'} 
              transition-colors`}
					>
						{selected === item.code && (
							<span className='text-white text-lg'>
								<CheckIco />
							</span>
						)}
					</span>
				</label>
			))}
		</div>
	);
};

export default VariantSelection;
