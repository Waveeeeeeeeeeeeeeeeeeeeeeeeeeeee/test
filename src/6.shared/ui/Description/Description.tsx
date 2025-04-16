import styles from './Description.module.css'

export type DescriptionProps = {
	description: string
	variant: 'full' | 'short'
}
const Description = ({ description, variant }: DescriptionProps) => {
	return <div className={styles[variant]}>{description}</div>
}

export default Description
