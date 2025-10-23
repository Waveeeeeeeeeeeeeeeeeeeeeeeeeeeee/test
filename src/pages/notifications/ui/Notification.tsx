import { useState } from 'react';

import styles from './Notification.module.css';
import NotificationList from './NotificationList';
import NotificationPopup from './NotificationPopup';
import { mockNotifications } from './mockNotifications';
import { useCustomTranslation } from '@/shared';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';

type TabType = 'all' | 'likes' | 'invitations';

const Notification = () => {
	const [activeTab, setActiveTab] = useState<TabType>('all');
	const { title, allTab, likesTab, invitationsTab } =
		useCustomTranslation('notifications');

	const tabOptions = [
		{ label: allTab, value: 'all' },
		{ label: likesTab, value: 'likes' },
		{ label: invitationsTab, value: 'invitations' }
	];

	const filteredNotifications = mockNotifications.filter(notification => {
		if (activeTab === 'all') return true;
		return notification.type === activeTab;
	});

	const popupNotification = filteredNotifications.find(n => n.isNew);
	const listNotifications = filteredNotifications.filter(n => !n.isNew);

	return (
		<div className={styles.container}>
			<div className='mt-3'>
				<NotificationHeaderFactory
					title={title}
					IsBack={true}
					notification={false}
				/>
			</div>

			<div className={styles.tabs}>
				<div className={styles.tabContainer}>
					{tabOptions.map(tab => (
						<button
							key={tab.value}
							className={`${styles.tab} ${
								activeTab === tab.value ? styles.tabActive : ''
							}`}
							onClick={() => setActiveTab(tab.value as TabType)}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			{popupNotification && (
				<NotificationPopup notification={popupNotification} />
			)}

			<div className={styles.notifications}>
				<NotificationList notifications={listNotifications} />
			</div>
		</div>
	);
};

const NotificationPage = AnimatedPage(Notification);
export default NotificationPage;
