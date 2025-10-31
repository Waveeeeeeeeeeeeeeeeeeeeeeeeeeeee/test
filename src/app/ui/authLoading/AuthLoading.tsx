import { FC } from 'react';

import { useCustomTranslation } from '@/shared';

const AuthLoading: FC = () => {
  const { title, description } = useCustomTranslation('authLoading');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
			<div className='text-center'>
				<div className='mb-4'>
					<div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
				</div>
				<h2 className='text-xl font-semibold mb-2'>{title}</h2>
				<p className='text-gray-400 text-sm'>{description}</p>
			</div>
		</div>);

};

export default AuthLoading;