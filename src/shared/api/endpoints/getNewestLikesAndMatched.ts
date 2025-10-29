import { LikeData } from './types/likes';

/**
 * SSE (Server-Sent Events) функция для получения новых лайков и мэтчей
 * Получить новые лайки и мэтчи, которые поставили пользователю
 */
export type NewestLikesAndMatchedData = {
	likes: LikeData[];
	matches: LikeData[];
};

export type SubscribeToNewestLikesAndMatchedOptions = {
	onMessage: (data: NewestLikesAndMatchedData) => void;
	onError?: (error: Event) => void;
	onOpen?: () => void;
};

/**
 * Подписывается на SSE поток новых лайков и мэтчей
 * Использует fetch для поддержки кастомных заголовков авторизации
 * @returns Функция для закрытия соединения
 */
export const subscribeToNewestLikesAndMatched = (
	options: SubscribeToNewestLikesAndMatchedOptions
): (() => void) => {
	const { onMessage, onError, onOpen } = options;

	// Базовый URL
	const baseURL = '/api';
	const url = `${baseURL}/ace-friends/dating/v1/likes/get_newest_likes_and_matched`;

	let isAborted = false;
	let abortController: AbortController | null = null;

	const startSSE = async () => {
		abortController = new AbortController();

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'X-Access-Token': '1234567890',
					'X-Token-Version': '1234567890'
				},
				signal: abortController.signal
			});

			if (!response.ok) {
				throw new Error(`SSE connection failed: ${response.status}`);
			}

			if (!response.body) {
				throw new Error('Response body is null');
			}

			onOpen?.();

			// Используем ReadableStream согласно документации MDN
			// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#examples
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';

			// Читаем поток данных из ReadableStream
			while (!isAborted) {
				const { done, value } = await reader.read();

				if (done) {
					break;
				}

				// Декодируем байты в текст
				buffer += decoder.decode(value, { stream: true });

				// Парсим SSE формат: ищем строки, начинающиеся с "data: "
				const lines = buffer.split('\n');
				buffer = lines.pop() || ''; // Сохраняем неполную строку в буфер

				for (const line of lines) {
					// SSE формат: "data: {...}\n\n"
					if (line.startsWith('data: ')) {
						try {
							const jsonStr = line.slice(6).trim();
							if (jsonStr) {
								const data = JSON.parse(jsonStr) as NewestLikesAndMatchedData;
								onMessage(data);
							}
						} catch (error) {
							console.error('Error parsing SSE message:', error);
						}
					}
				}
			}
		} catch (error) {
			if (!isAborted && error instanceof Error) {
				onError?.(error as unknown as Event);
			}
		}
	};

	startSSE();

	// Возвращаем функцию для закрытия соединения
	return () => {
		isAborted = true;
		abortController?.abort();
	};
};
