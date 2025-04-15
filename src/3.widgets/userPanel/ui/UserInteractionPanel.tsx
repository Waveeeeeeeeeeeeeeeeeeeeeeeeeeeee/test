import { InviteButton } from '@/4.features/inviteUser/ui/InviteButton'
import { MessageButton } from '@/4.features/messageUser/ui/MessageButton'
import { SkipButton } from '@/4.features/skipUser/ui/SkipButton'

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
