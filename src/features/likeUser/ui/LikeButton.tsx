import { Heart } from 'lucide-react';

import { useCustomTranslation } from '@/shared';

type Props = {
  userId: string;
};

export const LikeButton = ({ userId: _userId }: Props) => {
  const { text } = useCustomTranslation('likeButton');
  const handleLike = () => {};

  return (
    <button
      onClick={handleLike}
      className='flex-1 flex flex-col items-center justify-center gap-0.5 py-3 bg-[var(--second-bg)] rounded-2xl text-white text-sm cursor-pointer'>
      
			<Heart />
			{text}
		</button>);
};


