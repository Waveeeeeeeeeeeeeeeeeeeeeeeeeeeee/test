import { mockUser } from './api/mockUser';
import styles from '@/shared/ui/TagsSelectors/TagsSelectors.module.css';
import { UserCard } from '@/shared/ui/UserCard/UserCard';

export const SearchedUser = () => {
	return (
		<div className='w-80% bg-[#161413] p-4 rounded-2xl flex flex-col gap-5'>
			<UserCard
				name={mockUser[0].nickname}
				age={+mockUser[0].age}
				gender={mockUser[0].gender}
				avatarUrl={mockUser[0].avatar}
				coutry_code={mockUser[0].country_code}
				icon='info'
			/>

			<div>{mockUser[0].description}</div>
			<div className='text-[#828289] font-medium'>{`${mockUser[0].country}, г. ${mockUser[0].city}`}</div>

			<div className={styles.container}>
				<div className={styles.tagsContainer}>
					{mockUser[0].interests.map(tag => (
						<div className={styles.itemWrapper}>
							<span className={styles.item}>{tag}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
