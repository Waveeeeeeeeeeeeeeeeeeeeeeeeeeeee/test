import { useEffect, useState } from 'react';

import styles from './AccountInfoStep2.module.css';
import { useUserStore } from '@/entities/user/model/store';
import Search from '@/features/search/Search';
import { useCustomTranslation } from '@/shared';
import PhotoContainer from '@/shared/ui/PhotoContainer/PhotoContainer';
import { TagSelector } from '@/shared/ui/TagsSelectors/TagsSelectors';
import { TextArea } from '@/shared/ui/TextArea';

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
];

const AccountInfoStep2 = () => {
	const {
		profile,
		setProfileField,
		toggleInterest,
		addInterest,
		setUserImage
	} = useUserStore();
	const { title, label, placeholder, interest, char, searchHolder } =
		useCustomTranslation('accountInfoStep3');

	const [searchValue, setSearchValue] = useState('');

	const handleSearchChange = (value: string) => {
		setSearchValue(value);
	};

	const [tags, setTags] = useState([...initialTags]);

	useEffect(() => {
		const newTags = [...initialTags];
		profile.interests.forEach(interest => {
			if (!newTags.includes(interest)) {
				newTags.push(interest);
			}
		});
		setTags(newTags);
	}, [profile.interests]);

	const handleAddInterest = (tag: string) => {
		if (!tags.includes(tag)) {
			setTags([tag, ...tags]);
		}
		addInterest(tag);
	};

	return (
		<div className='flex flex-col gap-8 pb-20'>
			<h2 className={styles.title}>{title}</h2>
			<PhotoContainer setImage={setUserImage} />
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
						searchValue={searchValue}
						onSearchChange={handleSearchChange}
					/>

					<TagSelector
						presetTags={tags}
						interests={profile.interests}
						toggleInterest={toggleInterest}
						edit={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default AccountInfoStep2;
