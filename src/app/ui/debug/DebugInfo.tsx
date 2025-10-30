import { FC } from 'react';

import { useMainApp } from '../../lib/hooks/useMainApp';

const DebugInfo: FC = () => {
  const { showContent, shouldRedirectToOnboarding, isAuthChecking } =
  useMainApp();

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
		</div>);

};

export default DebugInfo;