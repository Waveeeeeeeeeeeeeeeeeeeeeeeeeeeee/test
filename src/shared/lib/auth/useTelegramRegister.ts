import { useEffect } from 'react';

import { generateInitData } from './generateInitData';
import { reqRegister } from './reqRegister';

export const useTelegramRegister = () => {
	useEffect(() => {
		const register = async () => {
			const userData = {
				nickname: 'Wave',
				lang: 'EN',
				city: 'Moscow',
				country: 'Russia',
				country_code: 'RU',
				password: 'string',
				email: 'string',
				telegram_id: 123456,
				password_hash: 'string',
				search_type: 'JUST_PLAY'
			};

			try {
				const initData = await generateInitData();
				userData.telegram_id = JSON.parse(initData.user).id;

				const res = await reqRegister(userData, initData);

				console.log('✅ Register response:', res.data);
				alert('✅ Успешный вход: ' + JSON.stringify(res.data));
			} catch (e: any) {
				console.error('❌ Ошибка регистрации:', e.response?.data || e.message);
				alert(
					'❌ Ошибка регистрации: ' +
						(e.response?.data?.detail || e.message || 'Неизвестная ошибка')
				);
			}
		};

		register();
	}, []);
};
