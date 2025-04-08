import { useState } from 'react'

import { useFormStore } from '../../accountInfoStep1/model/aboutForm'

import styles from './AccountInfoStep2.module.css'
import Search from '@/4.features/search/Search'
import { useCustomTranslation } from '@/6.shared'
import PhotoContainer from '@/6.shared/ui/PhotoContainer/PhotoContainer'
import { TagSelector } from '@/6.shared/ui/TagsSelectors/TagsSelectors'
import { TextArea } from '@/6.shared/ui/TextArea'

const AccountInfoStep2 = () => {
	const { about, setAbout, interests, toggleInterest, addInterest } =
		useFormStore()
	const { title, label, placeholder, interest, char, searchHolder } =
		useCustomTranslation('accountInfoStep3')
	const [tags, setTags] = useState([
		'Футбол',
		'Баскетбол',
		'Рисование',
		'Аниме',
		'Машины',
		'Фильмы',
		'Музыка',
		'Спорт',
		'Литература'
	])
	return (
		<div className='flex flex-col gap-8 pb-14'>
			<h2 className={styles.title}>{title}</h2>
			<PhotoContainer />
			<TextArea
				data={{
					label: label,
					name: 'comment',
					placeholder: placeholder,
					value: about,
					minLength: 10,
					maxLength: 300,
					notification: `${about.length}/300 ${char}`,
					onChange: setAbout
				}}
			/>
			<div>
				<h3 className={styles.subTitle}>{interest}</h3>
				<div>
					<Search
						tags={tags}
						addInterest={tag => {
							if (!tags.includes(tag)) setTags([tag, ...tags])
							addInterest(tag)
						}}
						placeholder={searchHolder}
					/>

					<TagSelector
						presetTags={tags}
						interests={interests}
						toggleInterest={toggleInterest}
					/>
				</div>
			</div>
		</div>
	)
}

export default AccountInfoStep2
