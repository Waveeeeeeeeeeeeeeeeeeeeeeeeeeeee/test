import styles from './Description.module.css';

export type DescriptionProps = {
	description: string;
	toggle?: () => void;
	showMoreButton?: boolean;
	showHideButton?: boolean;
};

const Description = ({
	description,
	toggle,
	showMoreButton = false,
	showHideButton = false
}: DescriptionProps) => {
	const shouldShowButton = showMoreButton || showHideButton;
	const buttonText = showHideButton ? 'Скрыть' : 'Еще...';

	return (
		<div className={styles.about}>
			<p
				onClick={shouldShowButton ? toggle : undefined}
				style={{ cursor: shouldShowButton ? 'pointer' : 'default' }}
			>
				{description}
			</p>
			{shouldShowButton && (
				<button onClick={toggle} className={styles.showMoreButton}>
					{buttonText}
				</button>
			)}
		</div>
	);
};

export default Description;
