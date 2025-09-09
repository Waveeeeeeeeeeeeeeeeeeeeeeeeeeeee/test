let socket: WebSocket | null = null
let onMessageCallback: ((data: any) => void) | null = null

export const initSocket = () => {
	if (!socket || socket.readyState === WebSocket.CLOSED) {
		socket = new WebSocket('wss://api.acetest.site/dating/profiles/ws')

		socket.onopen = () => {
			console.log('WebSocket connected')

			const authMessage = {
				token: '1234567890',
				version: '1'
			}
			socket?.send(JSON.stringify(authMessage))
		}

	socket.onmessage = event => {
	console.log('Received socket message:', event.data) 
	const data = JSON.parse(event.data)
	if (onMessageCallback) {
		onMessageCallback(data)
	}
}

		socket.onclose = event => {
			console.log('WebSocket disconnected', event)
		}

		socket.onerror = error => {
			console.error('WebSocket error', error)
		}
	}

	return socket
}

export const sendFindRequest = (params: any) => {
	if (!socket || socket.readyState !== WebSocket.OPEN) {
		console.warn('ВебСокет не открыт', socket?.readyState)
		return
	}

	console.log('Sending find request:', params)

	const message = {
		cmd: 'find',
		params
	}

	socket.send(JSON.stringify(message))
}

export const subscribeToSocketMessages = (callback: (data: any) => void) => {
	onMessageCallback = callback
}
