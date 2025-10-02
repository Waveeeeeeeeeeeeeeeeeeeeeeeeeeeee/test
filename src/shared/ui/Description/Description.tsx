import styles from './Description.module.css';

export type DescriptionProps = {
	description: string;
	toggle: () => void;
};

const Description = ({ description, toggle }: DescriptionProps) => {
	return (
		<div className={styles.about}>
			<p onClick={toggle}>{description}</p>
		</div>
	);
};

export default Description;
