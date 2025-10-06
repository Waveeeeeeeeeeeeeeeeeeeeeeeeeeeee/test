import { createElement, useCallback } from 'react';

import { NotificationHeader } from '@/shared/ui/NotificationHeader';

interface UseNotificationHeaderProps {
	title: string;
	back?: boolean;
	notification?: boolean;
	onGoBack?: () => void;
}

export const useNotificationHeader = ({
	title,
	back = true,
	notification = true,
	onGoBack
}: UseNotificationHeaderProps) => {
	const defaultGoBack = useCallback(() => {
		window.history.back();
	}, []);

	const handleGoBack = onGoBack || defaultGoBack;

	const NotificationHeaderWrapper = () => {
		return createElement(
			'div',
			{ className: 'mb-2.5' },
			createElement(NotificationHeader, {
				title,
				back,
				goBack: handleGoBack,
				notification
			})
		);
	};

	return { NotificationHeaderWrapper };
};
