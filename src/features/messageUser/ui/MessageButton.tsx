import { useCustomTranslation } from '@/shared'
import MessageIco from '@/shared/assets/icons/message.svg?react'

type Props = {
	userId: string
}

export const MessageButton = ({ userId }: Props) => {
	const { text } = useCustomTranslation('messageButton')
	const handleMessage = () => {
		console.log('Open chat with', userId)
	}

	return (
		<button
			onClick={handleMessage}
			className='flex-1 flex flex-col gap-0.5 items-center justify-center py-3 bg-purple-600 rounded-2xl text-white text-sm cursor-pointer'
		>
			<MessageIco />
			{text}
		</button>
	)
}
