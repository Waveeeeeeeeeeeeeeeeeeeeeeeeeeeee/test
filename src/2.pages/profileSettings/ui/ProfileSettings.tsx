import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import RuIco from '../../../6.shared/assets/flags/ru.svg?react'
import UaIco from '../../../6.shared/assets/flags/ua.svg?react'
import GbIco from '../../../6.shared/assets/flags/us.svg?react'

import styles from './ProfileSettings.module.css'
import Search from '@/4.features/search/Search'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useUserStore } from '@/5.entities/user/model/store'
import { Button, Input, TextArea, useCustomTranslation } from '@/6.shared'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import { InputWithDropdown } from '@/6.shared/ui/InputWithDropdown/InputWithDropdown'
import { NotificationHeader } from '@/6.shared/ui/NotificationHeader'
import PhotoContainer from '@/6.shared/ui/PhotoContainer/PhotoContainer'
import { TagSelector } from '@/6.shared/ui/TagsSelectors/TagsSelectors'

const ProfileSettings = () => {
	const {
		profile,
		setProfileField,
		addInterest,
		toggleInterest,
		setUserImage,
		updateProfile
	} = useUserStore()
	const [tags, setTags] = useState([...profile.interests])
	const { label, placeholder, char, interest, searchHolder } =
		useCustomTranslation('accountInfoStep3')
	const {
		label1,
		placeholder1,
		notification,
		label2,
		placeholder2,
		button1,
		button2,
		label3,
		label4,
		lang,
		countryPlaceHolder
	} = useCustomTranslation('accountInfoStep2')
	const { title, backBtn, saveBtn } = useCustomTranslation('profileSettings')
	const [searchValue, setSearchValue] = useState('')
	const { i18n } = useTranslation()
	const [_, setError] = useState(null)
	const handleBack = () => {
		window.history.back()
	}

	const handleSave = async () => {
		setError(null)
		try {
			updateProfile(profile)
			localStorage.setItem('selectedLanguage', profile.selectedLanguage)
			window.history.back()
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Ошибка обновления профиля')
		}
	}
	const InputData = [
		{
			label: label2,
			type: 'text',
			name: 'name',
			value: profile.nickname,
			onChange: (value: string) => setProfileField('nickname', value),
			placeholder: placeholder2
		},
		{
			label: label1,
			type: 'number',
			name: 'age',
			placeholder: placeholder1,
			value: profile.age,
			onChange: (value: string) => setProfileField('age', value),
			notification
		}
	]

	const genders = [
		{ code: 'MALE', label: button1 },
		{ code: 'FEMALE', label: button2 }
	]

	const handleGenderChange = (gender: string) => {
		setProfileField('gender', gender)
	}

	const handleLanguageChange = (language: string) => {
		setProfileField('selectedLanguage', language)
	}

	const languages = [
		{ code: 'ru', label: 'Русский', flag: RuIco },
		{ code: 'ua', label: 'Український', flag: UaIco },
		{ code: 'en', label: 'English', flag: GbIco }
	]

	const countryData = [
		{ label: 'Украина', code: 'ua' },
		{ label: 'Россия', code: 'ru' }
	]

	const citiesByCountry = {
		ua: [
			{ label: 'Киев', code: 'kyiv' },
			{ label: 'Одесса', code: 'odesa' }
		],
		ru: [
			{ label: 'Москва', code: 'moscow' },
			{ label: 'Санкт-Петербург', code: 'spb' }
		]
	}

	const handleCountryChange = (countryCode: string) => {
		setProfileField('country', countryCode)
		setProfileField('city', '')
	}

	useEffect(() => {
		const newTags = [...profile.interests]
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

	useEffect(() => {
		if (i18n.language !== profile.selectedLanguage) {
			i18n.changeLanguage(profile.selectedLanguage)
		}
	}, [profile.selectedLanguage, i18n.language])

	return (
		<div className='h-full relative overflow-scroll flex flex-col pb-20'>
			<div className='flex-1 p-4 px-4 flex flex-col gap-7.5'>
				<NotificationHeader
					back
					title={title}
					goBack={handleBack}
					notification={false}
				/>
				<PhotoContainer setImage={setUserImage} />
				{InputData.map((item, index) => (
					<Input key={index} data={item} />
				))}
				<div>
					<h3 className={styles.subtitle}>{label3}</h3>
					<VariantSelection
						variant='row'
						data={genders}
						selected={profile.gender || ''}
						onSelect={handleGenderChange}
					/>
				</div>
				<div>
					<h3 className={styles.subtitle}>{lang}</h3>
					<VariantSelection
						data={languages}
						selected={profile.selectedLanguage}
						onSelect={handleLanguageChange}
					/>
				</div>
				<div>
					<h3 className={styles.subtitle}>{label4}</h3>
					<div className='flex gap-2.5'>
						<InputWithDropdown
							data={countryData}
							value={profile.country}
							onChange={handleCountryChange}
							placeholder={countryPlaceHolder}
						/>
						<InputWithDropdown
							data={
								profile.country
									? citiesByCountry[
											profile.country as keyof typeof citiesByCountry
										] || []
									: []
							}
							value={profile.city}
							onChange={value => setProfileField('city', value)}
							placeholder='Выберите город'
							disabled={!profile.country}
						/>
					</div>
				</div>

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
					<h3 className={styles.subtitle}>{interest}</h3>
					<div>
						<Search
							tags={tags}
							addInterest={handleAddInterest}
							placeholder={searchHolder}
							searchValue={searchValue}
							onSearchChange={setSearchValue}
						/>

						<TagSelector
							presetTags={tags}
							interests={profile.interests}
							toggleInterest={toggleInterest}
							edit={true}
							addInterest={handleAddInterest}
						/>
					</div>
				</div>
			</div>
			<div className={`flex w-full gap-4 mt-8 ${styles.buttons}`}>
				<Button variant='secondary' onClick={handleBack} type='submit'>
					{backBtn}
				</Button>
				<Button variant='accept' onClick={handleSave}>
					{saveBtn}
				</Button>
			</div>
		</div>
	)
}

export default AnimatedPage(ProfileSettings)
