import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

interface MessageInputProps {
	onSendMessage: (content: string) => void;
	disabled?: boolean;
}

export const MessageInput = ({
	onSendMessage,
	disabled = false
}: MessageInputProps) => {
	const [message, setMessage] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() && !disabled) {
			onSendMessage(message.trim());
			setMessage('');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex items-center gap-3 p-4 bg-gray-800 rounded-t-2xl'
		>
			<button
				type='button'
				className='text-gray-400 hover:text-white transition-colors'
				disabled={disabled}
			>
				<Paperclip size={20} />
			</button>
			<input
				type='text'
				value={message}
				onChange={e => setMessage(e.target.value)}
				placeholder='Введите сообщение'
				disabled={disabled}
				className='flex-1 bg-gray-700 text-white px-4 py-3 rounded-xl border-none outline-none placeholder-gray-400'
			/>
			<button
				type='submit'
				disabled={!message.trim() || disabled}
				className='bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors'
			>
				<Send size={16} />
			</button>
		</form>
	);
};
