import { telegramRegisterInstance } from '@/shared/api/telegramInstance';

export const reqRegister = (
	userData: Record<string, unknown>,
	initData: {
		auth_date: number;
		query_id: string;
		user: string;
		hash: string;
	}
) => {
	const logToDOM = (message: string) => {
		const logElement = document.getElementById('debug-log');
		if (logElement) {
			logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
			logElement.scrollTop = logElement.scrollHeight;
		}
	};

	const logElement = document.getElementById('debug-log');
	if (logElement) {
		logElement.innerHTML =
			'<div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Debug Log:</div>';
	}

	logToDOM('🔍 X-Telegram-Init-Data: ' + JSON.stringify(initData));
	logToDOM('🔍 User JSON: ' + initData.user);
	logToDOM('🔍 User Data: ' + JSON.stringify(userData, null, 2));
	logToDOM(
		'🔍 Telegram ID: ' +
			userData.telegram_id +
			' (type: ' +
			typeof userData.telegram_id +
			')'
	);

	return telegramRegisterInstance
		.post(
			'auth-old/v1/telegram/register',
			{
				nickname: userData.nickname,
				lang: userData.lang,
				country: userData.country,
				country_code: userData.country_code,
				telegram_id: userData.telegram_id
			},
			{
				headers: {
					'X-Telegram-Init-Data': JSON.stringify(initData)
				}
			}
		)
		.catch((error: unknown) => {
			logToDOM('❌ Register API Error Details:');
			const errorResponse = error as {
				response?: {
					status?: number;
					statusText?: string;
					data?: { detail?: string; error_code?: string };
				};
			};
			logToDOM('Status: ' + errorResponse.response?.status);
			logToDOM('Status Text: ' + errorResponse.response?.statusText);
			logToDOM('Detail: ' + errorResponse.response?.data?.detail);
			logToDOM('Error Code: ' + errorResponse.response?.data?.error_code);
			logToDOM(
				'Full Response Data: ' +
					JSON.stringify(errorResponse.response?.data, null, 2)
			);
			logToDOM('Full Error Object: ' + JSON.stringify(error, null, 2));
			throw error;
		});
};
