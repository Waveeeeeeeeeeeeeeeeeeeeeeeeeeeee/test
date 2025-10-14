import { telegramRegisterInstance } from '@/shared/api/telegramInstance';

// Функция для логирования в DOM
const logToDOM = (message: string) => {
	const logElement = document.getElementById('debug-log');
	if (logElement) {
		logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
		logElement.scrollTop = logElement.scrollHeight;
	}
};

export const reqRegister = (
	userData: Record<string, unknown>,
	initData: {
		auth_date: number;
		query_id: string;
		user: string;
		hash: string;
	}
) => {
	// Функция для логирования в DOM
	const logToDOM = (message: string) => {
		const logElement = document.getElementById('debug-log');
		if (logElement) {
			logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
			logElement.scrollTop = logElement.scrollHeight;
		}
	};

	logToDOM('🔍 X-Telegram-Init-Data: ' + JSON.stringify(initData));
	logToDOM('🔍 User JSON: ' + initData.user);

	return telegramRegisterInstance.post(
		'auth-old/v1/telegram/register',
		{
			...userData
		},
		{
			headers: {
				'X-Telegram-Init-Data': JSON.stringify(initData)
			}
		}
	);
};
