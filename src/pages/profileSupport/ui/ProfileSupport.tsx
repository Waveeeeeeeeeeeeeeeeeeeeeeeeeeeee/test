import styles from './ProfileSupport.module.css';
import { useSupportFormStore } from '@/features/supportForm/model/store';
import { Button, DropDown, TextArea, useCustomTranslation } from '@/shared';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';
import { handleBack } from '@/shared/lib/navigation/handleBack';
import PhotoContainer from '@/shared/ui/PhotoContainer/PhotoContainer';

const ProfileSupport = () => {
	const { title, messageTitle, problemTitle, problemDesc } =
		useCustomTranslation('profileSupport');
	const { topic, setTopic, description, setDescription, setImage } =
		useSupportFormStore();
	const { char } = useCustomTranslation('accountInfoStep3');
	const { backButton, nextButton } = useCustomTranslation('Onboarding');

	const handleTopicChange = (info: string) => {
		setTopic(info);
	};

	const problemData = [
		{ label: 'Проблема с функционалом сообщений', code: 'message' },
		{ label: 'Проблема с работой приложения', code: 'application' }
	];

	return (
		<div className='h-screen relative overflow-scroll flex flex-col'>
			<div className='flex-1 p-4 px-4 flex flex-col gap-7.5'>
				<NotificationHeaderFactory title={title} IsBack={true} />
				<div>
					<h3 className={styles.subtitle}>{messageTitle}</h3>
					<DropDown
						data={problemData}
						selectedValue={topic}
						onSelect={handleTopicChange}
						placeholder={problemData[0].label}
					/>
				</div>

				<div>
					<TextArea
						data={{
							label: problemTitle,
							name: 'comment',
							placeholder: problemDesc,
							value: description,
							minLength: 30,
							maxLength: 2000,
							notification: `${description.length}/2000 ${char}`,
							onChange: (value: string) => setDescription(value),
							height: 'h-[172px]'
						}}
					/>
				</div>

				<div>
					<PhotoContainer setImage={setImage} />
				</div>
			</div>
			<div className={`w-full flex gap-4 mt-8 ${styles.buttons}`}>
				<Button variant='secondary' onClick={handleBack}>
					{backButton}
				</Button>
				<Button variant='next' onClick={handleBack}>
					{nextButton}
				</Button>
			</div>
		</div>
	);
};

export default AnimatedPage(ProfileSupport);
