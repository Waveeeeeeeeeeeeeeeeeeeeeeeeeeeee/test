import styles from './FriendCard.module.css';
import MessageIco from '@/shared/assets/icons/message.svg?react';
import { languageFlags } from '@/shared/const/languageFlags';
import { FriendProps } from '@/widgets/friendList/model/type';

const FriendCard = ({ person }: {person: FriendProps;}) => {
  return (
    <div className='flex justify-between'>
			<div className='flex gap-4 items-center'>
				<div
          className={`${styles.avatar} ${person.status === 'online' && styles.online}`}>
          
					<img className='w-12 h-12 rounded-[56px]' src={person.ico}></img>
				</div>
				<div className='flex flex-col'>
					<div className='flex gap-2'>
						<img
              src={languageFlags[person.country]}
              alt={person.country}
              width={16}
              height={16} />
            
						<span className={styles.name}>{person.name}</span>
					</div>
					<span className={styles.meta}>
						г. {person.city} {person.gender.charAt(0).toUpperCase()},{' '}
						{person.age}
					</span>
				</div>
			</div>
			<button className='flex items-center justify-center rounded-2xl bg-[var(--second-bg)] w-12.5 h-12.5 cursor-pointer'>
				<MessageIco />
			</button>
		</div>);

};

export default FriendCard;