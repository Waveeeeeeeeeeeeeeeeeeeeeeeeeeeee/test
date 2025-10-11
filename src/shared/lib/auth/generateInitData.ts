import CryptoJS from 'crypto-js';

class TelegramUserDataModel {
	id!: number;
	first_name!: string;
	last_name?: string | null;
	username?: string | null;
	language_code?: string | null;
	is_premium?: boolean | null;
	is_bot?: boolean | null;
	added_to_attachment_menu?: boolean | null;
	allows_write_to_pm?: boolean | null;
	photo_url?: string | null;

	constructor(params: {
		id: number;
		first_name: string;
		last_name?: string | null;
		username?: string | null;
		language_code?: string | null;
		is_premium?: boolean | null;
		is_bot?: boolean | null;
		added_to_attachment_menu?: boolean | null;
		allows_write_to_pm?: boolean | null;
		photo_url?: string | null;
	}) {
		Object.assign(this, params);
	}

	toJSON() {
		const dict: Record<string, any> = {};
		for (const [key, value] of Object.entries(this)) {
			if (value !== null && value !== undefined) dict[key] = value;
		}
		return JSON.stringify(dict, Object.keys(dict).sort(), 0).replace(/\s/g, '');
	}
}

export const generateInitData = async () => {
	const botToken = '8218619054:AAHijFAIOThUQBJ1dIvUo5Gnvnh74AoeZx8';

	const userData = new TelegramUserDataModel({
		id: 2324,
		first_name: 'Igor',
		last_name: 'Ivanov',
		username: '@Ivanov',
		language_code: 'ru',
		is_premium: true,
		is_bot: false,
		added_to_attachment_menu: true,
		allows_write_to_pm: true,
		photo_url: 'https://example.com/photo.jpg'
	});

	const authDate = Math.floor(Date.now() / 1000);

	const payload = {
		auth_date: authDate,
		query_id: 'IB7vfBYS54rmblsGd',
		user: userData.toJSON()
	};

	const dataCheckString = Object.keys(payload)
		.filter(k => k !== 'hash')
		.sort()
		.map(k => `${k}=${payload[k as keyof typeof payload]}`)
		.join('\n');

	const keySecret = CryptoJS.HmacSHA256(botToken, 'WebAppData');
	const hash = CryptoJS.HmacSHA256(dataCheckString, keySecret).toString(
		CryptoJS.enc.Hex
	);

	return {
		...payload,
		hash
	};
};
