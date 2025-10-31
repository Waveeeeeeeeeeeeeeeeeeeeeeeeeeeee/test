import { FC } from 'react';

import { useMainApp } from '../../lib/hooks/useMainApp';
import { useUserStore } from '@/entities/user/model/store';

const DebugInfo: FC = () => {
  const { showContent, shouldRedirectToOnboarding, isAuthChecking } =
  useMainApp();
  const {
    telegramInitData,
    userHash,
    telegramQueryId,
    telegramAuthDate
  } = useUserStore();

  return (
    <div className='fixed top-4 left-4 bg-black bg-opacity-80 text-white p-2 rounded text-xs z-50'>
			<div>showContent: {showContent ? 'true' : 'false'}</div>
			<div>
				shouldRedirectToOnboarding:{' '}
				{shouldRedirectToOnboarding === null ?
        'null' :
        shouldRedirectToOnboarding ?
        'true' :
        'false'}
			</div>
			<div>isAuthChecking: {isAuthChecking ? 'true' : 'false'}</div>
			<div className='mt-1'>hash: {userHash || 'null'}</div>
			<div>query_id: {telegramQueryId || 'null'}</div>
			<div>auth_date: {telegramAuthDate ?? 'null'}</div>
			<div className='mt-1 break-all'>initData: {telegramInitData || 'null'}</div>
		</div>);

};

export default DebugInfo;