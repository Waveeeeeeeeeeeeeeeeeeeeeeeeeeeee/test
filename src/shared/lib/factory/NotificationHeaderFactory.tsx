import { FC } from 'react';

import { getHeaderNavigation } from '@/shared/lib/navigation/getHeaderNavigation';
import { handleBack } from '@/shared/lib/navigation/handleBack';
import { NotificationHeader } from '@/shared/ui/NotificationHeader';

interface NotificationHeaderFactoryProps {
	title: string;
	IsBack?: boolean;
	notification?: boolean;
	onGoBack?: () => void;
	className?: string;
}

export const NotificationHeaderFactory: FC<NotificationHeaderFactoryProps> = ({
	title,
	IsBack = true,
	notification = true,
	onGoBack,
	className
}) => {
	const handleGoBack = getHeaderNavigation(onGoBack, handleBack);

	return (
		<div className={`mb-2.5 ${className}`}>
			<NotificationHeader
				title={title}
				IsBack={IsBack}
				goBack={handleGoBack}
				notification={notification}
			/>
		</div>
	);
};
