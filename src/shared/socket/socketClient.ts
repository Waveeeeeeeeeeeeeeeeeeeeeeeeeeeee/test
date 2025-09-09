type SocketMessage = {
	type: string;
	payload?: Record<string, unknown>;
};

type FindRequestParams = {
	age?: number;
	gender?: 'MALE' | 'FEMALE';
	city?: string;
};

let socket: WebSocket | null = null;
let onMessageCallback: ((data: SocketMessage) => void) | null = null;

export const initSocket = () => {
	if (!socket || socket.readyState === WebSocket.CLOSED) {
		socket = new WebSocket('wss://api.acetest.site/dating/profiles/ws');

		socket.onopen = () => {
			console.log('WebSocket connected');

			const authMessage = {
				token: '1234567890',
				version: '1'
			};
			socket?.send(JSON.stringify(authMessage));
		};

		socket.onmessage = event => {
			console.log('Received socket message:', event.data);

			try {
				const data: SocketMessage = JSON.parse(event.data);
				if (onMessageCallback) {
					onMessageCallback(data);
				}
			} catch (err) {
				console.error('Failed to parse socket message', err);
			}
		};

		socket.onclose = event => {
			console.log('WebSocket disconnected', event);
		};

		socket.onerror = error => {
			console.error('WebSocket error', error);
		};
	}

	return socket;
};

export const sendFindRequest = (params: FindRequestParams) => {
	if (!socket || socket.readyState !== WebSocket.OPEN) {
		console.warn('ВебСокет не открыт', socket?.readyState);
		return;
	}

	const message = {
		cmd: 'find',
		params
	};

	socket.send(JSON.stringify(message));
};

export const subscribeToSocketMessages = (
	callback: (data: SocketMessage) => void
) => {
	onMessageCallback = callback;
};
