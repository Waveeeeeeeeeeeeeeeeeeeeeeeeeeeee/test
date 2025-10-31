import { getApiBaseURL } from '@/shared/api/config';

import { LikeData } from './types/likes';

export type NewestLikesAndMatchedData = {
	likes: LikeData[];
	matches: LikeData[];
};

export type SubscribeToNewestLikesAndMatchedOptions = {
	onMessage: (data: NewestLikesAndMatchedData) => void;
	onError?: (error: Event) => void;
	onOpen?: () => void;
};

export const subscribeToNewestLikesAndMatched = (
	options: SubscribeToNewestLikesAndMatchedOptions
): (() => void) => {
	const { onMessage, onError, onOpen } = options;

	const baseURL = getApiBaseURL();
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

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';

			while (!isAborted) {
				const { done, value } = await reader.read();

				if (done) {
					break;
				}

				buffer += decoder.decode(value, { stream: true });

				const lines = buffer.split('\n');
				buffer = lines.pop() || '';

				for (const line of lines) {
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

	return () => {
		isAborted = true;
		abortController?.abort();
	};
};
