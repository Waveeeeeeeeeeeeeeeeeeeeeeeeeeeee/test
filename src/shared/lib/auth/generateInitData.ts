export const generateInitDataFromTelegram = (
	telegramUser: {
		id: number;
		first_name: string;
		last_name?: string;
		username?: string;
		language_code?: string;
		is_premium?: boolean;
		is_bot?: boolean;
		added_to_attachment_menu?: boolean;
		allows_write_to_pm?: boolean;
		photo_url?: string;
	},
	authDate: string | number,
	queryId: string,
	hash: string
) => {
	let authTimestamp: number;

	if (typeof authDate === 'number') {
		authTimestamp = authDate;
	} else {
		const dateObj =
			typeof authDate === 'string' ? new Date(authDate) : authDate;
		authTimestamp = Math.floor(dateObj.getTime() / 1000);
	}

	const userJsonString = JSON.stringify(telegramUser);

	const initDataObject = {
		auth_date: authTimestamp,
		query_id: queryId,
		user: userJsonString,
		hash
	};

	const logToDOM = (message: string) => {
		const logElement = document.getElementById('debug-log');
		if (logElement) {
			logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
			logElement.scrollTop = logElement.scrollHeight;
		}
	};

	logToDOM(
		'🔍 Generated initData object: ' + JSON.stringify(initDataObject, null, 2)
	);
	logToDOM('🔍 Telegram user object: ' + JSON.stringify(telegramUser, null, 2));
	logToDOM(
		'🔧 Auth date conversion: ' +
			JSON.stringify({
				original: authDate,
				originalType: typeof authDate,
				timestamp: authTimestamp,
				timestampType: typeof authTimestamp,
				humanReadable: new Date(authTimestamp * 1000).toISOString()
			})
	);

	return initDataObject;
};
