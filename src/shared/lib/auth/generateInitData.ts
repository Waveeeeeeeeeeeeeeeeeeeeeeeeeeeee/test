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
	authDate: number,
	queryId: string,
	hash: string
) => {
	const userData = {
		id: telegramUser.id,
		first_name: telegramUser.first_name,
		last_name: telegramUser.last_name || 'User',
		username: telegramUser.username ? `@${telegramUser.username}` : '@user',
		language_code: telegramUser.language_code || 'ru',
		is_premium: telegramUser.is_premium || false,
		is_bot: telegramUser.is_bot || false,
		added_to_attachment_menu: telegramUser.added_to_attachment_menu || true,
		allows_write_to_pm: telegramUser.allows_write_to_pm || true,
		photo_url: telegramUser.photo_url || ''
	};

	const userJsonString = JSON.stringify(
		userData,
		Object.keys(userData).sort(),
		0
	).replace(/\s/g, '');

	const result = {
		auth_date: authDate,
		query_id: queryId,
		user: userJsonString,
		hash
	};

	return result;
};
