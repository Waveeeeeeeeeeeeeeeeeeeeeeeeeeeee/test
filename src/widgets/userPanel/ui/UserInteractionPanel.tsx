import { InviteButton } from '@/features/inviteUser/ui/InviteButton'
import { MessageButton } from '@/features/messageUser/ui/MessageButton'
import { SkipButton } from '@/features/skipUser/ui/SkipButton'

type Props = {
	userId: string
}

export const UserInteractionPanel = ({ userId }: Props) => {
	return (
		<div className='fixed bottom-22 inset-x-4 z-[200] flex gap-2'>
			<InviteButton userId={userId} />
			<MessageButton userId={userId} />
			<SkipButton userId={userId} />
		</div>
	)
}
