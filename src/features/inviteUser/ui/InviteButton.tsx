import { useCustomTranslation } from '@/shared';
import InviteIco from '@/shared/assets/icons/invite.svg?react';

type Props = {
	userId: string;
};

export const InviteButton = ({ userId }: Props) => {
	const { text } = useCustomTranslation('inviteButton');
	const handleInvite = () => {};

	return (
		<button
			onClick={handleInvite}
			className='flex-1 flex flex-col items-center justify-center gap-0.5 py-3 bg-[var(--second-bg)] rounded-2xl text-white text-sm cursor-pointer'
		>
			<InviteIco />
			{text}
		</button>
	);
};
