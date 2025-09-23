import { useUserStore } from '@/entities/user/model/store';

const QUALITY_MAP: Record<number, { text: string; color: string }> = {
	[-4]: {
		text: 'Описание не распознано!',
		color: '#FF4D4F' // UNDETECTED
	},
	[-3]: {
		text: 'Неприемлемое описание!\n\nЕсли хотите продолжить пользоваться сервисом, исправьте его в соответствии с правилами.',
		color: '#FF4D4F' // UNACCEPTABLE
	},
	[-2]: {
		text: 'Ваше описание выглядит неприемлемым...\n\nСоветуем исправить его, иначе анкета будет реже отображаться в поиске, а профиль более чувствителен к жалобам.',
		color: '#FA8C16' // SUSPICIOUS
	},
	[-1]: {
		text: 'Ваше описание содержит много ошибок или опечаток.\nИсправьте его, сделав более интересным и грамотным!\n\nИначе приоритет анкеты понизится.',
		color: '#FAAD14' // NEEDS_REWRITE
	},
	[0]: {
		text: 'Почти хорошо, но может быть еще лучше!\n\nОписание может не заинтересовать других пользователей.',
		color: '#52C41A' // CAN_BE_BETTER
	},
	[1]: {
		text: 'Шикарное описание!\n\nМы будем рады показать его другим пользователям!',
		color: '#389E0D' // OK
	}
};

export const QualityDescriptionIndicator = () => {
	const quality = useUserStore(state => state.profile.qualityOfDescription);

	const status = QUALITY_MAP[quality] || {
		text: 'Нет оценки',
		color: '#d9d9d9'
	};

	return (
		<div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
			<div
				style={{
					width: '12px',
					height: '12px',
					borderRadius: '50%',
					backgroundColor: status.color,
					marginRight: '8px'
				}}
			/>
			<span style={{ color: status.color, fontWeight: 500 }}>
				{status.text}
			</span>
		</div>
	);
};
