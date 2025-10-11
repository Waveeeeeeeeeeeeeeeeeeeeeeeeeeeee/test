export const handleBack = () => {
	// Используем более надежный способ навигации назад
	const referrer = document.referrer;
	const currentHost = window.location.origin;

	// Если есть referrer с того же домена, используем history.back
	if (referrer && referrer.startsWith(currentHost)) {
		window.history.back();
	} else {
		// Если нет referrer или он с другого домена, перенаправляем на главную
		window.location.href = '/home';
	}
};
