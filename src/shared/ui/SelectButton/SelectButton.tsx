interface SelectButtonProps {
	items: string[]
	selectedItems: string | null
	onClick: (item: string) => void
}
export const SelectButton = ({
	items,
	selectedItems,
	onClick
}: SelectButtonProps) => {
	return (
		<div className='flex w-full justify-between items-center gap-3'>
			{items.map(item => (
				<button
					key={item}
					onClick={() => onClick(item)}
					className={`w-full flex items-center justify-center p-4 font-semibold text-sm cursor-pointer rounded-xl transition-colors
                        ${selectedItems === item ? 'bg-[var(--accent-secondary)] text-[var(--violet)]' : 'text-[var(--snow-white)] bg-[var(--grey-medium)]'}`}
				>
					{item}
				</button>
			))}
		</div>
	)
}
