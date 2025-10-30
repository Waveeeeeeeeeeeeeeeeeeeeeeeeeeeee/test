import clsx from 'clsx';
import { FC, SVGProps, memo } from 'react';
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';

import CheckIco from '../assets/check.svg?react';

import styles from './VariantSelection.module.css';

export interface VariantItem {
  code: string;
  label: string;
  seclabel?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  content?: React.ReactNode;
  withContainer?: boolean;
}

interface VirtualVariantSelectionProps {
  data: VariantItem[];
  selected: string[];
  onSelect: (value: string[]) => void;
  multiple?: boolean;
  rowHeight?: number;
}

const VariantRow = memo(
  ({
    item,
    isSelected,
    multiple,
    onToggle,
    style






  }: {item: VariantItem;isSelected: boolean;multiple: boolean;onToggle: (code: string) => void;style: React.CSSProperties;}) => {
    return (
      <div style={style} className='px-2'>
				<label
          className={clsx(
            'flex items-center justify-between w-full p-3 rounded-2xl transition-colors cursor-pointer duration-300',
            isSelected ?
            'border-2 border-[#6C5DD3]' :
            'border-2 border-transparent'
          )}>

					<input
            type={multiple ? 'checkbox' : 'radio'}
            value={item.code}
            checked={isSelected}
            onChange={() => onToggle(item.code)}
            className='hidden' />

					<div className='flex items-center gap-4'>
						{item.icon && <item.icon />}
						<div className='flex flex-col'>
							<span>{item.label}</span>
							{item.seclabel &&
              <span className={styles.secLabel}>{item.seclabel}</span>
              }
						</div>
					</div>

					<span
            className={clsx(
              'w-5 h-5 min-w-5 ml-1.5 border-2 rounded-full flex items-center justify-center transition-colors',
              isSelected ?
              'border-purple-700 bg-purple-700 text-white' :
              'border-gray-300 text-transparent'
            )}>

						{isSelected &&
            <span className='text-white text-lg'>
								<CheckIco />
							</span>
            }
					</span>
				</label>
			</div>);

  }
);

const VirtualVariantSelection = ({
  data,
  selected,
  onSelect,
  multiple = false,
  rowHeight = 90
}: VirtualVariantSelectionProps) => {
  const handleToggle = (code: string) => {
    if (multiple) {
      if (selected.includes(code)) {
        onSelect(selected.filter((c) => c !== code));
      } else {
        onSelect([...selected, code]);
      }
    } else {
      onSelect([code]);
    }
  };

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    const item = data[index];

    if (!item) {
      return null;
    }

    const isSelected = selected.includes(item.code);

    return (
      <VariantRow
        key={key}
        item={item}
        isSelected={isSelected}
        multiple={multiple}
        onToggle={handleToggle}
        style={style} />);


  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
			<AutoSizer>
				{({ height, width }) =>
        <List
          width={width}
          height={height}
          rowCount={data.length}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
          overscanRowCount={4}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} />

        }
			</AutoSizer>
		</div>);

};

export default VirtualVariantSelection;