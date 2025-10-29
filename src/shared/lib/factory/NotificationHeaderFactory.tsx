import { FC } from 'react';
import { useNavigate } from 'react-router';

import { EnumRoutes } from '@/app/router/router.consts';
import { getHeaderNavigation } from '@/shared/lib/navigation/getHeaderNavigation';
import { createHandleBack } from '@/shared/lib/navigation/handleBack';
import { NotificationHeader } from '@/shared/ui/NotificationHeader';

interface NotificationHeaderFactoryProps {
	title: string;
	IsBack?: boolean;
	notification?: boolean;
	onGoBack?: () => void;
	onNotificationClick?: () => void;
	className?: string;
}

export const NotificationHeaderFactory: FC<NotificationHeaderFactoryProps> = ({
	title,
	IsBack = true,
	notification = true,
	onGoBack,
	onNotificationClick,
	className
}) => {
	const navigate = useNavigate();
	const handleGoBack = getHeaderNavigation(
		onGoBack,
		createHandleBack(navigate)
	);

	const handleNotificationClick = () => {
		if (onNotificationClick) {
			onNotificationClick();
		} else {
			try {
				navigate(EnumRoutes.NOTIFICATIONS);
			} catch (error) {
				window.location.href = EnumRoutes.NOTIFICATIONS;
			}
		}
	};

	return (
		<div className={`mb-2.5 ${className}`}>
			<NotificationHeader
				title={title}
				IsBack={IsBack}
				goBack={handleGoBack}
				notification={notification}
				onNotificationClick={handleNotificationClick}
			/>
		</div>
	);
};
