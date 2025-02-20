import { FC, SVGProps } from 'react'

import CheckIco from '../assets/check.svg?react'

interface languageSelectProps {
	data: {
		code: string
		label: string
		flag?: FC<SVGProps<SVGSVGElement>>
	}[]
	selectedLanguage: string
	setLanguage: (value: string) => void
}

const VariantSelection = ({
	data,
	selectedLanguage,
	setLanguage
}: languageSelectProps) => {
	return (
		<div className='w-full rounded-lg shadow-lg flex flex-col gap-3'>
			{data.map(lang => (
				<label
					key={lang.code}
					className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors bg-[var(--grey-medium)] cursor-pointer duration-300 
					${selectedLanguage === lang.code ? 'border-2 border-[var(--violet)]' : 'border-2 border-transparent'} 	
						`}
				>
					<input
						type='radio'
						name='language'
						value={lang.code}
						checked={selectedLanguage === lang.code}
						onChange={() => setLanguage(lang.code)}
						className='hidden'
					/>
					<span className='flex items-center gap-2'>
						{lang?.flag && <lang.flag />}
						<span>{lang.label}</span>
					</span>
					<span
						className={`w-5 h-5 border-2 rounded-full flex items-center justify-center 
              ${selectedLanguage === lang.code ? 'border-purple-700 bg-purple-700 text-white' : 'border-gray-300 text-transparent'} 
              transition-colors`}
					>
						{selectedLanguage === lang.code && (
							<span className='text-white text-lg'>
								<CheckIco />
							</span>
						)}
					</span>
				</label>
			))}
		</div>
	)
}

export default VariantSelection
