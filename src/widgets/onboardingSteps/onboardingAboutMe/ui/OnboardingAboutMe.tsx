import { useState } from 'react';

import styles from './OnboardingAboutMe.module.css';
import { useUserStore } from '@/entities/user/model/store';
import { useCustomTranslation } from '@/shared';
import { Input } from '@/shared';
import PhotoContainer from '@/shared/ui/PhotoContainer/PhotoContainer';
import { TextArea } from '@/shared/ui/TextArea';

const OnboardingAboutMe = () => {
	const { profile, setProfileField, setUserImage } = useUserStore();
	const { title, labelRealLife, placeholder, char } =
		useCustomTranslation('onboardingAboutMe');
	const [reqChangeNickname, setReqChangeNickname] = useState(true);
	const [previousNickname, setPreviousNickname] = useState(profile.nickname);

	return (
		<div className='flex flex-col gap-8 pb-20'>
			<h2 className={styles.title}>{title}</h2>
			<div>
				<h2 className={styles.subTitle}>Aватар</h2>
				<PhotoContainer setImage={setUserImage} />
			</div>
			<div>
				{reqChangeNickname ? (
					<>
						<Input
							data={{
								label: 'Ваш никнейм',
								name: 'nickname',
								type: 'text',
								placeholder: 'Ваш никнейм',
								value: profile.nickname,
								onChange: (value: string) => setProfileField('nickname', value),
								labelSize: 'text-md'
							}}
						/>
						<div className='flex gap-2 mt-2'>
							<button
								onClick={() => {
									if (profile.nickname.length >= 6) {
										setReqChangeNickname(false);
										setPreviousNickname(profile.nickname);
									}
								}}
								disabled={profile.nickname.length < 6}
								className='px-4 py-2 bg-[#6B5CD1] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed'
							>
								Сохранить
							</button>
							{previousNickname.trim() && (
								<button
									onClick={() => {
										setProfileField('nickname', previousNickname);
										setReqChangeNickname(false);
									}}
									className='px-4 py-2 bg-gray-500 text-white rounded'
								>
									Отмена
								</button>
							)}
						</div>
						<p className='font-normal text-sm text-[#828289] mt-2'>
							{profile.nickname.length < 6
								? `Минимум 6 символов. Осталось ${6 - profile.nickname.length}`
								: 'Нажмите "Сохранить" чтобы завершить'}
						</p>
					</>
				) : (
					<div
						className='text-lg font-semibold mb-4 cursor-pointer'
						onClick={() => {
							setPreviousNickname(profile.nickname);
							setReqChangeNickname(true);
						}}
					>
						Ваш никнейм: {profile.nickname}
					</div>
				)}
			</div>
			<div>
				<h2 className='text-lg font-semibold mb-4'>Сколько тебе лет?</h2>
				<div className='flex flex-row flex-wrap items-center gap-4'>
					{['14-17', '18-24', '25-30', '35+'].map(age => (
						<label
							key={age}
							className='flex items-center space-x-3 cursor-pointer'
						>
							<input
								type='radio'
								name='age'
								onChange={() => setProfileField('age', age)}
								value={age}
								className='w-4 h-4 appearance-none border-1 border-[#525560] rounded-full checked:bg-[#6B5CD1] checked:border-[#6B5CD1] focus:outline-none focus:ring-[#6B5CD1]'
							/>
							<span className='text-white font-semibold text-700'>
								{age} {age === '18-24' ? 'года' : 'лет'}
							</span>
						</label>
					))}
				</div>
				<p className='font-normal text-sm text-[#828289] mt-2'>
					Возраст должен быть от 14 лет
				</p>
			</div>
			<TextArea
				data={{
					label: labelRealLife,
					name: 'comment',
					placeholder: placeholder,
					value: profile.about,
					minLength: 10,
					maxLength: 300,
					notification: `${profile.about.length}/300 ${char}`,
					onChange: (value: string) => setProfileField('about', value)
				}}
			/>
		</div>
	);
};

export default OnboardingAboutMe;
