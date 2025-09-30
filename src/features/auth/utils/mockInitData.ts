export const generateMockInitData = async () => {
	const botToken = '8218619054:AAHijFAIOThUQBJ1dIvUo5Gnvnh74AoeZx8';

	const userData = {
		user_id: '7960421713',
		auth_date: Math.floor(Date.now() / 1000).toString(),
		first_name: 'Влад',
		username: 'frontvlad'
	};

	const dataCheckString = Object.keys(userData)
		.sort()
		.map(k => `${k}=${userData[k as keyof typeof userData]}`)
		.join('\n');

	const encoder = new TextEncoder();
	const keyData = encoder.encode(botToken.split(':')[1]);
	const data = encoder.encode(dataCheckString);

	const cryptoKey = await crypto.subtle.importKey(
		'raw',
		keyData,
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);

	const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, data);
	const hashArray = Array.from(new Uint8Array(signatureBuffer));
	const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

	const initData = `${Object.entries(userData)
		.map(([k, v]) => `${k}=${v}`)
		.join('&')}&hash=${hash}`;

	return initData;
};
