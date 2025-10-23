import { useCustomTranslation } from '@/shared';
import SkipIco from '@/shared/assets/icons/skip.svg?react';

type Props = {
	userId: string;
};

export const SkipButton = ({ userId }: Props) => {
	const { text } = useCustomTranslation('skipButton');
	const handleSkip = () => {};

	return (
		<button
			onClick={handleSkip}
			className='flex-1 flex gap-0.5 items-center flex-col justify-center py-3 bg-neutral-800 rounded-2xl text-white text-sm cursor-pointer'
		>
			<SkipIco />
			{text}
		</button>
	);
};
