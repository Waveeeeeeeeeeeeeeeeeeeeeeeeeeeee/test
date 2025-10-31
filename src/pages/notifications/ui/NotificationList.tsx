import styles from './NotificationList.module.css';
import { NotificationItem } from './mockNotifications';

interface NotificationListProps {
  notifications: NotificationItem[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <div className={styles.list}>
			{notifications.map((notification, index) =>
      <div key={notification.id || index} className={styles.notification}>
					<div className={styles.avatar}>
						{notification.multipleAvatars ?
          <div className={styles.multipleAvatars}>
								{notification.multipleAvatars.slice(0, 3).map((avatar, idx) =>
            <img
              key={idx}
              src={avatar}
              alt={`User ${idx + 1}`}
              className={styles.avatarImage} />

            )}
							</div> :
          notification.avatar ?
          <img
            src={notification.avatar}
            alt={notification.userName}
            className={styles.avatarImage} /> :


          <div className={styles.avatarIcon}>{notification.icon}</div>
          }
						{notification.heartIcon &&
          <div className={styles.heartIcon}>{notification.heartIcon}</div>
          }
					</div>

					<div className={styles.content}>
						<div className={styles.mainText}>{notification.mainText}</div>
						<div className={styles.subText}>{notification.subText}</div>
						{notification.messagePreview &&
          <div className={styles.messagePreview}>
								{notification.messagePreview}
							</div>
          }
					</div>

					<div className={styles.actionIcon}>{notification.actionIcon}</div>
				</div>
      )}
		</div>);

};

export default NotificationList;