export const generateInitData = (
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
	originalHash?: string
) => {
	let authTimestamp: number;
	if (typeof authDate === 'number') {
		authTimestamp = authDate;
	} else if (typeof authDate === 'string') {
		authTimestamp = Math.floor(new Date(authDate).getTime() / 1000);
	} else {
		authTimestamp = Math.floor((authDate as Date).getTime() / 1000);
	}

	return {
		auth_date: authTimestamp,
		query_id: queryId,
		user: JSON.stringify(telegramUser),
		hash: originalHash || ''
	};
};

export const generateMockInitData = () => {
	return {
		auth_date: Math.floor(Date.now() / 1000),
		query_id: 'mock_query_id',
		user: JSON.stringify({
			id: 123456789,
			first_name: 'Test',
			last_name: 'User',
			username: 'testuser',
			language_code: 'ru'
		}),
		hash: 'mock_hash'
	};
};

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
	originalHash?: string
) => {
	let authTimestamp: number;
	if (typeof authDate === 'number') {
		authTimestamp = authDate;
	} else if (typeof authDate === 'string') {
		authTimestamp = Math.floor(new Date(authDate).getTime() / 1000);
	} else {
		authTimestamp = Math.floor((authDate as Date).getTime() / 1000);
	}

	return {
		auth_date: authTimestamp,
		query_id: queryId,
		user: JSON.stringify(telegramUser),
		hash: originalHash || ''
	};
};
