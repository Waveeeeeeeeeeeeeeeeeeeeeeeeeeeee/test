import BackIco from '../../assets/icons/back.svg?react';
import NotificationIco from '../../assets/images/notification.svg?react';

import styles from './NotificationHeader.module.css';

export type NotificationHeaderProps = {
  title: string;
  goBack?: () => void;
  IsBack?: boolean;
  notification?: boolean;
  onNotificationClick?: () => void;
};

export const NotificationHeader = ({
  title,
  goBack,
  IsBack = false,
  notification = true,
  onNotificationClick
}: NotificationHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
			<div className='flex items-center gap-2.5'>
				{IsBack &&
        <button className='cursor-pointer' onClick={goBack}>
						<BackIco />
					</button>
        }
				<h1 className={styles.title}>{title}</h1>
			</div>
			{notification &&
      <button className='cursor-pointer' onClick={onNotificationClick}>
					<NotificationIco fill='gray' />
				</button>
      }
		</div>);

};