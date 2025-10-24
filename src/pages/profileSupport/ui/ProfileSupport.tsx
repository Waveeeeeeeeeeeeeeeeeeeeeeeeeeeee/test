import { useNavigate } from 'react-router';

import styles from './ProfileSupport.module.css';
import { useTicketStore } from '@/entities/ticket/model/store';
import { useSupportFormStore } from '@/features/supportForm/model/store';
import { Button, DropDown, TextArea, useCustomTranslation } from '@/shared';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';
import { handleBack } from '@/shared/lib/navigation/handleBack';
import PhotoContainer from '@/shared/ui/PhotoContainer/PhotoContainer';

const ProfileSupport = () => {
	const navigate = useNavigate();
	const { addTicket } = useTicketStore();
	const { title, messageTitle, problemTitle, problemDesc, sendButton } =
		useCustomTranslation('profileSupport');
	const { topic, setTopic, description, setDescription, setImage } =
		useSupportFormStore();
	const { char } = useCustomTranslation('onboardingAboutMe');
	const { backButton } = useCustomTranslation('Onboarding');

	const handleTopicChange = (info: string) => {
		setTopic(info);
	};

	const {
		problemMessage,
		problemApplication,
		problemAuth,
		problemSearch,
		problemNotifications,
		problemPhoto,
		problemChat,
		problemPayment,
		problemAccount
	} = useCustomTranslation('profileSupport');

	const getIconByProblemType = (problemType: string) => {
		const iconMap: { [key: string]: string } = {
			message: '💬',
			application: '📱',
			auth: '🔐',
			search: '🔍',
			notifications: '🔔',
			photo: '📷',
			chat: '💬',
			payment: '💳',
			account: '👤'
		};
		return iconMap[problemType] || '🎫';
	};

	const generateUniqueId = () => {
		return Date.now().toString() + Math.random().toString(36).substr(2, 9);
	};

	const getTitleByProblemType = (problemType: string) => {
		const titleMap: { [key: string]: string } = {
			message: problemMessage,
			application: problemApplication,
			auth: problemAuth,
			search: problemSearch,
			notifications: problemNotifications,
			photo: problemPhoto,
			chat: problemChat,
			payment: problemPayment,
			account: problemAccount
		};
		return titleMap[problemType] || problemApplication;
	};

	const problemData = [
		{ label: problemMessage, code: 'message' },
		{ label: problemApplication, code: 'application' },
		{ label: problemAuth, code: 'auth' },
		{ label: problemSearch, code: 'search' },
		{ label: problemNotifications, code: 'notifications' },
		{ label: problemPhoto, code: 'photo' },
		{ label: problemChat, code: 'chat' },
		{ label: problemPayment, code: 'payment' },
		{ label: problemAccount, code: 'account' }
	];

	const handleSubmitTicket = () => {
		if (!topic) {
			alert('Пожалуйста, выберите тему проблемы');
			return;
		}
		if (!description || description.length < 30) {
			alert('Описание должно содержать минимум 30 символов');
			return;
		}

		const newTicket = {
			id: generateUniqueId(),
			title: getTitleByProblemType(topic),
			description: description,
			status: 'open' as const,
			icon: getIconByProblemType(topic),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		addTicket(newTicket);

		setTopic('');
		setDescription('');
		setImage(null);

		navigate('/profile/tickets');
	};

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
							maxLength: 400,
							notification: `${description.length}/400 ${char}`,
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
				<Button variant='next' onClick={handleSubmitTicket}>
					{sendButton}
				</Button>
			</div>
		</div>
	);
};

export default AnimatedPage(ProfileSupport);
