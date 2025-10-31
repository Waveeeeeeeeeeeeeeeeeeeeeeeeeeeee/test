/**
 * Получает базовый URL для API запросов в зависимости от окружения
 * В production использует полный URL к API серверу
 * В development использует относительный путь, который проксируется через vite.config.ts
 */
export const getApiBaseURL = (): string => {
	// В production используем полный URL к API
	if (import.meta.env.PROD) {
		return 'https://api.acetest.site';
	}
	// В development используем proxy из vite.config.ts
	return '/api';
};
