export type SocketMessage<TPayload = unknown> = {
	cmd: string;
	payload?: TPayload;
};

export type FindRequestParams = {
	age?: string;
	gender?: 'MALE' | 'FEMALE';
	country_code?: string;
	goal: string | null;
};

type Subscriber = (data: SocketMessage<unknown>) => void;

let socket: WebSocket | null = null;
let subscribers: Subscriber[] = [];

export const initSocket = (url: string, auth?: Record<string, unknown>) => {
	if (!socket || socket.readyState === WebSocket.CLOSED) {
		socket = new WebSocket(url);

		socket.onopen = () => {
			if (auth) socket?.send(JSON.stringify(auth));
		};

		socket.onmessage = event => {
			try {
				const data: SocketMessage = JSON.parse(event.data);
				subscribers.forEach(sub => sub(data));
			} catch (err) {
				console.error('Failed to parse socket message', err);
			}
		};

		socket.onclose = event => {};
		socket.onerror = error => console.error('WebSocket error', error);
	}

	return socket;
};

export const sendSocketCommand = <TPayload = unknown>(
	cmd: string,
	payload?: TPayload
) => {
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify({ cmd, payload }));
	} else {
		console.warn('WebSocket not open', socket?.readyState);
	}
};

export const subscribeToSocketMessages = <TPayload = unknown>(
	callback: (data: SocketMessage<TPayload>) => void
) => {
	const wrappedCallback: Subscriber = data =>
		callback(data as SocketMessage<TPayload>);
	subscribers.push(wrappedCallback);

	return () => {
		subscribers = subscribers.filter(sub => sub !== wrappedCallback);
	};
};

export const clearSocketSubscribers = () => {
	subscribers = [];
};

export const sendFindRequest = (params: FindRequestParams) => {
	sendSocketCommand<FindRequestParams>('find', params);
};
