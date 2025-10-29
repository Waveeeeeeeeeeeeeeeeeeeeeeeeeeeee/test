import { useTranslation } from 'react-i18next';

import styles from './ProfilePrivacy.module.css';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';

type PrivacyPolicyTranslation = {
	title: string;
	lastUpdated: string;
	introduction: {
		title: string;
		content: string;
	};
	dataCollection: {
		title: string;
		personalInfo: string;
		gameData: string;
		location: string;
		usage: string;
	};
	dataUse: {
		title: string;
		matching: string;
		communication: string;
		improvement: string;
		support: string;
	};
	dataSharing: {
		title: string;
		content: string;
	};
	dataProtection: {
		title: string;
		content: string;
	};
	userRights: {
		title: string;
		access: string;
		update: string;
		delete: string;
		portability: string;
	};
	contact: {
		title: string;
		content: string;
	};
};

const ProfilePrivacy = () => {
	const { t } = useTranslation();

	const privacyPolicy = t('privacyPolicy', {
		returnObjects: true
	}) as PrivacyPolicyTranslation;

	return (
		<div className={styles.container}>
			<NotificationHeaderFactory
				title={privacyPolicy.title}
				IsBack={true}
				notification={false}
			/>

			<div className={styles.content}>
				<div className={styles.section}>
					<p className={styles.lastUpdated}>{privacyPolicy.lastUpdated}</p>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>
						{privacyPolicy.introduction.title}
					</h2>
					<p className={styles.sectionContent}>
						{privacyPolicy.introduction.content}
					</p>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>
						{privacyPolicy.dataCollection.title}
					</h2>
					<ul className={styles.list}>
						<li className={styles.listItem}>
							{privacyPolicy.dataCollection.personalInfo}
						</li>
						<li className={styles.listItem}>
							{privacyPolicy.dataCollection.gameData}
						</li>
						<li className={styles.listItem}>
							{privacyPolicy.dataCollection.location}
						</li>
						<li className={styles.listItem}>
							{privacyPolicy.dataCollection.usage}
						</li>
					</ul>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{privacyPolicy.dataUse.title}</h2>
					<ul className={styles.list}>
						<li className={styles.listItem}>
							{privacyPolicy.dataUse.matching}
						</li>
						<li className={styles.listItem}>
							{privacyPolicy.dataUse.communication}
						</li>
						<li className={styles.listItem}>
							{privacyPolicy.dataUse.improvement}
						</li>
						<li className={styles.listItem}>{privacyPolicy.dataUse.support}</li>
					</ul>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>
						{privacyPolicy.dataSharing.title}
					</h2>
					<p className={styles.sectionContent}>
						{privacyPolicy.dataSharing.content}
					</p>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>
						{privacyPolicy.dataProtection.title}
					</h2>
					<p className={styles.sectionContent}>
						{privacyPolicy.dataProtection.content}
					</p>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>
						{privacyPolicy.userRights.title}
					</h2>
					<ul className={styles.list}>
						<li className={styles.listItem}>
							{privacyPolicy.userRights.access}
						</li>
						<li className={styles.listItem}>
							{privacyPolicy.userRights.update}
						</li>
						<li className={styles.listItem}>
							{privacyPolicy.userRights.delete}
						</li>
						<li className={styles.listItem}>
							{privacyPolicy.userRights.portability}
						</li>
					</ul>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{privacyPolicy.contact.title}</h2>
					<p className={styles.sectionContent}>
						{privacyPolicy.contact.content}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AnimatedPage(ProfilePrivacy);
