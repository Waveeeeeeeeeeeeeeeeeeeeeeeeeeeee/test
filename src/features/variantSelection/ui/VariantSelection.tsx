import clsx from 'clsx';
import { FC, SVGProps } from 'react';

import CheckIco from '../assets/check.svg?react';

import styles from './VariantSelection.module.css';

interface VariantItem {
  code: string;
  label: string;
  seclabel?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  content?: React.ReactNode;
  withContainer?: boolean;
}

interface VariantSelectionProps {
  data: VariantItem[];
  selected: string | string[];
  onSelect: (value: string | string[]) => void;
  variant?: 'col' | 'row';
  multiple?: boolean;
  shape?: 'circle' | 'square';
  className?: string;
}

const VariantSelection = ({
  data,
  selected,
  onSelect,
  variant = 'col',
  multiple = false,
  shape = 'circle'
}: VariantSelectionProps) => {
  const selectedArray = multiple ?
  selected as string[] :
  [selected as string];

  const handleChange = (code: string) => {
    if (multiple) {
      if (selectedArray.includes(code)) {
        onSelect(selectedArray.filter((c) => c !== code));
      } else {
        onSelect([...selectedArray, code]);
      }
    } else {
      onSelect(code);
    }
  };

  return (
    <div
      className={clsx('w-full flex mx-auto gap-3', `flex-${variant}`, {
        'flex-wrap': variant === 'row'
      })}>
      
			{data.map((item) => {
        const isSelected = selectedArray.includes(item.code);

        const labelContent =
        <label
          className={clsx(
            'flex items-center justify-between w-full p-3 rounded-2xl transition-colors bg-[var(--second-bg)] cursor-pointer duration-300',
            isSelected ?
            'border-2 border-[#6C5DD3]' :
            'border-2 border-transparent'
          )}>
          
						<input
            type={multiple ? 'checkbox' : 'radio'}
            name='variant-selection'
            value={item.code}
            checked={isSelected}
            onChange={() => handleChange(item.code)}
            className='hidden' />
          
						<div className='flex items-center gap-4'>
							{item.icon && <item.icon />}
							<div className='flex flex-col'>
								<span className='font-semibold'>{item.label}</span>
								{item.seclabel &&
              <span className={styles.secLabel}>{item.seclabel}</span>
              }
							</div>
						</div>

						<span
            className={clsx(
              'w-5 h-5 min-w-5 ml-1.5 flex items-center justify-center transition-colors border-2',
              shape === 'square' ? 'rounded-md' : 'rounded-full',
              isSelected ?
              'border-purple-700 bg-purple-700 text-white' :
              shape === 'square' ?
              'border-[#40434F] text-transparent' :
              'border-gray-300 text-transparent'
            )}>
            
							{isSelected &&
            <span className='text-white text-lg'>
									<CheckIco />
								</span>
            }
						</span>
					</label>;


        return (
          <div
            key={item.code}
            className={clsx(
              variant === 'col' ? 'w-full' : 'w-auto',
              'flex',
              'flex-col'
            )}>
            
						{item.withContainer && isSelected ?
            <div className='w-full bg-[var(--second-bg)] rounded-lg shadow-lg flex flex-col '>
								{labelContent}
								{item.content &&
              <div className='pl-3 pr-3 mb-6'>{item.content}</div>
              }
							</div> :

            labelContent
            }
					</div>);

      })}
		</div>);

};

export default VariantSelection;