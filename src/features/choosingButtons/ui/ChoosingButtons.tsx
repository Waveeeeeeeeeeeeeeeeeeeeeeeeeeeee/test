interface ChoosingButtonsProps {
	data: string[]
	selected: string[]
	toggleSelection: (item: string) => void
}

const ChoosingButtons = ({
	data,
	selected,
	toggleSelection
}: ChoosingButtonsProps) => {
	return (
		<div className='flex flex-wrap gap-2'>
			{data.map((button, index) => (
				<button
					key={button + index}
					onClick={() => toggleSelection(button)}
					className={`px-4 py-3.5 rounded-xl transition-colors cursor-pointer font-semibold text-sm uppercase ${
						selected.includes(button)
							? 'bg-[var(--accent-secondary)] text-[var(--violet)]'
							: 'bg-[var(--grey-medium)] text-white/70'
					}`}
				>
					{button}
				</button>
			))}
		</div>
	)
}

export default ChoosingButtons
