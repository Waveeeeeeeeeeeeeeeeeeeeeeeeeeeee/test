import { useEffect, useState } from 'react'

import styles from './AccountInfoStep2.module.css'
import Search from '@/4.features/search/Search'
import { useUserStore } from '@/5.entities/user/model/store'
import { useCustomTranslation } from '@/6.shared'
import PhotoContainer from '@/6.shared/ui/PhotoContainer/PhotoContainer'
import { TagSelector } from '@/6.shared/ui/TagsSelectors/TagsSelectors'
import { TextArea } from '@/6.shared/ui/TextArea'

const AccountInfoStep2 = () => {
	const { profile, setProfileField, toggleInterest, addInterest, telegram } =
		useUserStore()
	const { title, label, placeholder, interest, char, searchHolder } =
		useCustomTranslation('accountInfoStep3')

	console.log(telegram)
	const initialTags = [
		'Футбол',
		'Баскетбол',
		'Рисование',
		'Аниме',
		'Машины',
		'Фильмы',
		'Музыка',
		'Спорт',
		'Литература'
	]

	const [tags, setTags] = useState([...initialTags])

	useEffect(() => {
		const newTags = [...initialTags]
		profile.interests.forEach(interest => {
			if (!newTags.includes(interest)) {
				newTags.push(interest)
			}
		})
		setTags(newTags)
	}, [profile.interests])

	const handleAddInterest = (tag: string) => {
		if (!tags.includes(tag)) {
			setTags([tag, ...tags])
		}
		addInterest(tag)
	}

	return (
		<div className='flex flex-col gap-8 pb-14'>
			<h2 className={styles.title}>{title}</h2>
			<PhotoContainer />
			<TextArea
				data={{
					label: label,
					name: 'comment',
					placeholder: placeholder,
					value: profile.about,
					minLength: 10,
					maxLength: 300,
					notification: `${profile.about.length}/300 ${char}`,
					onChange: (value: string) => setProfileField('about', value)
				}}
			/>
			<div>
				<h3 className={styles.subTitle}>{interest}</h3>
				<div>
					<Search
						tags={tags}
						addInterest={handleAddInterest}
						placeholder={searchHolder}
					/>

					<TagSelector
						presetTags={tags}
						interests={profile.interests}
						toggleInterest={toggleInterest}
					/>
				</div>
			</div>
		</div>
	)
}

export default AccountInfoStep2
