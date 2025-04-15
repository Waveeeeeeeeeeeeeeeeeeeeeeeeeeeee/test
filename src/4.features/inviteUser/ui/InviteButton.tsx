import InviteIco from '../../../6.shared/assets/icons/invite.svg?react'

import { useCustomTranslation } from '@/6.shared'

type Props = {
	userId: string
}

export const InviteButton = ({ userId }: Props) => {
	const { text } = useCustomTranslation('inviteButton')
	const handleInvite = () => {
		console.log('Inviting user', userId)
	}

	return (
		<button
			onClick={handleInvite}
			className='flex-1 flex flex-col items-center justify-center gap-0.5 py-3 bg-[var(--second-bg)] rounded-2xl text-white text-sm cursor-pointer'
		>
			<InviteIco />
			{text}
		</button>
	)
}
